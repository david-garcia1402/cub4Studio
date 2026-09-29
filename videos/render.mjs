// Uso: node render.mjs [id-da-versão ...] [--recapture] [--preview]
//   sem ids renderiza todas as versões de projects.mjs; --recapture regrava os sites;
//   --preview gera só um frame por cena em out/preview-<id>.jpg.
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { captureClip } from "./lib/capture.mjs";
import { clips } from "./clips.mjs";
import { projects } from "./projects.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const CACHE = join(ROOT, ".cache");
const CLIPS_DIR = join(CACHE, "clips");
const SFX_DIR = join(CACHE, "sfx");
const OUT = join(ROOT, "out");
const MUSIC = join(ROOT, "assets", "music.m4a");
const LOGO = join(ROOT, "..", "public", "img", "icon-transparent.png");
const CHROME = process.env.CHROME_PATH || "/usr/local/bin/google-chrome";
const FPS = 30;

const args = process.argv.slice(2);
const recapture = args.includes("--recapture");
const preview = args.includes("--preview");
const ids = args.filter((a) => !a.startsWith("--"));
const selected = ids.length ? ids : Object.keys(projects);

const run = (cmd, argv, opts = {}) =>
  new Promise((resolve, reject) => {
    const p = spawn(cmd, argv, { stdio: ["pipe", "inherit", "inherit"], ...opts });
    p.on("error", reject);
    p.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} saiu com código ${code}`))));
    if (opts.onSpawn) opts.onSpawn(p);
  });

async function makeSfx() {
  await mkdir(SFX_DIR, { recursive: true });
  const defs = {
    tap: "aevalsrc='0.9*sin(2*PI*1700*t)*exp(-60*t)+0.4*sin(2*PI*900*t)*exp(-40*t)':d=0.09",
    pop: "aevalsrc='0.8*sin(2*PI*(380+900*t)*t)*exp(-16*t)':d=0.2",
    whoosh: "anoisesrc=d=0.42:c=pink:a=0.6,highpass=f=500,lowpass=f=5000,afade=t=in:d=0.2,afade=t=out:st=0.2:d=0.22",
    riser: "anoisesrc=d=0.6:c=white:a=0.35,highpass=f=1500,afade=t=in:d=0.5,afade=t=out:st=0.5:d=0.1",
  };
  for (const [name, src] of Object.entries(defs)) {
    const file = join(SFX_DIR, `${name}.wav`);
    if (!existsSync(file)) await run("ffmpeg", ["-v", "error", "-y", "-f", "lavfi", "-i", src, "-ac", "2", "-ar", "44100", file]);
  }
}

async function ensureClips(browser, names) {
  const metas = {};
  for (const name of names) {
    const metaFile = join(CLIPS_DIR, name, "meta.json");
    if (!recapture && existsSync(metaFile)) {
      metas[name] = JSON.parse(await readFile(metaFile, "utf8"));
      continue;
    }
    if (!clips[name]) throw new Error(`clipe desconhecido: ${name}`);
    console.log(`gravando ${name} (${clips[name].url})...`);
    metas[name] = await captureClip(browser, name, clips[name], CLIPS_DIR);
    console.log(`  ${metas[name].frames} frames`);
  }
  return metas;
}

function timeline(project, metas) {
  let t = 0;
  return project.timeline.map((sc) => {
    const dur = sc.type === "phone" ? ((sc.to || metas[sc.clip].frames) - (sc.from || 0)) / FPS : sc.dur;
    const out = { ...sc, start: t, dur };
    t += dur;
    return out;
  });
}

function audioEvents(scenes, metas) {
  const ev = [];
  scenes.forEach((s, i) => {
    const prev = scenes[i - 1];
    if (s.type === "hook") ev.push({ t: s.start, sfx: "pop", vol: 0.55 });
    if (s.type === "cta") ev.push({ t: s.start, sfx: "pop", vol: 0.55 });
    if (!prev || prev.type !== s.type || s.type === "phone") ev.push({ t: Math.max(0, s.start - 0.12), sfx: "whoosh", vol: 0.35 });
    if (s.type === "phone") {
      const from = s.from || 0;
      for (const c of metas[s.clip].cues) {
        if (c.type === "sfx" && c.f >= from) ev.push({ t: s.start + (c.f - from) / FPS, sfx: "tap", vol: 0.5 });
      }
    }
  });
  return ev.filter((e) => e.t < scenes.at(-1).start + scenes.at(-1).dur);
}

async function renderVideo(browser, id, project, metas) {
  const scenes = timeline(project, metas);
  const total = scenes.at(-1).start + scenes.at(-1).dur;
  const frames = Math.round(total * FPS);
  const spec = {
    timeline: project.timeline,
    clips: metas,
    clipsDir: pathToFileURL(CLIPS_DIR).href,
    logo: pathToFileURL(LOGO).href,
  };

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto(pathToFileURL(join(ROOT, "compositor.html")).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((s) => window.setup(s), spec);
  const cdp = await page.createCDPSession();

  await mkdir(OUT, { recursive: true });
  if (preview) {
    const times = scenes.flatMap((s) => [s.start + Math.min(s.dur * 0.6, 1.2), s.start + s.dur * 0.8]);
    const tiles = [];
    for (const t of times) {
      await page.evaluate((v) => window.renderFrame(v), t);
      const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
      tiles.push(Buffer.from(data, "base64"));
    }
    const file = join(OUT, `preview-${id}.jpg`);
    await run("ffmpeg", ["-v", "error", "-y", "-f", "image2pipe", "-c:v", "mjpeg", "-i", "-", "-vf", `scale=360:-1,tile=${Math.min(tiles.length, 6)}x${Math.ceil(tiles.length / 6)}`, "-frames:v", "1", file], {
      onSpawn: (p) => { for (const b of tiles) p.stdin.write(b); p.stdin.end(); },
    });
    await page.close();
    console.log(`prévia: ${file}`);
    return;
  }

  const silent = join(CACHE, `${id}-video.mp4`);
  let ff;
  const done = run(
    "ffmpeg",
    ["-v", "error", "-y", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
      "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", String(FPS), silent],
    { onSpawn: (p) => (ff = p) },
  );
  const t0 = performance.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate((v) => window.renderFrame(v), i / FPS);
    const { data } = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 94, optimizeForSpeed: true });
    if (!ff.stdin.write(Buffer.from(data, "base64"))) await new Promise((r) => ff.stdin.once("drain", r));
    if (i % 150 === 0) console.log(`  ${id}: frame ${i}/${frames} (${Math.round((performance.now() - t0) / 1000)}s)`);
  }
  ff.stdin.end();
  await done;
  await page.close();

  const ev = audioEvents(scenes, metas);
  const inputs = ["-i", silent, "-stream_loop", "-1", "-i", MUSIC];
  const filters = [`[1:a]atrim=0:${total.toFixed(3)},afade=t=in:d=0.05,afade=t=out:st=${(total - 1.3).toFixed(3)}:d=1.3,volume=0.85[m]`];
  const mixLabels = ["[m]"];
  ev.forEach((e, i) => {
    inputs.push("-i", join(SFX_DIR, `${e.sfx}.wav`));
    const ms = Math.round(e.t * 1000);
    filters.push(`[${i + 2}:a]adelay=${ms}|${ms},volume=${e.vol}[s${i}]`);
    mixLabels.push(`[s${i}]`);
  });
  filters.push(`${mixLabels.join("")}amix=inputs=${mixLabels.length}:normalize=0:duration=first,alimiter=limit=0.95[a]`);
  const file = join(OUT, `${id}.mp4`);
  await run("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", filters.join(";"), "-map", "0:v", "-map", "[a]",
    "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", "-t", total.toFixed(3), file]);
  console.log(`pronto: ${file} (${total.toFixed(1)}s, ${Math.round((performance.now() - t0) / 1000)}s de render)`);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ["--no-sandbox", "--hide-scrollbars", "--allow-file-access-from-files", "--font-render-hinting=none"],
});
try {
  await makeSfx();
  for (const id of selected) {
    const project = projects[id];
    if (!project) throw new Error(`versão desconhecida: ${id}`);
    const names = [...new Set(project.timeline.flatMap((s) => [s.clip, s.bg]).filter(Boolean))];
    const metas = await ensureClips(browser, names);
    await renderVideo(browser, id, project, metas);
  }
} finally {
  await browser.close();
}

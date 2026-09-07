import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { accessSync } from "node:fs";
import { mkdir, readdir, unlink } from "node:fs/promises";
import path from "node:path";

const base = process.env.DEMO_URL ?? "http://127.0.0.1:5173";
const outDir = path.resolve("public");
const videoDir = path.resolve("tmp-video");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function resolveFfmpeg() {
  const candidates = [
    path.join(process.env.LOCALAPPDATA ?? "", "ms-playwright", "ffmpeg-1011", "ffmpeg-win64.exe"),
    path.join(process.env.LOCALAPPDATA ?? "", "ms-playwright", "ffmpeg-1011", "ffmpeg.exe"),
  ];
  for (const candidate of candidates) {
    try {
      accessSync(candidate);
      return candidate;
    } catch {
      // next
    }
  }
  return "ffmpeg";
}

async function waitForServer() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {
      // still booting
    }
    await sleep(500);
  }
  throw new Error(`Servidor não respondeu em ${base}`);
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} saiu com ${code}`));
    });
    child.on("error", reject);
  });
}

await waitForServer();
await mkdir(videoDir, { recursive: true });
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: videoDir,
    size: { width: 1440, height: 900 },
  },
});
const page = await context.newPage();
await page.goto(base, { waitUntil: "networkidle" });
await sleep(900);

async function smoothScroll(y, steps = 16) {
  const start = await page.evaluate(() => window.scrollY);
  for (let i = 1; i <= steps; i += 1) {
    const next = start + ((y - start) * i) / steps;
    await page.evaluate((top) => window.scrollTo(0, top), next);
    await sleep(40);
  }
}

await sleep(800);
const unidadesTop = await page.locator("#unidades").evaluate((el) => el.offsetTop - 80);
await smoothScroll(unidadesTop);
await sleep(350);
const useUnit = page.getByRole("button", { name: "Usar esta" }).first();
if (await useUnit.count()) {
  await useUnit.click();
  await sleep(350);
}

const cardapioTop = await page.locator("#cardapio").evaluate((el) => el.offsetTop - 70);
await smoothScroll(cardapioTop);
await sleep(300);
await page.getByRole("button", { name: "Adicionar" }).first().click();
await sleep(800);
await page.getByRole("button", { name: "+" }).click();
await sleep(500);
await page.getByRole("button", { name: "Fechar sacola" }).click();
await sleep(250);

const pedirTop = await page.locator("#pedir").evaluate((el) => el.offsetTop - 70);
await smoothScroll(pedirTop);
await sleep(500);

const reviewsTop = await page.locator("#avaliacoes").evaluate((el) => el.offsetTop - 70);
await smoothScroll(reviewsTop);
await sleep(600);

await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
await sleep(1100);

await context.close();
await browser.close();

const webm = (await readdir(videoDir)).find((f) => f.endsWith(".webm"));
if (!webm) throw new Error("Playwright não gerou o .webm");

const src = path.join(videoDir, webm);
const mp4 = path.join(outDir, "redwolf-piloto.mp4");

await run(resolveFfmpeg(), [
  "-y",
  "-i",
  src,
  "-vf",
  "fps=30,format=yuv420p",
  "-c:v",
  "libx264",
  "-movflags",
  "+faststart",
  "-an",
  mp4,
]);

for (const file of await readdir(videoDir)) {
  await unlink(path.join(videoDir, file));
}

console.log(`Vídeo gerado: ${mp4}`);

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const root = join(process.cwd(), "preview");
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  let file = url.pathname === "/" ? "/index.html" : url.pathname;
  try {
    const body = await readFile(join(root, file));
    res.writeHead(200, {
      "content-type": types[extname(file)] || "application/octet-stream",
    });
    res.end(body);
  } catch {
    const fallback = await readFile(join(root, "index.html"));
    res.writeHead(200, { "content-type": types[".html"] });
    res.end(fallback);
  }
});

server.listen(port, () => {
  console.log(`The Raven → http://localhost:${port}`);
});

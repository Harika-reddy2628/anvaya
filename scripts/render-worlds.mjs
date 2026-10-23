// Renders the four practice scenes (scripts/worlds/scenes.js) to WebP stills in public/art/worlds.
// Usage: node scripts/render-worlds.mjs [--only=<world index>]
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const slugs = ["digital-presence", "digital-products", "intelligent-operations", "spatial-visuals"];
// "wide" feeds the 02 world viewer; "frame" is a closer second camera for the 03 practice cards.
const views = { wide: [1920, 1080], frame: [1600, 1200] };
const supersample = 1.5;
const only = process.argv.find(arg => arg.startsWith("--only="))?.slice(7);
const out = "public/art/worlds";
mkdirSync(out, { recursive: true });

const lab = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:#0b0a09}canvas{display:block}</style>
<script type="importmap">{"imports":{"three":"/three/build/three.module.js","three/addons/":"/three/examples/jsm/"}}</script>
<script type="module" src="/scenes.js"></script>`;
const types = { ".js": "text/javascript", ".html": "text/html" };
const server = createServer((request, response) => {
  const path = new URL(request.url, "http://localhost").pathname;
  const file = path === "/" ? null : path === "/scenes.js" ? "scripts/worlds/scenes.js" : path.startsWith("/three/") ? join("node_modules", normalize(path).replace(/^\/+/, "")) : "";
  if (file === null) { response.writeHead(200, { "content-type": types[".html"] }); response.end(lab); return; }
  if (!file || !file.startsWith("node_modules/three/") && file !== "scripts/worlds/scenes.js" || !existsSync(file)) { response.writeHead(404); response.end(); return; }
  response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" }); response.end(readFileSync(file));
}).listen(0, "127.0.0.1");
await new Promise(resolve => server.once("listening", resolve));
const base = `http://127.0.0.1:${server.address().port}/`;

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: existsSync(chrome) ? chrome : undefined, args: ["--use-angle=metal", "--enable-gpu"] });
try {
  for (const [world, slug] of slugs.entries()) {
    if (only !== undefined && Number(only) !== world) continue;
    for (const [view, [width, height]] of Object.entries(views)) {
      const w = Math.round(width * supersample), h = Math.round(height * supersample);
      const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
      const errors = []; page.on("pageerror", error => errors.push(error.message)); page.on("console", message => message.type() === "error" && errors.push(message.text()));
      await page.goto(`${base}?world=${world}&view=${view}&w=${w}&h=${h}`);
      const stats = await page.waitForFunction(() => window.__done, null, { timeout: 120000 }).then(handle => handle.jsonValue()).catch(() => null);
      if (!stats) throw new Error(`${slug}/${view} did not render: ${errors.join("; ")}`);
      const data = await page.evaluate(() => document.querySelector("canvas").toDataURL("image/png"));
      const file = `${out}/${slug}-${view}.webp`;
      const info = await sharp(Buffer.from(data.split(",")[1], "base64")).resize(width, height, { kernel: "lanczos3" }).webp({ quality: 80, effort: 6 }).toFile(file);
      console.log(`${file} ${info.width}x${info.height} ${info.size} bytes, ${stats.triangles} triangles, ${stats.calls} draw calls`);
      await page.close();
    }
  }
} finally { await browser.close(); server.close(); }

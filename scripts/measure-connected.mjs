import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: existsSync(chrome) ? chrome : undefined });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.addInitScript(() => sessionStorage.setItem("anvaya-intention-intro", "1"));
try {
  await page.goto(process.argv[2] || "http://localhost:3000", { waitUntil: "networkidle" });
  await page.locator('[data-scene="ready"]').waitFor();
  const result = await page.evaluate(async () => {
    const scene = document.querySelector(".live-scene");
    const canvas = scene.querySelector("canvas");
    const gl = canvas.getContext("webgl2");
    const extension = gl.getExtension("WEBGL_debug_renderer_info");
    await new Promise(resolve => setTimeout(resolve, 5000));
    const intervals = []; let previous = performance.now(); const started = previous;
    await new Promise(resolve => {
      const sample = now => { intervals.push(now - previous); previous = now; if (now - started < 20000) requestAnimationFrame(sample); else resolve(); };
      requestAnimationFrame(sample);
    });
    const sorted = intervals.slice(1).sort((a,b) => a-b);
    return { timestamp: new Date().toISOString(), viewport: [innerWidth, innerHeight], browser: navigator.userAgent, gpu: extension ? gl.getParameter(extension.UNMASKED_RENDERER_WEBGL) : "unavailable", scene: { ...scene.dataset }, warmupMs: 5000, sampleMs: 20000, frames: sorted.length, medianMs: sorted[Math.floor(sorted.length * .5)], p95Ms: sorted[Math.floor(sorted.length * .95)], note: "Browser animation-frame cadence during the SVG thread animation. The architectural Three.js scene renders on initial load and resize only; these are not per-frame GPU render timings or physical-phone measurements." };
  });
  mkdirSync("test-results/connected-studio", { recursive: true });
  writeFileSync("test-results/connected-studio/performance.json", JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
} finally { await browser.close(); }

import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const root = process.argv[2] || "http://localhost:3000";
const posters = process.argv.includes("--posters");
const folder = "test-results/connected-studio";
mkdirSync(folder, { recursive: true });
if (posters) mkdirSync("public/art", { recursive: true });
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({ executablePath: existsSync(chrome) ? chrome : undefined });
const report = [];
try {
  for (const [name, width, height] of [["desktop",1440,1000],["tablet",1024,768],["mobile",390,844],["narrow",320,740]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.addInitScript(() => sessionStorage.setItem("anvaya-intention-intro", "1"));
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(root, { waitUntil: "networkidle" });
    await page.locator('[data-scene="ready"]').waitFor({ timeout: 30000 });
    await page.getByRole("button", { name: "Pause thread" }).click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${folder}/home-${name}.png` });
    await page.screenshot({ path: `${folder}/home-${name}-full.png`, fullPage: true });
    if (posters && ["desktop", "mobile"].includes(name)) {
      await page.addStyleTag({ content: ".site-header,.hero-content,.hero-thread,.hero-shade{visibility:hidden!important}.hero-art{mask-image:none!important}" });
      const png = await page.locator(".live-scene canvas").screenshot();
      await sharp(png).webp({ quality: 85 }).toFile(`public/art/anvaya-aperture-${name}.webp`);
    }
    report.push({ name, width, height, errors, ...await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, scene: document.querySelector(".live-scene")?.dataset })) });
    for (const [slug, path] of [["services","/services"],["presence","/services/digital-presence"],["products","/services/digital-products"],["operations","/services/intelligent-operations"],["spatial","/services/spatial-visuals"],["studio","/studio"],["project","/project"]]) {
      await page.goto(`${root}${path}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${folder}/${slug}-${name}.png` });
      await page.screenshot({ path: `${folder}/${slug}-${name}-full.png`, fullPage: true });
      report.push({ name: `${slug}-${name}`, width, height, errors: [...errors], ...await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth })) });
    }
    await page.close();
  }
} finally { await browser.close(); }
writeFileSync(`${folder}/report.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));

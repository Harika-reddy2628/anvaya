import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.addInitScript(() => sessionStorage.setItem("anvaya-intention-intro", "1")); });
test("hero has a local matching poster and a usable scene or fallback", async ({ page }) => {
  const requests: string[] = []; page.on("request", r => requests.push(r.url()));
  await page.goto("/");
  await expect(page.locator(".hero-poster img")).toBeVisible();
  await expect.poll(() => page.locator(".hero-poster img").evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0)).toBeTruthy();
  if (test.info().project.name === "reduced-motion") await expect(page.locator(".live-scene")).toHaveCount(0);
  else {
    await expect(page.locator(".live-scene")).toHaveAttribute("data-scene", /ready|failed/);
    if (await page.locator(".live-scene").getAttribute("data-scene") === "ready") await expect(page.locator(".live-scene canvas")).toBeVisible();
  }
  await expect(page.locator(".hero").getByRole("link", { name: "Start a Project" })).toBeVisible();
  expect(requests.some(url => /lotus|palash|water/.test(url))).toBeFalsy();
});
test("thread pauses and a live reduced-motion change removes animated rendering", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause thread" }); await pause.click();
  await expect(page.getByRole("button", { name: "Resume thread" })).toHaveAttribute("aria-pressed", "true");
  const point = page.locator(".hero-thread circle"); const before = await point.getAttribute("cx");
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  expect(await point.getAttribute("cx")).toBe(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".live-scene")).toHaveCount(0); await expect(page.getByRole("button", { name: /thread/ })).toHaveCount(0);
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click(); await expect(page).toHaveURL(/\/project$/);
});
test("WebGL failure keeps content and project navigation available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) { if (/webgl/i.test(type)) return null; return Reflect.apply(original, this, [type, ...args]); } as typeof original; });
  await page.goto("/"); await expect(page.locator(".live-scene")).toHaveAttribute("data-scene", "failed");
  await expect(page.locator(".hero-poster img")).toBeVisible();
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click(); await expect(page).toHaveURL(/\/project$/);
});
test("server-rendered content works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:3107" }); const page = await context.newPage();
  await page.goto("/"); await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".intro-screen")).toBeHidden(); await expect(page.locator(".hero-poster img")).toBeVisible();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("The right work rarely sits in one box."); await context.close();
});
test("unavailable artwork never blocks the main message or enquiry action", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route(/\/_next\/image\?/, route => route.abort());
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".live-scene")).toHaveCount(0);
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click();
  await expect(page).toHaveURL(/\/project$/);
});

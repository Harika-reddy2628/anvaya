import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => { await page.addInitScript(() => sessionStorage.setItem("anvaya-intention-intro", "1")); });
test("hero loads no images and shows a live scene or its CSS fallback", async ({ page }) => {
  const requests: string[] = []; page.on("request", r => requests.push(r.url()));
  await page.goto("/");
  await expect(page.locator(".hero-fallback")).toHaveCount(1);
  expect(await page.locator("main img").count()).toBe(0);
  if (test.info().project.name === "reduced-motion") await expect(page.locator(".live-scene")).toHaveCount(0);
  else {
    await expect(page.locator(".live-scene")).toHaveAttribute("data-scene", /ready|failed/);
    if (await page.locator(".live-scene").getAttribute("data-scene") === "ready") await expect(page.locator(".live-scene canvas")).toBeVisible();
  }
  await expect(page.locator(".hero").getByRole("link", { name: "Start a Project" })).toBeVisible();
  expect(requests.some(url => /\.(webp|png|jpe?g|avif)(\?|$)|_next\/image/.test(url))).toBeFalsy();
});
test("a live reduced-motion change removes animated rendering", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  await expect(page.locator(".live-scene")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".live-scene")).toHaveCount(0);
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click(); await expect(page).toHaveURL(/\/project$/);
});
test("the studio clock shows India time and never blocks the headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-clock time")).toHaveText(/^\d{2}:\d{2}$/);
  await expect(page.locator(".hero-clock")).toContainText("IST");
});
test("WebGL failure keeps content and project navigation available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) { if (/webgl/i.test(type)) return null; return Reflect.apply(original, this, [type, ...args]); } as typeof original; });
  await page.goto("/"); await expect(page.locator(".live-scene")).toHaveAttribute("data-scene", "failed");
  await expect(page.locator(".hero-fallback")).toBeVisible();
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click(); await expect(page).toHaveURL(/\/project$/);
});
test("server-rendered content works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:3107" }); const page = await context.newPage();
  await page.goto("/"); await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".intro-screen")).toBeHidden(); await expect(page.locator(".hero-fallback")).toBeVisible();
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

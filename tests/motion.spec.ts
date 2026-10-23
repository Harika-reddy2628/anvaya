import { expect, test } from "@playwright/test";
const skipIntro = () => sessionStorage.setItem("anvaya-intention-intro", "1");

test("the loading transition draws the Anvaya mark and releases the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Preparing the Anvaya experience" });
  await expect(intro.locator(".logo-mark")).toBeVisible();
  await expect(intro.locator(".intro-letter")).toHaveCount(6);
  await expect(intro).toBeHidden({ timeout: 2900 });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
});

test("the header and footer carry the logo mark and the favicon is the mark", async ({ page, request }) => {
  await page.addInitScript(skipIntro); await page.goto("/studio");
  await expect(page.locator("header .brand .logo-mark")).toBeVisible();
  await expect(page.locator("footer .footer-mark")).toHaveCount(1);
  const icon = await request.get("/icon.svg"); expect(await icon.text()).toContain("#c4673f");
});

test("route curtains navigate with history intact and never stay over the page", async ({ page }) => {
  test.skip(test.info().project.name === "reduced-motion", "curtains are disabled for reduced motion");
  await page.addInitScript(skipIntro); await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion/);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Studio" }).click();
  await expect(page).toHaveURL(/\/studio$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Connection, with intent.");
  await expect(page.locator(".page-curtain")).toHaveCSS("visibility", "hidden", { timeout: 4000 });
  await page.goBack(); await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("reduced motion removes smooth scrolling, cursor, curtains and pinning", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.addInitScript(skipIntro); await page.goto("/");
  await expect(page.locator("html")).not.toHaveClass(/motion|lenis|has-cursor/);
  await expect(page.locator(".cursor")).toBeHidden(); await expect(page.locator(".page-curtain")).toBeHidden();
  await expect(page.locator(".process-section")).not.toHaveClass(/is-horizontal/);
  await page.locator(".hero").getByRole("link", { name: "Start a Project" }).click(); await expect(page).toHaveURL(/\/project$/);
});

test("How We Work pins horizontally only on wide screens with motion", async ({ page }) => {
  await page.addInitScript(skipIntro); await page.goto("/");
  const wide = test.info().project.name.endsWith("desktop");
  await page.locator(".process-section").scrollIntoViewIfNeeded();
  if (wide) await expect(page.locator(".process-section")).toHaveClass(/is-horizontal/);
  else await expect(page.locator(".process-section")).not.toHaveClass(/is-horizontal/);
  await expect(page.getByRole("heading", { name: "Clear before clever." })).toBeVisible();
});

test("content stays visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:3107" }); const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("header .logo-mark")).toBeVisible();
  for (const selector of [".hero-line > span", ".point-section .section-copy p", ".step-list li", ".service-block"]) {
    expect(await page.locator(selector).first().evaluate(e => getComputedStyle(e).opacity)).toBe("1");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await context.close();
});

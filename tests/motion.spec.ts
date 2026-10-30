import { expect, test } from "@playwright/test";
const skipIntro = () => sessionStorage.setItem("anvaya-intention-intro", "1");

test("the loading transition reveals the Anvaya title and releases the page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Preparing the Anvaya experience" });
  await expect(intro.locator(".wordmark")).toBeVisible();
  await expect(intro.locator(".intro-line-1")).toContainText("Step into");
  await expect(intro.locator(".intro-line-1")).toContainText("Anvaya");
  await expect(intro.locator(".intro-butterfly")).toBeAttached();
  await expect(intro).toBeHidden({ timeout: 4600 });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
});

test("the header and footer carry the wordmark and the favicon is the mark", async ({ page, request }) => {
  await page.addInitScript(skipIntro); await page.goto("/studio");
  await expect(page.locator("header .brand .wordmark")).toBeVisible();
  await expect(page.locator("footer .footer-word")).toHaveCount(1);
  const icon = await request.get("/icon.svg"); expect(await icon.text()).toContain("#4fb8ff");
});

test("route curtains navigate with history intact and never stay over the page", async ({ page }) => {
  test.skip(test.info().project.name === "reduced-motion", "curtains are disabled for reduced motion");
  await page.addInitScript(skipIntro); await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion/);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).click();
  // Under software rendering the home page's 3D runs slowly until it falls back, so allow for a slow transition.
  await expect(page).toHaveURL(/\/studio$/, { timeout: 10_000 });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("About Anvaya.");
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

test("How We Work lays out four steps without pinning", async ({ page }) => {
  await page.addInitScript(skipIntro); await page.goto("/");
  await page.locator(".process-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".process-section")).not.toHaveClass(/is-horizontal/);
  await expect(page.locator(".process-section .step-list li")).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "How we work." })).toBeVisible();
});

test("content stays visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL: "http://127.0.0.1:3107" }); const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("header .wordmark")).toBeVisible();
  for (const selector of [".hero-line > span", ".step-list li", ".plan-card", "#reviews .section-heading", ".service-rows > li", ".faq-item"]) {
    expect(await page.locator(selector).first().evaluate(e => getComputedStyle(e).opacity)).toBe("1");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await context.close();
});

import { expect, test } from "@playwright/test";
test("intro is skippable, restores focus and never repeats within the session", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Preparing the Anvaya experience" }); await expect(intro).toBeVisible();
  await page.getByRole("button", { name: "Skip intro" }).click(); await expect(intro).toBeHidden();
  await expect(page.locator("main")).toBeFocused(); expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await page.reload(); await expect(intro).toBeHidden();
});
test("intro completes in under three seconds after it starts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/");
  const intro = page.getByRole("dialog", { name: "Preparing the Anvaya experience" }); await expect(intro).toBeVisible();
  await expect(intro).toBeHidden({ timeout: 2900 });
  expect(await page.evaluate(() => document.querySelector("main")?.closest("[inert]"))).toBeNull();
});
test("reduced motion, deep links and inner pages bypass the intro", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" }); await page.goto("/"); await expect(page.locator(".intro-screen")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" }); await page.goto("/#what-we-build"); await expect(page.locator(".intro-screen")).toBeHidden();
  await page.goto("/project"); await expect(page.locator(".intro-screen")).toBeHidden(); await expect(page.locator("#name")).toBeEditable();
});

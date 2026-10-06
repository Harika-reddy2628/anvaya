import { expect, test } from "@playwright/test";

test("content and project action are available immediately without an opening overlay", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-studio-intro], [inert]")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page.locator("header").getByRole("link", { name: "Start a project", exact: true }).click();
  await expect(page).toHaveURL(/\/project$/);
  await expect(page.getByRole("button", { name: "Prepare brief" })).toBeVisible();
});

test("skip link reaches the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("direct section links reach the local brief", async ({ page }) => {
  await page.goto("/#project");
  await expect(page.getByRole("button", { name: "Prepare brief" })).toBeInViewport();
  await expect(page.locator("[inert]")).toHaveCount(0);
});

test("storage restrictions cannot trap the page", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One restricted-storage check is sufficient");
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() { throw new DOMException("Storage unavailable", "SecurityError"); },
    });
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Explore our work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("[inert]")).toHaveCount(0);
});

test("server content and links remain usable without JavaScript", async ({ browser }, testInfo) => {
  test.skip(!["desktop", "webkit-desktop"].includes(testInfo.project.name), "Desktop engines cover static rendering");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3107/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ambitious ideas.");
  await expect(page.locator("[inert]")).toHaveCount(0);
  await page.getByRole("link", { name: "Explore our work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await page.locator("header").getByRole("link", { name: "Start a project", exact: true }).click();
  await expect(page).toHaveURL(/\/project$/);
  await context.close();
});

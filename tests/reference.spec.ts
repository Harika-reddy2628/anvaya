import { expect, test } from "@playwright/test";
const pages = [
  ["/", "MAKE.MOVE.MATTER."],
  ["/services", "The right work rarely sits in one box."],
  ["/services/digital-presence", "Make the first impression useful."],
  ["/services/digital-products", "Turn a complex idea into something people can use."],
  ["/services/intelligent-operations", "Make repeated work move with more clarity."],
  ["/services/spatial-visuals", "Make the unbuilt feel understandable."],
  ["/studio", "Connection, with intent."],
  ["/project", "What are you trying to move?"],
];
test.beforeEach(async ({ page }) => { await page.addInitScript(() => sessionStorage.setItem("anvaya-intention-intro", "1")); });
for (const [path, title] of pages) {
  test(`launch page ${path} has readable content and navigation`, async ({ page }) => {
    const errors: string[] = []; page.on("pageerror", e => errors.push(e.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav.getByRole("link", { name: "Services", exact: true })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Studio", exact: true })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Start a Project" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Home", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /menu|navigation/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Work", exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}
test("legacy service URLs resolve to named practices and Work stays unpublished", async ({ page }) => {
  for (const [old, next] of [["interface","digital-presence"],["product","digital-products"],["automation","intelligent-operations"],["spatial","spatial-visuals"]]) {
    await page.goto(`/services/${old}`); await expect(page).toHaveURL(new RegExp(`/services/${next}$`));
  }
  await page.goto("/about"); await expect(page).toHaveURL(/\/studio$/);
  for (const path of ["/work", "/work/oppy", "/not-a-page"]) {
    const response = await page.goto(path); expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("This page has not found its connection yet.");
    await expect(page.getByRole("link", { name: "Go Home" })).toBeVisible();
  }
});
test("native navigation, history, skip link and anchors remain usable", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab"); await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter"); await expect(page.locator("main")).toBeFocused();
  await page.getByRole("link", { name: "Explore what we build" }).click();
  await expect(page).toHaveURL(/#what-we-build$/);
  expect(await page.locator("#what-we-build").evaluate(e => Math.abs(e.getBoundingClientRect().top) < 140)).toBeTruthy();
  await page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Studio", exact: true }).click();
  await expect(page).toHaveURL(/\/studio$/); await page.goBack(); await expect(page).toHaveURL(/#what-we-build$/);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
});
test("service worlds have keyboard and touch equivalents", async ({ page }) => {
  await page.goto("/"); const tabs = page.getByRole("tablist", { name: "Four connected practices" });
  await tabs.getByRole("tab").first().focus(); await page.keyboard.press("ArrowDown");
  await expect(tabs.getByRole("tab").nth(1)).toBeFocused();
  await expect(tabs.getByRole("tab").nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
  await tabs.getByRole("tab").nth(3).click();
  await page.getByRole("tabpanel").getByRole("link", { name: "Explore Spatial Visuals" }).click();
  await expect(page).toHaveURL(/\/services\/spatial-visuals$/);
  await page.getByRole("link", { name: "Visualise a space" }).click();
  await expect(page.getByRole("checkbox", { name: "Spatial Visuals", exact: true })).toBeChecked();
});
test("legal pages remain readable and narrow layouts do not overflow", async ({ page }) => {
  for (const path of ["/privacy", "/terms"]) { expect((await page.goto(path))?.status()).toBe(200); await expect(page.getByRole("heading", { level: 1 })).toBeVisible(); }
  for (const width of [320, 390, 1024]) {
    await page.setViewportSize({ width, height: 740 });
    for (const path of ["/", "/services", "/studio", "/project", "/services/intelligent-operations"]) {
      await page.goto(path); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBeTruthy();
    }
  }
});

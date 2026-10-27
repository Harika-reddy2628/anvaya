import { expect, test } from "@playwright/test";
const pages = [
  ["/", "Ambitious ideas. Built to last."],
  ["/services", "The right work rarely sits in one box."],
  ["/services/digital-presence", "Make the first impression useful."],
  ["/services/digital-products", "Turn a complex idea into something people can use."],
  ["/services/intelligent-operations", "Make repeated work move with more clarity."],
  ["/services/spatial-visuals", "Make the unbuilt feel understandable."],
  ["/studio", "Connection, with intent."],
  ["/project", "What are you trying to move?"],
  ["/work", "Work you can walk through."],
  ["/pricing", "Scoped to the outcome, not a package."],
  ["/blog", "Notes from the studio."],
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
    for (const name of ["Works", "About", "Pricing", "Services", "Blog"]) await expect(nav.getByRole("link", { name, exact: true })).toBeVisible();
    await expect(nav.getByRole("button", { name: /Pages/ })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Start a Project" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Home", exact: true })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /menu|navigation/i })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}
test("legacy service URLs resolve to named practices and unpublished case studies stay hidden", async ({ page }) => {
  for (const [old, next] of [["interface","digital-presence"],["product","digital-products"],["automation","intelligent-operations"],["spatial","spatial-visuals"]]) {
    await page.goto(`/services/${old}`); await expect(page).toHaveURL(new RegExp(`/services/${next}$`));
  }
  await page.goto("/about"); await expect(page).toHaveURL(/\/studio$/);
  for (const path of ["/work/oppy", "/not-a-page"]) {
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
test("practice cards, questions and enquiry seeds work by keyboard and pointer", async ({ page }) => {
  await page.goto("/");
  const question = page.locator(".faq-item summary").first();
  await question.focus(); await page.keyboard.press("Enter");
  await expect(page.locator(".faq-item").first()).toHaveAttribute("open", "");
  await expect(page.locator(".faq-answer").first()).toContainText("Digital Presence and Spatial Visuals are available");
  // The home dial shows one service at a time, so follow the practice link from Services.
  await page.goto("/services");
  await page.getByRole("link", { name: "Explore Spatial Visuals", exact: true }).first().click();
  await expect(page).toHaveURL(/\/services\/spatial-visuals$/);
  await page.getByRole("link", { name: "Visualise a space" }).click();
  await expect(page.getByRole("checkbox", { name: "Spatial Visuals", exact: true })).toBeChecked();
});
test("coming-soon labels appear in listings, cards and practice pages", async ({ page }) => {
  const upcoming = [["Digital Products", "digital-products"], ["Intelligent Operations", "intelligent-operations"]];
  for (const path of ["/", "/services"]) {
    await page.goto(path);
    // Home lists practices as large rows; Services keeps the stacked blocks.
    const card = path === "/" ? ".service-rows > li" : ".service-block";
    for (const [name, slug] of upcoming) {
      const heading = path === "/" ? name : `${name} Coming soon`;
      const title = path === "/" ? page.locator("h3", { hasText: new RegExp(`^${heading}$`) }) : page.getByRole("heading", { name: heading, exact: true });
      const block = page.locator(card).filter({ has: title });
      // On wide screens with motion the services dial shows one service at a time, so the others are present but hidden.
      if (path === "/") await expect(block.getByText("Coming soon", { exact: true })).toBeAttached();
      else await expect(block.getByText("Coming soon", { exact: true })).toBeVisible();
      const preview = path === "/" ? block.locator(`a[aria-label="Preview ${name} — Coming soon"]`) : block.getByRole("link", { name: `Preview ${name}`, exact: true });
      await expect(preview).toHaveAttribute("href", `/services/${slug}`);
    }
    for (const name of ["Digital Presence", "Spatial Visuals"]) {
      const block = page.locator(card).filter({ has: path === "/" ? page.locator("h3", { hasText: new RegExp(`^${name}$`) }) : page.getByRole("heading", { name, exact: true }) });
      await expect(block.getByText("Coming soon", { exact: true })).toHaveCount(0);
    }
  }
  for (const [name, slug] of upcoming) {
    await page.goto(`/services/${slug}`);
    await expect(page).toHaveTitle(new RegExp(`${name} — Coming soon`));
    await expect(page.locator(".page-hero").getByText("Coming soon", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore available practices", exact: true })).toHaveCount(3);
    await expect(page.locator('a[href^="/project?service="]')).toHaveCount(0);
    await page.getByRole("link", { name: "Explore available practices", exact: true }).first().click();
    await expect(page).toHaveURL(/\/services#practices$/);
  }
});
test("legal pages remain readable and narrow layouts do not overflow", async ({ page }) => {
  for (const path of ["/privacy", "/terms"]) { expect((await page.goto(path))?.status()).toBe(200); await expect(page.getByRole("heading", { level: 1 })).toBeVisible(); }
  for (const width of [320, 390, 1024]) {
    await page.setViewportSize({ width, height: 740 });
    for (const path of ["/", "/services", "/studio", "/project", "/services/digital-products", "/services/intelligent-operations"]) {
      await page.goto(path); expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBeTruthy();
    }
  }
});

test("the Pages menu lists every page and closes on Escape", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: /Pages/ });
  await toggle.click(); await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator("#pages-menu");
  for (const name of ["Home", "Works", "Pricing", "Blog", "Spatial Visuals", "Privacy", "Terms"]) await expect(menu.getByRole("link", { name, exact: true })).toBeVisible();
  await page.keyboard.press("Escape"); await expect(menu).toBeHidden(); await expect(toggle).toBeFocused();
  await toggle.click(); await menu.getByRole("link", { name: "Pricing", exact: true }).click();
  await expect(page).toHaveURL(/\/pricing$/); await expect(menu).toBeHidden();
});
test("Works shows the West Road walkthrough and links it from Spatial Visuals", async ({ page }) => {
  await page.goto("/services/spatial-visuals");
  await expect(page.getByRole("heading", { name: "West Road Residence." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the full walkthrough" })).toHaveAttribute("href", "https://anvaya-westroad-tour.vercel.app/");
  await page.getByRole("button", { name: "Walk through it here" }).click();
  await expect(page.locator("iframe[title^='West Road']")).toHaveAttribute("src", "https://anvaya-westroad-tour.vercel.app/");
  await page.getByRole("link", { name: "Project details" }).click();
  await expect(page).toHaveURL(/\/work#west-road$/);
  await expect(page.getByRole("heading", { name: "West Road Residence." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open the full walkthrough" })).toHaveAttribute("href", "https://anvaya-westroad-tour.vercel.app/");
});

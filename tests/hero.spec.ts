import { expect, test } from "@playwright/test";

test("dreamy hero retains readable HTML and responsive original artwork", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const modelRequests: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (request.url().includes("palash")) modelRequests.push(request.url());
  });
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("#hero-heading")).toContainText(
    "Considered engineering.",
  );
  const hero = page.locator("[data-cinematic-hero]");
  await expect(hero).toContainText("founders and CTOs");
  await expect(page.locator("[data-hero-poster] img")).toHaveJSProperty(
    "naturalWidth",
    testInfo.project.name === "mobile" ? 720 : 1672,
  );
  if (testInfo.project.name === "desktop") {
    await expect(hero.locator("[data-water-canvas]")).toHaveCount(1);
    await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
      "data-state",
      "live",
    );
  } else {
    await expect(page.locator("[data-water-canvas]")).toHaveCount(0);
  }
  await expect(page.locator("[data-hero-word]").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.waitForTimeout(1900);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await page.screenshot({ path: testInfo.outputPath("dreamy-lotus-hero.png") });
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  expect(modelRequests).toEqual([]);
  expect(errors).toEqual([]);
});

test("missing background leaves the ivory hero and project action usable", async ({
  page,
}) => {
  await page.route("**/art/dreamy-lotus-*.webp", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-cinematic-hero]")).toHaveCSS(
    "background-color",
    "rgb(248, 244, 238)",
  );
  await expect(page.locator("#hero-heading")).toBeVisible();
  await page
    .locator("[data-cinematic-hero]")
    .getByRole("link", { name: "Start a project", exact: true })
    .click();
  await expect(page).toHaveURL(/\/project$/);
  await expect(
    page.getByRole("button", { name: "Create project brief" }),
  ).toBeVisible();
});

test("missing WebGL does not affect the botanical hero", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop covers graphics availability",
  );
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      kind: string,
      options?: unknown,
    ) {
      if (kind === "webgl" || kind === "webgl2") return null;
      return original.call(this, kind, options);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-poster] img")).toHaveJSProperty(
    "naturalWidth",
    1672,
  );
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "poster",
  );
  await expect(page.locator("#hero-heading")).toBeVisible();
});

test("late artwork never replays the headline or traps navigation", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One controlled image delay is sufficient",
  );
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/art/dreamy-lotus-desktop.webp", async (route) => {
    await pending;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-word]").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator("[data-hero-poster] img")).toHaveJSProperty(
    "naturalWidth",
    0,
  );
  release();
  await expect(page.locator("[data-hero-poster] img")).toHaveJSProperty(
    "naturalWidth",
    1672,
  );
  await expect(page.locator("[data-hero-word]").last()).toHaveCSS(
    "opacity",
    "1",
  );
  await page
    .locator("header")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator("[data-hero-motion]")).toHaveCount(0);
  await page.locator("header .brand").click();
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-poster] img")).toHaveJSProperty(
    "naturalWidth",
    1672,
  );
});

test("changed motion preference restores static artwork and cleans up scroll drift", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop owns optional background drift",
  );
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-motion]")).toHaveCount(1);
  await page.waitForTimeout(1900);
  await page.evaluate(() => scrollTo(0, 300));
  await expect
    .poll(() =>
      page.locator("[data-hero-scene]").evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
      }),
    )
    .toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-hero-scene]")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator("[data-hero-poster] img")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator("#hero-heading")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("[data-hero-scene]")).toHaveCSS(
    "transform",
    "none",
  );
});

test("the botanical entrance settles instead of looping", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One animation lifecycle check is sufficient",
  );
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-motion]")).toHaveCount(1);
  await page.waitForTimeout(2100);
  const image = page.locator("[data-hero-poster] img");
  const settled = await image.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await page.waitForTimeout(400);
  expect(
    await image.evaluate((element) => getComputedStyle(element).transform),
  ).toBe(settled);
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  expect(
    await image.evaluate((element) => getComputedStyle(element).transform),
  ).toBe(settled);
});

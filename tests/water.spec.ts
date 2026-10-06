import { expect, test } from "@playwright/test";

test("water cursor refracts the background while text and navigation stay stable", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Only fine desktop pointers get the water cursor",
  );
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "live",
  );
  await page.waitForTimeout(2000);
  const heading = await page.locator("#hero-heading").boundingBox();
  await page.mouse.move(260, 580);
  await page.mouse.move(730, 620, { steps: 12 });
  await page.mouse.down();
  await page.mouse.up();
  await expect(page.locator("[data-water-cursor]")).toHaveCSS("opacity", "1");
  await expect
    .poll(() =>
      page.locator("[data-hero-surface]").evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none"
          ? 0
          : Math.abs(new DOMMatrixReadOnly(transform).m42);
      }),
    )
    .toBeGreaterThan(0.1);
  expect(await page.locator("#hero-heading").boundingBox()).toEqual(heading);
  expect(
    await page.evaluate(() => getComputedStyle(document.body).cursor),
  ).not.toBe("none");
  await page.screenshot({ path: testInfo.outputPath("water-cursor.png") });
  await page.mouse.move(750, 24);
  await expect(page.locator("[data-water-cursor]")).toHaveCSS("opacity", "0");
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  expect(errors).toEqual([]);
});

test("background motion pauses on request and releases resources offscreen", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop covers the optional shader lifecycle",
  );
  await page.addInitScript(() => {
    const state = window as unknown as { waterDraws: number };
    state.waterDraws = 0;
    const original = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (
      ...args: Parameters<typeof original>
    ) {
      if ((this.canvas as HTMLCanvasElement).hasAttribute("data-water-canvas"))
        state.waterDraws += 1;
      return original.apply(this, args);
    };
  });
  const count = () =>
    page.evaluate(
      () => (window as unknown as { waterDraws: number }).waterDraws,
    );
  await page.goto("/");
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "live",
  );
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await page.waitForTimeout(2100);
  const before = await count();
  await page.waitForTimeout(300);
  expect(await count()).toBeGreaterThan(before);
  await page.getByRole("button", { name: "Pause background motion" }).click();
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-motion",
    "paused",
  );
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "poster",
  );
  const stopped = await count();
  await page.waitForTimeout(400);
  expect(await count()).toBe(stopped);
  await expect(page.locator("[data-hero-drift]")).toHaveCSS(
    "transform",
    "none",
  );
  await page.getByRole("button", { name: "Resume background motion" }).click();
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "live",
  );
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const offscreen = await count();
  await page.waitForTimeout(400);
  expect(await count()).toBe(offscreen);
  await page
    .locator("header")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page.locator("[data-water-canvas]")).toHaveCount(0);
  await page.waitForTimeout(300);
  expect(await count()).toBe(offscreen);
});

test("context loss restores the original picture and motion preferences remove water", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop covers the graphics failure path",
  );
  await page.goto("/");
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "live",
  );
  await page.locator("[data-water-canvas]").evaluate((canvas) => {
    (canvas as HTMLCanvasElement)
      .getContext("webgl2")
      ?.getExtension("WEBGL_lose_context")
      ?.loseContext();
  });
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "poster",
  );
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-water-canvas]")).toBeHidden();
  await expect(page.locator("[data-hero-drift]")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator("[data-hero-surface]")).toHaveCSS(
    "transform",
    "none",
  );
  await expect(page.locator("[data-hero-motion-toggle]")).toBeHidden();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("[data-hero-motion]")).toHaveAttribute(
    "data-state",
    "live",
  );
});

test("touch and reduced-motion views keep the native cursor and readable artwork", async ({
  page,
}, testInfo) => {
  test.skip(
    ["desktop", "webkit-desktop"].includes(testInfo.project.name),
    "Non-desktop presentations cover this fallback",
  );
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-water-canvas]")).toBeHidden();
  await expect(page.locator("[data-water-cursor]")).toBeHidden();
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
  if (testInfo.project.name.includes("mobile")) {
    await page.getByRole("button", { name: "Pause background motion" }).tap();
    await expect(page.locator("[data-hero-drift]")).toHaveCSS(
      "transform",
      "none",
    );
    await page.getByRole("button", { name: "Resume background motion" }).tap();
  } else {
    await expect(page.locator("[data-hero-motion-toggle]")).toBeHidden();
    await expect(page.locator("[data-hero-drift]")).toHaveCSS(
      "transform",
      "none",
    );
  }
});

import { expect, test } from "@playwright/test";

test("Bellhop-inspired monogram cycles type styles while staying centered", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "reduced-motion",
    "The decorative type sequence is bypassed for reduced motion",
  );
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeVisible();
  await expect(page.locator("[data-intro-monogram]")).toHaveText([
    "A.",
    "A.",
    "A.",
    "A.",
  ]);
  const samples = await page.evaluate(async () => {
    const overlay = document.querySelector<HTMLElement>("[data-studio-intro]")!;
    const identity = overlay.querySelector<HTMLElement>(
      "[data-intro-identity]",
    )!;
    const rect = identity.getBoundingClientRect();
    const centerOffset = [
      Math.abs(rect.x + rect.width / 2 - innerWidth / 2),
      Math.abs(rect.y + rect.height / 2 - innerHeight / 2),
    ];
    const marks = Array.from(
      overlay.querySelectorAll<HTMLElement>("[data-intro-monogram]"),
    );
    const seen = new Set<string>();
    let maximumVisible = 0;
    const startedAt = performance.now();
    const deadline = startedAt + 3800;
    while (!overlay.hidden && performance.now() < deadline) {
      const visible = marks.filter(
        (mark) => Number(getComputedStyle(mark).opacity) > 0.9,
      );
      visible.forEach((mark) => seen.add(mark.dataset.introMonogram!));
      maximumVisible = Math.max(maximumVisible, visible.length);
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
    }
    return {
      seen: [...seen],
      maximumVisible,
      centerOffset,
      duration: performance.now() - startedAt,
    };
  });
  expect(samples.seen.length).toBeGreaterThanOrEqual(3);
  expect(samples.maximumVisible).toBe(1);
  expect(samples.duration).toBeGreaterThan(2600);
  samples.centerOffset.forEach((offset) => expect(offset).toBeLessThan(1));
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
});

test("intro completes, releases the page, and stays dismissed in this tab", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const intro = page.getByRole("dialog", {
    name: "Anvaya studio introduction",
  });
  if (testInfo.project.name !== "reduced-motion") {
    await expect(intro).toBeVisible();
    await expect(page.locator("[data-studio-content]")).toHaveAttribute(
      "inert",
      "",
    );
    await expect(page.locator("[data-intro-identity]")).toHaveCSS(
      "opacity",
      "1",
    );
    await expect(intro.locator("svg")).toHaveCount(1); // Only the functional Skip arrow.
    await expect(intro.locator("[data-intro-monogram]")).toHaveCount(4);
    await expect(intro.locator("[data-intro-progress]")).toHaveCount(0);
    await page.screenshot({ path: testInfo.outputPath("intro.png") });
  }
  await expect(page.locator("[data-studio-intro]")).toBeHidden({
    timeout: 6000,
  });
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
  await page.reload();
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await page
    .getByRole("link", { name: "Explore all projects", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await page.locator("header").getByRole("link").first().click();
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
  expect(errors).toEqual([]);
});

test("Skip intro and Escape restore keyboard access", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "reduced-motion",
    "The intro is bypassed for reduced motion",
  );
  await page.goto("/");
  const skip = page.getByRole("button", { name: "Skip intro" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await skip.click();
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
  await page.evaluate(() => sessionStorage.removeItem("anvaya-intro-seen-v4"));
  await page.reload();
  await expect(skip).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("direct section links bypass the intro", async ({ page }) => {
  await page.goto("/#project");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(
    page.getByRole("button", { name: "Create project brief" }),
  ).toBeVisible();
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
});

test("changing to reduced motion dismisses an active intro", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "reduced-motion",
    "Already bypassed on initial load",
  );
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Skip intro" })).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
});

test("storage restrictions cannot trap the page", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One restricted-storage check is sufficient",
  );
  await page.addInitScript(() => {
    Object.defineProperty(window, "sessionStorage", {
      get() {
        throw new DOMException("Storage unavailable", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
});

test("CSS fail-open releases the overlay when JavaScript bundles fail", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One bundle-failure check is sufficient",
  );
  await page.route("**/*.js", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden({
    timeout: 6000,
  });
  await expect(page.locator("[data-studio-content]")).not.toHaveAttribute(
    "inert",
    "",
  );
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
});

test("server content remains accessible without JavaScript", async ({
  browser,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One static rendering check is sufficient",
  );
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3107/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ambitious ideas.",
  );
  await page
    .getByRole("link", { name: "Explore our work", exact: true })
    .click();
  await expect(page).toHaveURL(/#work$/);
  await context.close();
});

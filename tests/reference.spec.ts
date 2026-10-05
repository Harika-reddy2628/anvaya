import { expect, test } from "@playwright/test";

test("reference typography, native pointer, and five work chapters", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  const fonts = await page.evaluate(() => ({
    heading: getComputedStyle(document.querySelector("h1")!).fontFamily,
    body: getComputedStyle(document.body).fontFamily,
    paper: getComputedStyle(document.body).backgroundColor,
    cursor: getComputedStyle(document.body).cursor,
    header: getComputedStyle(document.querySelector("header")!).position,
  }));
  expect(fonts.heading.toLowerCase()).toContain("cormorant");
  expect(fonts.body.toLowerCase()).toContain("inter");
  expect(fonts.paper).toBe("rgb(250, 245, 238)");
  expect(fonts.cursor).not.toBe("none");
  expect(fonts.header).toBe("fixed");
  await expect(page.locator("[data-work-chapter]")).toHaveCount(5);
  await expect(page.locator("header .brand")).toHaveText("ANVAYA.");
  await expect(page.locator("#hero-heading [data-hero-word]")).toHaveCount(4);
  await expect(page.locator(".connection-story")).toContainText(
    "One considered system",
  );
  const pinCount = await page.locator(".work-story .pin-spacer").count();
  expect(pinCount).toBe(testInfo.project.name === "desktop" ? 5 : 0);
  await page.locator("#services").scrollIntoViewIfNeeded();
  const tabs = page.getByRole("tablist", { name: "Choose your project goal" });
  await tabs.getByRole("tab").first().click();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab").nth(1)).toBeFocused();
  await expect(page.locator(".service-initial")).toHaveText("A");
  await expect(page.locator("#brief-service")).toHaveValue("automation");
  await expect(page.locator(".service-copy")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("outcome-panel.png") });
  await page.locator("#process").scrollIntoViewIfNeeded();
  const second = page.locator(".milestone").nth(1).locator("details");
  await second.locator("summary").click();
  await expect(second).toHaveAttribute("open", "");
  await expect(second).toContainText("working environment");
  await expect(page.locator("footer")).toHaveCSS(
    "background-color",
    "rgb(229, 218, 212)",
  );
  await page.locator("footer .footer-top .brand").scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("editorial-footer.png") });
  expect(errors).toEqual([]);
});

test("desktop work pins are released when motion is reduced or the viewport narrows", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "Desktop owns the optional work pinning",
  );
  await page.goto("/");
  await expect(page.locator(".work-story .pin-spacer")).toHaveCount(5);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".work-story .pin-spacer")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".work-story .pin-spacer")).toHaveCount(5);
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(page.locator(".work-story .pin-spacer")).toHaveCount(0);
  await page
    .locator("header")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
});

test("home and supporting pages fit narrow, tablet, and compact desktop widths", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "One cross-viewport sweep is sufficient",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/work",
      "/services/product",
      "/project",
      "/terms",
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect
        .poll(
          () =>
            page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          { message: `${path} fits ${width}px` },
        )
        .toBe(true);
    }
  }
});

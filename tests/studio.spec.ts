import { expect, test } from "@playwright/test";

test("homepage, spatial controls, and keyboard service selection", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Ambitious ideas.",
  );
  const demo = page.locator(".featured-work-grid .spatial-demo").first();
  await expect(page.locator("header .brand svg")).toHaveCount(0);
  await expect(page.locator("[data-seal-trace], [data-indic]")).toHaveCount(0);
  await expect(page.locator("#hero-heading")).toHaveCSS("font-weight", "400");
  await expect(page.locator("[data-hero-poster] img")).toBeVisible();
  await expect(
    page.locator(".featured-work-grid .work-title").first(),
  ).toContainText("Oppy CLI");
  await page.screenshot({ path: testInfo.outputPath("homepage.png") });
  if (testInfo.project.name === "mobile") {
    await page
      .locator("#hero-heading")
      .screenshot({ path: testInfo.outputPath("hero-type.png") });
  }
  await demo.getByRole("button", { name: "Plan", exact: true }).click();
  await expect(
    demo.getByRole("button", { name: "Plan", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(demo.getByRole("slider")).toBeDisabled();
  await demo.getByRole("button", { name: "Orbit", exact: true }).click();
  await expect(demo.getByRole("slider")).toBeEnabled();
  await demo.getByRole("button", { name: "Suite", exact: true }).click();
  await expect(demo.getByRole("img")).toHaveAttribute(
    "aria-label",
    /suite selected/,
  );
  const services = page.getByRole("tablist", {
    name: "Choose your project goal",
  });
  await services.getByRole("tab").first().click();
  await page.keyboard.press("ArrowDown");
  await expect(services.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.locator("#brief-service")).toHaveValue("automation");
  await expect(page.locator(".brief-summary")).toContainText("$1,500–$3,500");
  await page.getByRole("tab", { name: "Data", exact: true }).click();
  await expect(page.locator(".engineering-detail")).toContainText(
    "Where information becomes useful",
  );
  await page.locator(".faq-item").first().locator("summary").click();
  await expect(page.locator(".faq-item").first()).toHaveAttribute("open", "");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
  expect(errors).toEqual([]);
  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(page.locator(".service-explorer")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("services.png") });
  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await expect(page.locator(".price-card").last()).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath("pricing.png") });
  await page.locator("#studio").scrollIntoViewIfNeeded();
  await expect(page.locator(".studio-grid > div").first()).toHaveCSS(
    "opacity",
    "1",
  );
  await page.screenshot({ path: testInfo.outputPath("studio.png") });
  if (testInfo.project.name === "desktop") {
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
  }
});

test("brief validates, carries service context, and downloads without submitting", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") requests.push(request.url());
  });
  await page.goto("/project?service=spatial");
  await expect(page.locator("#brief-service")).toHaveValue("spatial");
  await page.getByRole("button", { name: "Create project brief" }).click();
  await expect(page.locator("#name-error")).toBeVisible();
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#goal-error")).toBeVisible();
  await page.getByLabel("Your name", { exact: false }).fill("Studio Client");
  await page.getByLabel("Email", { exact: false }).fill("client@example.com");
  await page
    .getByLabel("What would success look like?", { exact: false })
    .fill("An interactive product configurator for our furniture collection.");
  await page.getByRole("button", { name: "Create project brief" }).click();
  const result = page.getByRole("region", { name: "Prepared project brief" });
  await expect(result).toBeVisible();
  await expect(result).toContainText("It has not been submitted or sent.");
  await expect(result.locator("pre")).toContainText(
    "Spatial 3D & digital twins",
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download brief" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("anvaya-project-brief.txt");
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Edit details" }).click();
  await expect(page.getByLabel("Your name", { exact: false })).toHaveValue(
    "Studio Client",
  );
  await page.goto("/project?engagement=retainer");
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page.locator(".brief-summary")).toContainText(
    "$2,500–$4,500 / month",
  );
});

test("work filtering, case studies, and supporting routes", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".work-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Spatial 3D", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(2);
  await page.getByRole("link", { name: "Explore the project" }).first().click();
  await expect(page).toHaveURL(/\/work\/spatial-engine$/);
  await expect(page.locator(".evidence-note")).toContainText(
    "interactive illustration",
  );
  await page.getByRole("link", { name: "All work", exact: true }).click();
  await expect(page.locator(".work-card")).toHaveCount(6);
  for (const path of [
    "/services/product",
    "/services/automation",
    "/services/spatial",
    "/services/interface",
    "/privacy",
    "/terms",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  const response = await page.goto("/work/unknown-project");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("link", { name: "Back to Anvaya" }),
  ).toBeVisible();
});

test("mobile navigation opens, closes on Escape, and follows links", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Compact navigation is specific to mobile",
  );
  await page.goto("/");
  await expect(page.locator("[data-studio-intro]")).toBeHidden();
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Work", exact: true })
    .click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
});

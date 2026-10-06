import { expect, test } from "@playwright/test";

test("service selection stays synchronized when alternating between brief and explorer", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("tablist", { name: "Choose your project goal" });
  await page.locator("#brief-service").selectOption("spatial");
  await expect(tabs.getByRole("tab").nth(2)).toHaveAttribute("aria-selected", "true");
  await tabs.getByRole("tab").nth(1).click();
  await expect(page.locator("#brief-service")).toHaveValue("automation");
  await expect(page.locator(".brief-summary")).toContainText("$1,500–$3,500");
  await page.getByLabel("Your name", { exact: false }).fill("Test Client");
  await page.getByLabel("Email", { exact: false }).fill("client@example.com");
  await page.getByLabel("What would success look like?", { exact: false }).fill("Connect our internal documents and support workflow.");
  await page.getByRole("button", { name: "Prepare brief" }).click();
  await expect(page.getByRole("region", { name: "Prepared project brief" })).toBeVisible();
  await tabs.getByRole("tab").nth(0).click();
  await expect(page.locator("#brief-service")).toHaveValue("product");
  await expect(page.getByRole("region", { name: "Prepared project brief" })).toHaveCount(0);
  await page.getByRole("button", { name: "Prepare brief" }).click();
  await expect(page.getByRole("region", { name: "Prepared project brief" }).locator("pre")).toContainText("Service: Product engineering");
});

test("mobile text and navigation remain readable with a visible project action", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile engines cover compact typography");
  await page.goto("/");
  const action = page.locator("header").getByRole("link", { name: "Start a project", exact: true });
  await expect(action).toBeVisible();
  const rect = await action.boundingBox();
  expect(rect?.height).toBeGreaterThanOrEqual(44);
  const text = await page.locator("main").innerText();
  for (const joined of ["CTOs.Specialist", "project.Stay", "browseruntil"]) expect(text).not.toContain(joined);
  const sizes = await page.evaluate(() => ({
    heading: parseFloat(getComputedStyle(document.querySelector("h1")!).fontSize),
    body: parseFloat(getComputedStyle(document.body).fontSize),
    field: parseFloat(getComputedStyle(document.querySelector("input")!).fontSize),
  }));
  expect(sizes.heading).toBeGreaterThanOrEqual(42);
  expect(sizes.body).toBeGreaterThanOrEqual(16);
  expect(sizes.field).toBeGreaterThanOrEqual(16);
  const faq = page.locator(".faq-item").first();
  await expect(faq.locator("summary > svg")).toBeVisible();
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeVisible();
});

test("case studies expose a scannable narrative hierarchy", async ({ page }) => {
  await page.goto("/work/spatial-engine");
  for (const name of ["The problem", "Our approach", "The outcome"]) {
    await expect(page.getByRole("heading", { level: 2, name, exact: true })).toBeVisible();
  }
  await expect(page.locator(".case-narrative p")).toHaveCount(3);
  await expect(page.locator(".case-narrative code")).toHaveText("<anvaya-viewer>");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

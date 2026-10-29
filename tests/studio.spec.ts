import { expect, test, type Page } from "@playwright/test";
const cont = (page: Page) => page.getByRole("button", { name: "Continue" }).click();
const service = (page: Page, value: string) => page.locator(`input[name="services"][value="${value}"]`);
test("enquiry steps validate, preserve edits and report unsent state without configuration", async ({ page }) => {
  await page.goto("/project?service=spatial"); await expect(service(page, "spatial")).toBeChecked();
  await expect(page.getByText("Step 1 of 3")).toBeVisible();
  await cont(page);
  // Step 2 will not continue until the outcome is long enough, and says how much more is needed.
  await expect(page.getByRole("group", { name: "Tell us about the project." })).toBeVisible();
  await cont(page);
  await expect(page.locator("#outcome-error")).toBeVisible(); await expect(page.locator("#outcome")).toBeFocused();
  await page.getByRole("button", { name: "+ 3D renders of a building or interior" }).click();
  await expect(page.locator("#outcome")).toHaveValue("3D renders of a building or interior.");
  await page.getByRole("radio", { name: "In 1–3 months" }).check();
  await cont(page);
  await page.getByLabel("Your name", { exact: false }).fill("Studio Client");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator("#email-error")).toBeVisible(); await expect(page.locator("#email")).toBeFocused();
  await expect(page.locator("#name")).toHaveValue("Studio Client");
  await expect(page.locator(".form-summary")).toContainText("In 1–3 months");
  await page.getByLabel("Email", { exact: false }).fill("client@example.test");
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.locator(".form-status-error")).toContainText("Your enquiry has not been sent.");
  await expect(page.locator("#name")).toHaveValue("Studio Client");
  await expect(page.locator("#outcome")).toHaveValue("3D renders of a building or interior.");
  await expect(page.locator(".form-success")).toHaveCount(0);
  // Back keeps every answer.
  await page.getByRole("button", { name: "← Back" }).click();
  await expect(page.getByRole("radio", { name: "In 1–3 months" })).toBeChecked();
});
test("service combinations, route seeds and INR guidance remain consistent", async ({ page }) => {
  await page.goto("/project?service=digital-presence");
  await expect(service(page, "interface")).toBeChecked();
  await page.getByRole("checkbox", { name: /3D Renders & Walkthroughs/ }).check({ force: true });
  await expect(service(page, "interface")).toBeChecked(); await expect(service(page, "spatial")).toBeChecked();
  await page.getByRole("checkbox", { name: /Not sure yet/ }).check({ force: true });
  await expect(service(page, "interface")).not.toBeChecked(); await expect(service(page, "spatial")).not.toBeChecked();
  await cont(page);
  await expect(page.getByRole("radio", { name: "Need guidance" })).toBeChecked();
  await page.getByRole("radio", { name: /₹1.5–5 lakh/ }).check({ force: true });
  await expect(page.getByRole("radio", { name: /₹1.5–5 lakh/ })).toBeChecked();
  await page.goto("/project?service=unrecognised"); await expect(service(page, "unsure")).toBeChecked();
});
test("copy and download preserve a local brief without sending", async ({ page }) => {
  const posts: string[] = []; page.on("request", request => { if (request.method() === "POST") posts.push(request.url()); });
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("Unavailable"); } }, configurable: true }));
  await page.goto("/project?service=interface");
  await cont(page); await page.locator("#outcome").fill("A new website for our clinic."); await cont(page);
  await page.getByLabel("Your name", { exact: false }).fill("Studio Client");
  await page.getByRole("button", { name: "Copy brief", exact: true }).click();
  await expect(page.getByText("Clipboard is unavailable.", { exact: false })).toBeVisible();
  const download = page.waitForEvent("download"); await page.getByRole("button", { name: "Download brief" }).click();
  expect((await download).suggestedFilename()).toBe("anvaya-project-brief.txt");
  await expect(page.getByText("Brief downloaded. This does not send an enquiry.")).toBeVisible(); expect(posts).toEqual([]);
});
test("coming-soon services cannot be selected, including legacy and named enquiry seeds", async ({ page }) => {
  for (const seed of ["product", "digital-products", "automation", "intelligent-operations"]) {
    await page.goto(`/project?service=${seed}`);
    await expect(service(page, "product")).toBeDisabled(); await expect(service(page, "automation")).toBeDisabled();
    await expect(service(page, "product")).not.toBeChecked(); await expect(service(page, "automation")).not.toBeChecked();
    await expect(service(page, "unsure")).toBeChecked();
    await expect(page.locator("#services-help")).toContainText(`${seed === "product" || seed === "digital-products" ? "Apps & Software" : "AI & Automation"} is coming soon.`);
    await page.getByRole("checkbox", { name: /Websites & Branding/ }).check({ force: true });
    await expect(service(page, "interface")).toBeChecked();
  }
});
test("status pages: unknown URLs show a helpful 404 with working links", async ({ page }) => {
  const response = await page.goto("/services/not-a-service"); expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found.");
  await page.getByRole("navigation", { name: "Popular pages" }).getByRole("link", { name: "Websites & Branding" }).click();
  await expect(page).toHaveURL(/\/services\/digital-presence$/);
});

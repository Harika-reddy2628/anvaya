import { expect, test } from "@playwright/test";
test("enquiry validates, preserves edits and reports unsent state without configuration", async ({ page }) => {
  await page.goto("/project?service=spatial"); await expect(page.getByRole("checkbox", { name: "Spatial Visuals", exact: true })).toBeChecked();
  await page.getByLabel("Your name", { exact: false }).fill("Studio Client");
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.locator("#email-error")).toBeVisible(); await expect(page.locator("#email")).toBeFocused();
  await expect(page.locator("#name")).toHaveValue("Studio Client");
  await page.getByLabel("Email address", { exact: false }).fill("client@example.test");
  await page.getByLabel("What is the outcome", { exact: false }).fill("Make our interior plans clear before construction starts.");
  await page.getByRole("button", { name: "Send project enquiry" }).click();
  await expect(page.locator(".form-status-error")).toContainText("Your enquiry has not been sent.");
  await expect(page.locator("#name")).toHaveValue("Studio Client");
  await expect(page.locator("#outcome")).toHaveValue("Make our interior plans clear before construction starts.");
  await expect(page.getByText("Thank you — your note is with Anvaya.", { exact: false })).toHaveCount(0);
});
test("practice combinations, route seeds and INR guidance remain consistent", async ({ page }) => {
  await page.goto("/project?service=digital-presence");
  await expect(page.getByRole("checkbox", { name: "Digital Presence", exact: true })).toBeChecked();
  await page.getByRole("checkbox", { name: "Spatial Visuals", exact: true }).check();
  await expect(page.getByRole("checkbox", { name: "Digital Presence", exact: true })).toBeChecked();
  await page.getByRole("checkbox", { name: "Not sure yet", exact: true }).check();
  await expect(page.getByRole("checkbox", { name: "Digital Presence", exact: true })).not.toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Spatial Visuals", exact: true })).not.toBeChecked();
  await expect(page.locator("#budget")).toHaveValue("Need guidance");
  await page.locator("#budget").selectOption("₹1.5–₹5 lakh"); await expect(page.locator("#budget")).toHaveValue("₹1.5–₹5 lakh");
  await page.goto("/project?service=unrecognised"); await expect(page.getByRole("checkbox", { name: "Not sure yet" })).toBeChecked();
});
test("copy and download preserve a local brief without sending", async ({ page }) => {
  const posts: string[] = []; page.on("request", request => { if (request.method() === "POST") posts.push(request.url()); });
  await page.goto("/project?service=interface");
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => { throw new Error("Unavailable"); } }, configurable: true }));
  await page.reload(); await page.getByLabel("Your name", { exact: false }).fill("Studio Client");
  await page.getByRole("button", { name: "Copy brief", exact: true }).click();
  await expect(page.getByText("Clipboard is unavailable.", { exact: false })).toBeVisible();
  const download = page.waitForEvent("download"); await page.getByRole("button", { name: "Download brief" }).click();
  expect((await download).suggestedFilename()).toBe("anvaya-project-brief.txt");
  await expect(page.getByText("Brief downloaded. This does not send an enquiry.")).toBeVisible(); expect(posts).toEqual([]);
});
test("coming-soon practices cannot be selected, including legacy and named enquiry seeds", async ({ page }) => {
  for (const service of ["product", "digital-products", "automation", "intelligent-operations"]) {
    await page.goto(`/project?service=${service}`);
    await expect(page.getByRole("checkbox", { name: "Digital Products Coming soon", exact: true })).toBeDisabled();
    await expect(page.getByRole("checkbox", { name: "Intelligent Operations Coming soon", exact: true })).toBeDisabled();
    await expect(page.locator('input[value="product"]')).not.toBeChecked();
    await expect(page.locator('input[value="automation"]')).not.toBeChecked();
    await expect(page.getByRole("checkbox", { name: "Not sure yet", exact: true })).toBeChecked();
    await expect(page.locator("#services-help")).toContainText(`${service === "product" || service === "digital-products" ? "Digital Products" : "Intelligent Operations"} is coming soon.`);
    await page.getByRole("checkbox", { name: "Digital Presence", exact: true }).check();
    await expect(page.getByRole("checkbox", { name: "Digital Presence", exact: true })).toBeChecked();
  }
});

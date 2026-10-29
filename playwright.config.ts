import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (process.platform === "darwin" && existsSync(chrome) ? chrome : undefined);
const chromium = { launchOptions: { executablePath } };
export default defineConfig({
  // Tracing on every run slows the WebGL home page enough to break navigation timing, so a trace is recorded only
  // when a failed test is retried.
  testDir: "./tests", fullyParallel: true, workers: 2, timeout: 30_000, retries: 1,
  use: { baseURL: "http://127.0.0.1:3107", trace: "on-first-retry", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], ...chromium, viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], ...chromium, defaultBrowserType: "chromium" } },
    { name: "reduced-motion", use: { ...devices["Desktop Chrome"], ...chromium, reducedMotion: "reduce" } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 1000 } } },
    { name: "webkit-mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "webkit" } },
  ],
  webServer: { command: "npm run start -- --hostname 127.0.0.1 --port 3107", url: "http://127.0.0.1:3107", reuseExistingServer: false, timeout: 60_000, env: { RESEND_API_KEY: "", PROJECT_ENQUIRY_FROM: "", PROJECT_ENQUIRY_TO: "" } },
});

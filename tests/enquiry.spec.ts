import { expect, test } from "@playwright/test";
import { sendEnquiry } from "../app/project/actions";
import { initialEnquiryState, parseEnquiry } from "../app/lib/enquiry";

function validForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries({ name: "Test Visitor", company: "A connected product", email: "visitor@example.test", outcome: "A clearer product and connected team workflow.", timeline: "Not sure yet", budget: "Need guidance", submissionId: "12345678-1234-4234-8234-123456789abc" })) form.set(key, value);
  form.append("services", "interface"); return form;
}
test("server validation rejects tampered categories and excessive input", () => {
  const form = validForm(); form.set("services", "invented"); form.set("budget", "free"); form.set("context", "x".repeat(5001));
  expect(Object.keys(parseEnquiry(form).errors)).toEqual(expect.arrayContaining(["services", "budget", "context"]));
});
test("server rejects coming-soon practices before contacting the email provider", async () => {
  const original = globalThis.fetch;
  let requests = 0;
  try {
    globalThis.fetch = async () => { requests++; throw new Error("Unexpected provider request"); };
    for (const service of ["product", "automation"]) {
      const form = validForm(); form.append("services", service);
      const result = await sendEnquiry(initialEnquiryState, form);
      expect(result.status).toBe("error");
      expect(result.errors?.services).toContain("Choose an available practice");
    }
    expect(requests).toBe(0);
  } finally { globalThis.fetch = original; }
});
test("delivery uses a fixed inbox, safe reply-to and provider acceptance", async () => {
  const old = { key: process.env.RESEND_API_KEY, from: process.env.PROJECT_ENQUIRY_FROM, to: process.env.PROJECT_ENQUIRY_TO };
  const original = globalThis.fetch; const requests: { url: string; body: Record<string, unknown>; key: string | null }[] = [];
  process.env.RESEND_API_KEY = "re_test_no_network"; process.env.PROJECT_ENQUIRY_FROM = "Anvaya <enquiries@example.test>"; process.env.PROJECT_ENQUIRY_TO = "inbox@example.test";
  try {
    globalThis.fetch = async (input, init) => { requests.push({ url: String(input), body: JSON.parse(String(init?.body)), key: new Headers(init?.headers).get("Idempotency-Key") }); return Response.json({ id: "provider-accepted-test" }); };
    const result = await sendEnquiry(initialEnquiryState, validForm());
    expect(result.status).toBe("success"); expect(result.message).toContain("your note is with Anvaya");
    expect(requests).toHaveLength(1); expect(requests[0].url).toBe("https://api.resend.com/emails");
    expect(requests[0].body.to).toBe("inbox@example.test"); expect(requests[0].body.reply_to).toBe("visitor@example.test");
    expect(requests[0].body.text).toContain("Digital Presence"); expect(requests[0].key).toContain("anvaya-enquiry/");
    globalThis.fetch = async () => Response.json({ name: "validation_error", message: "Rejected" }, { status: 422 });
    expect((await sendEnquiry(initialEnquiryState, validForm())).status).toBe("error");
    globalThis.fetch = async () => { throw new Error("Network unavailable"); };
    expect((await sendEnquiry(initialEnquiryState, validForm())).status).toBe("error");
    globalThis.fetch = async () => Response.json({});
    expect((await sendEnquiry(initialEnquiryState, validForm())).status).toBe("error");
    const trapped = validForm(); trapped.set("website", "spam");
    expect((await sendEnquiry(initialEnquiryState, trapped)).status).toBe("error");
  } finally {
    globalThis.fetch = original;
    for (const [key, value] of Object.entries({ RESEND_API_KEY: old.key, PROJECT_ENQUIRY_FROM: old.from, PROJECT_ENQUIRY_TO: old.to })) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});

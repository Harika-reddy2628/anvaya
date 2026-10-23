import { budgetOptions, practices, timelineOptions } from "./site";

export type EnquiryState = { status: "idle" | "error" | "success"; message: string; errors?: Record<string, string> };
export type Enquiry = {
  name: string; company: string; email: string; phone: string; services: string[];
  outcome: string; timeline: string; budget: string; context: string; submissionId: string;
};
export const initialEnquiryState: EnquiryState = { status: "idle", message: "" };
export function parseEnquiry(form: FormData): { data: Enquiry; errors: Record<string, string> } {
  const read = (key: string) => String(form.get(key) || "").trim();
  const data: Enquiry = { name: read("name"), company: read("company"), email: read("email"), phone: read("phone"), services: form.getAll("services").map(String), outcome: read("outcome"), timeline: read("timeline"), budget: read("budget"), context: read("context"), submissionId: read("submissionId") };
  const errors: Record<string, string> = {};
  if (!data.name || data.name.length > 120) errors.name = "Please enter your name (up to 120 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254) errors.email = "Please enter a valid email address.";
  const allowed = new Set<string>([...practices.filter(p => !p.comingSoon).map(p => p.id), "unsure"]);
  if (!data.services.length || data.services.some(s => !allowed.has(s)) || data.services.length > 4 || (data.services.includes("unsure") && data.services.length > 1)) errors.services = "Choose an available practice, or select Not sure yet.";
  if (data.outcome.length < 10 || data.outcome.length > 5000) errors.outcome = "Tell us a little more about the outcome (10–5,000 characters).";
  if (data.company.length > 200) errors.company = "Please keep the project name under 200 characters.";
  if (data.phone.length > 60) errors.phone = "Please keep the phone number under 60 characters.";
  if (!(budgetOptions as readonly string[]).includes(data.budget)) errors.budget = "Please choose a budget range or Need guidance.";
  if (!(timelineOptions as readonly string[]).includes(data.timeline)) errors.timeline = "Please choose a timeline or Not sure yet.";
  if (data.context.length > 5000) errors.context = "Please keep the extra context under 5,000 characters.";
  if (data.submissionId && !/^[a-f0-9-]{36}$/i.test(data.submissionId)) errors.form = "Please refresh the page and try again.";
  return { data, errors };
}
export function enquiryText(data: Enquiry) {
  return ["ANVAYA — PROJECT ENQUIRY", "", `Name: ${data.name}`, `Company or project: ${data.company || "Not provided"}`, `Email: ${data.email}`, `Phone / WhatsApp: ${data.phone || "Not provided"}`, `Practices: ${data.services.map(id => practices.find(p => p.id === id)?.name || "Not sure yet").join(", ")}`, "", "DESIRED OUTCOME", data.outcome, "", `Timeline: ${data.timeline}`, `Budget (INR): ${data.budget}`, "", "ADDITIONAL CONTEXT", data.context || "Not provided"].join("\n");
}

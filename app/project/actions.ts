"use server";
import { Resend } from "resend";
import { enquiryText, parseEnquiry, type EnquiryState } from "../lib/enquiry";

export async function sendEnquiry(_previous: EnquiryState, form: FormData): Promise<EnquiryState> {
  if (String(form.get("website") || "")) return { status: "error", message: "Your enquiry has not been sent. Please refresh the page and try again." };
  const { data, errors } = parseEnquiry(form);
  if (Object.keys(errors).length) return { status: "error", message: "Please check the highlighted fields.", errors };
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.PROJECT_ENQUIRY_FROM;
  const to = process.env.PROJECT_ENQUIRY_TO || process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  if (!apiKey || !from || !to) return { status: "error", message: "Your enquiry has not been sent. Please try again later, or keep a copy of your brief below." };
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({ from, to, replyTo: data.email, subject: `Anvaya project enquiry — ${(data.company || data.name).replace(/[\r\n]/g, " ").slice(0, 120)}`, text: enquiryText(data) }, data.submissionId ? { idempotencyKey: `anvaya-enquiry/${data.submissionId}` } : undefined);
    if (result.error || !result.data?.id) return { status: "error", message: "Your enquiry has not been sent. Please try again, or keep a copy of your brief below." };
    return { status: "success", message: "Thank you — your note is with Anvaya. We will reply with the next sensible step." };
  } catch {
    return { status: "error", message: "We could not send your enquiry. Your note has not been submitted. Please try again, or keep a copy of your brief below." };
  }
}

import type { EnquiryState } from "../lib/enquiry";

/* Static hosting (GitHub Pages) has no server to deliver email. The static build swaps this in for actions.ts,
   so the form reports plainly that nothing was sent and points to the local copy/download backups. */
export async function sendEnquiry(_previous: EnquiryState, _form: FormData): Promise<EnquiryState> {
  void _previous; void _form;
  return { status: "error", message: "Your enquiry has not been sent: this preview cannot send email. Copy or download your brief below and email it to Anvaya." };
}

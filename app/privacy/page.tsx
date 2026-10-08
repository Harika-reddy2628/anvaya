import type { Metadata } from "next";
import { Action, Label } from "../components/connected/Shared";
import { contact } from "../lib/site";
export const metadata: Metadata = { title: "Privacy", description: "How Anvaya handles information shared through this website and project enquiries." };
export default function PrivacyPage() {
  return <main id="main-content" className="container policy-page" tabIndex={-1}><Label>WEBSITE INFORMATION</Label><h1>Privacy.</h1><div className="policy-content">
    <section><h2>Your project enquiry</h2><p>When you send a project enquiry, we use your name, email, project context and any optional details you provide to understand your needs and respond. The website sends the enquiry to Anvaya through Resend, our email delivery provider.</p><p>We show a confirmation only after the delivery provider accepts the enquiry. If sending fails, the page tells you that your enquiry has not been sent. Provider acceptance does not guarantee inbox delivery.</p></section>
    <section><h2>Copies and storage</h2><p>Copying or downloading a brief keeps a copy on your device and does not send it to Anvaya. The website does not store form contents in browser storage or a separate enquiry database. Enquiries that are sent are processed by the email delivery provider and received in the studio’s email inbox.</p><p>We use enquiry information to respond and discuss the work. Email providers may retain messages and delivery records under their own policies. Please do not include credentials, private customer records or other sensitive information in an initial enquiry.</p></section>
    <section><h2>Cookies and analytics</h2><p>This website does not add advertising cookies or analytics trackers. Fonts are served locally. A session-storage preference remembers whether you have seen the introduction; it contains no enquiry details. The hosting provider may process standard request information needed to serve the website.</p></section>
    <section><h2>External links</h2><p>Optional social and WhatsApp links take you to other services. Those services handle information according to their own privacy practices.</p></section>
    <section><h2>Your information</h2><p>If you would like to ask about, correct or request removal of information you have shared, {contact.email ? <>write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.</> : <>use the project enquiry form and explain your request.</>}</p></section>
    <Action href="/project">Start a conversation</Action>
  </div></main>;
}

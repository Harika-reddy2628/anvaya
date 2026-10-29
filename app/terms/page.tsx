import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Project terms",
  description:
    "Anvaya’s published scope, payment, ownership, and technical warranty terms.",
};
export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="wrap inner-page policy-page">
      <div className="page-heading">
        <h1>
          Project terms<span className="accent">.</span>
        </h1>
        <p>The practical foundations of an Anvaya engagement.</p>
      </div>
      <div className="policy-content">
        <section>
          <h2>Scope and timelines</h2>
          <p>
            You send the floorplan (a PDF, CAD file or clear phone photo) and
            the finishes you plan to use. We confirm the rooms, views and
            delivery date in writing before work starts. Stills take 5 working
            days, a 360° tour 7 and Premium 10. Express delivery in about half
            the time costs 25% more.
          </p>
          <p>
            Two rounds of changes are included, each sent as one consolidated
            list. They cover furniture, finishes, lighting and camera angles.
            Moving walls or resizing rooms after you approve the layout is
            quoted as a new floorplan. Further rounds are ₹1,999 each.
          </p>
        </section>
        <section>
          <h2>Pricing and payment</h2>
          <p>
            Packages are priced per unit type, meaning one floorplan such as a
            2BHK: Stills ₹9,999, 360° Tour ₹24,999 and Premium ₹44,999. Each
            further unit type in the same project is 35% off. Websites,
            enquiry follow-up and video ads are quoted per project. Every
            builder pays from the same published{" "}
            <Link href="/pricing">price list</Link>.
          </p>
          <p>
            We take a 50% advance to start and the balance before final files,
            by UPI or bank transfer. Previews carry a watermark until payment
            is complete. Third-party charges, such as WhatsApp message fees,
            are listed and agreed up front. No GST is added at present.
          </p>
        </section>
        <section>
          <h2>Confidentiality</h2>
          <p>
            Your floorplans and renders are never shown to anyone, including
            other builders, without your written permission. We sign an NDA
            on request at no extra cost.
          </p>
        </section>
        <section>
          <h2>Ownership and handover</h2>
          <p>
            Once the final payment is made, you own the delivered images,
            videos and tour, and may use them in any marketing. Anvaya keeps
            its own tools, scripts and furniture library, which are not part of
            the handover.
          </p>
        </section>
        <section>
          <h2>Renders in advertising</h2>
          <p>
            Renders show the approved plan as an artist’s impression; finishes
            and furniture are indicative. Under RERA, brochures and ads must
            carry your project’s RERA registration number, and renders should
            be labelled as artist’s impressions. Keeping ads accurate to the
            registered project is the promoter’s responsibility.
          </p>
        </section>
        <section>
          <h2>Defect warranty</h2>
          <p>
            For 14 days after delivery, report any broken link, rendering error
            or room that does not match the approved plan, and we fix it at no
            cost. Tour hosting is included for 12 months, then ₹1,999 a year.
          </p>
        </section>
        <section>
          <h2>Your engagement agreement</h2>
          <p>
            This page summarizes the studio’s published offer. Exact
            deliverables, support arrangements, dates, and any
            engagement-specific terms are recorded in the agreed project scope.
          </p>
        </section>
        <Link className="text-link" href="/project">
          Create a project brief ↗
        </Link>
      </div>
    </main>
  );
}

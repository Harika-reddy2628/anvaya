import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this Anvaya website handles project brief information.",
};
export default function PrivacyPage() {
  return (
    <main id="main-content" className="container inner-page policy-page">
      <div className="page-heading">
        <span className="eyebrow">WEBSITE INFORMATION</span>
        <h1>
          Privacy<span className="accent">.</span>
        </h1>
        <p>A clear account of how information is handled on this website.</p>
      </div>
      <div className="policy-content">
        <section>
          <h2>Your project brief</h2>
          <p>
            The project builder uses the details you enter to prepare a brief in
            your browser. Creating, copying, or downloading that brief does not
            submit it to Anvaya. The form does not save your details to a
            database or browser storage.
          </p>
          <p>
            If you choose to share the downloaded or copied brief through
            another service, that service handles the information according to
            its own privacy practices.
          </p>
        </section>
        <section>
          <h2>Cookies and analytics</h2>
          <p>
            This website does not add advertising cookies or analytics trackers.
            The website fonts are served with the site. The hosting provider may
            process standard request information necessary to deliver the
            website, such as IP addresses and request logs.
          </p>
        </section>
        <section>
          <h2>External links</h2>
          <p>
            Public project links may take you to another website. Anvaya does
            not control the data handling practices of those services.
          </p>
        </section>
        <section>
          <h2>Information you choose to share</h2>
          <p>
            Only include information you are comfortable sharing in a project
            conversation. Keep credentials, private customer data, and other
            sensitive material out of an initial brief.
          </p>
        </section>
        <Link className="text-link" href="/project">
          Return to the project builder ↗
        </Link>
      </div>
    </main>
  );
}

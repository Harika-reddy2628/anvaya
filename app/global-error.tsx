"use client";
import { useEffect } from "react";

// Replaces the root layout when it fails, so it carries its own document and styles.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <html lang="en"><body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#ffffff", color: "#0b1838", fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
    <title>Something went wrong — Anvaya</title>
    <main style={{ maxWidth: 560, padding: "48px 24px" }}>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: ".18em" }}>ANVAYA.</p>
      <h1 style={{ margin: "32px 0 16px", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontSize: "clamp(40px, 8vw, 64px)", lineHeight: 1, letterSpacing: "-.03em" }}>Something went wrong.</h1>
      <p style={{ margin: "0 0 32px", fontSize: 18, lineHeight: 1.6, color: "#46525c" }}>The site could not load. Please try again in a moment.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <button type="button" onClick={() => retry()} style={{ minHeight: 52, padding: "0 28px", border: 0, borderRadius: 999, background: "#0b1838", color: "#fff", font: "inherit", fontSize: 15, fontWeight: 500, cursor: "pointer" }}>Try again</button>
        {/* A full reload is the point here: the client router is what failed. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" style={{ display: "inline-flex", alignItems: "center", minHeight: 52, padding: "0 28px", border: "1px solid rgba(13,17,20,.2)", borderRadius: 999, color: "inherit", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>Go to the home page</a>
      </div>
      {error.digest && <p style={{ marginTop: 32, fontSize: 13, color: "#5e6973" }}>Reference: <code>{error.digest}</code></p>}
    </main>
  </body></html>;
}

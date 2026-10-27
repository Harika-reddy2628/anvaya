"use client";
import { useEffect } from "react";
import Link from "next/link";

// Runtime errors inside a page. The header and footer stay in place; the visitor can retry or leave.
export default function PageError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main id="main-content" className="state-page" tabIndex={-1}>
    <div className="wrap state-wrap">
      <p className="state-code state-code-small" aria-hidden="true">!</p>
      <h1>Something went wrong.</h1>
      <p className="state-lede">This page did not load properly. It is not something you did. Please try again — if it keeps happening, the home page and project form still work.</p>
      <div className="state-actions">
        <button type="button" className="action action-light" onClick={() => retry()}><span>Try again</span><span aria-hidden="true">↻</span></button>
        <Link className="action" href="/"><span>Go to the home page</span><span aria-hidden="true">↗</span></Link>
      </div>
      {error.digest && <p className="state-ref">Reference: <code>{error.digest}</code></p>}
    </div>
  </main>;
}

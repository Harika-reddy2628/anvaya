"use client";

import { useState } from "react";
import { AnvayaPreloader } from "./components/preloader/AnvayaPreloader";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <AnvayaPreloader onComplete={() => setLoaded(true)} />}

      {/* Main site content — revealed after preloader exits */}
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--paper)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <p
          style={{
            color: "var(--muted)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Site coming soon
        </p>
      </main>
    </>
  );
}

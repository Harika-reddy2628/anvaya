export function ConnectionStory() {
  return (
    <section
      className="connection-story"
      aria-label="Ideas connected to working systems"
    >
      <div className="connection-filament" aria-hidden="true">
        <svg viewBox="0 0 200 320" fill="none">
          {/* Modern Kinetic Connector Vector Pathway */}
          <path
            d="M100 20 V160 H180 V300"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.4"
          />
          <path
            d="M100 160 H20 V260"
            stroke="var(--ink)"
            strokeWidth="1"
            opacity="0.25"
          />
          <circle cx="100" cy="160" r="6" fill="var(--accent)" />
          <circle cx="180" cy="300" r="4" fill="var(--ink)" />
          <circle cx="20" cy="260" r="4" fill="var(--accent)" />
          <circle cx="100" cy="20" r="4" fill="var(--ink)" />
        </svg>
      </div>
      <div className="connection-copy">
        <span className="eyebrow" data-reveal>
          ANVAYA // THE CONNECTION
        </span>
        <h2 data-reveal>
          The engineering your idea needs.
        </h2>
        <p data-reveal>
          We’re an independent Bengaluru engineering collective bringing software engineering,
          autonomous AI workflows, spatial 3D, and interface architecture together around your
          product.
        </p>
      </div>
      <span className="connection-caption font-mono" aria-hidden="true">
        SOFTWARE · AI · SPATIAL 3D
      </span>
    </section>
  );
}

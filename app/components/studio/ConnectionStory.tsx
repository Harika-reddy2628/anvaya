export function ConnectionStory() {
  return (
    <section
      className="connection-story"
      aria-label="Ideas connected to working systems"
    >
      <div className="connection-filament" aria-hidden="true">
        <svg viewBox="0 0 160 320" fill="none">
          <path
            d="M78 300C112 220 37 168 81 89"
            stroke="currentColor"
            strokeWidth="0.7"
          />
          <path
            d="M81 89C53 88 25 63 32 24C58 36 80 48 81 89Z"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <path
            d="M81 89C112 76 135 48 125 13C98 31 81 59 81 89Z"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <path
            d="M81 89C70 64 68 27 81 4C94 37 95 65 81 89Z"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </svg>
      </div>
      <div className="connection-copy">
        <span className="eyebrow" data-reveal>
          ANVAYA / THE CONNECTION
        </span>
        <h2 data-reveal>
          The engineering your idea needs.
        </h2>
        <p data-reveal>
          We’re a Bengaluru engineering collective bringing product engineering,
          AI workflows, spatial 3D, and interface design together around your
          project.
        </p>
      </div>
      <span className="connection-caption" aria-hidden="true">
        IDEA · SYSTEM · EXPERIENCE
      </span>
    </section>
  );
}

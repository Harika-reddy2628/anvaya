/** Native linework: a bindu connects the geometric and organic forms. */
export function ConnectionSeal({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.65">
        <circle data-seal-trace cx="160" cy="160" r="148" />
        <circle cx="160" cy="160" r="138" strokeDasharray="1 6" />
        <g data-seal-ring>
          {Array.from({ length: 8 }, (_, i) => (
            <path
              data-seal-trace
              key={i}
              d="M160 38C120 71 112 130 160 160C208 130 200 71 160 38Z"
              transform={`rotate(${i * 45} 160 160)`}
            />
          ))}
        </g>
        <g data-seal-core>
          <rect data-seal-trace x="104" y="104" width="112" height="112" />
          <rect
            x="104"
            y="104"
            width="112"
            height="112"
            transform="rotate(45 160 160)"
          />
          <circle cx="160" cy="160" r="44" />
        </g>
        <path data-seal-trace d="M160 0v24m0 272v24M0 160h24m272 0h24" />
      </g>
      <circle data-seal-bindu cx="160" cy="160" r="6" fill="currentColor" />
      {[0, 90, 180, 270].map((angle) => (
        <circle
          key={angle}
          cx="160"
          cy="12"
          r="2.5"
          transform={`rotate(${angle} 160 160)`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

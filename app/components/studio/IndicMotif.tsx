export function IndicMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`indic-motif ${className}`}
      data-indic
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="120"
        cy="120"
        r="108"
        stroke="currentColor"
        strokeWidth="0.6"
      />
      <circle
        cx="120"
        cy="120"
        r="100"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="1 7"
      />
      <g data-mandala-ring>
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            data-draw
            d="M120 28C85 58 82 99 120 120C158 99 155 58 120 28Z"
            transform={`rotate(${i * 45} 120 120)`}
            stroke="currentColor"
            strokeWidth="0.7"
          />
        ))}
      </g>
      <g data-mandala-core>
        <rect
          x="79"
          y="79"
          width="82"
          height="82"
          stroke="currentColor"
          strokeWidth="0.65"
        />
        <rect
          x="79"
          y="79"
          width="82"
          height="82"
          transform="rotate(45 120 120)"
          stroke="currentColor"
          strokeWidth="0.65"
        />
        <circle
          cx="120"
          cy="120"
          r="34"
          stroke="currentColor"
          strokeWidth="0.7"
        />
      </g>
      <circle cx="120" cy="120" r="5" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => (
        <circle
          key={i}
          cx="120"
          cy="12"
          r="2.2"
          transform={`rotate(${i * 45} 120 120)`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

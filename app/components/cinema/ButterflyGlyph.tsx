/** A butterfly in profile, perched: wings raised, body level, four feet on the ground line at 88% of the box, head to
    the right. Painted like the 3D one (navy root, morpho blue, ice edge, dark velvet margin, pale spots). Used where
    three.js is too heavy to wait for, such as the loading screen. The wings sit in `.bf-wings` so a caller can flap them
    by rotating that group about the shoulder: gsap `svgOrigin: "46 62"` (0° is wings up; negative swings them down). */
export function ButterflyGlyph({ className = "" }: { className?: string }) {
  return <svg className={`butterfly-glyph ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="bf-ground" gradientUnits="userSpaceOnUse" cx="46" cy="60" r="56">
        <stop offset="0" stopColor="#0a1d4a" /><stop offset=".3" stopColor="#123f9c" /><stop offset=".6" stopColor="#2477e6" />
        <stop offset=".85" stopColor="#4fb8ff" /><stop offset="1" stopColor="#a6e4ff" />
      </radialGradient>
    </defs>
    <g stroke="#0b1838" strokeLinecap="round" fill="none">
      <path d="M45 67 41 88M54 69 55 88M63 68 68 88" strokeWidth="1.6" />
      <path d="M73 61C75 51 80 45 87 42M71 61C71 52 74 45 79 40" strokeWidth="1.2" />
    </g>
    <g className="bf-wings" stroke="#0b1838" strokeWidth="2.6" strokeLinejoin="round">
      <path d="M42 63C30 61 18 66 18 77c0 9 12 13 20 5 6-6 8-13 8-19z" fill="url(#bf-ground)" />
      <path d="M42 62C34 44 36 20 52 10c12-7 24 0 22 14-2 16-14 32-28 39z" fill="url(#bf-ground)" />
      <g fill="#e2f6ff" stroke="none" opacity=".9">
        <circle cx="66" cy="9" r="1.5" /><circle cx="72" cy="15" r="1.4" /><circle cx="73" cy="24" r="1.3" />
        <circle cx="22" cy="80" r="1.4" /><circle cx="28" cy="85" r="1.3" />
      </g>
    </g>
    <g fill="#0b1838" stroke="#0b1838">
      <ellipse cx="54" cy="65" rx="17" ry="3.8" />
      <circle cx="73" cy="64" r="4.2" />
      <circle cx="87" cy="42" r="1.6" /><circle cx="79" cy="40" r="1.6" />
    </g>
  </svg>;
}

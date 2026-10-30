/** A flat butterfly seen from above, painted like the 3D one (navy root, morpho blue, ice edge, dark velvet margin with
    pale spots). Used where three.js is too heavy to wait for, such as the loading screen. The wings sit in `.bf-wings`
    so a caller can flap them by scaling that group's x about the body: gsap `svgOrigin: "60 54"`. */
export function ButterflyGlyph({ className = "" }: { className?: string }) {
  const wing = (
    <>
      <path d="M61 50C64 30 84 8 108 6c10-1 13 9 7 21-7 14-27 23-54 27z" fill="url(#bf-ground)" />
      <path d="M61 54c21 0 39 6 39 20 0 12-10 24-20 26-6 1-10-6-13-16-3-10-5-20-6-30z" fill="url(#bf-ground)" />
      <g fill="#e2f6ff" opacity=".9">
        <circle cx="108" cy="12" r="1.5" /><circle cx="113" cy="21" r="1.3" /><circle cx="101" cy="9" r="1.2" />
        <circle cx="96" cy="80" r="1.5" /><circle cx="91" cy="90" r="1.3" /><circle cx="84" cy="97" r="1.2" />
      </g>
    </>
  );
  return <svg className={`butterfly-glyph ${className}`} viewBox="0 0 120 112" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id="bf-ground" gradientUnits="userSpaceOnUse" cx="61" cy="54" r="62">
        <stop offset="0" stopColor="#0a1d4a" /><stop offset=".3" stopColor="#123f9c" /><stop offset=".6" stopColor="#2477e6" />
        <stop offset=".85" stopColor="#4fb8ff" /><stop offset="1" stopColor="#a6e4ff" />
      </radialGradient>
    </defs>
    <g className="bf-wings" stroke="#0b1838" strokeWidth="3.2" strokeLinejoin="round">
      <g>{wing}</g>
      <g transform="translate(120 0) scale(-1 1)">{wing}</g>
    </g>
    <g fill="#0b1838" stroke="#0b1838">
      <ellipse cx="60" cy="62" rx="3" ry="21" />
      <circle cx="60" cy="38" r="4.2" />
      <path d="M59 35C56 25 50 19 45 17M61 35C64 25 70 19 75 17" fill="none" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="45" cy="17" r="1.6" /><circle cx="75" cy="17" r="1.6" />
    </g>
  </svg>;
}

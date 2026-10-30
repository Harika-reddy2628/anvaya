/** Original Anvaya mark: the letters A and N, joined by a thread. The A's crossbar is not closed off inside the letter:
    it is a blue thread that runs out through the A's right leg and ties into the N's stem, ending in the bindu where
    the two letters connect. Anvaya means connection. */
export function LogoMark({ className = "" }: { className?: string }) {
  return <svg className={`logo-mark ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <path className="logo-arch" d="M6 52 20 12 34 52" pathLength="1" />
    <path className="logo-n" d="M44 52V12L58 52V12" pathLength="1" />
    <path className="logo-thread" d="M12 38H44" pathLength="1" />
    <circle className="logo-bindu" cx="44" cy="38" r="4.2" />
  </svg>;
}

/** Tracked wordmark whose full stop is the terracotta bindu. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wordmark ${className}`}>ANVAYA<i aria-hidden="true">.</i></span>;
}

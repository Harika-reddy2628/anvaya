/** Original Anvaya mark: an architectural arch read as an A, crossed by the thread that ends in the bindu. */
export function LogoMark({ className = "" }: { className?: string }) {
  return <svg className={`logo-mark ${className}`} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
    <path className="logo-arch" d="M15 59V31a17 17 0 0 1 34 0v28" pathLength="1" />
    <path className="logo-inner" d="M23 59V32a9 9 0 0 1 18 0v27" pathLength="1" />
    <path className="logo-thread" d="M2 45H40" pathLength="1" />
    <circle className="logo-bindu" cx="45" cy="45" r="3.6" />
  </svg>;
}

/** Tracked wordmark whose full stop is the terracotta bindu. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`wordmark ${className}`}>ANVAYA<i aria-hidden="true">.</i></span>;
}

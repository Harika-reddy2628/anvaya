import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Anvaya home">
      <span className="brand-group flex items-baseline gap-2">
        <span className="brand-wordmark tracking-[-0.035em] font-extrabold text-xl md:text-2xl text-ink">
          ANVAYA
        </span>
        <span className="brand-indic font-serif text-sm tracking-normal text-ink-muted">
          अन्वय
        </span>
      </span>
    </Link>
  );
}

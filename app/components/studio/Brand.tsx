import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Anvaya home">
      <span>
        ANVAYA<span className="brand-period">.</span>
      </span>
    </Link>
  );
}

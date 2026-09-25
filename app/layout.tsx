import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anvaya (अन्वय) — Ideas to Impact | Production Systems in 14 Days",
  description:
    "Deterministic AI architectures, pgvector neural backends, and bespoke interfaces. Direct senior builder access, zero agency fluff, Day-1 code handoff.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&f[]=satoshi@700,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07080D] text-[#F8FAFC] font-satoshi antialiased selection:bg-[#F59E0B]/20 selection:text-[#F59E0B]">
        {children}
      </body>
    </html>
  );
}

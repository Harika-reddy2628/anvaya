import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anvaya — Building with Intent",
  description:
    "Anvaya is an engineering-first software and AI systems studio. Production systems in 14 days.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

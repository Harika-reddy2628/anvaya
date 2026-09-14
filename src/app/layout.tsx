import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { cn } from "@/lib/utils";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anvaya-ruby.vercel.app"),
  title: {
    default: "Anvaya — Ideas to Impact | 14-Day Production Software & AI Studio",
    template: "%s | Anvaya",
  },
  description:
    "We turn raw architecture into production software in 14 days. Direct senior builder access, zero agency fluff, sovereign Day-1 code handoff.",
  keywords: [
    "production engineering",
    "14-day sprints",
    "software studio",
    "next.js 16",
    "fastapi",
    "pgvector",
    "mvp launchpad",
    "zero agency fluff",
  ],
  authors: [{ name: "Anvaya Studio", url: "https://anvaya-ruby.vercel.app" }],
  creator: "Anvaya Studio",
  publisher: "Anvaya Studio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Anvaya — Ideas to Impact | 14-Day Production Software & AI Studio",
    description:
      "We turn raw architecture into production software in 14 days. Direct senior builder access, zero agency fluff, sovereign Day-1 code handoff.",
    url: "https://anvaya-ruby.vercel.app",
    siteName: "Anvaya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anvaya — Ideas to Impact. Shipped in 14 Days.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvaya — Ideas to Impact | 14-Day Production Software & AI Studio",
    description:
      "We turn raw architecture into production software in 14 days. Direct senior builder access, zero agency fluff, sovereign Day-1 code handoff.",
    images: ["/og-image.png"],
    creator: "@anvaya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans antialiased scroll-smooth selection:bg-[#004CE8]/15 selection:text-[#004CE8]",
        plusJakarta.variable,
        jetbrainsMono.variable,
        syne.variable,
      )}
    >
      <body className="min-h-screen bg-[#F8F9FC] text-[#0A0D17] flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}

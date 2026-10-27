import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "./components/cinema/Header";
import { Footer } from "./components/cinema/Shared";
import { Intro } from "./components/cinema/Intro";
import { MotionLayer } from "./components/cinema/MotionLayer";
import { ButterflyLayer } from "./components/cinema/ButterflyLayer";
import "lenis/dist/lenis.css";
import "./cinema.css";
import "./light.css";

const serif = localFont({ src: [{ path: "./fonts/Fraunces-normal-Latin.woff2", style: "normal" }, { path: "./fonts/Fraunces-italic-Latin.woff2", style: "italic" }], variable: "--font-serif", weight: "100 900", display: "swap" });
const sans = localFont({ src: "./fonts/Inter-Latin.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-mono", weight: "100 900", display: "swap" });
const hind = localFont({ src: "./fonts/Hind-Regular.ttf", variable: "--font-hind", weight: "400", display: "swap", preload: false });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Anvaya — Make. Move. Matter.", template: "%s — Anvaya" },
  description: "Technology and design studio. Digital presence, digital products, intelligent operations and spatial visuals. India, working globally.",
  icons: { icon: "/icon.svg" },
  openGraph: { type: "website", siteName: "Anvaya", title: "Anvaya — Make. Move. Matter.", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${hind.variable}`}><body><Intro><a href="#main-content" className="skip-link" tabIndex={0}>Skip to content</a><Header /><ButterflyLayer />{children}<Footer /></Intro><MotionLayer /></body></html>;
}

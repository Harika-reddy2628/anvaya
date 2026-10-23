import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "./components/cinema/Header";
import { Footer } from "./components/cinema/Shared";
import { Intro } from "./components/cinema/Intro";
import { MotionLayer } from "./components/cinema/MotionLayer";
import { SectionRail } from "./components/cinema/SectionRail";
import "lenis/dist/lenis.css";
import "./cinema.css";

const serif = localFont({ src: [{ path: "./fonts/InstrumentSerif-Latin.woff2", style: "normal" }, { path: "./fonts/InstrumentSerif-Italic-Latin.woff2", style: "italic" }], variable: "--font-serif", weight: "400", display: "swap" });
const sans = localFont({ src: "./fonts/InterTight-Latin.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const mono = localFont({ src: "./fonts/JetBrainsMono-Latin.woff2", variable: "--font-mono", weight: "100 800", display: "swap" });
const hind = localFont({ src: "./fonts/Hind-Regular.ttf", variable: "--font-hind", weight: "400", display: "swap", preload: false });
export const metadata: Metadata = {
  title: { default: "Anvaya — Make. Move. Matter.", template: "%s — Anvaya" },
  description: "Technology and design studio. Digital presence, digital products, intelligent operations and spatial visuals. India, working globally.",
  icons: { icon: "/icon.svg" },
};
export const viewport: Viewport = { themeColor: "#0b0a09", colorScheme: "dark" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${hind.variable}`}><body><Intro><a href="#main-content" className="skip-link" tabIndex={0}>Skip to content</a><Header /><SectionRail />{children}<Footer /></Intro><MotionLayer /><div className="grain" aria-hidden="true" /></body></html>;
}

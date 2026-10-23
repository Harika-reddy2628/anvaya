import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "./components/connected/Header";
import { Footer } from "./components/connected/Shared";
import { Intro } from "./components/connected/Intro";
import { MotionLayer } from "./components/connected/MotionLayer";
import "lenis/dist/lenis.css";
import "./connected.css";

const inter = localFont({ src: "./fonts/Inter-Latin.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const cormorant = localFont({ src: [{ path: "./fonts/Cormorant-Latin.woff2", style: "normal" }, { path: "./fonts/Cormorant-Italic-Latin.woff2", style: "italic" }], variable: "--font-cormorant", weight: "300 700", display: "swap" });
const hind = localFont({ src: "./fonts/Hind-Regular.ttf", variable: "--font-hind", weight: "400", display: "swap", preload: false });
const mono = localFont({ src: "./fonts/geist-mono-latin.woff2", variable: "--font-geist-mono", weight: "100 900", display: "swap", preload: false });
export const metadata: Metadata = {
  title: { default: "Anvaya — Make. Move. Matter.", template: "%s — Anvaya" },
  description: "Technology and design studio. Digital presence, digital products, intelligent operations and spatial visuals. India, working globally.",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${inter.variable} ${cormorant.variable} ${hind.variable} ${mono.variable}`}><body><Intro><a href="#main-content" className="skip-link" tabIndex={0}>Skip to content</a><Header />{children}<Footer /></Intro><MotionLayer /></body></html>;
}

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
// Hind only sets the wordmark अन्वय, so it ships subset to those glyphs (4 KB, from Hind-Regular via pyftsubset).
const hind = localFont({ src: "./fonts/Hind-Anvaya.woff2", variable: "--font-hind", weight: "400", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Anvaya — Make. Move. Matter.", template: "%s — Anvaya" },
  description: "Anvaya builds websites, apps, AI automation and 3D renders for businesses in India and worldwide.",
  icons: { icon: "/icon.svg" },
  openGraph: { type: "website", siteName: "Anvaya", title: "Anvaya — Make. Move. Matter.", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };
// Runs before first paint: if the Home opening will play, mark it now so the intro screen covers the page from the
// first frame instead of appearing after hydration. Mirrors introWillPlay() and INTRO_KEY in lib/motion (a client module, so not importable here).
const PREPAINT = `try{if(location.pathname==="/"&&!location.hash&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&sessionStorage.getItem("anvaya-intention-intro")!=="1")document.documentElement.dataset.intro="playing"}catch(e){}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${hind.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: PREPAINT }} /></head><body><Intro><a href="#main-content" className="skip-link" tabIndex={0}>Skip to content</a><Header /><ButterflyLayer />{children}<Footer /></Intro><MotionLayer /></body></html>;
}

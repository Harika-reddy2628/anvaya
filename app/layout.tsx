import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "./components/studio/Header";
import { Footer } from "./components/studio/Footer";
import { Motion } from "./components/studio/Motion";
import { ProjectProvider } from "./components/studio/ProjectContext";
import { StudioIntro } from "./components/studio/StudioIntro";
import "./globals.css";
import "./editorial.css";
import "./reference.css";

const sahitya = localFont({
  src: [
    { path: "./fonts/Sahitya-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Sahitya-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sahitya",
  display: "swap",
  preload: false,
});
const hind = localFont({
  src: [
    { path: "./fonts/Hind-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Hind-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Hind-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-hind",
  display: "swap",
  preload: false,
});
const cormorant = localFont({
  src: "./fonts/Cormorant-Latin.woff2",
  variable: "--font-cormorant",
  weight: "300 700",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
const inter = localFont({
  src: "./fonts/Inter-Latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anvaya — From ambitious idea to working product",
    template: "%s — Anvaya",
  },
  description:
    "A Bengaluru engineering collective building software, agentic AI workflows, and spatial 3D experiences. Focused 14-day sprints. Global delivery.",
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${sahitya.variable} ${hind.variable} ${geistMono.variable}`}
    >
      <body>
        <ProjectProvider>
          <StudioIntro>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Motion>
              <Header />
              {children}
              <Footer />
            </Motion>
          </StudioIntro>
        </ProjectProvider>
      </body>
    </html>
  );
}

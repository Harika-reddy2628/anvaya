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
  title: "Anvaya — Ideas to Impact | 14-Day Production Software & AI Studio",
  description:
    "We turn raw architecture into production software in 14 days. Direct senior builder access, zero agency fluff.",
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

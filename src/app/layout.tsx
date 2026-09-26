import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anvaya — Ideas to Impact // Production Systems in 14 Days',
  description: 'Anvaya is an engineering-first software and AI systems studio delivering production-grade web applications, vector search backends, and 3D spatial pipelines in 14 days.',
  keywords: ['Anvaya', 'AI Studio', 'Autonomous Agents', 'Next.js 16', '14-Day MVP', 'Production Systems'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Fontshare Clash Display */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap"
          rel="stylesheet"
        />
        {/* Google Fonts: Inter & JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090E] text-[#F8FAFC] antialiased selection:bg-[#FF2A55] selection:text-white bg-grid">
        {children}
      </body>
    </html>
  );
}

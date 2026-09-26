'use client';

import React, { useState } from 'react';
import { Preloader } from '@/components/preloader/Preloader';
import { Navbar } from '@/components/navigation/Navbar';
import { Hero } from '@/components/hero/Hero';
import { Ticker } from '@/components/ticker/Ticker';
import { BentoGrid } from '@/components/philosophy/BentoGrid';
import { Workstation } from '@/components/workstation/Workstation';
import { FaqSection } from '@/components/faq/FaqSection';
import { Footer } from '@/components/footer/Footer';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState<boolean>(true);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    // Instant deterministic scroll for testing & anchors
    const params = new URLSearchParams(window.location.search);
    const scrollY = params.get('scrollY');
    if (scrollY) {
      window.scrollTo({ top: parseInt(scrollY, 10), behavior: 'instant' });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#04060A] text-[#F8FAFC] relative">
      {/* 0. Minimal Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 1. Dynamic Floating Notch Navigation */}
      <Navbar />

      {/* 2. Hero Stage & 3D Flight Deck */}
      <Hero />

      {/* 3. Lower Sections Container with Deep Void Background (Prevents canvas bleed-through) */}
      <div className="relative z-10 bg-[#04060A] border-t border-white/10">
        {/* Capabilities Ticker Ribbon */}
        <Ticker />

        {/* "Systems Over Slop" Bento Grid */}
        <BentoGrid />

        {/* Interactive CLI Workstation */}
        <Workstation />

        {/* Hairline Monospace FAQ Accordion */}
        <FaqSection />

        {/* Monolithic Display Footer & Intake */}
        <Footer />
      </div>
    </main>
  );
}

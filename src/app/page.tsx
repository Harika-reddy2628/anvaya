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
  const [preloaderDone, setPreloaderDone] = useState<boolean>(false);

  return (
    <main className="min-h-screen bg-[#07090E] text-[#F8FAFC] relative">
      {/* 0. Minimal Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* 1. Dynamic Floating Notch Navigation */}
      <Navbar />

      {/* 2. Hero Stage & 3D Flight Deck */}
      <Hero />

      {/* 3. Capabilities Ticker Ribbon */}
      <Ticker />

      {/* 4. "Systems Over Slop" Bento Grid */}
      <BentoGrid />

      {/* 5. Interactive CLI Workstation */}
      <Workstation />

      {/* 6. Hairline Monospace FAQ Accordion */}
      <FaqSection />

      {/* 7. Monolithic Display Footer & Intake */}
      <Footer />
    </main>
  );
}

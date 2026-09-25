"use client";

import { useState } from "react";
import { AnvayaPreloader } from "./components/preloader/AnvayaPreloader";
import { Navbar } from "./components/navigation/Navbar";
import { HeroStage } from "./components/hero/HeroStage";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <AnvayaPreloader onComplete={() => setLoaded(true)} />}

      {/* Main site content — revealed after preloader exits */}
      <main
        className={`min-h-screen bg-[#07080D] text-[#F8FAFC] flex flex-col transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Navbar />
        <HeroStage />
      </main>
    </>
  );
}

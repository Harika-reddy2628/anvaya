import React from "react";
import { Navbar } from "@/components/Navbar";
import { ExpandStickyReveal } from "@/components/ExpandStickyReveal";
import { CapabilitiesRibbon } from "@/components/CapabilitiesRibbon";
import { PhilosophySection } from "@/components/PhilosophySection";
import { ProofOfWorkSection } from "@/components/ProofOfWorkSection";
import { SprintTiersSection } from "@/components/SprintTiersSection";
import { TimelineSection } from "@/components/TimelineSection";
import { SprintCalculator } from "@/components/SprintCalculator";
import { FaqSection } from "@/components/FaqSection";
import { IntakeSection } from "@/components/IntakeSection";
import { Footer } from "@/components/Footer";
import { AnvayaAgentDock } from "@/components/AnvayaAgentDock";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen bg-[#F8F9FC] text-[#0A0D17] flex flex-col font-sans overflow-x-hidden selection:bg-[#004CE8]/15 selection:text-[#004CE8]">
      {/* 1. Floating Dynamic Notch Navbar */}
      <Navbar />

      {/* 2. Hero & Central Expand -> Aceternity Sticky Scroll Reveal -> Shrink Back Down */}
      <ExpandStickyReveal />

      {/* Post-Architecture Content: Seamlessly docked directly below the 52px top strip */}
      <div className="relative -mt-[calc(100vh-52px)] z-10 bg-[#F8F9FC]">
        {/* 3. Capabilities Marquee Ribbon */}
        <CapabilitiesRibbon />

        {/* 4. Engineering Standard ("SYSTEMS OVER SLOP") */}
        <PhilosophySection />

        {/* 5. Proof of Work (Authentic Dev Tooling & Telemetry) */}
        <ProofOfWorkSection />

        {/* 6. Productized Service Tiers */}
        <SprintTiersSection />

        {/* 7. 14-Day Sprint Schedule Breakdown */}
        <TimelineSection />

        {/* 8. Interactive Scope & Budget Calculator */}
        <SprintCalculator />

        {/* 9. Frequently Asked Questions */}
        <FaqSection />

        {/* 10. Intake Form with React Bits Curved Input */}
        <IntakeSection />

        {/* 11. Monolithic Aceternity Text Hover Effect Footer */}
        <Footer />
      </div>

      {/* 12. Floating Interactive AI Agent Dock (Zara) */}
      <AnvayaAgentDock />
    </div>
  );
}

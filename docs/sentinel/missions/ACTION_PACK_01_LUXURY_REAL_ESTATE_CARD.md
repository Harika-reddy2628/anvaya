# SENTINEL ACTION PACK 01: LUXURY REAL ESTATE SHOWCASE STAGING
**Target Role:** Harika (`[SENTINEL]`)  
**Estimated Time:** 35 Minutes  
**Skill Focus:** High-End Tailwind CSS v4, Visual Hierarchy, Real Estate Commercial UI  
**Self-Verifying Success Gate:** A live, stunning luxury villa property card rendering on `localhost:3000` with interactive hover states and mobile responsiveness.

---

## 🎯 The Mission
Anvaya is pitching high-ticket real estate developers (CREDAI builders). Nikhil has wired the high-performance Next.js engine; your superpower is **visual luxury and aesthetic prestige**.

Builders don't buy code—they buy the feeling that their luxury project looks royal, opulent, and modern. You are going to build the **Luxury Property Card** that will be the centerpiece of our Dussehra pitch.

---

## 🛠️ Step-by-Step Execution Guide

### Step 1: Open the Project (2 mins)
1. Open terminal and navigate to `anvaya-web`:
   ```bash
   cd ~/anvaya-web
   npm run dev
   ```
2. Open your browser to `http://localhost:3000`. Keep it side-by-side with your code editor (VS Code / Cursor).

---

### Step 2: Create the Component File (3 mins)
Create a new file at: `src/components/realestate/LuxuryPropertyCard.tsx`.

Paste the following baseline component code:

```tsx
'use client';

import React from 'react';
import { ShieldCheck, Maximize2, Compass, Waves, ArrowRight } from 'lucide-react';

export interface PropertyCardProps {
  title?: string;
  location?: string;
  price?: string;
  carpetArea?: string;
  bhk?: string;
  imageUrl?: string;
}

export const LuxuryPropertyCard: React.FC<PropertyCardProps> = ({
  title = "The Sovereign Sky Residences",
  location = "VIP Road, Visakhapatnam",
  price = "₹3.85 Cr onwards",
  carpetArea = "4,200 Sq.Ft.",
  bhk = "4 BHK + Maid Room",
  imageUrl = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
}) => {
  return (
    <div className="group relative w-full max-w-md rounded-2xl bg-[#090C15] border border-white/10 p-4 transition-all duration-500 hover:border-[#A855F7]/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden">
      
      {/* 1. High-Res Architectural Imagery Stage */}
      <div className="relative h-64 w-full rounded-xl overflow-hidden bg-neutral-900">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Ceramic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C15] via-transparent to-black/30" />

        {/* Top Badges: RERA + Status */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
              RERA AP-2026-P91
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-300 uppercase">
            100% Vastu
          </div>
        </div>

        {/* Bottom Image Tag: Price */}
        <div className="absolute bottom-3 left-3">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Bespoke Pricing</div>
          <div className="text-xl font-bold font-clash text-white">{price}</div>
        </div>
      </div>

      {/* 2. Narrative Specifications Section */}
      <div className="pt-5 pb-2 space-y-4">
        <div>
          <h3 className="text-xl font-bold font-clash text-white group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          <p className="text-xs font-mono text-neutral-400 flex items-center gap-1 mt-1">
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            {location}
          </p>
        </div>

        {/* Key Luxury Metrics Matrix */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <div>
              <div className="text-[9px] font-mono text-neutral-500 uppercase">Carpet Area</div>
              <div className="text-xs font-semibold text-neutral-200">{carpetArea}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <div>
              <div className="text-[9px] font-mono text-neutral-500 uppercase">Configuration</div>
              <div className="text-xs font-semibold text-neutral-200">{bhk}</div>
            </div>
          </div>
        </div>

        {/* Tactile Material Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {["Italian Marble", "Private Elevator", "Infinity Pool", "Double Height Deck"].map((spec) => (
            <span key={spec} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono text-neutral-400">
              {spec}
            </span>
          ))}
        </div>

        {/* 3. High-Converting WhatsApp Action Button */}
        <a
          href="https://wa.me/919507779999?text=Hello%20Anvaya%2C%20I%20would%20like%20to%20schedule%20a%20VIP%20Site%20Visit%20for%20The%20Sovereign%20Sky%20Residences."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)] active:scale-[0.98]"
        >
          <span>Schedule VIP Site Visit</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};
```

---

### Step 3: Mount and View on Live Page (10 mins)
1. Open `src/app/page.tsx`.
2. Import the component at the top:
   ```tsx
   import { LuxuryPropertyCard } from '@/components/realestate/LuxuryPropertyCard';
   ```
3. Place it inside the main page right above the `<Footer />` or in the Bento Grid section:
   ```tsx
   <section className="py-20 px-6 max-w-7xl mx-auto">
     <div className="text-center mb-10 space-y-2">
       <span className="font-mono text-xs uppercase tracking-widest text-purple-400">// LIVE CREDAI DEMO</span>
       <h2 className="text-4xl font-clash font-bold text-white">Bespoke Architectural Staging</h2>
     </div>
     <div className="flex justify-center">
       <LuxuryPropertyCard />
     </div>
   </section>
   ```
4. Save and inspect your browser at `http://localhost:3000`.

---

### Step 4: Your Creative Design Touch (10 mins)
Now make it your own! Try changing:
1. The property title to a real prestigious local name (e.g. *"Vaikuntam Grandeur"*, *"Bayview Sky Villas"*).
2. The image URL with a modern architectural luxury render.
3. Tweak the accent glow color from `#A855F7` (purple) to a rich Royal Gold (`#F59E0B`) or Electric Cyan (`#00F5D4`).

---

### Step 5: Verification & Push (5 mins)
When you love how it looks on your screen:
1. Open Chrome DevTools (`Ctrl + Shift + M`) and test on iPhone / iPad view to make sure it looks stunning.
2. Commit your work in git:
   ```bash
   git add src/components/realestate/LuxuryPropertyCard.tsx src/app/page.tsx
   git commit -m "feat(realestate): luxury property showcase staged by sentinel"
   ```

**Mission Complete!** You have built a production-grade real estate asset that Nikhil can pull up on his phone and show to real builders in Vizag.

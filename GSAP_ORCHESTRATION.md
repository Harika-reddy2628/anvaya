# GSAP & Antigravity Orchestration Standard

> **Target Environment**: Next.js 16 (App Router), React 19, TypeScript  
> **Engine**: GSAP 3.15 + `@gsap/react` 2.1  
> **Standards Source**: GreenSock Official React Engineering Guidelines (`gsap.com/resources/React`) verified via Firecrawl Local.

---

## 1. Core Rule: Mandatory `@gsap/react` Lifecycle

In React 18/19 and Next.js App Router, **raw `useEffect` for GSAP is strictly prohibited**. 
Raw `useEffect` causes memory leaks, duplicate animations in StrictMode, and un-reverted ScrollTrigger pinned spacers.

### Safe Implementation Pattern
```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function KineticComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // ✅ All animations created here are automatically recorded in gsap.context()
      // and reverted when unmounted. Selector text is scoped to containerRef.
      gsap.from(".kinetic-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="kinetic-card">Card 1</div>
      <div className="kinetic-card">Card 2</div>
    </div>
  );
}
```

---

## 2. Interaction Safety: `contextSafe()`

Any animation created **after** component mount (e.g., inside click handlers, mouse move listeners, or deferred timers) is **not automatically garbage collected**.

To prevent memory leaks and selector scope collisions, all interactive callbacks **must be wrapped in `contextSafe()`**:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const { contextSafe } = useGSAP({ scope: buttonRef });

  // ✅ contextSafe ensures this animation is tracked and properly cleaned up
  const onMouseMove = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left - bounds.width / 2;
    const y = e.clientY - bounds.top - bounds.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  });

  return (
    <button
      ref={buttonRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="px-6 py-3 rounded-full bg-[#F59E0B] text-black font-semibold"
    >
      Schedule 14-Day Sprint
    </button>
  );
}
```

---

## 3. Pinned Scroll-Expand Cockpit Standard

For the hero section's pinned expanding cockpit drawer:

```tsx
useGSAP(
  () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-pinned-container",
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // 1. Lift and fade hero copy
    tl.to("#hero-copy", {
      y: -100,
      opacity: 0,
      ease: "power2.inOut",
    }, 0);

    // 2. Expand Cockpit Drawer to full screen
    tl.fromTo(
      "#cockpit-drawer",
      { y: "calc(100vh - 52px)" },
      { y: 0, ease: "power2.inOut" },
      0
    );

    // 3. Stagger showcase tiles inside the expanded cockpit
    tl.from(".showcase-tile", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      ease: "power3.out",
    }, 0.4);
  },
  { scope: heroContainerRef }
);
```

---

## 4. Performance & 60fps Invariants

1. **Hardware Acceleration**: Only animate `transform` (`x`, `y`, `scale`) and `opacity`. Never animate `top`, `left`, `width`, or `height` directly on high-frequency scroll.
2. **ScrollTrigger Normalization**: Call `ScrollTrigger.normalizeScroll(true)` on mobile to eliminate address-bar resize jitter.
3. **Layer Isolation**: Apply `will-change: transform` only to active animated containers to conserve GPU memory.

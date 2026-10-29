"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { afterIntro } from "../../lib/motion";

const Butterfly = dynamic(() => import("./Butterfly"), { ssr: false });

type Hints = Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };

/** The butterfly is decoration that costs three.js (~570 KB): skip it when the visitor saves data or the device is
    short on memory. */
function canAfford() {
  const hints = navigator as Hints;
  return !hints.connection?.saveData && !(hints.deviceMemory !== undefined && hints.deviceMemory < 4);
}

/** Loads the butterfly only for motion-allowed visitors; a live preference change removes it. */
export function ButterflyLayer() {
  const path = usePathname();
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!canAfford()) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(!preference.matches);
    // Mount once the opening has finished and the page is idle, so downloading and compiling three.js never
    // competes with the first paint or the headline entrance.
    let idle = 0;
    const stop = afterIntro(location.pathname, () => {
      const begin = () => { update(); preference.addEventListener("change", update); };
      idle = "requestIdleCallback" in window ? requestIdleCallback(begin, { timeout: 2500 }) : -setTimeout(begin, 1200);
    });
    return () => {
      stop(); preference.removeEventListener("change", update);
      if (idle > 0) cancelIdleCallback(idle); else clearTimeout(-idle);
    };
  }, []);
  return live ? <Butterfly path={path} /> : null;
}

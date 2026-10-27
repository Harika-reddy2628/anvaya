"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { afterIntro } from "../../lib/motion";

const Butterfly = dynamic(() => import("./Butterfly"), { ssr: false });

/** Loads the butterfly only for motion-allowed visitors; a live preference change removes it. */
export function ButterflyLayer() {
  const path = usePathname();
  const [live, setLive] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(!preference.matches);
    // Mount only once the opening has finished: compiling its shaders mid-intro stalls the main thread.
    const stop = afterIntro(location.pathname, () => { update(); preference.addEventListener("change", update); });
    return () => { stop(); preference.removeEventListener("change", update); };
  }, []);
  return live ? <Butterfly path={path} /> : null;
}

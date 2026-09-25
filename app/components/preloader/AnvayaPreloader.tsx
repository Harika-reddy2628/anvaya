"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AnvayaPreloaderProps {
  onComplete?: () => void;
}

export const AnvayaPreloader: React.FC<Readonly<AnvayaPreloaderProps>> = ({
  onComplete,
}) => {
  const loaderRef      = useRef<HTMLDivElement>(null);
  const sceneRef       = useRef<HTMLDivElement>(null);
  const wipeRef        = useRef<HTMLDivElement>(null);   // clip-path wipe overlay
  const archRef        = useRef<SVGPathElement>(null);
  const bridgeRef      = useRef<SVGPathElement>(null);
  const binduRef       = useRef<SVGCircleElement>(null);
  const brandRef       = useRef<HTMLDivElement>(null);
  const taglineRef     = useRef<HTMLParagraphElement>(null);
  const fillRef        = useRef<HTMLSpanElement>(null);
  const percentRef     = useRef<HTMLSpanElement>(null);
  const toplineRef     = useRef<HTMLElement>(null);
  const progressRowRef = useRef<HTMLElement>(null);
  const statusTextRef  = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const loader      = loaderRef.current;
      const scene       = sceneRef.current;
      const wipe        = wipeRef.current;
      const arch        = archRef.current;
      const bridge      = bridgeRef.current;
      const bindu       = binduRef.current;
      const brand       = brandRef.current;
      const tagline     = taglineRef.current;
      const fill        = fillRef.current;
      const percentEl   = percentRef.current;
      const topline     = toplineRef.current;
      const progressRow = progressRowRef.current;
      const statusText  = statusTextRef.current;

      if (
        !loader || !scene || !wipe || !arch || !bridge || !bindu ||
        !brand || !tagline || !fill || !percentEl ||
        !topline || !progressRow || !statusText
      ) return;

      const counter = { value: 0 };

      const tl = gsap.timeline({ onComplete: runExit });

      // ── Initial states ────────────────────────────────────────────────────
      gsap.set([brand, tagline], { opacity: 0, y: 20 });
      gsap.set(bindu, { opacity: 0, scale: 0, transformOrigin: "120px 109px" });
      gsap.set(arch,   { strokeDasharray: 520, strokeDashoffset: 520 });
      gsap.set(bridge, { strokeDasharray: 118, strokeDashoffset: 118 });

      // 1. Draw arch stroke
      tl.to(arch, { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" }, 0.1);

      // 2. Draw bridge
      tl.to(bridge, { strokeDashoffset: 0, duration: 0.48, ease: "power2.out" }, 0.88);

      // 3. Bindu — elastic pop
      tl.to(bindu, { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.5)" }, 1.12);

      // 4. Brand
      tl.to(brand, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 1.2);

      // 5. Tagline
      tl.to(tagline, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 1.42);

      // 6. Progress counter
      tl.to(counter, {
        value: 100, duration: 1.8, ease: "none",
        onUpdate() {
          const n = Math.round(counter.value);
          fill.style.width = `${n}%`;
          percentEl.textContent = `${String(n).padStart(2, "0")}%`;
        },
        onComplete() {
          percentEl.textContent = "100%";
          fill.style.width = "100%";
        },
      }, 1.55);

      // Status text cycling
      const statuses = [
        "Preparing the experience",
        "Loading design system",
        "Initialising engine",
        "Almost ready",
      ];
      statuses.forEach((text, i) => {
        tl.call(() => {
          gsap.to(statusText, {
            opacity: 0, y: -6, duration: 0.18, ease: "power2.in",
            onComplete() {
              if (!statusText) return;
              statusText.textContent = text;
              gsap.to(statusText, { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" });
            },
          });
        }, [], 1.55 + i * 0.45);
      });

      // ── EXIT — crisp clip-path circle wipe from exact bindu screen position ──
      // Uses CSS clip-path geometry, not rasterised scaling → always pixel-sharp
      function runExit() {
        if (!bindu || !wipe || !loader) return;

        // Sub-pixel accurate bindu centre
        const br   = bindu.getBoundingClientRect();
        const dotX = br.left + br.width  / 2;
        const dotY = br.top  + br.height / 2;

        // Radius that covers the farthest viewport corner from the bindu
        const maxR = Math.ceil(
          Math.max(
            Math.hypot(dotX,                         dotY),
            Math.hypot(window.innerWidth  - dotX,    dotY),
            Math.hypot(dotX,                         window.innerHeight - dotY),
            Math.hypot(window.innerWidth  - dotX,    window.innerHeight - dotY),
          )
        ) + 2; // +2px safety margin

        // Set wipe at radius 0, centred on the bindu
        gsap.set(wipe, {
          clipPath: `circle(0px at ${dotX}px ${dotY}px)`,
          visibility: "visible",
        });

        const exit = gsap.timeline({
          onComplete() {
            loader.style.pointerEvents = "none";
            loader.style.visibility   = "hidden";
            window.dispatchEvent(new CustomEvent("anvaya:loader-complete"));
            onComplete?.();
          },
        });

        // 1. HUD bars slide out
        exit.to(topline,     { y: -40, opacity: 0, duration: 0.35, ease: "power3.in" }, 0);
        exit.to(progressRow, { y:  40, opacity: 0, duration: 0.35, ease: "power3.in" }, 0.04);

        // 2. Text exits upward
        exit.to([brand, tagline], {
          y: -18, opacity: 0, duration: 0.28, ease: "power3.in", stagger: 0.04,
        }, 0.05);

        // 3. SVG strokes fade — bindu is the last thing visible
        exit.to([arch, bridge], { opacity: 0, duration: 0.22, ease: "power2.in" }, 0.08);

        // 4. Bindu swells — charging up before the wipe
        exit.to(bindu, {
          scale: 2.6, duration: 0.25, ease: "power2.in",
          transformOrigin: "120px 109px",
        }, 0.28);

        // 5. Clip-path circle punches out from the bindu — razor sharp
        exit.to(wipe, {
          clipPath: `circle(${maxR}px at ${dotX}px ${dotY}px)`,
          duration: 0.58,
          ease: "power4.in",
        }, 0.44);
      }
    },
    { scope: loaderRef }
  );

  return (
    <>
      {/* Grain texture filter — defined outside the main div so it isn't cloned */}
      <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }} aria-hidden="true">
        <defs>
          <filter id="anvaya-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="multiply" />
          </filter>
        </defs>
      </svg>

      <div
        ref={loaderRef}
        aria-live="polite"
        aria-label="Loading Anvaya"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          minHeight: "100vh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding: "30px 42px 34px",
          background: "var(--paper)",
          overflow: "hidden",
          // Promote loader to its own GPU layer
          transform: "translateZ(0)",
          willChange: "opacity, visibility",
        }}
      >
        {/* Grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            opacity: 0.038, filter: "url(#anvaya-grain)",
            background: "var(--ink)",
          }}
        />

        {/* ── Clip-path wipe overlay — sits on top, hidden until exit ── */}
        <div
          ref={wipeRef}
          aria-hidden="true"
          style={{
            position: "fixed", inset: 0,
            zIndex: 10000,
            background: "var(--paper)",
            visibility: "hidden",
            // GPU-composited property — no repaint during animation
            willChange: "clip-path",
            clipPath: "circle(0px at 50% 50%)",
          }}
        />

        {/* Topline */}
        <header
          ref={toplineRef}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "var(--ink)", position: "relative", zIndex: 1,
          }}
        >
          <span style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 18, fontWeight: 600, letterSpacing: "0.28em",
          }}>
            ANVAYA
          </span>
          <span style={{ color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
            01 / 01
          </span>
        </header>

        {/* Centre stage */}
        <section
          aria-hidden="true"
          style={{
            display: "grid", placeContent: "center",
            justifyItems: "center", textAlign: "center",
            transform: "translateY(-2.5vh)",
            position: "relative", zIndex: 1,
          }}
        >
          <div
            ref={sceneRef}
            style={{
              display: "grid", justifyItems: "center",
              willChange: "transform",
            }}
          >
            {/* SVG Mark — geometricPrecision for sub-pixel sharpness */}
            <svg
              viewBox="0 0 240 240"
              shapeRendering="geometricPrecision"
              style={{
                width: "clamp(112px, 14vw, 174px)",
                overflow: "visible",
                // Isolate on its own compositor layer
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <defs>
                <radialGradient id="bindu-glow" cx="50%" cy="45%" r="30%">
                  <stop offset="0%"   stopColor="#c7603f" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#c7603f" stopOpacity="0"    />
                </radialGradient>
              </defs>

              {/* Soft glow behind bindu */}
              <circle cx="120" cy="109" r="30" fill="url(#bindu-glow)" />

              {/* Arch */}
              <path
                ref={archRef}
                d="M48 178C62 133 78 81 120 42C162 81 178 133 192 178"
                fill="none"
                stroke="var(--ink)"
                strokeWidth={22}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Bridge */}
              <path
                ref={bridgeRef}
                d="M76 129C96 118 142 118 166 129"
                fill="none"
                stroke="var(--ink)"
                strokeWidth={14}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Bindu — the zoom anchor */}
              <circle
                ref={binduRef}
                cx="120" cy="109" r="8"
                fill="var(--bindu)"
                style={{ filter: "drop-shadow(0 0 5px rgba(199,96,63,0.55))" }}
              />
            </svg>

            {/* Brand name */}
            <div
              ref={brandRef}
              style={{
                margin: "22px 0 8px",
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                letterSpacing: "0.26em",
                lineHeight: 1,
                paddingLeft: "0.26em",
                color: "var(--ink)",
                fontWeight: 600,
              }}
            >
              ANVAYA
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              style={{
                margin: 0, color: "var(--muted)",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
              }}
            >
              Building with intent
            </p>
          </div>
        </section>

        {/* Progress row */}
        <footer
          ref={progressRowRef}
          style={{
            display: "grid",
            gridTemplateColumns: "auto minmax(180px, 1fr) auto",
            gap: 20, alignItems: "center",
            maxWidth: 660, width: "100%", justifySelf: "center",
            fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
            position: "relative", zIndex: 1,
          }}
        >
          <span ref={statusTextRef} style={{ color: "var(--muted)" }}>
            Preparing the experience
          </span>

          <span style={{
            height: 1, background: "var(--line)", overflow: "hidden",
            display: "block", position: "relative",
          }}>
            <span
              ref={fillRef}
              style={{
                display: "block", height: "100%", width: "0%",
                background: "var(--ink)",
                position: "absolute", top: 0, left: 0,
              }}
            />
          </span>

          <span
            ref={percentRef}
            style={{
              minWidth: 34, textAlign: "right",
              color: "var(--ink)", fontVariantNumeric: "tabular-nums",
            }}
          >
            00%
          </span>
        </footer>
      </div>
    </>
  );
};

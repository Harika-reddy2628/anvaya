"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { animate, type JSAnimation } from "animejs";

interface KineticStageProps {
  paused?: boolean;
}

export function KineticConnectorStage({ paused = false }: KineticStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // References to kinetic form elements
  const nodeCobalt1Ref = useRef<SVGGElement>(null);
  const nodeCobalt2Ref = useRef<SVGGElement>(null);
  const nodeWhite1Ref = useRef<SVGGElement>(null);
  const nodeWhite2Ref = useRef<SVGGElement>(null);
  const nodeDark1Ref = useRef<SVGGElement>(null);
  const nodeDark2Ref = useRef<SVGGElement>(null);
  const pulseLinesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const glow = glowRef.current;
    if (!container || !stage || !glow) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // 1. GSAP Pointer Tracking & 3D Tilt
    const setRotateX = gsap.quickTo(stage, "rotationX", {
      duration: 0.6,
      ease: "power2.out",
    });
    const setRotateY = gsap.quickTo(stage, "rotationY", {
      duration: 0.6,
      ease: "power2.out",
    });
    const setGlowX = gsap.quickTo(glow, "x", {
      duration: 0.8,
      ease: "power2.out",
    });
    const setGlowY = gsap.quickTo(glow, "y", {
      duration: 0.8,
      ease: "power2.out",
    });

    const handlePointerMove = (e: PointerEvent) => {
      if (paused || reducedMotion || e.pointerType === "touch") return;
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      // ±7 degrees tilt
      setRotateY(nx * 14);
      setRotateX(-ny * 12);

      // Radial spotlight shift
      setGlowX(nx * 120);
      setGlowY(ny * 90);
    };

    const handlePointerLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setGlowX(0);
      setGlowY(0);
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave);

    // 2. Anime.js Ambient Kinetic Floating & Drift
    const animations: JSAnimation[] = [];

    if (!reducedMotion) {
      // Cobalt Node 1 (Center-right focal cross) - Slow breathing drift
      if (nodeCobalt1Ref.current) {
        animations.push(
          animate(nodeCobalt1Ref.current, {
            translateY: [-8, 8],
            rotate: [-2, 3],
            duration: 4800,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }

      // White Node 1 (Center-left ring) - Counter float
      if (nodeWhite1Ref.current) {
        animations.push(
          animate(nodeWhite1Ref.current, {
            translateY: [7, -7],
            translateX: [-5, 5],
            rotate: [2, -3],
            duration: 5400,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }

      // Cobalt Node 2 (Upper-left satellite)
      if (nodeCobalt2Ref.current) {
        animations.push(
          animate(nodeCobalt2Ref.current, {
            translateY: [-6, 6],
            rotate: [5, -4],
            duration: 4200,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }

      // White Node 2 (Upper-right bracket)
      if (nodeWhite2Ref.current) {
        animations.push(
          animate(nodeWhite2Ref.current, {
            translateY: [6, -6],
            rotate: [-3, 4],
            duration: 6000,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }

      // Dark Anchors (Deep layers, subtle movement)
      if (nodeDark1Ref.current) {
        animations.push(
          animate(nodeDark1Ref.current, {
            translateY: [-4, 4],
            duration: 6500,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }
      if (nodeDark2Ref.current) {
        animations.push(
          animate(nodeDark2Ref.current, {
            translateY: [4, -4],
            duration: 7200,
            ease: "easeInOutSine",
            alternate: true,
            loop: true,
          }),
        );
      }

      // Signal flow on connection pathways
      if (pulseLinesRef.current) {
        const dashedPaths = pulseLinesRef.current.querySelectorAll("path");
        dashedPaths.forEach((p, idx) => {
          animations.push(
            animate(p, {
              strokeDashoffset: [0, -120],
              duration: 2400 + idx * 400,
              ease: "linear",
              loop: true,
            }),
          );
        });
      }
    }

    // Pause/Resume handling for Anime.js
    if (paused) {
      animations.forEach((a) => a.pause?.());
    } else {
      animations.forEach((a) => a.play?.());
    }

    // 3. Teardown
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      animations.forEach((a) => {
        a.pause?.();
        a.revert?.();
      });
      gsap.killTweensOf(stage);
      gsap.killTweensOf(glow);
    };
  }, [paused]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-[#101116] flex items-center justify-center"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      {/* Dynamic Background Spotlight Radial Glow */}
      <div
        ref={glowRef}
        className="absolute w-[600px] h-[450px] rounded-full pointer-events-none opacity-40 blur-[90px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(36, 84, 255, 0.45) 0%, rgba(20, 22, 31, 0.2) 60%, transparent 100%)",
        }}
      />

      {/* Subtle Engineering Grid & Coordinates */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(#f8fafc_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.14em] text-[#b9becd]/60 uppercase pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2454ff] animate-pulse" />
        <span>ANVAYA // SPATIAL SYNTAX HARNESS</span>
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.12em] text-[#b9becd]/50 uppercase pointer-events-none hidden sm:block">
        <span>LOC // 12.9716° N · 77.5946° E [BLR]</span>
      </div>

      {/* 3D Perspective Stage Group */}
      <div
        ref={stageRef}
        className="relative w-full max-w-[900px] h-full max-h-[560px] flex items-center justify-center transition-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 1000 650"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Focal Cobalt Gradient */}
            <linearGradient id="cobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d72ff" />
              <stop offset="45%" stopColor="#2454ff" />
              <stop offset="100%" stopColor="#0d35ca" />
            </linearGradient>

            {/* Porcelain White Gradient */}
            <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f0f3fa" />
              <stop offset="100%" stopColor="#d5dbe9" />
            </linearGradient>

            {/* Deep Obsidian Charcoal Gradient */}
            <linearGradient id="charcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2a2d3d" />
              <stop offset="50%" stopColor="#181a24" />
              <stop offset="100%" stopColor="#0d0e14" />
            </linearGradient>

            {/* Rim Highlight Gradients */}
            <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>

            {/* Glow Filters */}
            <filter id="cobaltGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="16"
                stdDeviation="24"
                floodColor="#2454ff"
                floodOpacity="0.4"
              />
            </filter>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="18"
                floodColor="#000000"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          {/* 1. Background Conduit Signal Lines */}
          <g ref={pulseLinesRef} opacity="0.35">
            <path
              d="M240 220 C 350 200, 450 310, 580 320"
              stroke="#2454ff"
              strokeWidth="2"
              strokeDasharray="8 12"
            />
            <path
              d="M580 320 C 690 330, 720 220, 800 230"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="6 10"
            />
            <path
              d="M340 430 C 420 380, 520 350, 580 320"
              stroke="#2454ff"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
            <path
              d="M580 320 C 640 400, 700 440, 760 460"
              stroke="#8a94b0"
              strokeWidth="2"
              strokeDasharray="8 14"
            />
          </g>

          {/* 2. Deep Layer: Obsidian Charcoal Anchors */}
          <g ref={nodeDark2Ref} style={{ transform: "translate(220px, 440px)" }}>
            <rect
              x="-45"
              y="-45"
              width="90"
              height="90"
              rx="20"
              fill="url(#charcoalGrad)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              filter="url(#softShadow)"
            />
            <circle cx="0" cy="0" r="16" fill="#0d0e14" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </g>

          <g ref={nodeDark1Ref} style={{ transform: "translate(780px, 470px)" }}>
            <rect
              x="-55"
              y="-55"
              width="110"
              height="110"
              rx="26"
              fill="url(#charcoalGrad)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              filter="url(#softShadow)"
            />
            <circle cx="0" cy="0" r="22" fill="#12131c" stroke="#2454ff" strokeWidth="2" strokeOpacity="0.6" />
          </g>

          {/* 3. Mid Layer: Porcelain White Conduit Nodes */}
          <g ref={nodeWhite2Ref} style={{ transform: "translate(800px, 210px)" }}>
            <circle
              cx="0"
              cy="0"
              r="46"
              fill="url(#whiteGrad)"
              stroke="url(#rimHighlight)"
              strokeWidth="2"
              filter="url(#softShadow)"
            />
            <circle cx="0" cy="0" r="22" fill="#101116" stroke="rgba(0,0,0,0.1)" strokeWidth="2" />
          </g>

          <g ref={nodeWhite1Ref} style={{ transform: "translate(340px, 350px)" }}>
            {/* White Beveled Conduit Torus / Ring */}
            <circle
              cx="0"
              cy="0"
              r="72"
              fill="url(#whiteGrad)"
              stroke="url(#rimHighlight)"
              strokeWidth="2.5"
              filter="url(#softShadow)"
            />
            <circle cx="0" cy="0" r="38" fill="#101116" stroke="rgba(20,22,30,0.5)" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#2454ff" />
          </g>

          {/* 4. Foreground Layer: Upper-Left Cobalt Satellite Cross */}
          <g ref={nodeCobalt2Ref} style={{ transform: "translate(240px, 180px)" }}>
            <path
              d="M-18 -55 L18 -55 L18 -18 L55 -18 L55 18 L18 18 L18 55 L-18 55 L-18 18 L-55 18 L-55 -18 L-18 -18 Z"
              fill="url(#cobaltGrad)"
              stroke="url(#rimHighlight)"
              strokeWidth="2"
              strokeLinejoin="round"
              filter="url(#cobaltGlow)"
            />
            <circle cx="0" cy="0" r="8" fill="#ffffff" opacity="0.9" />
          </g>

          {/* 5. Centerpiece: Master Focal Cobalt Cross (Form 1) */}
          <g ref={nodeCobalt1Ref} style={{ transform: "translate(580px, 320px)" }}>
            {/* Shadow & Glow */}
            <path
              d="M-36 -115 L36 -115 L36 -36 L115 -36 L115 36 L36 36 L36 115 L-36 115 L-36 36 L-115 36 L-115 -36 L-36 -36 Z"
              fill="url(#cobaltGrad)"
              filter="url(#cobaltGlow)"
            />
            {/* Main Beveled Body */}
            <path
              d="M-36 -115 L36 -115 L36 -36 L115 -36 L115 36 L36 36 L36 115 L-36 115 L-36 36 L-115 36 L-115 -36 L-36 -36 Z"
              fill="url(#cobaltGrad)"
              stroke="url(#rimHighlight)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Inner Precision Core */}
            <circle cx="0" cy="0" r="24" fill="#0c2bb0" stroke="#5284ff" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="10" fill="#ffffff" />
            {/* Cross Corner Highlights */}
            <circle cx="-36" cy="-36" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="36" cy="-36" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="36" cy="36" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="-36" cy="36" r="3" fill="#ffffff" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}

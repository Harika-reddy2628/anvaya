"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate, type JSAnimation } from "animejs";
import { Box, MoveUpRight, RotateCcw, Scan, Square } from "lucide-react";

type Point = [number, number, number];
type Solid = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  color: string;
  accent?: boolean;
};

const solids: Solid[] = [
  { x: -3.2, y: -0.2, z: -2.4, w: 6.4, h: 0.2, d: 4.8, color: "#e5e0d4" },
  { x: -3.2, y: 0, z: -2.4, w: 6.4, h: 1.4, d: 0.1, color: "#f7f4ed" },
  { x: -3.2, y: 0, z: -2.4, w: 0.1, h: 1.4, d: 4.8, color: "#f7f4ed" },
  { x: 0.8, y: 0, z: -2.4, w: 0.1, h: 1.1, d: 1.6, color: "#f7f4ed" },
  { x: 0.8, y: 0, z: 0.1, w: 0.1, h: 1.1, d: 2.3, color: "#f7f4ed" },
  { x: 0.8, y: 0, z: -0.25, w: 2.4, h: 1.1, d: 0.1, color: "#f7f4ed" },
  { x: -2.8, y: 0.03, z: -1.6, w: 2.7, h: 0.03, d: 2.7, color: "#d9c5ac" },
  { x: -2.8, y: 0.05, z: -1.9, w: 2.5, h: 0.45, d: 0.75, color: "#f0ede4" },
  { x: -2.8, y: 0.05, z: -1.2, w: 0.7, h: 0.4, d: 1.7, color: "#f0ede4" },
  { x: -2.8, y: 0.5, z: -1.9, w: 2.5, h: 0.12, d: 0.12, color: "#c9c4b8" },
  {
    x: -1.7,
    y: 0.05,
    z: -0.35,
    w: 1.2,
    h: 0.35,
    d: 0.7,
    color: "#b8442d",
    accent: true,
  },
  { x: -0.4, y: 0.05, z: -1.8, w: 0.8, h: 0.28, d: 0.8, color: "#c9c4b8" },
  { x: -2.5, y: 0.04, z: 1.3, w: 2.7, h: 0.06, d: 0.65, color: "#f7f4ed" },
  { x: -2.4, y: 0.1, z: 1.35, w: 0.06, h: 0.7, d: 0.5, color: "#a4a397" },
  { x: 0.0, y: 0.1, z: 1.35, w: 0.06, h: 0.7, d: 0.5, color: "#a4a397" },
  { x: -2.5, y: 0.8, z: 1.3, w: 2.7, h: 0.08, d: 0.65, color: "#d2cbbf" },
  {
    x: -1.7,
    y: 0.9,
    z: 1.55,
    w: 0.55,
    h: 0.35,
    d: 0.06,
    color: "#b8442d",
    accent: true,
  },
  { x: 1.2, y: 0.06, z: 0.3, w: 1.6, h: 0.25, d: 1.8, color: "#cec8ba" },
  { x: 1.2, y: 0.3, z: 0.3, w: 1.6, h: 0.16, d: 1.8, color: "#f7f4ed" },
  { x: 1.2, y: 0.46, z: 1.4, w: 1.6, h: 0.04, d: 0.7, color: "#c29771" },
  { x: 1.35, y: 0.46, z: 0.42, w: 0.55, h: 0.1, d: 0.4, color: "#f7f4ed" },
  { x: 2.08, y: 0.46, z: 0.42, w: 0.55, h: 0.1, d: 0.4, color: "#f7f4ed" },
  { x: 1.15, y: 0.02, z: -2.0, w: 1.6, h: 0.65, d: 0.6, color: "#d5cbb8" },
  { x: 1.15, y: 0.67, z: -2.0, w: 1.6, h: 0.04, d: 0.6, color: "#f7f4ed" },
  { x: 2.75, y: 0.05, z: -1.9, w: 0.22, h: 0.55, d: 0.22, color: "#92a18b" },
];

const roomRegions: Record<
  string,
  { x: number; z: number; w: number; d: number }
> = {
  living: { x: -3.05, z: -2.2, w: 3.7, d: 3.25 },
  workspace: { x: -3.05, z: 1.1, w: 3.7, d: 1.15 },
  suite: { x: 1.0, z: 0.0, w: 2.05, d: 2.25 },
};

export function SpatialDemo({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  const [camera, setCamera] = useState({ angle: 35, pitch: 35 });
  const [mode, setMode] = useState("orbit");
  const [room, setRoom] = useState("living");
  const [wireframe, setWireframe] = useState(false);
  const animation = useRef<JSAnimation | null>(null);
  const drag = useRef<{ start: number; angle: number } | null>(null);

  useEffect(
    () => () => {
      animation.current?.cancel();
    },
    [],
  );

  function changeView(view: string) {
    animation.current?.cancel();
    setMode(view);
    const next =
      view === "plan" ? { angle: 0, pitch: 89.9 } : { angle: 35, pitch: 35 };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCamera(next);
      return;
    }
    const value = { ...camera };
    animation.current = animate(value, {
      ...next,
      duration: 650,
      ease: "inOutQuart",
      onUpdate: () => setCamera({ ...value }),
    });
  }

  const a = (camera.angle * Math.PI) / 180;
  const p = (camera.pitch * Math.PI) / 180;
  const project = ([x, y, z]: Point) => [
    340 + (x * Math.cos(a) + z * Math.sin(a)) * 66,
    285 +
      ((z * Math.cos(a) - x * Math.sin(a)) * Math.sin(p) - y * Math.cos(p)) *
        66,
  ];
  const depth = ([x, y, z]: Point) =>
    (z * Math.cos(a) - x * Math.sin(a)) * Math.cos(p) + y * Math.sin(p);
  const faces = solids
    .flatMap((s, i) => {
      const { x, y, z, w, h, d } = s;
      const corners: Point[][] = [
        [
          [x, y + h, z],
          [x + w, y + h, z],
          [x + w, y + h, z + d],
          [x, y + h, z + d],
        ],
        [
          [x, y, z + d],
          [x + w, y, z + d],
          [x + w, y + h, z + d],
          [x, y + h, z + d],
        ],
        [
          [x + w, y, z],
          [x + w, y, z + d],
          [x + w, y + h, z + d],
          [x + w, y + h, z],
        ],
      ];
      return corners.map((points, j) => ({
        key: `${i}-${j}`,
        points: points.map((point) => project(point).join(",")).join(" "),
        depth:
          i === 0
            ? -999 + j
            : points.reduce((total, point) => total + depth(point), 0) / 4,
        fill: wireframe ? "#f5efe5" : s.color,
        opacity: j === 0 ? 1 : j === 1 ? 0.82 : 0.65,
        accent: s.accent,
      }));
    })
    .sort((left, right) => left.depth - right.depth);
  const region = roomRegions[room];
  const regionPoints: Point[] = [
    [region.x, 0.025, region.z],
    [region.x + region.w, 0.025, region.z],
    [region.x + region.w, 0.025, region.z + region.d],
    [region.x, 0.025, region.z + region.d],
  ];

  return (
    <div className={`spatial-demo ${compact ? "spatial-compact" : ""}`}>
      <div className="demo-topline">
        <span>
          <span className="small-square" /> SPATIAL EXPLORER
        </span>
        <span>INTERACTIVE STUDY / 01</span>
      </div>
      <div className="spatial-canvas">
        <span className="diagram-coordinate coordinate-left">X / Y / Z</span>
        <span className="diagram-coordinate coordinate-right">
          ANVAYA — SPATIAL
        </span>
        <svg
          viewBox="0 0 680 500"
          role="img"
          aria-label={`Illustrative apartment in ${mode} view, ${room} selected. Use the controls below to explore.`}
          onPointerDown={(event) => {
            if (mode === "plan") return;
            animation.current?.cancel();
            drag.current = { start: event.clientX, angle: camera.angle };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (drag.current)
              setCamera((previous) => ({
                ...previous,
                angle: Math.min(
                  75,
                  Math.max(
                    -35,
                    drag.current!.angle +
                      (event.clientX - drag.current!.start) * 0.3,
                  ),
                ),
              }));
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <defs>
            <pattern
              id={`grid-${id}`}
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0H0V30"
                fill="none"
                stroke="#d9cbbb"
                strokeWidth="0.55"
              />
            </pattern>
          </defs>
          <rect width="680" height="500" fill={`url(#grid-${id})`} />
          <ellipse
            cx="340"
            cy="378"
            rx="222"
            ry="44"
            fill="#28251f"
            opacity="0.035"
          />
          <g
            stroke="#777970"
            strokeWidth={wireframe ? "0.9" : "0.65"}
            strokeLinejoin="round"
          >
            {faces.map((face) => (
              <polygon
                key={face.key}
                points={face.points}
                fill={face.fill}
                fillOpacity={face.opacity}
                stroke={face.accent ? "#b8442d" : undefined}
              />
            ))}
          </g>
          <polygon
            points={regionPoints
              .map((point) => project(point).join(","))
              .join(" ")}
            fill="#b8442d"
            fillOpacity="0.06"
            stroke="#b8442d"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <g stroke="#b8442d" strokeWidth="1" fill="none">
            <path d="M42 396v48h48M638 104V56h-48" />
            <path d="M55 56h14m-7-7v14M612 438h14m-7-7v14" />
          </g>
          <text
            x="48"
            y="474"
            fill="#62645e"
            fontSize="10"
            fontFamily="monospace"
            letterSpacing="1.4"
          >
            {mode === "plan" ? "PLAN VIEW" : "AXONOMETRIC VIEW"} · SAMPLE
            GEOMETRY
          </text>
          <text
            x="633"
            y="474"
            textAnchor="end"
            fill="#b8442d"
            fontSize="10"
            fontFamily="monospace"
          >
            {camera.angle.toFixed(0)}°
          </text>
        </svg>
        <div className="room-selector" aria-label="Select a room">
          {[
            ["living", "Living"],
            ["workspace", "Workspace"],
            ["suite", "Suite"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={room === value}
              onClick={() => setRoom(value)}
            >
              {label}
              {room === value && <MoveUpRight size={11} aria-hidden="true" />}
            </button>
          ))}
        </div>
      </div>
      <div className="demo-controls">
        <div className="view-controls">
          <button
            type="button"
            aria-pressed={mode === "orbit"}
            onClick={() => changeView("orbit")}
          >
            <Box size={14} aria-hidden="true" /> Orbit
          </button>
          <button
            type="button"
            aria-pressed={mode === "plan"}
            onClick={() => changeView("plan")}
          >
            <Square size={14} aria-hidden="true" /> Plan
          </button>
        </div>
        <div className="view-controls">
          <button
            className="icon-button"
            type="button"
            aria-label="Toggle wireframe"
            aria-pressed={wireframe}
            onClick={() => setWireframe(!wireframe)}
          >
            <Scan size={17} />
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label="Reset spatial view"
            onClick={() => {
              changeView("orbit");
              setRoom("living");
              setWireframe(false);
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
      {!compact && (
        <label className="rotation-control">
          <span>ROTATE THE SPACE</span>
          <input
            type="range"
            min="-35"
            max="75"
            value={camera.angle}
            disabled={mode === "plan"}
            aria-label="Rotate apartment view"
            onChange={(event) => {
              animation.current?.cancel();
              setCamera((previous) => ({
                ...previous,
                angle: Number(event.target.value),
              }));
            }}
          />
          <span>↔</span>
        </label>
      )}
    </div>
  );
}

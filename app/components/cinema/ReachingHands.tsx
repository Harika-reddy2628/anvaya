"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { prefersReducedMotion, ScrollTrigger } from "../../lib/motion";

// Each hand is drawn once into a small offscreen canvas and sampled on a dot grid, so the figure reads as a
// dot-matrix print. Coordinates are in that canvas's pixels, with the forearm entering from the left edge.
const W = 320, H = 110, STEP = 2.2, TIP = 278, SHIFT = 100;
type Stroke = [number, number][];
const LEFT: { width: number; path: Stroke }[] = [
  { width: 34, path: [[-110, 50], [70, 55], [96, 56]] }, // forearm
  { width: 30, path: [[94, 56], [118, 55]] }, // palm
  { width: 11, path: [[108, 46], [122, 38], [134, 36]] }, // thumb
  { width: 9.5, path: [[124, 50], [150, 47], [174, 47]] }, // index, reaching
  { width: 9.5, path: [[125, 58], [146, 60], [156, 70]] }, // middle, relaxed
  { width: 9, path: [[122, 63], [140, 70], [146, 80]] }, // ring
  { width: 8, path: [[116, 67], [130, 75], [133, 84]] }, // little
];
// The other hand: a mirrored pose with a firmer reach and a little more curl.
const RIGHT = LEFT.map(({ width, path }, i) => ({
  width,
  path: path.map(([x, y]): [number, number] => [x, y + (i === 3 ? -2 : i > 3 ? 3 : 0)]),
}));

/** Samples a hand into dot positions (x right, y up, z towards the viewer), centred on its fingertip. */
function sampleHand(strokes: typeof LEFT, mirror: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.strokeStyle = "#fff";
  for (const { width, path } of strokes) {
    ctx.lineWidth = width; ctx.beginPath();
    path.forEach(([x, y], i) => i ? ctx.lineTo(x + SHIFT, y) : ctx.moveTo(x + SHIFT, y));
    ctx.stroke();
  }
  const data = ctx.getImageData(0, 0, W, H).data;
  // Floor, not round: a sample near the right edge must not wrap into the next row.
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H && data[(Math.floor(y) * W + Math.floor(x)) * 4 + 3] > 128;
  const points: number[] = [];
  for (let y = STEP / 2; y < H; y += STEP) for (let x = STEP / 2; x < W; x += STEP) {
    if (!inside(x, y)) continue;
    // Depth from how far the dot sits inside the outline, so fingers and the forearm round towards the viewer.
    let depth = 0;
    for (let r = 1; r <= 6 && inside(x + r * STEP, y) && inside(x - r * STEP, y) && inside(x, y + r * STEP) && inside(x, y - r * STEP); r++) depth = r;
    const px = (x - TIP) / 40 * (mirror ? -1 : 1);
    points.push(px, (H / 2 - y) / 40, depth * .07);
  }
  return new Float32Array(points);
}

/** Two dot-matrix hands, drawn from the edges, close the gap between them as the section scrolls through: अन्वय,
    connection. Rendered only when scroll or the pointer changes something; nothing turns or orbits. */
export function ReachingHands() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    const still = prefersReducedMotion();
    const left = sampleHand(LEFT, false), right = sampleHand(RIGHT, true);

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); } catch { drawFlat(target, left, right); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    const uniforms = { uReach: { value: still ? .92 : 0 }, uScale: { value: 1 } };
    const material = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `uniform float uReach; uniform float uScale; attribute float aSide; varying float vGlow;
        void main() {
          vec3 p = position;
          // Each hand slides in from its edge; the gap at the fingertips narrows to a hair as uReach reaches 1.
          p.x += aSide * mix(1.9, .07, uReach);
          vGlow = smoothstep(2.4, 0., abs(p.x)) * (.35 + .65 * uReach);
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_PointSize = uScale * (1. + p.z * .7) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying float vGlow;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          vec3 c = mix(vec3(.74, .82, .95), vec3(.56, .85, 1.), vGlow);
          gl_FragColor = vec4(c, smoothstep(.5, .3, d) * (.62 + .38 * vGlow));
        }`,
    });
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(left.length + right.length);
    positions.set(left); positions.set(right, left.length);
    const sides = new Float32Array(positions.length / 3).fill(1, left.length / 3);
    sides.fill(-1, 0, left.length / 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
    scene.add(new THREE.Points(geometry, material));

    // The spark between the fingertips, brightest once the hands nearly touch.
    const sparkMaterial = new THREE.SpriteMaterial({ map: sparkTexture(), color: "#7fd0ff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
    const spark = new THREE.Sprite(sparkMaterial);
    spark.position.set(0, .05, .2);
    scene.add(spark);

    const state = { reach: uniforms.uReach.value, goal: uniforms.uReach.value, px: 0, py: 0, cx: 0, cy: 0 };
    let frame = 0, disposed = false;
    function draw() {
      state.reach += (state.goal - state.reach) * .12;
      state.cx += (state.px - state.cx) * .08;
      state.cy += (state.py - state.cy) * .08;
      uniforms.uReach.value = state.reach;
      const near = THREE.MathUtils.smoothstep(state.reach, .7, 1);
      sparkMaterial.opacity = near * .9;
      spark.scale.setScalar(.25 + near * .55);
      // The camera drifts a little with the pointer, so the dots part in depth; the hands themselves never turn.
      camera.position.set(state.cx * 1.2, -state.cy * .6, camera.position.z);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      budget.tick();
      target!.dataset.scene = "ready";
    }
    // Render on demand: run frames only until the eased values settle, then stop.
    const tick = () => {
      frame = 0;
      if (disposed) return;
      draw();
      const moving = Math.abs(state.goal - state.reach) > .001 || Math.abs(state.px - state.cx) > .001 || Math.abs(state.py - state.cy) > .001;
      if (moving) frame = requestAnimationFrame(tick);
    };
    const request = () => { if (!frame && !disposed) { budget.reset(); frame = requestAnimationFrame(tick); } };
    const budget = frameBudget(renderer, {
      resize: () => resize(),
      onTooSlow: () => { teardown(); drawFlat(target, left, right); },
    });
    function resize() {
      const w = target!.clientWidth, h = target!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Fit both hands at their widest (fully apart) across the canvas width.
      // Narrow panels crop the forearms rather than shrinking the hands.
      const halfWidth = camera.aspect < 2 ? 3.4 : 5.4, half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      camera.position.z = Math.max(halfWidth / half, 5.5);
      camera.updateProjectionMatrix();
      uniforms.uScale.value = h * renderer.getPixelRatio() * .058;
      draw();
    }
    const sizes = new ResizeObserver(resize);
    sizes.observe(target);
    resize();

    let trigger: ScrollTrigger | undefined;
    const move = (event: PointerEvent) => {
      const box = target.getBoundingClientRect();
      state.px = (event.clientX - box.left) / box.width - .5;
      state.py = (event.clientY - box.top) / box.height - .5;
      request();
    };
    if (!still) {
      trigger = ScrollTrigger.create({ trigger: target, start: "top 85%", end: "center 62%", onUpdate: self => { state.goal = self.progress; request(); } });
      state.goal = trigger.progress;
      target.addEventListener("pointermove", move, { passive: true });
      request();
    }

    function teardown() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      trigger?.kill();
      target!.removeEventListener("pointermove", move);
      sizes.disconnect();
      geometry.dispose(); material.dispose(); sparkMaterial.map?.dispose(); sparkMaterial.dispose();
      renderer.dispose(); renderer.domElement.remove();
    }
    return teardown;
  }, []);
  return <div className="reaching-hands" ref={host} aria-hidden="true" />;
}

function sparkTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0, "rgba(255,255,255,1)"); glow.addColorStop(.25, "rgba(160,220,255,.6)"); glow.addColorStop(1, "rgba(79,184,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/** Without WebGL (or on a device too slow for it) the same dots are printed flat, with the hands nearly touching. */
function drawFlat(target: HTMLDivElement, left: Float32Array, right: Float32Array) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  target.appendChild(canvas);
  const ratio = Math.min(devicePixelRatio, 2), w = target.clientWidth, h = target.clientHeight;
  canvas.width = w * ratio; canvas.height = h * ratio;
  canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
  const ctx = canvas.getContext("2d")!;
  const unit = w < h * 2 ? w / 6.8 : Math.min(w / 10.8, h / 3.4), dot = Math.max(1, unit * .022) * ratio;
  ctx.fillStyle = "rgba(190,210,242,.8)";
  for (const [points, side] of [[left, -1], [right, 1]] as const) for (let i = 0; i < points.length; i += 3) {
    ctx.beginPath();
    ctx.arc((w / 2 + (points[i] + side * .07) * unit) * ratio, (h / 2 - points[i + 1] * unit) * ratio, dot, 0, Math.PI * 2);
    ctx.fill();
  }
  target.dataset.scene = "flat";
}

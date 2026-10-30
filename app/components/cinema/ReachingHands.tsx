"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/motion";

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
const DUST = 520;

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

/** The About hero's living background: two dot-matrix hands reach in and almost touch — अन्वय, connection. The
    dots twinkle and ripple, dust drifts in depth, the camera follows the pointer and scrolling scatters the dots.
    Runs only while on screen; reduced motion shows one still frame with the hands nearly touching. */
export function ReachingHands() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    const still = prefersReducedMotion();
    const left = sampleHand(LEFT, false), right = sampleHand(RIGHT, true);

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" }); } catch { drawFlat(target, left, right); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    const rig = new THREE.Group();
    scene.add(rig);
    const uniforms = { uReach: { value: still ? 1 : 0 }, uScale: { value: 1 }, uTime: { value: 0 }, uScatter: { value: 0 } };

    const handMaterial = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false,
      vertexShader: `uniform float uReach; uniform float uScale; uniform float uTime; uniform float uScatter;
        attribute float aSide; attribute vec4 aRand; varying float vGlow; varying float vAlpha;
        void main() {
          vec3 p = position;
          // Each hand slides in from its edge; the gap at the fingertips narrows to a hair as uReach reaches 1.
          p.x += aSide * mix(2.4, .07, uReach);
          // A slow ripple runs along the arms towards the fingertips.
          float wave = sin(p.x * 1.5 * aSide + uTime * 1.4);
          p.z += wave * .035; p.y += sin(p.x * .8 + uTime * .5) * .025;
          // Scrolling away scatters the dots outward like dust.
          p += (aRand.xyz - .5) * vec3(3., 2.4, 4.) * uScatter * (.6 + aRand.w);
          vGlow = smoothstep(2.6, 0., abs(p.x)) * (.3 + .7 * uReach);
          vAlpha = (.55 + .45 * sin(uTime * (1. + aRand.w) + aRand.w * 40.)) * (1. - uScatter * .85);
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_PointSize = uScale * (1. + p.z * .7 + wave * .08) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying float vGlow; varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          vec3 c = mix(vec3(.80, .86, .97), vec3(.62, .88, 1.), vGlow);
          gl_FragColor = vec4(c, smoothstep(.5, .25, d) * mix(.5, 1., vGlow) * (.45 + .55 * vAlpha));
        }`,
    });
    const handGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(left.length + right.length);
    positions.set(left); positions.set(right, left.length);
    const count = positions.length / 3;
    const sides = new Float32Array(count).fill(-1, 0, left.length / 3).fill(1, left.length / 3);
    const random = new Float32Array(count * 4).map(() => Math.random());
    handGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    handGeometry.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
    handGeometry.setAttribute("aRand", new THREE.BufferAttribute(random, 4));
    rig.add(new THREE.Points(handGeometry, handMaterial));

    // Dust: faint motes drifting slowly upward through a deep box, behind and in front of the hands.
    const dustGeometry = new THREE.BufferGeometry();
    const dust = new Float32Array(DUST * 3).map((_, i) => (Math.random() - .5) * [16, 9, 8][i % 3]);
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    dustGeometry.setAttribute("aRand", new THREE.BufferAttribute(new Float32Array(DUST).map(() => Math.random()), 1));
    const dustMaterial = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uTime; uniform float uScale; attribute float aRand; varying float vA;
        void main() {
          vec3 p = position;
          p.y = mod(p.y + 4.5 + uTime * (.05 + aRand * .08), 9.) - 4.5;
          p.x += sin(uTime * .2 + aRand * 20.) * .3;
          vA = (.25 + .5 * aRand) * smoothstep(4.5, 3., abs(p.y));
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_PointSize = uScale * (.6 + aRand) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying float vA;
        void main() { float d = length(gl_PointCoord - .5); if (d > .5) discard; gl_FragColor = vec4(.55, .78, 1., smoothstep(.5, 0., d) * vA); }`,
    });
    scene.add(new THREE.Points(dustGeometry, dustMaterial));

    // The spark between the fingertips, brightest once the hands nearly touch.
    const sparkMaterial = new THREE.SpriteMaterial({ map: sparkTexture(), color: "#8fd6ff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
    const spark = new THREE.Sprite(sparkMaterial);
    spark.position.set(0, .05, .2);
    rig.add(spark);

    const state = { reach: uniforms.uReach.value, px: 0, py: 0, cx: 0, cy: 0, lift: 0 };
    let frame = 0, running = false, disposed = false;
    const clock = new THREE.Clock(false);
    function draw() {
      const t = still ? 2 : clock.getElapsedTime();
      state.cx += (state.px - state.cx) * .05;
      state.cy += (state.py - state.cy) * .05;
      // Once in reach the hands breathe: the gap opens and closes by a hair.
      const breath = still ? 0 : (1 - Math.cos(t * .9)) * .5 * THREE.MathUtils.smoothstep(state.reach, .9, 1);
      uniforms.uReach.value = state.reach - breath * .025;
      uniforms.uTime.value = t;
      const near = THREE.MathUtils.smoothstep(state.reach, .75, 1) * (1 - uniforms.uScatter.value);
      sparkMaterial.opacity = near * (.75 + .25 * Math.sin(t * 1.8));
      spark.scale.setScalar(.3 + near * (.6 + .12 * Math.sin(t * 1.8)));
      rig.position.y = state.lift;
      // The camera drifts with the pointer so the dots part in depth; the hands themselves never turn.
      camera.position.x = state.cx * 1.4;
      camera.position.y = state.lift * .4 - state.cy * .8;
      camera.lookAt(0, state.lift * .4, 0);
      renderer.render(scene, camera);
      target!.dataset.scene = "ready";
    }
    const budget = frameBudget(renderer, {
      resize: () => resize(),
      onTooSlow: () => { teardown(); drawFlat(target, left, right); },
    });
    const loop = () => { frame = requestAnimationFrame(loop); draw(); budget.tick(); };
    const start = () => { if (!running && !disposed && !still) { running = true; clock.start(); budget.reset(); loop(); } };
    const stop = () => { running = false; cancelAnimationFrame(frame); clock.stop(); };
    function resize() {
      const w = target!.clientWidth, h = target!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Narrow screens crop the forearms rather than shrinking the hands.
      const halfWidth = camera.aspect < 1 ? 2.6 : camera.aspect < 1.6 ? 3.6 : 5.2;
      const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      camera.position.z = Math.max(halfWidth / half, 5.5);
      camera.updateProjectionMatrix();
      // Sit the hands in the upper half, clear of the heading at the foot of the hero.
      const visibleHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      state.lift = visibleHalf * (camera.aspect < 1 ? .42 : .3);
      uniforms.uScale.value = h * renderer.getPixelRatio() * .058 * Math.min(1, 5.2 / halfWidth * .85);
      if (!running) draw();
    }
    const sizes = new ResizeObserver(resize);
    sizes.observe(target);
    resize();

    const move = (event: PointerEvent) => { state.px = event.clientX / innerWidth - .5; state.py = event.clientY / innerHeight - .5; };
    let trigger: ScrollTrigger | undefined, reach: gsap.core.Tween | undefined, observer: IntersectionObserver | undefined;
    let visible = true;
    const update = () => { if (visible && !document.hidden) start(); else stop(); };
    if (!still) {
      reach = gsap.to(state, { reach: 1, duration: 3.2, delay: .4, ease: "power3.inOut" });
      trigger = ScrollTrigger.create({ trigger: target, start: "top top", end: "bottom top", scrub: .6, onUpdate: self => { uniforms.uScatter.value = self.progress; } });
      addEventListener("pointermove", move, { passive: true });
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
      observer.observe(target);
      document.addEventListener("visibilitychange", update);
      update();
    }

    function teardown() {
      if (disposed) return;
      disposed = true;
      stop(); reach?.kill(); trigger?.kill(); observer?.disconnect(); sizes.disconnect();
      removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", update);
      handGeometry.dispose(); handMaterial.dispose(); dustGeometry.dispose(); dustMaterial.dispose();
      sparkMaterial.map?.dispose(); sparkMaterial.dispose();
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
  const unit = w < h ? w / 5.2 : w < h * 1.6 ? w / 7.2 : w / 10.4, dot = Math.max(.8, unit * .015) * ratio;
  const cy = h * (w < h ? .3 : .38);
  const glow = ctx.createRadialGradient(w / 2 * ratio, cy * ratio, 0, w / 2 * ratio, cy * ratio, unit * .5 * ratio);
  glow.addColorStop(0, "rgba(160,220,255,.55)"); glow.addColorStop(1, "rgba(79,184,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(200,216,245,.72)";
  for (const [points, side] of [[left, -1], [right, 1]] as const) for (let i = 0; i < points.length; i += 3) {
    ctx.beginPath();
    ctx.arc((w / 2 + (points[i] + side * .07) * unit) * ratio, (cy - points[i + 1] * unit) * ratio, dot, 0, Math.PI * 2);
    ctx.fill();
  }
  target.dataset.scene = "flat";
}

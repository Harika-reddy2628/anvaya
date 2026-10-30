"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/motion";

// Two hands in the pose of Michelangelo's Creation of Adam (public domain), drawn as our own outlines: each part is an
// SVG path in a 400 × 160 box with the arm entering from the left and the index fingertip near x = TIP. They are
// filled into an offscreen canvas, each part cut from its neighbours by a hairline, and sampled in horizontal rows of
// dots so the figure reads as a dot-matrix print.
const W = 400, H = 160, SHIFT = 140, SX = 2, SY = 2.6, SCALE = 55;
// The relaxed, receiving hand: fingers drooping, the index barely lifted.
const RECEIVING = [
  "M-140,30 C-40,30 80,40 170,54 C196,58 214,60 232,60 C252,58 272,58 290,62 C296,70 296,84 290,96 C272,104 254,108 238,108 C226,108 214,104 204,100 C150,94 40,86 -140,84 Z", // forearm and back of the hand
  "M236,62 C248,52 262,44 280,40 C292,37 304,38 310,42 C314,46 311,51 304,52 C290,54 278,58 266,66 C258,71 248,72 240,70 Z", // thumb
  "M286,60 C306,59 326,60 346,63 C356,64 366,66 372,68 C378,70 378,77 371,78 C360,78 348,77 336,77 C318,77 302,77 289,77 Z", // index, reaching
  "M288,78 C304,79 318,82 330,87 C340,91 347,97 349,104 C350,110 344,112 340,108 C334,102 324,98 312,96 C302,94 292,93 286,93 Z", // middle, relaxed
  "M284,94 C298,96 310,100 318,106 C326,112 330,120 328,126 C326,131 320,130 318,125 C314,117 306,112 296,109 C290,107 284,107 278,107 Z", // ring
  "M272,108 C284,111 292,116 297,122 C301,128 302,134 299,137 C295,140 291,137 290,132 C288,126 283,122 276,119 C272,118 268,118 264,117 Z", // little
];
// The giving hand: the index straight and firm, the other fingers curled beneath.
const GIVING = [
  "M-140,20 C-40,22 80,36 170,48 C196,52 216,54 236,54 C258,54 278,56 294,60 C300,70 300,84 296,94 C278,100 258,102 240,102 C226,102 212,100 200,96 C140,90 40,82 -140,76 Z", // forearm and back of the hand
  "M292,59 C312,58 334,58 356,60 C368,61 378,62 384,64 C390,66 390,73 383,74 C370,75 356,75 342,75 C324,75 308,76 295,76 Z", // index, pointing
  "M294,77 C312,78 328,80 342,85 C352,88 360,93 362,99 C363,105 357,107 352,104 C344,99 334,96 322,94 C312,93 302,93 294,93 Z", // middle
  "M292,94 C306,96 318,100 328,106 C336,111 340,117 338,122 C336,127 330,126 327,122 C321,115 312,111 302,108 C296,107 290,106 286,106 Z", // ring
  "M282,106 C294,109 302,114 307,120 C311,125 312,131 308,133 C304,135 300,132 299,128 C296,122 290,119 283,117 C279,116 275,116 271,116 Z", // little
  "M236,100 C250,106 266,110 282,111 C292,111 300,110 304,112 C308,115 305,120 299,120 C284,121 266,120 250,116 C242,114 236,111 232,107 Z", // thumb, beneath
];
const DUST = 520;

/** Samples a hand into dot positions (x right, y up, z towards the viewer), centred on its fingertip. */
function sampleHand(paths: string[], tip: number, mirror: boolean) {
  const width = W + SHIFT;
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(SHIFT, 0); ctx.fillStyle = "#fff"; ctx.lineJoin = "round"; ctx.lineWidth = 2.4;
  for (const d of paths) {
    const shape = new Path2D(d);
    // Cut a hairline around each part first, so overlapping fingers stay separate.
    ctx.globalCompositeOperation = "destination-out"; ctx.stroke(shape);
    ctx.globalCompositeOperation = "source-over"; ctx.fill(shape);
  }
  const data = ctx.getImageData(0, 0, width, H).data;
  // Floor, not round: a sample near the right edge must not wrap into the next row.
  const inside = (x: number, y: number) => x >= 0 && y >= 0 && x < width && y < H && data[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] > 128;
  const points: number[] = [];
  for (let y = SY / 2; y < H; y += SY) for (let x = SX / 2; x < width; x += SX) {
    if (!inside(x, y)) continue;
    // Depth from how far the dot sits inside the outline, so fingers and the forearm round towards the viewer.
    let depth = 0;
    for (let r = 1; r <= 8 && inside(x + r * SX, y) && inside(x - r * SX, y) && inside(x, y + r * SY) && inside(x, y - r * SY); r++) depth = r;
    points.push((x - SHIFT - tip) / SCALE * (mirror ? -1 : 1), (H / 2 - y) / SCALE, Math.sqrt(depth) * .09);
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
    const left = sampleHand(RECEIVING, 378, false), right = sampleHand(GIVING, 390, true);

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
          gl_FragColor = vec4(c, smoothstep(.5, .2, d) * mix(.72, 1., vGlow) * (.62 + .38 * vAlpha));
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
      state.lift = visibleHalf * (camera.aspect < 1 ? .44 : .4);
      uniforms.uScale.value = h * renderer.getPixelRatio() * .046 * Math.min(1, 5.2 / halfWidth * .85);
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
  const unit = w < h ? w / 5.2 : w < h * 1.6 ? w / 7.2 : w / 10.4, dot = Math.max(.7, unit * .011) * ratio;
  const cy = h * (w < h ? .28 : .3);
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

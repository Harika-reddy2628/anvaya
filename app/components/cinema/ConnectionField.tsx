"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/motion";

// Anvaya means connection, so the About hero shows it literally: a field of nodes drifting in two loose clusters
// (the idea, the result), with a bright hub between them. Any two nodes close enough are joined by a thread that
// fades with distance, so the network keeps re-forming. The pointer is a node too and links to whatever it touches.
const COUNT = 76, LINK = 2.15, HUB_LINK = 3.7, POINTER_LINK = 3.1;
const MAX_LINKS = (COUNT * (COUNT + 1)) / 2;

/** A small deterministic generator, so the network has the same shape on every visit. */
function random(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Home positions (x, y, z per node), phases and sizes. Node 0 is the hub. */
function buildNodes() {
  const rand = random(7), gauss = () => (rand() + rand() + rand() - 1.5) * 1.15;
  const home = new Float32Array(COUNT * 3), phase = new Float32Array(COUNT * 3), size = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    let x = 0, y = 0, z = 0;
    if (i === 0) { x = 0; y = .05; z = .4; }
    else if (i <= 30) { x = -3.5 + gauss() * 1.5; y = .15 + gauss() * 1.05; z = gauss() * 1.1; } // the idea
    else if (i <= 60) { x = 3.5 + gauss() * 1.5; y = -.1 + gauss() * 1.05; z = gauss() * 1.1; } // the result
    else { x = (rand() - .5) * 3.6; y = gauss() * .8; z = gauss() * .9; } // between them
    home.set([x, y, z], i * 3);
    phase.set([rand() * 6.28, rand() * 6.28, rand() * 6.28], i * 3);
    size[i] = i === 0 ? 2.6 : i % 9 === 0 ? 1.7 : .8 + rand() * .55;
  }
  return { home, phase, size };
}

/** The About hero's living background. Runs only while on screen; reduced motion shows one still frame. */
export function ConnectionField() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    const still = prefersReducedMotion();
    const { home, phase, size } = buildNodes();

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); } catch { drawFlat(target, home); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    const rig = new THREE.Group();
    scene.add(rig);
    const uniforms = { uScale: { value: 1 }, uTime: { value: 0 }, uIntro: { value: still ? 1 : 0 } };

    // Nodes: a bright core with a soft halo, gently pulsing; glow rises as the pointer or the hub reaches them.
    const nodePosition = new Float32Array(COUNT * 3), glow = new Float32Array(COUNT);
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePosition, 3).setUsage(THREE.DynamicDrawUsage));
    nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    nodeGeometry.setAttribute("aGlow", new THREE.BufferAttribute(glow, 1).setUsage(THREE.DynamicDrawUsage));
    nodeGeometry.setAttribute("aPhase", new THREE.BufferAttribute(phase.filter((_, i) => i % 3 === 0), 1));
    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uScale; uniform float uTime; uniform float uIntro;
        attribute float aSize; attribute float aGlow; attribute float aPhase; varying float vGlow; varying float vPulse;
        void main() {
          vPulse = .75 + .25 * sin(uTime * 1.3 + aPhase);
          vGlow = aGlow;
          vec4 mv = modelViewMatrix * vec4(position, 1.);
          float s = aSize * (1. + aGlow * .7) * mix(.2, 1., uIntro);
          gl_PointSize = uScale * s * (1. + .12 * sin(uTime * .9 + aPhase)) / -mv.z;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `varying float vGlow; varying float vPulse;
        void main() {
          float d = length(gl_PointCoord - .5);
          if (d > .5) discard;
          float core = smoothstep(.2, .1, d), halo = pow(1. - d * 2., 2.4) * (.38 + vGlow * .5);
          vec3 c = mix(vec3(.62, .82, 1.), vec3(1.), core);
          gl_FragColor = vec4(c, clamp(core + halo, 0., 1.) * vPulse);
        }`,
    });
    rig.add(new THREE.Points(nodeGeometry, nodeMaterial));

    // Threads: one segment per linked pair, rebuilt every frame from the current positions.
    const linePosition = new Float32Array(MAX_LINKS * 6), lineAlpha = new Float32Array(MAX_LINKS * 2);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePosition, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute("aAlpha", new THREE.BufferAttribute(lineAlpha, 1).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setDrawRange(0, 0);
    const lineMaterial = new THREE.ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `uniform float uIntro; attribute float aAlpha; varying float vA;
        void main() { vA = aAlpha * uIntro; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`,
      fragmentShader: `varying float vA; void main() { gl_FragColor = vec4(mix(vec3(.38, .62, 1.), vec3(.86, .95, 1.), vA), vA); }`,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    lines.frustumCulled = false;
    rig.add(lines);

    // The glow behind the hub: where the two sides meet.
    const hubMaterial = new THREE.SpriteMaterial({ map: haloTexture(), color: "#7fc8ff", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 });
    const hubGlow = new THREE.Sprite(hubMaterial);
    hubGlow.position.copy(new THREE.Vector3(home[0], home[1], home[2] - .1));
    rig.add(hubGlow);

    const state = { px: 0, py: 0, cx: 0, cy: 0, lift: 0, scatter: 0, pointer: new THREE.Vector3(), pointerOn: 0, pointerGoal: 0 };
    const ray = new THREE.Vector3(), point = new THREE.Vector3();
    let frame = 0, running = false, disposed = false;
    const clock = new THREE.Clock(false);

    function draw() {
      const t = still ? 2 : clock.getElapsedTime();
      uniforms.uTime.value = t;
      state.cx += (state.px - state.cx) * .05;
      state.cy += (state.py - state.cy) * .05;
      state.pointerOn += (state.pointerGoal - state.pointerOn) * .08;
      // Scrolling away lets the network drift apart; the threads thin out as it does.
      const spread = 1 + state.scatter * .9 + (1 - uniforms.uIntro.value) * .55;

      for (let i = 0; i < COUNT; i++) {
        const k = i * 3, w = i === 0 ? .05 : 1;
        nodePosition[k] = home[k] * spread + Math.sin(t * .22 + phase[k]) * .32 * w;
        nodePosition[k + 1] = home[k + 1] * spread + Math.sin(t * .27 + phase[k + 1]) * .26 * w;
        nodePosition[k + 2] = home[k + 2] * spread + Math.sin(t * .18 + phase[k + 2]) * .3 * w;
        glow[i] = i === 0 ? 1 : 0;
      }
      let links = 0;
      const add = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, alpha: number) => {
        const o = links * 6, a = links * 2;
        linePosition[o] = ax; linePosition[o + 1] = ay; linePosition[o + 2] = az;
        linePosition[o + 3] = bx; linePosition[o + 4] = by; linePosition[o + 5] = bz;
        lineAlpha[a] = alpha; lineAlpha[a + 1] = alpha; links++;
      };
      for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
        const dx = nodePosition[i * 3] - nodePosition[j * 3], dy = nodePosition[i * 3 + 1] - nodePosition[j * 3 + 1], dz = nodePosition[i * 3 + 2] - nodePosition[j * 3 + 2];
        const reach = i === 0 ? HUB_LINK : LINK, d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d >= reach) continue;
        const strength = Math.pow(1 - d / reach, 1.6);
        add(nodePosition[i * 3], nodePosition[i * 3 + 1], nodePosition[i * 3 + 2], nodePosition[j * 3], nodePosition[j * 3 + 1], nodePosition[j * 3 + 2], strength * (i === 0 ? .8 : .5) * (1 - state.scatter * .85));
        if (i === 0) glow[j] = Math.max(glow[j], strength * .8);
      }
      // The pointer joins the network: brighter threads to every node it is near.
      if (state.pointerOn > .01) for (let j = 1; j < COUNT; j++) {
        const dx = state.pointer.x - nodePosition[j * 3], dy = state.pointer.y - nodePosition[j * 3 + 1], dz = -nodePosition[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d >= POINTER_LINK) continue;
        const strength = Math.pow(1 - d / POINTER_LINK, 1.3) * state.pointerOn;
        add(state.pointer.x, state.pointer.y, 0, nodePosition[j * 3], nodePosition[j * 3 + 1], nodePosition[j * 3 + 2], strength * .95);
        glow[j] = Math.max(glow[j], strength);
      }
      lineGeometry.setDrawRange(0, links * 2);
      lineGeometry.attributes.position.needsUpdate = true; lineGeometry.attributes.aAlpha.needsUpdate = true;
      nodeGeometry.attributes.position.needsUpdate = true; nodeGeometry.attributes.aGlow.needsUpdate = true;

      hubMaterial.opacity = (.55 + .25 * Math.sin(t * 1.4)) * uniforms.uIntro.value * (1 - state.scatter);
      hubGlow.scale.setScalar(2.4 + .3 * Math.sin(t * 1.4));
      rig.position.y = state.lift;
      // The camera drifts with the pointer so the network parts in depth.
      camera.position.x = state.cx * 1.2;
      camera.position.y = state.lift * .4 - state.cy * .7;
      camera.lookAt(0, state.lift * .4, 0);
      renderer.render(scene, camera);
      target!.dataset.scene = "ready";
    }
    const budget = frameBudget(renderer, {
      resize: () => resize(),
      onTooSlow: () => { teardown(); drawFlat(target, home); },
    });
    const loop = () => { frame = requestAnimationFrame(loop); draw(); budget.tick(); };
    const start = () => { if (!running && !disposed && !still) { running = true; clock.start(); budget.reset(); loop(); } };
    const stop = () => { running = false; cancelAnimationFrame(frame); clock.stop(); };
    function resize() {
      const w = target!.clientWidth, h = target!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      // Narrow screens crop the outer nodes rather than shrinking the network.
      const halfWidth = camera.aspect < 1 ? 3.6 : camera.aspect < 1.6 ? 5 : 6.4;
      const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      camera.position.z = Math.max(halfWidth / half, 6);
      camera.updateProjectionMatrix();
      // Sit the network in the upper part, clear of the heading at the foot of the hero.
      const visibleHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      state.lift = visibleHalf * (camera.aspect < 1 ? .4 : .3);
      uniforms.uScale.value = h * renderer.getPixelRatio() * .062 * Math.min(1, 6.4 / halfWidth * .9);
      if (!running) draw();
    }
    const sizes = new ResizeObserver(resize);
    sizes.observe(target);
    resize();

    const move = (event: PointerEvent) => {
      state.px = event.clientX / innerWidth - .5; state.py = event.clientY / innerHeight - .5;
      const box = target.getBoundingClientRect();
      const inside = event.clientY >= box.top && event.clientY <= box.bottom;
      state.pointerGoal = inside ? 1 : 0;
      if (!inside) return;
      // Project the pointer onto the plane of the network.
      ray.set(((event.clientX - box.left) / box.width) * 2 - 1, -(((event.clientY - box.top) / box.height) * 2 - 1), .5).unproject(camera).sub(camera.position).normalize();
      point.copy(camera.position).addScaledVector(ray, -camera.position.z / ray.z);
      state.pointer.set(point.x, point.y - state.lift, 0);
    };
    let trigger: ScrollTrigger | undefined, intro: gsap.core.Tween | undefined, observer: IntersectionObserver | undefined;
    let visible = true;
    const update = () => { if (visible && !document.hidden) start(); else stop(); };
    if (!still) {
      intro = gsap.to(uniforms.uIntro, { value: 1, duration: 2.4, delay: .2, ease: "power3.out" });
      trigger = ScrollTrigger.create({ trigger: target, start: "top top", end: "bottom top", scrub: .6, onUpdate: self => { state.scatter = self.progress; } });
      addEventListener("pointermove", move, { passive: true });
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
      observer.observe(target);
      document.addEventListener("visibilitychange", update);
      update();
    }

    function teardown() {
      if (disposed) return;
      disposed = true;
      stop(); intro?.kill(); trigger?.kill(); observer?.disconnect(); sizes.disconnect();
      removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", update);
      nodeGeometry.dispose(); nodeMaterial.dispose(); lineGeometry.dispose(); lineMaterial.dispose();
      hubMaterial.map?.dispose(); hubMaterial.dispose();
      renderer.dispose(); renderer.domElement.remove();
    }
    return teardown;
  }, []);
  return <div className="connection-field" ref={host} aria-hidden="true" />;
}

function haloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const glow = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  glow.addColorStop(0, "rgba(255,255,255,.9)"); glow.addColorStop(.18, "rgba(150,210,255,.45)"); glow.addColorStop(1, "rgba(79,184,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

/** Without WebGL (or on a device too slow for it) the same network is printed flat, still and complete. */
function drawFlat(target: HTMLDivElement, home: Float32Array) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  target.appendChild(canvas);
  const ratio = Math.min(devicePixelRatio, 2), w = target.clientWidth, h = target.clientHeight;
  canvas.width = w * ratio; canvas.height = h * ratio;
  canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(ratio, ratio);
  const unit = w < h ? w / 7.2 : Math.min(w / 12.8, h / 6), cx = w / 2, cy = h * (w < h ? .3 : .34);
  const at = (i: number) => [cx + home[i * 3] * unit, cy - home[i * 3 + 1] * unit] as const;
  for (let i = 0; i < COUNT; i++) for (let j = i + 1; j < COUNT; j++) {
    const dx = home[i * 3] - home[j * 3], dy = home[i * 3 + 1] - home[j * 3 + 1], dz = home[i * 3 + 2] - home[j * 3 + 2];
    const reach = i === 0 ? HUB_LINK : LINK, d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (d >= reach) continue;
    const [ax, ay] = at(i), [bx, by] = at(j);
    ctx.strokeStyle = `rgba(140,190,255,${Math.pow(1 - d / reach, 1.6) * .6})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
  }
  for (let i = 0; i < COUNT; i++) {
    const [x, y] = at(i), r = i === 0 ? 5 : 2.2;
    const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
    halo.addColorStop(0, "rgba(160,210,255,.5)"); halo.addColorStop(1, "rgba(79,184,255,0)");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, r * 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#eaf4ff"; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  target.dataset.scene = "flat";
}

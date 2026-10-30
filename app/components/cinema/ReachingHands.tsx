"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { gsap, prefersReducedMotion, ScrollTrigger } from "../../lib/motion";

// The two hands, after the owner's dot-matrix reference of Michelangelo's Creation of Adam (supplied 30 Oct 2026):
// each hand is stored as the runs of its dot rows ("y:x0-x1,x0-x1;…") in the reference's 736 px frame, traced once
// with a script; no image ships. Dots are re-laid along each run at PITCH, and rows sit ROW apart.
const PITCH = 4.0, ROW = 8, SCALE = 70, MID = 420;
const LEFT_ROWS = "322:72-124;330:55-161;338:38-202;346:22-169,175-181,204-205;354:2-210,216-222;362:2-66,72-234;370:2-25,40-41,48-53,60-61,77-78,85-90,97-234,241-246,253-259;378:2-29,35-66,72-267;386:2-21,48-49,77-78,85-90,97-102,109-165,241-264,270-271;394:2-29,36-66,72-176,184-185,192-210,216-247,253-279;402:2-5,40-41,48-53,60-65,77-78,84-87,112-128,134-140,146-177,195-198,221-222,229-234,241-247,253-259,266-283;410:2-4,40-41,48-53,60-65,72-78,117-128,134-139,146-181,204-205,221-222,229-234,241-247,253-259,270-271,278-283,290-291;418:48-53,60-61,67-70,125-198,241-242,278-279,290-291;426:23-29,40-41,48-62,146-205,241-247,253-259,266-267,282-300;434:51-54,166-202,245-246,290-301;442:2-29,35-46,175-222,245-247,253-271;450:30-33,207-214,221-227,253-254,266-271;458:2-21,196-205,216-222;466:2-8";
const RIGHT_ROWS = "338:698-734;346:673-734;354:645-734;362:616-734;370:558-734;378:517-734;386:443-582,591-602,636-734;394:419-569,575-606,612-614,621-630,636-734;402:402-429,439-495,506-507,513-568,575-581,592-593,600-601,670-676,683-688,695-700,707-713,719-734;410:394-420,448-449,468-495,502-557,563-569,575-581,592-593,600-605,658-663,675-676,683-688,695-700,707-713,719-725,732-733;418:399-400,406-417,455-458,468-471,494-495,501-527,538-545,551-556,563-568,592-593,683-688,695-696,720-725,732-733;426:477-482,492-519,526-532,539-569,575-581,588-593,600-605,612-618,625-626,650-651,658-663,670-676,683-688,695-700,707-713,719-733;434:472-499,563-564,595-602,702-734;442:464-495,502-520,526-569,575-594,727-734;450:455-479,506-507,514-532,539-556,563-568,575-586;458:447-532,538-578;466:452-471,477-487,494-495,502-508,526-532,538-565;474:460-470,477-495,501-503,518-520,526-536;482:460-462,480-483,497-499,529-532;490:460-470,477-483,489-499,514-520,526-532;498:460-470,481-486,493-498,514-519,526-527";
const DUST = 520;

/** Lays a hand's rows into dot positions (x right, y up, z towards the viewer), centred on its fingertip. */
function sampleHand(rows: string, side: -1 | 1) {
  const runs = rows.split(";").map(row => {
    const [y, list] = row.split(":");
    return { y: +y, spans: list.split(",").map(span => span.split("-").map(Number) as [number, number]) };
  });
  // The fingertip is the run end nearest the other hand.
  const ends = runs.flatMap(r => r.spans.map(([a, b]) => side < 0 ? b : a));
  const tip = side < 0 ? Math.max(...ends) : Math.min(...ends);
  const covered = (y: number, x: number) => runs.some(r => r.y === y && r.spans.some(([a, b]) => x >= a && x <= b));
  const points: number[] = [];
  for (const { y, spans } of runs) for (const [a, b] of spans) for (let x = a + 1; x <= b; x += PITCH) {
    // Depth from how far the dot sits inside its run and between the rows above and below, so the hand rounds
    // towards the viewer.
    let rows = 0;
    while (rows < 4 && covered(y - (rows + 1) * ROW, x) && covered(y + (rows + 1) * ROW, x)) rows++;
    const depth = Math.min((x - a) / PITCH, (b - x) / PITCH, rows * 2, 6);
    points.push((x - tip) / SCALE, (MID - y) / SCALE, Math.sqrt(Math.max(depth, 0)) * .07);
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
    const left = sampleHand(LEFT_ROWS, -1), right = sampleHand(RIGHT_ROWS, 1);

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
          // Each hand slides in from its edge until the fingertips are a hand's breadth apart, as in the reference.
          p.x += aSide * mix(2.6, .62, uReach);
          // A slow ripple runs along the arms towards the fingertips.
          float wave = sin(p.x * 1.5 * aSide + uTime * 1.4);
          p.z += wave * .03; p.y += sin(p.x * .8 + uTime * .5) * .01;
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
      const halfWidth = camera.aspect < 1 ? 2.6 : camera.aspect < 1.6 ? 3.6 : 4.6;
      const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect;
      camera.position.z = Math.max(halfWidth / half, 5.5);
      camera.updateProjectionMatrix();
      // Sit the hands in the upper half, clear of the heading at the foot of the hero.
      const visibleHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      state.lift = visibleHalf * (camera.aspect < 1 ? .4 : .3);
      uniforms.uScale.value = h * renderer.getPixelRatio() * .1 * Math.min(1, 4.6 / halfWidth * .85);
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
  // Fit the span the 3D camera shows: about 4.6 units either side on wide screens, cropped on narrow ones.
  const unit = w < h ? w / 6 : Math.min(w / 9.2, h / 6), dot = Math.max(.9, unit * .019) * ratio;
  const cy = h * (w < h ? .3 : .36);
  const glow = ctx.createRadialGradient(w / 2 * ratio, cy * ratio, 0, w / 2 * ratio, cy * ratio, unit * .5 * ratio);
  glow.addColorStop(0, "rgba(160,220,255,.55)"); glow.addColorStop(1, "rgba(79,184,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(200,216,245,.72)";
  for (const [points, side] of [[left, -1], [right, 1]] as const) for (let i = 0; i < points.length; i += 3) {
    ctx.beginPath();
    ctx.arc((w / 2 + (points[i] + side * .62) * unit) * ratio, (cy - points[i + 1] * unit) * ratio, dot, 0, Math.PI * 2);
    ctx.fill();
  }
  target.dataset.scene = "flat";
}

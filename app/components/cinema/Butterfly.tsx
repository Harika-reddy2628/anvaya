"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* A crystal butterfly that lives behind the page's text. It roams the hero, flutters along while the reader scrolls,
   and when scrolling stops it flies to the nearest spot with no text under it and lands. Faceted glass wings shade
   from deep blue at the root to ice at the edges, catch moving glints, and leave a short trail of sparkles in flight.
   Everything is procedural: no image files. */

// Text-bearing elements the butterfly must never sit on.
const TEXT = "h1, h2, h3, p, li, a, button, summary, label, input, textarea, select, .action, .pill, .practice-card, .engagement-card, .faq-item, .service-block, .marquee";

/** Right-hand wing outlines in wing space: x runs out from the body, y forward (+) and back (−). */
function forewing() {
  const s = new THREE.Shape();
  s.moveTo(.02, .06);
  s.bezierCurveTo(.22, .5, .7, .95, 1.16, 1.02);
  s.bezierCurveTo(1.32, 1.02, 1.34, .84, 1.24, .64);
  s.bezierCurveTo(1.06, .34, .72, .12, .34, .02);
  s.lineTo(.02, .06);
  return s;
}
function hindwing() {
  const s = new THREE.Shape();
  s.moveTo(.03, -.02);
  s.bezierCurveTo(.44, .04, .94, -.12, 1, -.46);
  s.bezierCurveTo(1.04, -.76, .84, -.94, .62, -1);
  s.bezierCurveTo(.54, -1.08, .46, -1.18, .38, -1.3);
  s.bezierCurveTo(.32, -1.12, .22, -.9, .06, -.5);
  s.lineTo(.03, -.02);
  return s;
}

const DEEP = new THREE.Color("#174f7a"), MID = new THREE.Color("#4aa8e0"), ICE = new THREE.Color("#dff3ff");

/** Facets a wing: a fan from an inner point to a raised inner ring, then slivers out to the curved outline.
    Colour runs from deep blue at the root to ice at the rim, with each facet slightly lighter or darker. */
function wingGeometry(shape: THREE.Shape, seed: number) {
  const outline = shape.getPoints(14).slice(0, -1);
  const n = outline.length, k = 11;
  const rand = (i: number) => { const v = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453; return v - Math.floor(v); };
  const centroid = outline.reduce((s, p) => s.add(p.clone().divideScalar(n)), new THREE.Vector2());
  const centre = centroid.clone().multiplyScalar(.62);
  const reach = Math.max(...outline.map(p => p.length()));
  const ring = Array.from({ length: k }, (_, i) => {
    const o = outline[Math.floor((i / k) * n)], p = centre.clone().lerp(o, .58);
    return new THREE.Vector3(p.x, p.y, (rand(i) - .5) * .09);
  });
  const positions: number[] = [], colors: number[] = [];
  const tint = new THREE.Color();
  const tri = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, facet: number) => {
    for (const p of [a, b, c]) {
      const t = Math.min(1, Math.hypot(p.x, p.y) / reach);
      tint.copy(DEEP).lerp(MID, Math.min(1, t * 1.6)).lerp(ICE, Math.max(0, t - .55) * 1.8).multiplyScalar(.86 + rand(facet) * .3);
      // Wings lie in the x–z plane; z is the body's forward axis.
      positions.push(p.x, p.z, -p.y); colors.push(tint.r, tint.g, tint.b);
    }
  };
  const c3 = new THREE.Vector3(centre.x, centre.y, .05), o3 = (p: THREE.Vector2) => new THREE.Vector3(p.x, p.y, 0);
  for (let i = 0; i < k; i++) tri(c3, ring[i], ring[(i + 1) % k], i);
  for (let i = 0; i < n; i++) {
    const r = Math.floor((i / n) * k), next = Math.floor(((i + 1) / n) * k) % k;
    tri(ring[r], o3(outline[i]), o3(outline[(i + 1) % n]), 20 + i);
    if (next !== r) tri(ring[r], o3(outline[(i + 1) % n]), ring[next], 80 + i);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  // Silver veins: the rim, the inner ring and spokes from the root.
  const veins: number[] = [];
  const v = (a: THREE.Vector3, b: THREE.Vector3) => veins.push(a.x, a.z, -a.y, b.x, b.z, -b.y);
  for (let i = 0; i < n; i++) v(o3(outline[i]), o3(outline[(i + 1) % n]));
  for (let i = 0; i < k; i++) { v(ring[i], ring[(i + 1) % k]); v(new THREE.Vector3(.02, 0, 0), ring[i]); v(ring[i], o3(outline[Math.floor((i / k) * n)])); }
  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.Float32BufferAttribute(veins, 3));
  return { geometry, lines };
}

/** A small procedural studio so the facets catch varied light; it rotates over time to sweep glints across them. */
function studio(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene(), trash: { dispose(): void }[] = [];
  const box = (s: [number, number, number], p: [number, number, number], color: string, k: number, back = false) => {
    const g = new THREE.BoxGeometry(...s), m = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: back ? THREE.BackSide : THREE.FrontSide });
    trash.push(g, m); const mesh = new THREE.Mesh(g, m); mesh.position.set(...p); env.add(mesh);
  };
  box([30, 20, 30], [0, 0, 0], "#1a2a36", 1, true);
  box([14, .2, 3], [0, 9.5, 0], "#ffffff", 9);
  box([.2, 4, 10], [-14, 3, 2], "#d8f1ff", 7);
  box([.2, 4, 8], [14, -1, -2], "#5fb4ee", 7);
  box([5, 2, .2], [3, 3, 14], "#ffffff", 6);
  box([9, 1.5, .2], [-4, -2, -14], "#2f86d6", 6);
  box([2, 8, .2], [8, 0, 14], "#ffffff", 5);
  const pmrem = new THREE.PMREMGenerator(renderer), texture = pmrem.fromScene(env, .015).texture;
  pmrem.dispose(); trash.forEach(t => t.dispose());
  return texture;
}

/** A soft radial glow, drawn on a canvas at runtime. */
function glowTexture() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!, g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(190,232,255,.9)"); g.addColorStop(.35, "rgba(120,190,240,.35)"); g.addColorStop(1, "rgba(120,190,240,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const SPARKS = 90;
const sparkShader = {
  vertexShader: `attribute float aLife; attribute float aSize; varying float vLife;
    void main(){ vLife = aLife; vec4 mv = modelViewMatrix * vec4(position, 1.); gl_PointSize = aSize * aLife * (1500. / -mv.z); gl_Position = projectionMatrix * mv; }`,
  // A four-point twinkle with a soft core.
  fragmentShader: `varying float vLife;
    void main(){
      vec2 p = gl_PointCoord - .5; float d = length(p);
      float star = max(0., 1. - abs(p.x) * 14.) * max(0., 1. - abs(p.y) * 2.2) + max(0., 1. - abs(p.y) * 14.) * max(0., 1. - abs(p.x) * 2.2);
      float a = (smoothstep(.5, 0., d) * .55 + star) * vLife;
      gl_FragColor = vec4(mix(vec3(.55, .82, 1.), vec3(1.), .6) * a, a);
    }`,
};

export default function Butterfly({ path }: { path: string }) {
  const host = useRef<HTMLDivElement>(null);
  const onRoute = useRef<() => void>(() => {});
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene(), environment = studio(renderer);
    scene.environment = environment;
    const camera = new THREE.PerspectiveCamera(30, 1, 10, 5000);
    const crystal = new THREE.MeshPhysicalMaterial({
      vertexColors: true, metalness: .2, roughness: .04, flatShading: true, transparent: true, opacity: .93, side: THREE.DoubleSide,
      iridescence: .6, iridescenceIOR: 1.55, iridescenceThicknessRange: [200, 700], clearcoat: 1, clearcoatRoughness: .02,
      envMapIntensity: 2.6, emissive: "#0d4a72", emissiveIntensity: .22, specularIntensity: 1,
    });
    // A bright rim where the facets turn away, like light caught in the edge of cut glass.
    crystal.onBeforeCompile = shader => {
      shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `#include <opaque_fragment>
        float rim = pow(max(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 0.0), 2.5);
        gl_FragColor.rgb += vec3(.62, .86, 1.) * rim * .55;`);
    };
    const silver = new THREE.LineBasicMaterial({ color: "#f2f9ff", transparent: true, opacity: .85 });
    const metal = new THREE.MeshStandardMaterial({ color: "#b9d4e6", metalness: 1, roughness: .18, envMapIntensity: 1.8 });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#0c1a24", metalness: .6, roughness: .1 });
    const glow = glowTexture();
    const haloMaterial = new THREE.SpriteMaterial({ map: glow, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: .3 });
    const halo = new THREE.Sprite(haloMaterial);
    const disposables: { dispose(): void }[] = [crystal, silver, metal, eyeMaterial, environment, glow, haloMaterial];

    // Assemble: the body runs along −z (head forward); each wing hinges on the body axis.
    const butterfly = new THREE.Group(), body = new THREE.Group();
    butterfly.add(body); scene.add(butterfly, halo);
    const wings: { group: THREE.Group; side: number; hind: boolean }[] = [];
    for (const side of [1, -1]) {
      for (const hind of [false, true]) {
        // The same seed on both sides keeps the facets mirror-symmetric.
        const { geometry, lines } = wingGeometry(hind ? hindwing() : forewing(), hind ? 2 : 1);
        disposables.push(geometry, lines);
        const group = new THREE.Group();
        group.add(new THREE.Mesh(geometry, crystal), new THREE.LineSegments(lines, silver));
        group.scale.x = side;
        body.add(group); wings.push({ group, side, hind });
      }
    }
    const thoraxGeo = new THREE.CapsuleGeometry(.065, .3, 6, 14), abdomenGeo = new THREE.CapsuleGeometry(.05, .5, 6, 14), headGeo = new THREE.SphereGeometry(.075, 18, 12), eyeGeo = new THREE.SphereGeometry(.03, 10, 8);
    disposables.push(thoraxGeo, abdomenGeo, headGeo, eyeGeo);
    const thorax = new THREE.Mesh(thoraxGeo, metal); thorax.rotation.x = Math.PI / 2; thorax.position.z = -.08;
    const abdomen = new THREE.Mesh(abdomenGeo, metal); abdomen.rotation.x = Math.PI / 2; abdomen.position.z = .42; abdomen.scale.set(.9, 1, .9);
    const head = new THREE.Mesh(headGeo, metal); head.position.z = -.33;
    const eyes = [-1, 1].map(s => { const e = new THREE.Mesh(eyeGeo, eyeMaterial); e.position.set(.05 * s, .02, -.37); return e; });
    const antennae = new THREE.BufferGeometry().setFromPoints([-1, 1].flatMap(s => {
      const pts = new THREE.QuadraticBezierCurve3(new THREE.Vector3(.03 * s, .03, -.4), new THREE.Vector3(.14 * s, .14, -.7), new THREE.Vector3(.27 * s, .1, -.95)).getPoints(12);
      return pts.slice(0, -1).flatMap((p, i) => [p, pts[i + 1]]);
    }));
    disposables.push(antennae);
    body.add(thorax, abdomen, head, ...eyes, new THREE.LineSegments(antennae, silver));

    // Sparkle trail, in the same pixel-space world as the butterfly.
    const sparkPos = new Float32Array(SPARKS * 3), sparkLife = new Float32Array(SPARKS), sparkSize = new Float32Array(SPARKS), sparkVel = new Float32Array(SPARKS * 2);
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    sparkGeo.setAttribute("aLife", new THREE.BufferAttribute(sparkLife, 1));
    sparkGeo.setAttribute("aSize", new THREE.BufferAttribute(sparkSize, 1));
    const sparkMat = new THREE.ShaderMaterial({ ...sparkShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const sparks = new THREE.Points(sparkGeo, sparkMat); sparks.frustumCulled = false; scene.add(sparks);
    disposables.push(sparkGeo, sparkMat);
    let nextSpark = 0, sparkDebt = 0;
    const tip = new THREE.Vector3();

    // Flight state, in screen pixels.
    const pos = new THREE.Vector2(innerWidth + 80, innerHeight * .28), vel = new THREE.Vector2(-120, 20), aim = pos.clone();
    let mode: "fly" | "rest" = "fly", heading = -1.2, bank = 0, flyMix = 1, phase = 0, width = 0, height = 0, frame = 0, last = performance.now(), disposed = false;
    let size = 40, restUntil = 0, scrolling = false, scrollTimer: ReturnType<typeof setTimeout> | undefined, routeTimer: ReturnType<typeof setTimeout> | undefined;
    const pointer = new THREE.Vector2(-999, -999);

    /** Is the point, and the span of the wings around it, clear of text and inside the usable area? */
    function clear(x: number, y: number) {
      const span = size * 1.5;
      if (x < span || y < span + 80 || x > width - span || y > height - span) return false;
      for (const [dx, dy] of [[0, 0], [-span, 0], [span, 0], [0, -span * .8], [0, span * .8], [-span * .7, -span * .6], [span * .7, span * .6]]) {
        const hit = document.elementsFromPoint(x + dx, y + dy).find(el => el !== renderer.domElement && !target!.contains(el));
        if (hit?.closest(TEXT)) return false;
      }
      return true;
    }
    /** The nearest clear spot to (x, y), searched on widening rings; in the hero, only within its visible part. */
    function landing(x: number, y: number, minHop = 0) {
      const hero = document.querySelector<HTMLElement>(".hero")?.getBoundingClientRect();
      const inHero = hero && hero.bottom > height * .55;
      for (let r = minHop; r < Math.max(width, height); r += 36) {
        const steps = Math.max(10, Math.round(r / 16)), start = Math.random() * Math.PI * 2;
        for (let i = 0; i < steps; i++) {
          const a = start + (i / steps) * Math.PI * 2, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
          if (inHero && (py > hero.bottom - size * 2 || py < hero.top)) continue;
          if (clear(px, py)) return new THREE.Vector2(px, py);
        }
      }
      return new THREE.Vector2(width * .86, height * .3);
    }
    function takeOff(minHop = 0) { mode = "fly"; aim.copy(landing(pos.x, pos.y, minHop)); }
    /** Where the reader goes next: the next section below the fold, or the closing call to action at the end. */
    const guide = new THREE.Vector2();
    function nextStop() {
      const sections = [...document.querySelectorAll<HTMLElement>("main > section, main > .marquee")];
      const next = sections.find(s => s.getBoundingClientRect().top > height * .55);
      if (next) { const r = next.getBoundingClientRect(); return guide.set(width / 2, r.top + 40); }
      const cta = document.querySelector<HTMLElement>(".final-cta .action, .site-footer");
      const r = cta?.getBoundingClientRect();
      return r ? guide.set(r.left + r.width / 2, r.top + r.height / 2) : guide.set(width / 2, height + 200);
    }
    /** In the hero, after a while at rest it moves beside the scroll cue, ready to lead the way down. */
    function cueSpot() {
      const cue = document.querySelector<HTMLElement>(".hero-scroll")?.getBoundingClientRect();
      return cue && cue.top < height && cue.bottom > 0 ? landing(cue.left + 90, cue.top - size * 1.2) : null;
    }
    let restCount = 0, nudgeAt = 0;
    onRoute.current = () => { clearTimeout(routeTimer); mode = "fly"; routeTimer = setTimeout(() => takeOff(60), 1100); };

    function emit(x: number, y: number, z: number) {
      const i = nextSpark; nextSpark = (nextSpark + 1) % SPARKS;
      sparkPos.set([x + (Math.random() - .5) * 6, y + (Math.random() - .5) * 6, z], i * 3);
      sparkVel.set([(Math.random() - .5) * 16 - vel.x * .08, -10 - Math.random() * 14 + vel.y * .08], i * 2);
      sparkLife[i] = 1; sparkSize[i] = 5 + Math.random() * 7;
    }

    function step(now: number) {
      frame = requestAnimationFrame(step);
      const dt = Math.min(.05, (now - last) / 1000), t = now / 1000; last = now;
      if (!width) return;
      // Steering: an easing seek with a slow wander while flying, slowing on approach; at rest it settles in place.
      const to = aim.clone().sub(pos), dist = to.length(), speedCap = size * 7;
      if (mode === "fly") {
        const desired = to.normalize().multiplyScalar(Math.min(speedCap, dist * 1.8));
        desired.add(new THREE.Vector2(Math.sin(t * 1.9) * 26, Math.cos(t * 1.4) * 22));
        vel.lerp(desired, Math.min(1, dt * 1.8));
        if (dist < 4 && !scrolling) { mode = "rest"; restUntil = t + 6 + Math.random() * 4; restCount++; nudgeAt = t + 1.6; }
      } else {
        vel.multiplyScalar(Math.pow(.01, dt)); pos.lerp(aim, Math.min(1, dt * 2.5));
        // Every few seconds a small hop toward the next stop, as if leading the way.
        if (t > nudgeAt) {
          nudgeAt = t + 2.4;
          const lead = nextStop().clone().sub(pos);
          if (lead.length() > size * 3) { vel.addScaledVector(lead.normalize(), size * 3.2); }
        }
        if (t > restUntil) {
          const cue = restCount % 2 === 1 ? cueSpot() : null;
          if (cue && cue.distanceTo(pos) > size * 2) { mode = "fly"; aim.copy(cue); } else takeOff(160);
        }
      }
      pos.addScaledVector(vel, dt);
      pos.set(THREE.MathUtils.clamp(pos.x, -120, width + 120), THREE.MathUtils.clamp(pos.y, -120, height + 120));
      if (mode === "rest" && pos.distanceTo(pointer) < size * 2.2) takeOff(240);

      const speed = vel.length();
      flyMix += ((mode === "fly" ? 1 : 0) - flyMix) * Math.min(1, dt * 3);
      // Heading follows travel and banks into turns; at rest it eases to a gentle angle.
      const stop = mode === "rest" ? nextStop() : null;
      const want = mode === "fly" && speed > 25 ? Math.atan2(vel.x, -vel.y) : stop ? Math.atan2(stop.x - pos.x, -(stop.y - pos.y)) : -.3;
      const turn = ((want - heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      heading += turn * Math.min(1, dt * 4);
      bank += (THREE.MathUtils.clamp(turn * 1.2, -.6, .6) * flyMix - bank) * Math.min(1, dt * 5);

      // Wings: quick downstrokes with a slower recovery in flight; at rest it basks, wings open, with a slow gentle beat.
      phase += dt * Math.PI * 2 * (flyMix * (5.5 + Math.min(2, speed / 160)) + (1 - flyMix) * .45);
      const stroke = (s: number) => Math.pow((Math.sin(s) + 1) / 2, 1.35);
      wings.forEach(w => {
        const s = phase - (w.hind ? .35 : 0);
        const flying = -.35 + stroke(s) * 1.45, resting = .04 + stroke(s) * .42;
        w.group.rotation.z = w.side * THREE.MathUtils.lerp(resting, flying, flyMix);
        w.group.rotation.y = w.side * (w.hind ? -.08 : .06);
      });
      body.position.y = flyMix * Math.sin(phase + 1.4) * .06;
      body.rotation.z = bank;

      const x = pos.x - width / 2, y = height / 2 - pos.y + flyMix * Math.sin(t * 2.6) * 5;
      butterfly.position.set(x, y, 0);
      // Seen mostly from above, tilted toward the viewer, then turned to its heading.
      butterfly.rotation.set(1.28, 0, -heading, "ZYX");
      butterfly.scale.setScalar(size);
      halo.position.set(x, y, -20); halo.scale.setScalar(size * 4.2);
      haloMaterial.opacity = .14 + flyMix * .2;
      // Glints sweep across the facets, faster while flying.
      scene.environmentRotation.y += dt * (.25 + flyMix * 1.1);
      scene.environmentRotation.x = Math.sin(t * .7) * .3;

      // Sparkles shed from the wing tips while flying.
      sparkDebt += dt * flyMix * Math.min(60, 12 + speed * .12);
      while (sparkDebt > 1) {
        sparkDebt -= 1;
        const w = wings[Math.floor(Math.random() * wings.length)];
        tip.set(w.hind ? .55 : 1.15, 0, w.hind ? 1.05 : -.9); w.group.localToWorld(tip);
        emit(tip.x, tip.y, tip.z + 5);
      }
      for (let i = 0; i < SPARKS; i++) {
        if (sparkLife[i] <= 0) continue;
        sparkLife[i] = Math.max(0, sparkLife[i] - dt * 1.25);
        sparkPos[i * 3] += sparkVel[i * 2] * dt; sparkPos[i * 3 + 1] += sparkVel[i * 2 + 1] * dt;
      }
      sparkGeo.attributes.position.needsUpdate = true; sparkGeo.attributes.aLife.needsUpdate = true; sparkGeo.attributes.aSize.needsUpdate = true;
      renderer.render(scene, camera);
    }
    function resize() {
      width = innerWidth; height = innerHeight;
      size = width < 761 ? 28 : 40;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.set(0, 0, height / 2 / Math.tan(THREE.MathUtils.degToRad(15)));
      camera.far = camera.position.z * 3; camera.updateProjectionMatrix();
    }
    // Scrolling: it flutters along with a little lag, then lands wherever the reader stops.
    let lastY = scrollY;
    const scroll = () => {
      const dy = THREE.MathUtils.clamp(scrollY - lastY, -80, 80); lastY = scrollY;
      mode = "fly"; scrolling = true;
      aim.set(THREE.MathUtils.clamp(pos.x + Math.sin(performance.now() / 420) * 26, size * 2, width - size * 2), THREE.MathUtils.clamp(pos.y - dy * 1.2, size * 2 + 80, height - size * 2));
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; takeOff(); }, 220);
    };
    const move = (event: PointerEvent) => pointer.set(event.clientX, event.clientY);
    const visibility = () => { cancelAnimationFrame(frame); if (!document.hidden) { last = performance.now(); frame = requestAnimationFrame(step); } };
    addEventListener("resize", resize); addEventListener("scroll", scroll, { passive: true }); addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    resize();
    // Drift in from the right once the page has settled.
    const enter = setTimeout(() => { if (!disposed) takeOff(); }, 900);
    frame = requestAnimationFrame(step);

    return () => {
      disposed = true; cancelAnimationFrame(frame); clearTimeout(scrollTimer); clearTimeout(routeTimer); clearTimeout(enter);
      removeEventListener("resize", resize); removeEventListener("scroll", scroll); removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      onRoute.current = () => {};
      disposables.forEach(d => d.dispose()); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  // A route change keeps the same butterfly: it glides to a clear spot on the new page once the curtain lifts.
  useEffect(() => { onRoute.current(); }, [path]);
  return <div className="butterfly-layer" ref={host} aria-hidden="true" />;
}

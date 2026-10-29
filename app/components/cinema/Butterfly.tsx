"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";

/* A blue butterfly that lives behind the page's text. It drifts around the whole viewport on slow, curving paths,
   flapping in short bursts and gliding between them, then lands on a spot with no text under it and basks. Behind it
   a soft blue shine trails and fades. The wings are painted at runtime on a canvas (deep navy root, morpho blue, ice
   edge, dark margin with pale spots and an eyespot on each tail), so there are still no image files. */

// Text-bearing elements the butterfly must never sit on.
const TEXT = "h1, h2, h3, p, li, a, button, summary, label, input, textarea, select, .action, .pill, .practice-card, .engagement-card, .faq-item, .service-block, .marquee";

/** Right-hand wing outlines in wing space: x runs out from the body, y forward (+) and back (−). */
function forewing() {
  const s = new THREE.Shape();
  s.moveTo(.03, .05);
  s.bezierCurveTo(.2, .45, .62, .92, 1.08, 1.06);
  s.bezierCurveTo(1.26, 1.1, 1.38, .98, 1.32, .8);
  s.bezierCurveTo(1.24, .56, 1.02, .3, .74, .14);
  s.bezierCurveTo(.5, .02, .24, -.02, .03, .05);
  return s;
}
function hindwing() {
  const s = new THREE.Shape();
  s.moveTo(.03, -.02);
  s.bezierCurveTo(.36, .06, .8, -.02, .98, -.3);
  // A scalloped outer margin: each bump bulges away from the wing's middle.
  const margin = [[.98, -.3], [.97, -.52], [.89, -.73], [.75, -.9], [.6, -1.02]];
  for (let i = 1; i < margin.length; i++) {
    const [ax, ay] = margin[i - 1], [bx, by] = margin[i], mx = (ax + bx) / 2, my = (ay + by) / 2;
    const out = new THREE.Vector2(mx - .42, my + .5).normalize().multiplyScalar(.06);
    s.quadraticCurveTo(mx + out.x, my + out.y, bx, by);
  }
  // A slender swallowtail.
  s.bezierCurveTo(.56, -1.12, .5, -1.32, .45, -1.46);
  s.bezierCurveTo(.4, -1.52, .32, -1.48, .33, -1.37);
  s.bezierCurveTo(.32, -1.1, .2, -.8, .06, -.42);
  s.lineTo(.03, -.02);
  return s;
}

/** Paints a wing on a canvas in wing units and returns it as a texture plus the UV bounds it was painted in. */
function wingTexture(shape: THREE.Shape, hind: boolean) {
  const outline = shape.getPoints(24);
  const box = new THREE.Box2().setFromPoints(outline).expandByScalar(.04);
  const w = box.max.x - box.min.x, h = box.max.y - box.min.y, k = 512 / Math.max(w, h);
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(w * k); canvas.height = Math.ceil(h * k);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(k, 0, 0, -k, -box.min.x * k, box.max.y * k);
  const centroid = outline.reduce((s, p) => s.add(p.clone().divideScalar(outline.length)), new THREE.Vector2());
  const reach = Math.max(...outline.map(p => p.length()));
  const inset = (p: THREE.Vector2, d: number) => p.clone().add(centroid.clone().sub(p).normalize().multiplyScalar(d));
  const trace = (pts: THREE.Vector2[]) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); };
  const dot = (p: THREE.Vector2, r: number, color: string) => { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); };

  trace(outline); ctx.save(); ctx.clip();
  // Ground: deep navy at the root opening into luminous morpho blue, ice toward the edge.
  const ground = ctx.createRadialGradient(0, 0, 0, 0, 0, reach);
  ground.addColorStop(0, "#0a1d4a"); ground.addColorStop(.22, "#123f9c"); ground.addColorStop(.5, "#2477e6");
  ground.addColorStop(.74, "#4fb8ff"); ground.addColorStop(.9, "#a6e4ff");
  ctx.fillStyle = ground; ctx.fillRect(box.min.x, box.min.y, w, h);
  // A pearly sheen across the middle of the wing.
  const sheen = ctx.createRadialGradient(centroid.x * 1.1, centroid.y * 1.1, 0, centroid.x * 1.1, centroid.y * 1.1, reach * .45);
  sheen.addColorStop(0, "rgba(220,245,255,.38)"); sheen.addColorStop(1, "rgba(220,245,255,0)");
  ctx.fillStyle = sheen; ctx.fillRect(box.min.x, box.min.y, w, h);
  // Veins: gently curved spokes from the root, and a submarginal line following the edge.
  ctx.strokeStyle = "rgba(6,22,58,.5)"; ctx.lineWidth = .014; ctx.lineCap = "round";
  const spokes = outline.filter(p => p.length() > reach * .45).filter((_, i, all) => i % Math.max(1, Math.round(all.length / 9)) === 0);
  for (const p of spokes) {
    const end = inset(p, .02), mid = end.clone().multiplyScalar(.5).add(new THREE.Vector2(-end.y, end.x).multiplyScalar(.08));
    ctx.beginPath(); ctx.moveTo(.03, 0); ctx.quadraticCurveTo(mid.x, mid.y, end.x, end.y); ctx.stroke();
  }
  ctx.lineWidth = .01; trace(outline.filter(p => p.length() > reach * .3).map(p => inset(p, .2))); ctx.stroke();
  // A dark velvet margin with a row of pale spots, and on the hindwing a second row of blue crescents.
  ctx.strokeStyle = "#0b1838"; ctx.lineWidth = .17; ctx.lineJoin = "round"; trace(outline); ctx.stroke();
  const rim = outline.filter((p, i) => p.length() > reach * .42 && i % 2 === 0);
  rim.forEach(p => dot(inset(p, .045), .019, "rgba(226,246,255,.95)"));
  if (hind) {
    rim.forEach((p, i) => i % 2 || dot(inset(p, .13), .028, "rgba(120,205,255,.85)"));
    // An eyespot at the base of the tail.
    const eye = new THREE.Vector2(.5, -.98);
    dot(eye, .085, "#0b1838"); dot(eye, .06, "#4fb8ff"); dot(eye, .035, "#0b1838"); dot(eye.clone().add(new THREE.Vector2(.012, .014)), .014, "#f2fbff");
  } else {
    // Pale flecks near the apex.
    for (const [x, y, r] of [[1.08, .9, .03], [1.0, .8, .024], [1.16, .78, .022], [.92, .72, .018]]) dot(new THREE.Vector2(x, y), r, "rgba(232,248,255,.9)");
  }
  ctx.restore();
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = 4;
  return { texture, box };
}

/** The wing as a flat mesh lying in the x–z plane (z is the body's forward axis), UV-mapped to its painted texture. */
function wingGeometry(shape: THREE.Shape, box: THREE.Box2) {
  const geometry = new THREE.ShapeGeometry(shape, 16);
  const position = geometry.attributes.position, uv = geometry.attributes.uv;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i), y = position.getY(i);
    uv.setXY(i, (x - box.min.x) / (box.max.x - box.min.x), (y - box.min.y) / (box.max.y - box.min.y));
    position.setXYZ(i, x, 0, -y);
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** A small procedural studio so the wings catch varied light; it rotates over time to sweep glints across them. */
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

/** A soft blue radial glow, drawn on a canvas at runtime. Blue (not white) so it reads on the light pages too. */
function glowTexture() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d")!, g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(120,195,255,.6)"); g.addColorStop(.4, "rgba(70,150,250,.22)"); g.addColorStop(1, "rgba(70,150,250,0)");
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const pointVertex = `attribute float aLife; attribute float aSize; uniform float uDpr; varying float vLife;
  void main(){ vLife = aLife; vec4 mv = modelViewMatrix * vec4(position, 1.); gl_PointSize = aSize * uDpr * (.55 + .45 * aLife); gl_Position = projectionMatrix * mv; }`;

/** The shine: soft blue blobs left along the path, a bright pale core inside a wide glow, fading out over time. */
const TRAIL = 160;
const trailShader = {
  vertexShader: pointVertex,
  fragmentShader: `varying float vLife;
    void main(){
      float d = length(gl_PointCoord - .5) * 2.; if (d > 1.) discard;
      float glow = exp(-d * d * 4.) * .13, core = exp(-d * d * 22.) * .34, a = (glow + core) * vLife * vLife;
      vec3 color = mix(vec3(.16, .52, 1.), vec3(.7, .92, 1.), core / (glow + core + 1e-4));
      gl_FragColor = vec4(color, a);
    }`,
};
/** A few four-point twinkles shed from the wing tips. */
const SPARKS = 40;
const sparkShader = {
  vertexShader: pointVertex,
  fragmentShader: `varying float vLife;
    void main(){
      vec2 p = gl_PointCoord - .5; float d = length(p);
      float star = max(0., 1. - abs(p.x) * 14.) * max(0., 1. - abs(p.y) * 2.2) + max(0., 1. - abs(p.y) * 14.) * max(0., 1. - abs(p.x) * 2.2);
      float a = min(1., smoothstep(.5, 0., d) * .4 + star) * vLife * .85;
      gl_FragColor = vec4(mix(vec3(.2, .56, 1.), vec3(.9, .97, 1.), star * .5), a);
    }`,
};

/** A ring buffer of fading points in the butterfly's pixel-space world. */
function pointPool(count: number, shader: { vertexShader: string; fragmentShader: string }, dpr: number) {
  const pos = new Float32Array(count * 3), life = new Float32Array(count), size = new Float32Array(count), vel = new Float32Array(count * 2);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute("aLife", new THREE.BufferAttribute(life, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  const material = new THREE.ShaderMaterial({ ...shader, uniforms: { uDpr: { value: dpr } }, transparent: true, depthWrite: false });
  const points = new THREE.Points(geometry, material); points.frustumCulled = false;
  let next = 0;
  return {
    points, geometry, material,
    emit(x: number, y: number, z: number, s: number, vx = 0, vy = 0) {
      const i = next; next = (next + 1) % count;
      pos.set([x, y, z], i * 3); vel.set([vx, vy], i * 2); life[i] = 1; size[i] = s;
    },
    update(dt: number, fade: number) {
      for (let i = 0; i < count; i++) {
        if (life[i] <= 0) continue;
        life[i] = Math.max(0, life[i] - dt * fade);
        pos[i * 3] += vel[i * 2] * dt; pos[i * 3 + 1] += vel[i * 2 + 1] * dt;
      }
      geometry.attributes.position.needsUpdate = true; geometry.attributes.aLife.needsUpdate = true; geometry.attributes.aSize.needsUpdate = true;
    },
  };
}

const wrap = (a: number) => ((a + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

export default function Butterfly({ path }: { path: string }) {
  const host = useRef<HTMLDivElement>(null);
  const onRoute = useRef<() => void>(() => {});
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); } catch { return; }
    const dpr = Math.min(devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene(), environment = studio(renderer);
    scene.environment = environment;
    const camera = new THREE.PerspectiveCamera(30, 1, 10, 5000);
    const disposables: { dispose(): void }[] = [environment];

    // Painted wings under an iridescent clearcoat, with a pale blue rim where they turn away from the viewer.
    const wingMaterial = (map: THREE.Texture) => {
      const m = new THREE.MeshPhysicalMaterial({
        map, emissiveMap: map, emissive: "#ffffff", emissiveIntensity: .32, roughness: .32, metalness: .12, side: THREE.DoubleSide,
        iridescence: .9, iridescenceIOR: 1.4, iridescenceThicknessRange: [300, 800], clearcoat: .8, clearcoatRoughness: .08,
        sheen: .6, sheenColor: new THREE.Color("#8fdcff"), envMapIntensity: 1.4,
      });
      m.onBeforeCompile = shader => {
        shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `#include <opaque_fragment>
          float rim = pow(max(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 0.0), 2.5);
          gl_FragColor.rgb += vec3(.55, .82, 1.) * rim * .35;`);
      };
      return m;
    };
    const velvet = new THREE.MeshStandardMaterial({ color: "#14213b", roughness: .55, metalness: .3, emissive: "#0a2a55", emissiveIntensity: .35, envMapIntensity: 1.2 });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: "#05080f", metalness: .6, roughness: .1 });
    const feeler = new THREE.LineBasicMaterial({ color: "#1b2a44" });
    const glow = glowTexture();
    const haloMaterial = new THREE.SpriteMaterial({ map: glow, depthWrite: false, transparent: true, opacity: .4 });
    const halo = new THREE.Sprite(haloMaterial);
    disposables.push(velvet, eyeMaterial, feeler, glow, haloMaterial);

    // Assemble: the body runs along −z (head forward); each wing hinges on the body axis.
    const butterfly = new THREE.Group(), body = new THREE.Group();
    butterfly.add(body);
    const wings: { group: THREE.Group; side: number; hind: boolean }[] = [];
    for (const hind of [false, true]) {
      const shape = hind ? hindwing() : forewing(), { texture, box } = wingTexture(shape, hind);
      const geometry = wingGeometry(shape, box), material = wingMaterial(texture);
      disposables.push(texture, geometry, material);
      for (const side of [1, -1]) {
        const group = new THREE.Group();
        group.add(new THREE.Mesh(geometry, material));
        group.scale.x = side;
        body.add(group); wings.push({ group, side, hind });
      }
    }
    const thoraxGeo = new THREE.CapsuleGeometry(.07, .3, 6, 14), abdomenGeo = new THREE.CapsuleGeometry(.05, .55, 6, 14), headGeo = new THREE.SphereGeometry(.075, 18, 12), eyeGeo = new THREE.SphereGeometry(.032, 10, 8), clubGeo = new THREE.SphereGeometry(.024, 8, 6);
    disposables.push(thoraxGeo, abdomenGeo, headGeo, eyeGeo, clubGeo);
    const thorax = new THREE.Mesh(thoraxGeo, velvet); thorax.rotation.x = Math.PI / 2; thorax.position.z = -.08;
    const abdomen = new THREE.Mesh(abdomenGeo, velvet); abdomen.rotation.x = Math.PI / 2; abdomen.position.z = .44; abdomen.scale.set(.9, 1, .9);
    const head = new THREE.Mesh(headGeo, velvet); head.position.z = -.33;
    const eyes = [-1, 1].map(s => { const e = new THREE.Mesh(eyeGeo, eyeMaterial); e.position.set(.05 * s, .02, -.37); return e; });
    const tips = [-1, 1].map(s => new THREE.Vector3(.3 * s, .1, -.98));
    const antennae = new THREE.BufferGeometry().setFromPoints([-1, 1].flatMap((s, j) => {
      const pts = new THREE.QuadraticBezierCurve3(new THREE.Vector3(.03 * s, .03, -.4), new THREE.Vector3(.12 * s, .16, -.72), tips[j]).getPoints(12);
      return pts.slice(0, -1).flatMap((p, i) => [p, pts[i + 1]]);
    }));
    disposables.push(antennae);
    const clubs = tips.map(p => { const c = new THREE.Mesh(clubGeo, velvet); c.position.copy(p); return c; });
    body.add(thorax, abdomen, head, ...eyes, ...clubs, new THREE.LineSegments(antennae, feeler));

    const trail = pointPool(TRAIL, trailShader, dpr), sparks = pointPool(SPARKS, sparkShader, dpr);
    disposables.push(trail.geometry, trail.material, sparks.geometry, sparks.material);
    scene.add(trail.points, halo, butterfly, sparks.points);
    let trailGap = 0, sparkDebt = 0;
    const tip = new THREE.Vector3();

    // The thread: each place it lands is joined to the last by a faint line of light that fades, so the reader sees
    // the flight as one continuous path, from one stop to the next (connection, continuity). Points are in screen
    // pixels and converted to the scene's centred coordinates when drawn.
    const threadPos = new Float32Array(6);
    const threadGeo = new THREE.BufferGeometry();
    threadGeo.setAttribute("position", new THREE.BufferAttribute(threadPos, 3));
    const threadMat = new THREE.LineBasicMaterial({ color: 0x4fb8ff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    const threadLine = new THREE.Line(threadGeo, threadMat); threadLine.frustumCulled = false; scene.add(threadLine);
    disposables.push(threadGeo, threadMat);
    const lastStop = new THREE.Vector2(NaN, NaN);
    let threadLife = 0;
    function weave(stop: THREE.Vector2) {
      if (!Number.isNaN(lastStop.x)) {
        threadPos.set([lastStop.x - width / 2, height / 2 - lastStop.y, -12, stop.x - width / 2, height / 2 - stop.y, -12]);
        threadGeo.attributes.position.needsUpdate = true; threadLife = 1;
      }
      lastStop.copy(stop);
    }

    // Flight state, in screen pixels. Heading 0 points up the screen; the butterfly always flies along its heading.
    const pos = new THREE.Vector2(innerWidth + 80, innerHeight * .3), aim = new THREE.Vector2(innerWidth * .7, innerHeight * .35), pointer = new THREE.Vector2(-999, -999);
    let mode: "fly" | "land" | "rest" = "fly", heading = -Math.PI / 2, look = heading, bank = 0, speed = 0, legs = 2;
    let flyMix = 1, phase = 0, beats = 4, gliding = false, glideMix = 0, glideFrom = 0, glideUntil = 0, bob = 0;
    let width = 0, height = 0, frame = 0, last = performance.now(), disposed = false;
    let size = 40, restUntil = 0, scrolling = false, scrollTimer: ReturnType<typeof setTimeout> | undefined, routeTimer: ReturnType<typeof setTimeout> | undefined;

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
    /** The nearest clear spot to (x, y), searched on widening rings. */
    function landing(x: number, y: number) {
      for (let r = 0; r < Math.max(width, height); r += 36) {
        const steps = Math.max(10, Math.round(r / 16)), start = Math.random() * Math.PI * 2;
        for (let i = 0; i < steps; i++) {
          const a = start + (i / steps) * Math.PI * 2, px = x + Math.cos(a) * r, py = y + Math.sin(a) * r;
          if (clear(px, py)) return new THREE.Vector2(px, py);
        }
      }
      return new THREE.Vector2(width * .86, height * .3);
    }
    /** A waypoint somewhere well across the viewport, so it roams the whole page rather than circling one spot. */
    function wander() {
      const m = size * 3, p = new THREE.Vector2();
      for (let i = 0; i < 12; i++) {
        p.set(m + Math.random() * (width - m * 2), m + 80 + Math.random() * (height - m * 2 - 80));
        if (p.distanceTo(pos) > Math.min(width, height) * .55) break;
      }
      return p;
    }
    function takeOff(trips = 5 + Math.floor(Math.random() * 4)) { mode = "fly"; legs = trips; aim.copy(wander()); }
    // The first call is the mount itself, not a route change.
    let mounted = false;
    onRoute.current = () => { if (!mounted) { mounted = true; return; } clearTimeout(routeTimer); routeTimer = setTimeout(() => takeOff(), 900); if (mode === "rest") takeOff(); };

    // The butterfly is decoration: if it cannot hold the frame budget even at 1x, it leaves the page.
    const budget = frameBudget(renderer, { resize: () => resize(), onTooSlow: () => { disposed = true; cancelAnimationFrame(frame); renderer.domElement.style.display = "none"; } });
    function step(now: number) {
      frame = requestAnimationFrame(step);
      budget.tick();
      const dt = Math.min(.05, (now - last) / 1000), t = now / 1000; last = now;
      if (!width) return;
      const cruise = size * 2.6;
      const to = aim.clone().sub(pos), dist = to.length();
      let turnRate = 0;

      if (mode === "rest") {
        speed = 0; pos.lerp(aim, Math.min(1, dt * 3));
        if (t > restUntil || pos.distanceTo(pointer) < size * 2.2) takeOff();
      } else {
        // Steering: turn toward the waypoint at a limited rate, plus a slow meander, so the path is a chain of soft arcs.
        const near = THREE.MathUtils.clamp(1 - dist / (size * 5), 0, 1);
        const maxRate = mode === "land" ? .9 + near * 3.5 : .8 + near * 1.6;
        const meander = (Math.sin(t * .83) * .5 + Math.sin(t * 2.1 + 1.3) * .28 + Math.sin(t * .37 + 4) * .4) * (1 - near);
        turnRate = THREE.MathUtils.clamp(wrap(Math.atan2(to.x, -to.y) - heading) * 1.4, -maxRate, maxRate) + meander;
        heading = wrap(heading + turnRate * dt);
        // Speed breathes a little, eases off in a glide and slows right down for a landing.
        let want = cruise * (.85 + Math.sin(t * .6) * .15) * (1 - glideMix * .2);
        if (mode === "land") want *= THREE.MathUtils.clamp(dist / (size * 4), .1, 1);
        speed += (want - speed) * Math.min(1, dt * 1.5);
        pos.x += Math.sin(heading) * speed * dt; pos.y -= Math.cos(heading) * speed * dt;

        if (mode === "fly" && dist < size * 2) {
          if (--legs > 0 || scrolling) aim.copy(wander());
          else { mode = "land"; aim.copy(landing(pos.x, pos.y)); }
        }
        if (mode === "land") {
          // On the final approach it settles straight onto the spot.
          if (dist < size * .6) pos.lerp(aim, Math.min(1, dt * 3));
          if (dist < 2) { mode = "rest"; restUntil = t + 3 + Math.random() * 2; weave(pos); }
        }
      }
      pos.set(THREE.MathUtils.clamp(pos.x, -120, width + 120), THREE.MathUtils.clamp(pos.y, -120, height + 120));
      flyMix += ((mode === "rest" ? 0 : 1) - flyMix) * Math.min(1, dt * 3);

      // Wings: unhurried bursts of a few beats (quick downstroke, slower recovery), then a short glide with the wings held in a
      // shallow V. On the final approach it keeps flapping; at rest it slowly opens and closes them.
      if (mode === "fly" && !gliding) {
        const before = Math.floor(phase / (Math.PI * 2));
        phase += dt * Math.PI * 2 * 2.4;
        if (Math.floor(phase / (Math.PI * 2)) > before && --beats <= 0) { gliding = true; glideFrom = t; glideUntil = t + .6 + Math.random() * 1; }
      } else if (gliding) {
        if (t > glideUntil || mode !== "fly") { gliding = false; beats = 2 + Math.floor(Math.random() * 4); }
      } else phase += dt * Math.PI * 2 * (flyMix * 2.4 + (1 - flyMix) * .3);
      glideMix += ((gliding ? 1 : 0) - glideMix) * Math.min(1, dt * 7);
      const stroke = (s: number) => Math.pow((Math.sin(s) + 1) / 2, 1.35);
      wings.forEach(w => {
        const s = phase - (w.hind ? .3 : 0);
        const flapping = -.4 + stroke(s) * 1.5, glide = w.hind ? .22 : .3, basking = .08 + stroke(s) * .75;
        w.group.rotation.z = w.side * THREE.MathUtils.lerp(basking, THREE.MathUtils.lerp(flapping, glide, glideMix), flyMix);
        w.group.rotation.y = w.side * (w.hind ? -.1 : .06);
      });
      // Each downstroke lifts it a little; in a glide it sinks gently.
      const bobTo = flyMix * ((1 - glideMix) * Math.sin(phase + 1.2) * size * .1 + glideMix * size * .3 * Math.min(1, (t - glideFrom) / .9));
      bob += (bobTo - bob) * Math.min(1, dt * 6);

      look += wrap(heading - look) * Math.min(1, dt * 5);
      bank += (THREE.MathUtils.clamp(turnRate * .35, -.5, .5) * flyMix - bank) * Math.min(1, dt * 4);
      body.position.y = flyMix * (1 - glideMix) * Math.sin(phase + 1.4) * .05;
      body.rotation.z = bank;

      const x = pos.x - width / 2, y = height / 2 - pos.y - bob;
      butterfly.position.set(x, y, 0);
      // Seen mostly from above, tilted toward the viewer, then turned to its heading.
      butterfly.rotation.set(1.28, 0, -look, "ZYX");
      butterfly.scale.setScalar(size);
      halo.position.set(x, y, -20); halo.scale.setScalar(size * (3.2 + flyMix * .8));
      haloMaterial.opacity = .3 + flyMix * .35;
      // Glints sweep across the wings, a little faster in flight.
      scene.environmentRotation.y += dt * (.2 + flyMix * .5);
      scene.environmentRotation.x = Math.sin(t * .7) * .3;

      // The shine: a soft blue blob every few pixels travelled, laid just behind the body.
      trailGap += speed * dt * flyMix;
      if (trailGap > 5) {
        trailGap = 0;
        trail.emit(x - Math.sin(look) * size * .35, y - Math.cos(look) * size * .35, -10, size * 2, 0, 5);
      }
      trail.update(dt, .5);
      sparkDebt += dt * flyMix * 5;
      while (sparkDebt > 1) {
        sparkDebt -= 1;
        const w = wings[Math.floor(Math.random() * wings.length)];
        tip.set(w.hind ? .42 : 1.25, 0, w.hind ? 1.45 : -.85); w.group.localToWorld(tip);
        sparks.emit(tip.x, tip.y, tip.z + 5, 6 + Math.random() * 6, (Math.random() - .5) * 12, -8 - Math.random() * 10);
      }
      sparks.update(dt, 1);
      threadLife = Math.max(0, threadLife - dt * .3); threadMat.opacity = threadLife * .55;
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
    // Scrolling lifts it off any perch and it keeps roaming, drifting slightly with the page, until the reader stops.
    let lastY = scrollY;
    const scroll = () => {
      const dy = THREE.MathUtils.clamp(scrollY - lastY, -60, 60); lastY = scrollY;
      if (mode !== "fly") takeOff();
      pos.y -= dy * .15; scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { scrolling = false; }, 600);
    };
    const move = (event: PointerEvent) => pointer.set(event.clientX, event.clientY);
    const visibility = () => { cancelAnimationFrame(frame); if (!document.hidden && !disposed) { last = performance.now(); budget.reset(); frame = requestAnimationFrame(step); } };
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
  // A route change keeps the same butterfly: it flies on and finds a clear spot on the new page once the curtain lifts.
  useEffect(() => { onRoute.current(); }, [path]);
  // On phones the page has little empty space, so the butterfly stays with the opening screen: once the page's first
  // section has scrolled mostly away it fades out, and it returns when the reader scrolls back up.
  useEffect(() => {
    const layer = host.current, phone = matchMedia("(max-width: 760px)");
    if (!layer) return;
    let observer: IntersectionObserver | undefined;
    const watch = () => {
      observer?.disconnect(); layer.classList.remove("is-away");
      const opening = document.querySelector("main > section");
      if (!phone.matches || !opening) return;
      observer = new IntersectionObserver(([entry]) => layer.classList.toggle("is-away", entry.intersectionRatio < .35), { threshold: [0, .35, 1] });
      observer.observe(opening);
    };
    const settle = setTimeout(watch, 300);
    phone.addEventListener("change", watch);
    return () => { clearTimeout(settle); observer?.disconnect(); phone.removeEventListener("change", watch); };
  }, [path]);
  return <div className="butterfly-layer" ref={host} aria-hidden="true" />;
}

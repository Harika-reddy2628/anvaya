"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { frameBudget } from "../../lib/frameBudget";
import { ScrollTrigger, gsap } from "../../lib/motion";

/** A thick glass petal: a pill outline extruded with a soft bevel, pivoting at its base. */
export function petalGeometry(width: number, length: number, depth: number) {
  const r = width / 2, shape = new THREE.Shape();
  shape.moveTo(-r, r); shape.lineTo(-r, length - r);
  shape.absarc(0, length - r, r, Math.PI, 0, true);
  shape.lineTo(r, r); shape.absarc(0, r, r, 0, Math.PI, true);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: .07, bevelSize: .06, bevelSegments: 8, curveSegments: 40 });
  geometry.translate(0, 0, -depth / 2);
  return geometry;
}

/** Procedural daylight studio: pale walls, a broad white softbox, a cool blue fill and a dark floor strip that draws the
    dark teal edge lines seen in the reference. No image files. */
export function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const env = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];
  const box = (size: [number, number, number], position: [number, number, number], color: string, intensity: number, back = false) => {
    const geometry = new THREE.BoxGeometry(...size);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: back ? THREE.BackSide : THREE.FrontSide });
    disposables.push(geometry, material);
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(...position); env.add(mesh);
  };
  box([30, 20, 30], [0, 0, 0], "#dfe7ee", 1, true);
  box([16, .2, 8], [0, 9.5, 2], "#ffffff", 5);
  box([.2, 6, 14], [-14, 5, 2], "#ffffff", 3);
  box([.2, 6, 10], [14, 4, -1], "#7cc2f2", 3.5);
  // A dark band around the horizon: grazing edges reflect it as the crisp teal-black lines of the reference.
  box([28, 2.2, .2], [0, -1.2, -14.5], "#0b2230", 1);
  box([28, 2.2, .2], [0, -1.2, 14.5], "#0b2230", 1);
  box([.2, 2.2, 28], [-14.5, -1.2, 0], "#0b2230", 1);
  box([.2, 2.2, 28], [14.5, -1.2, 0], "#0b2230", 1);
  box([30, .2, 30], [0, -9.5, 0], "#1a3a4e", 1);
  box([8, 6, .2], [2, 4, 14], "#ffffff", 2);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const texture = pmrem.fromScene(env, .02).texture;
  pmrem.dispose(); disposables.forEach(d => d.dispose());
  return texture;
}

const RIPPLES = 12;
const backdropShader = {
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  // A reeded-glass wall in sRGB: soft drifting light behind vertical flutes, water caustics, and pointer ripples that
  // ring outward and bend the flutes. The petals refract this, so the ripples show through the glass as well.
  fragmentShader: `varying vec2 vUv; uniform vec2 uHub; uniform float uTime; uniform float uAspect; uniform vec4 uRipples[${RIPPLES}];
    float caustic(vec2 p, float t){
      vec2 i = p; float c = 1.;
      for (int n = 0; n < 4; n++) {
        float tt = t * (1. - 3.5 / float(n + 1));
        i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
        // Guarded: sin and cos reach zero, which would send infinities through the glass transmission.
        vec2 s = vec2(sin(i.x + tt), cos(i.y + tt));
        s = sign(s) * max(abs(s), 1e-3);
        c += 1. / max(length(p * .005 / s), 1e-3);
      }
      c = 1.17 - pow(c / 4., 1.4);
      return clamp(pow(abs(c), 8.), 0., 1.);
    }
    vec3 light(vec2 uv){
      vec3 col = mix(vec3(.972, .978, .985), vec3(.86, .9, .935), smoothstep(.0, 1.3, (1. - uv.y) * .7 + uv.x * .6));
      vec2 a = uHub + vec2(sin(uTime * .21) * .08, .25 + cos(uTime * .17) * .06), b = vec2(.22 + sin(uTime * .13) * .1, .8 + cos(uTime * .19) * .05);
      col = mix(col, vec3(.74, .86, .95), (1. - smoothstep(.0, .42, length((uv - a) * vec2(uAspect, 1.)))) * .55);
      col = mix(col, vec3(1.), (1. - smoothstep(.0, .3, length((uv - b) * vec2(uAspect, 1.)))) * .6);
      return col;
    }
    void main(){
      vec2 uv = vUv, push = vec2(0.); float ring = 0.;
      for (int i = 0; i < ${RIPPLES}; i++) {
        vec4 r = uRipples[i];
        float age = uTime - r.z;
        if (r.w <= 0. || age < 0. || age > 3.) continue;
        vec2 d = (uv - r.xy) * vec2(uAspect, 1.);
        float dist = length(d), front = age * .32;
        float wave = sin((dist - front) * 70.) * exp(-abs(dist - front) * 22.) * exp(-age * 1.4) * r.w;
        push += normalize(d + 1e-5) * wave * .012;
        ring += wave;
      }
      uv += push;
      // Vertical flutes (pow bases are clamped: a negative base is undefined in GLSL and renders NaN stripes on some GPUs): each rib refracts a slightly shifted slice of the light behind and catches a highlight.
      float ribs = 34. * uAspect, f = fract(uv.x * ribs);
      vec2 behind = uv + vec2((f - .5) * .045, 0.);
      vec3 col = light(behind);
      col *= .965 + .05 * sin(f * 3.1416);
      col += vec3(1.) * pow(max(1. - abs(f - .18) * 6., 0.), 6.) * .05 * step(abs(f - .18), .166);
      col += vec3(.7, .86, 1.) * caustic(behind * vec2(uAspect, 1.) * 5., uTime * .35) * .09;
      col += vec3(.9, .96, 1.) * ring * .05;
      gl_FragColor = vec4(clamp(col, 0., 1.), 1.);
    }`,
};

type Petal = { mesh: THREE.Mesh; base: number; order: number; turn: number };

export default function PetalScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" }); } catch { target.dataset.scene = "failed"; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const environment = studioEnvironment(renderer);
    scene.environment = environment;
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    camera.position.set(0, 0, 16);
    const backdropMaterial = new THREE.ShaderMaterial({ ...backdropShader, uniforms: { uHub: { value: new THREE.Vector2(.75, .05) }, uTime: { value: 0 }, uAspect: { value: 1.6 }, uRipples: { value: Array.from({ length: RIPPLES }, () => new THREE.Vector4()) } }, depthWrite: false, toneMapped: false });
    const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), backdropMaterial);
    backdrop.position.z = -10; scene.add(backdrop);

    const glass = new THREE.MeshPhysicalMaterial({
      color: "#ffffff", metalness: 0, roughness: .02, transmission: 1, thickness: .55, ior: 1.5, dispersion: 1.2,
      attenuationColor: "#8fd0f2", attenuationDistance: 1.8, clearcoat: 1, clearcoatRoughness: .02, envMapIntensity: 1.1, specularIntensity: 1,
    });
    // Real glass slabs read darkest along their edges, where light travels furthest through them. Transmission alone
    // cannot show that, so grazing angles are tinted toward deep teal after shading.
    glass.onBeforeCompile = shader => {
      shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `#include <opaque_fragment>
        float edgeTint = pow(max(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 0.0), 1.5);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.03, .19, .29), smoothstep(.06, .5, edgeTint) * .88);`);
    };
    const hub = new THREE.Group(), fan = new THREE.Group();
    hub.add(fan); scene.add(hub);

    const petals: Petal[] = [];
    let geometry: THREE.ExtrudeGeometry | null = null;
    let mobile = false;
    function layout() {
      petals.forEach(p => fan.remove(p.mesh)); petals.length = 0; geometry?.dispose();
      mobile = matchMedia("(max-width: 760px)").matches;
      const count = mobile ? 11 : 15, span = THREE.MathUtils.degToRad(mobile ? 150 : 170);
      geometry = petalGeometry(mobile ? .5 : .92, mobile ? 3.3 : 5.5, mobile ? .18 : .22);
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        const mesh = new THREE.Mesh(geometry, glass);
        // Successive petals sit slightly nearer, so the fan overlaps like the reference.
        mesh.position.z = (i - count / 2) * .045;
        fan.add(mesh);
        petals.push({ mesh, base: (t - .5) * span, order: Math.abs(t - .5) * 2, turn: -.55 + t * .2 });
      }
      // Desktop: the fan rises from the lower right. Phones: it blooms from the bottom centre beneath the copy.
      hub.position.set(mobile ? 0 : 4.1, mobile ? -5.55 : -4.9, 0);
      hub.rotation.set(-.32, mobile ? 0 : -.38, mobile ? 0 : .1);
      backdropMaterial.uniforms.uHub.value.set(mobile ? .5 : .74, .05);
    }
    layout();

    const state = { open: 0, scroll: 0, px: 0, py: 0, pointerAngle: 9, pointerOn: 0 };
    let width = 0, height = 0, frame = 0, running = false, disposed = false, compiled = false;
    const clock = new THREE.Clock(), hubScreen = new THREE.Vector3();

    function draw() {
      if (disposed || !compiled || !width || !height) return;
      const time = clock.getElapsedTime();
      backdropMaterial.uniforms.uTime.value = time;
      petals.forEach((p, i) => {
        // Entrance: the closed stack unfolds from the centre outward, each petal overshooting slightly as it settles.
        const local = gsap.utils.clamp(0, 1, (state.open - p.order * .45) / .55);
        const ease = local === 1 ? 1 : 1 - Math.pow(2, -10 * local) * Math.cos(local * 7);
        // Idle: a slow wave travels across the fan; the pointer parts the petals beneath it.
        const wave = Math.sin(time * .9 - i * .42) * .035;
        const near = p.base - state.pointerAngle;
        const part = Math.sign(near) * Math.exp(-near * near * 14) * .16 * state.pointerOn;
        p.mesh.rotation.set(0, p.turn + Math.sin(time * .6 + i * .3) * .05, -(p.base * ease * (1 + state.scroll * .2)) + wave + part, "ZYX");
      });
      fan.rotation.z = state.scroll * .55;
      hub.rotation.y += ((mobile ? 0 : -.38) + state.px * .22 - hub.rotation.y) * .05;
      hub.rotation.x += (-.32 - state.py * .14 - hub.rotation.x) * .05;
      hub.scale.setScalar(1 + state.scroll * .18);
      try { renderer.render(scene, camera); target!.dataset.scene = "ready"; } catch { target!.dataset.scene = "failed"; stop(); }
    }
    // Too slow even at 1x: stop for good and let the hero's CSS fallback show instead.
    const budget = frameBudget(renderer, { resize: () => resize(), onTooSlow: () => { disposed = true; stop(); observer.disconnect(); sizes.disconnect(); target.dataset.scene = "failed"; } });
    const loop = () => { frame = requestAnimationFrame(loop); draw(); if (compiled) budget.tick(); };
    function start() { if (!running && !disposed) { running = true; clock.start(); budget.reset(); loop(); } }
    function stop() { running = false; cancelAnimationFrame(frame); }
    function resize() {
      width = target!.clientWidth; height = target!.clientHeight;
      if (!width || !height) return;
      const wasMobile = mobile;
      renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix();
      const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - backdrop.position.z);
      backdrop.scale.set(viewHeight * camera.aspect * 1.1, viewHeight * 1.1, 1);
      backdropMaterial.uniforms.uAspect.value = camera.aspect;
      if (matchMedia("(max-width: 760px)").matches !== wasMobile) layout();
      draw();
    }

    const hero = target.closest<HTMLElement>(".hero") ?? target;
    // The fan opens once its shaders are ready (see compileAsync below), so the first frames are not a stall.
    const intro = gsap.to(state, { open: 1, duration: 3.2, delay: .25, ease: "power1.out", paused: true });
    const scrolled = ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", scrub: true, onUpdate: self => { state.scroll = self.progress; } });
    const move = (event: PointerEvent) => {
      state.px = event.clientX / innerWidth - .5; state.py = event.clientY / innerHeight - .5;
      // The pointer's bearing from the fan's hub, in the fan's angle convention (0 = straight up, positive = left).
      hubScreen.copy(hub.position).project(camera);
      const box = target.getBoundingClientRect();
      const hx = box.left + (hubScreen.x + 1) / 2 * box.width, hy = box.top + (1 - hubScreen.y) / 2 * box.height;
      const angle = Math.atan2(-(event.clientX - hx), hy - event.clientY);
      gsap.to(state, { pointerAngle: angle, pointerOn: 1, duration: .6, ease: "power3.out", overwrite: "auto" });
    };
    // Water under the pointer: a ripple is dropped as it travels, and a stronger one on press.
    let rippleIndex = 0, lastRipple = { x: -1, y: -1, t: 0 };
    function ripple(event: PointerEvent, strength: number) {
      const box = target!.getBoundingClientRect();
      const x = .5 + ((event.clientX - box.left) / box.width - .5) / 1.1, y = .5 + ((1 - (event.clientY - box.top) / box.height) - .5) / 1.1;
      const now = clock.getElapsedTime();
      if (strength < 1.5 && (now - lastRipple.t < .07 || Math.hypot(x - lastRipple.x, y - lastRipple.y) < .015)) return;
      lastRipple = { x, y, t: now };
      backdropMaterial.uniforms.uRipples.value[rippleIndex].set(x, y, now, strength);
      rippleIndex = (rippleIndex + 1) % RIPPLES;
    }
    const trail = (event: PointerEvent) => ripple(event, .55);
    const splash = (event: PointerEvent) => ripple(event, 2);
    hero.addEventListener("pointermove", trail, { passive: true });
    hero.addEventListener("pointerdown", splash);
    const leave = () => gsap.to(state, { pointerOn: 0, duration: 1, ease: "power2.out" });
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);

    // The loop only runs while the hero is on screen and the tab is visible.
    let visible = true;
    const update = () => { if (visible && !document.hidden) start(); else stop(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
    observer.observe(target);
    document.addEventListener("visibilitychange", update);
    const sizes = new ResizeObserver(resize); sizes.observe(target);
    const lost = (event: Event) => { event.preventDefault(); target.dataset.scene = "failed"; stop(); };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    // Compile the glass and backdrop shaders off the critical path (parallel compile where the GPU supports it),
    // then start drawing; the CSS fan stays in place until the first live frame.
    renderer.compileAsync(scene, camera).catch(() => {}).then(() => {
      if (disposed) return;
      compiled = true; resize(); update(); intro.play();
    });
    resize();

    return () => {
      disposed = true; stop(); intro.kill(); scrolled.kill(); gsap.killTweensOf(state);
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointermove", trail); hero.removeEventListener("pointerdown", splash);
      document.removeEventListener("visibilitychange", update); observer.disconnect(); sizes.disconnect();
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      geometry?.dispose(); glass.dispose(); backdrop.geometry.dispose(); backdropMaterial.dispose(); environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div className="live-scene" ref={host} data-scene="loading" />;
}

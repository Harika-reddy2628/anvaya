"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "../../lib/motion";
import { petalGeometry, studioEnvironment } from "./PetalScene";

/** A glass star of eight petals beside the services dial. Each service turns it an eighth and re-forms its petals;
    between changes it turns slowly. Rendered only while on screen. */
export default function GlassStar({ active }: { active: number }) {
  const host = useRef<HTMLDivElement>(null);
  const goTo = useRef<(index: number) => void>(() => {});
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" }); } catch { target.dataset.scene = "failed"; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);

    const scene = new THREE.Scene(), environment = studioEnvironment(renderer);
    scene.environment = environment;
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    camera.position.set(0, 0, 15);
    // Not transmissive: transmission needs a backdrop to refract, and this canvas is transparent over the page.
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#dff1fb", metalness: .05, roughness: .08, clearcoat: 1, clearcoatRoughness: .03, envMapIntensity: 1.5,
      iridescence: .35, iridescenceIOR: 1.4, transparent: true, opacity: .9, specularIntensity: 1,
    });
    glass.onBeforeCompile = shader => {
      shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `#include <opaque_fragment>
        float edgeTint = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 1.5);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.06, .25, .36), smoothstep(.08, .55, edgeTint) * .8);`);
    };
    const geometry = petalGeometry(.82, 4.2, .34);
    const star = new THREE.Group(), tilt = new THREE.Group();
    tilt.add(star); scene.add(tilt);
    tilt.rotation.set(-.25, -.55, 0);
    const petals = Array.from({ length: 8 }, (_, i) => {
      const mesh = new THREE.Mesh(geometry, glass);
      mesh.rotation.z = (i / 8) * Math.PI * 2;
      mesh.position.z = (i % 2) * .08;
      star.add(mesh);
      return mesh;
    });

    const state = { turn: 0, bloom: 1, px: 0, py: 0 };
    let frame = 0, running = false, disposed = false;
    const clock = new THREE.Clock();
    function draw() {
      if (disposed) return;
      const t = clock.getElapsedTime();
      star.rotation.z = state.turn + t * .08;
      petals.forEach((m, i) => {
        // Petals splay apart and close again during a change, alternating in depth.
        m.rotation.x = (1 - state.bloom) * (i % 2 ? .9 : -.9);
        m.scale.setScalar(.75 + state.bloom * .25);
      });
      tilt.rotation.y += (-.55 + state.px * .3 - tilt.rotation.y) * .06;
      tilt.rotation.x += (-.25 + state.py * .2 - tilt.rotation.x) * .06;
      renderer.render(scene, camera);
      target!.dataset.scene = "ready";
    }
    const loop = () => { frame = requestAnimationFrame(loop); draw(); };
    const start = () => { if (!running && !disposed) { running = true; clock.start(); loop(); } };
    const stop = () => { running = false; cancelAnimationFrame(frame); };
    function resize() {
      const w = target!.clientWidth, h = target!.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); draw();
    }
    goTo.current = index => {
      gsap.to(state, { turn: -index * Math.PI / 4, duration: 1.4, ease: "expo.out", overwrite: "auto" });
      gsap.fromTo(state, { bloom: .35 }, { bloom: 1, duration: 1.2, ease: "back.out(1.6)" });
    };
    const move = (event: PointerEvent) => { state.px = event.clientX / innerWidth - .5; state.py = event.clientY / innerHeight - .5; };
    addEventListener("pointermove", move, { passive: true });
    let visible = true;
    const update = () => { if (visible && !document.hidden) start(); else stop(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; update(); });
    observer.observe(target);
    document.addEventListener("visibilitychange", update);
    const sizes = new ResizeObserver(resize); sizes.observe(target);
    resize(); update();
    return () => {
      disposed = true; stop(); gsap.killTweensOf(state);
      removeEventListener("pointermove", move); document.removeEventListener("visibilitychange", update);
      observer.disconnect(); sizes.disconnect();
      geometry.dispose(); glass.dispose(); environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  useEffect(() => { goTo.current(active); }, [active]);
  return <div className="glass-star" ref={host} aria-hidden="true" />;
}

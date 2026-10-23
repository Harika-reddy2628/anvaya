"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "../../lib/motion";

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = host.current;
    if (!target) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); } catch { target.dataset.scene = "failed"; return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.setAttribute("aria-hidden", "true");
    target.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0b0a09");
    scene.fog = new THREE.Fog("#0b0a09", 18, 44);
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 80);
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    function material(color: string, roughness = .85) { const m = new THREE.MeshStandardMaterial({ color, roughness, metalness: .04 }); materials.push(m); return m; }
    const stone = material("#b09b83");
    const clay = material("#6b4937");
    const pale = material("#d8cbb7");
    const floorMaterial = material("#493d32", .92);
    function arch(width: number, height: number, depth: number, thickness: number, mat: THREE.Material, x: number, z: number) {
      const r = width / 2, spring = height - r;
      const shape = new THREE.Shape();
      shape.moveTo(-r, 0); shape.lineTo(-r, spring); shape.absarc(0, spring, r, Math.PI, 0, true); shape.lineTo(r, 0); shape.lineTo(-r, 0);
      const hole = new THREE.Path(); const inner = r - thickness;
      hole.moveTo(-inner, 0); hole.lineTo(inner, 0); hole.lineTo(inner, spring); hole.absarc(0, spring, inner, 0, Math.PI, false); hole.lineTo(-inner, 0);
      shape.holes.push(hole);
      const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .055, bevelThickness: .055, bevelSegments: 3, curveSegments: 48, steps: 1 });
      geometries.push(geometry);
      const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x, .08, z); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh);
    }
    arch(5.2, 7.4, .75, .48, stone, 0, 0);
    arch(4.5, 6.6, .65, .36, clay, .2, -2.1);
    arch(3.8, 5.8, .5, .3, pale, .4, -4.2);
    const floorGeometry = new THREE.PlaneGeometry(100, 100); geometries.push(floorGeometry);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
    const plinthGeometry = new THREE.BoxGeometry(6.4, .18, 8); geometries.push(plinthGeometry);
    const plinth = new THREE.Mesh(plinthGeometry, floorMaterial); plinth.position.set(0, -.03, -1.9); plinth.receiveShadow = true; scene.add(plinth);
    scene.add(new THREE.HemisphereLight("#e8d7bc", "#20140e", 2.2));
    const key = new THREE.DirectionalLight("#fff1d6", 5); key.position.set(-3, 11, 7); key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -12; key.shadow.camera.right = 12; key.shadow.camera.top = 12; key.shadow.camera.bottom = -12; key.shadow.bias = -.001;
    scene.add(key); const fill = new THREE.DirectionalLight("#b78b69", 1.8); fill.position.set(7, 3, -5); scene.add(fill);
    let disposed = false;
    // Scroll and pointer only nudge the camera; frames render on demand, never in an ambient loop.
    const drift = { scroll: 0, x: 0, y: 0 };
    let width = 0, height = 0, mobile = false;
    function draw() {
      if (disposed || !width || !height) return;
      camera.position.set((mobile ? 8.8 : 9.2) - drift.scroll * 2.4 + drift.x * .9, 6.2 + drift.scroll * 1.6 - drift.y * .5, (mobile ? 18 : 15.5) - drift.scroll * 3.2);
      camera.lookAt(.1 + drift.x * .25, 3.1 + drift.scroll * .6, -1.6); camera.updateProjectionMatrix();
      const start = performance.now();
      try { renderer.render(scene, camera); target!.dataset.scene = "ready"; target!.dataset.triangles = String(renderer.info.render.triangles); target!.dataset.drawCalls = String(renderer.info.render.calls); target!.dataset.renderMs = (performance.now() - start).toFixed(2); } catch { target!.dataset.scene = "failed"; }
    }
    function render() {
      if (disposed) return;
      width = target!.clientWidth; height = target!.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height); camera.aspect = width / height;
      mobile = matchMedia("(max-width: 760px)").matches;
      draw();
    }
    const hero = target.closest<HTMLElement>(".hero") ?? target;
    const scrolled = gsap.to(drift, { scroll: 1, ease: "none", onUpdate: draw, scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: .8 } });
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = hero.getBoundingClientRect();
      gsap.to(drift, { x: (event.clientX - box.left) / box.width - .5, y: (event.clientY - box.top) / box.height - .5, duration: 1.4, ease: "power3.out", overwrite: "auto", onUpdate: draw });
    };
    hero.addEventListener("pointermove", pointer);
    const observer = new ResizeObserver(render); observer.observe(target);
    const lost = (event: Event) => { event.preventDefault(); target.dataset.scene = "failed"; };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    render();
    return () => { disposed = true; scrolled.scrollTrigger?.kill(); gsap.killTweensOf(drift); hero.removeEventListener("pointermove", pointer); observer.disconnect(); renderer.domElement.removeEventListener("webglcontextlost", lost); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); key.shadow.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  return <div className="live-scene" ref={host} data-scene="loading" />;
}

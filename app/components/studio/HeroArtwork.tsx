"use client";

import { useEffect, useRef } from "react";
import { animate, type JSAnimation } from "animejs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

gsap.registerPlugin(ScrollTrigger);

function disposeModel(model: THREE.Object3D) {
  model.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return;
    object.geometry.dispose();
    const materials = Array.isArray(object.material)
      ? object.material
      : [object.material];
    materials.forEach((material: THREE.Material) => material.dispose());
  });
}

export default function HeroArtwork({ ready }: { ready: boolean }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = host.current;
    if (!container || !ready) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let disposed = false;
    let failed = false;
    let inView = true;
    let frame = 0;
    let renderer: THREE.WebGLRenderer | undefined;
    let environment: THREE.WebGLRenderTarget | undefined;
    let model: THREE.Group | undefined;
    let entrance: JSAnimation | undefined;
    let drift: JSAnimation | undefined;
    let exit: gsap.core.Tween | undefined;
    const progress = { value: 0 };
    const orientation = { x: 0, y: 0 };
    const scroll = { value: 0 };
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 50);
    camera.position.set(4.4, 3.3, 9);
    camera.lookAt(0, 0.76, 0);
    scene.background = new THREE.Color("#f8f4ee");
    container.dataset.state = "poster";

    function render() {
      frame = 0;
      if (
        disposed ||
        failed ||
        !renderer ||
        !inView ||
        document.hidden ||
        preference.matches
      )
        return;
      if (model) {
        model.rotation.x = orientation.x;
        model.rotation.y = orientation.y;
        model.position.y = -scroll.value * 0.35;
      }
      try {
        renderer.render(scene, camera);
      } catch {
        fallback();
      }
    }
    function invalidate() {
      if (!frame && !disposed && !failed && inView && !document.hidden)
        frame = requestAnimationFrame(render);
    }
    function fallback() {
      failed = true;
      container!.dataset.state = "poster";
      entrance?.pause();
      drift?.pause();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
    function resize() {
      if (!renderer || disposed || failed) return;
      const { width, height } = container!.getBoundingClientRect();
      if (!width || !height) return;
      const mobile = window.innerWidth <= 680;
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, mobile ? 1 : 1.5),
      );
      renderer.setSize(width, height);
      const vertical = mobile ? 5.9 : 6.1;
      camera.left = -((vertical * width) / height) / 2;
      camera.right = -camera.left;
      camera.top = vertical / 2;
      camera.bottom = -camera.top;
      camera.updateProjectionMatrix();
      invalidate();
    }
    const hero = container.closest<HTMLElement>("[data-cinematic-hero]");
    function move(event: PointerEvent) {
      if (!pointer.matches || preference.matches || failed || !model || !hero)
        return;
      const rect = hero.getBoundingClientRect();
      drift?.cancel();
      drift = animate(orientation, {
        x: ((event.clientY - rect.top) / rect.height - 0.5) * 0.055,
        y: ((event.clientX - rect.left) / rect.width - 0.5) * 0.1,
        duration: 850,
        ease: "outCubic",
        onUpdate: invalidate,
      });
    }
    function leave() {
      if (failed || preference.matches) return;
      drift?.cancel();
      drift = animate(orientation, {
        x: 0,
        y: 0,
        duration: 900,
        ease: "outCubic",
        onUpdate: invalidate,
      });
    }
    function visibility() {
      if (document.hidden) {
        entrance?.pause();
        drift?.pause();
      } else if (inView && !failed && !preference.matches) {
        entrance?.resume();
        invalidate();
      }
    }
    function reducedMotion() {
      if (preference.matches) fallback();
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !document.hidden && !failed) {
        entrance?.resume();
        invalidate();
      } else {
        entrance?.pause();
        drift?.pause();
      }
    });
    const sizes = new ResizeObserver(resize);
    const onContextLost = (event: Event) => {
      event.preventDefault();
      fallback();
    };

    if (!preference.matches) {
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.setClearColor("#f8f4ee", 0);
        const pmrem = new THREE.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        room.dispose();
        pmrem.dispose();
        scene.add(new THREE.HemisphereLight(0xfff2dd, 0x776e5a, 2.5));
        const key = new THREE.DirectionalLight(0xffe7d3, 3);
        key.position.set(-3, 6, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xffffff, 3.5);
        rim.position.set(4, 4, -3);
        scene.add(rim);
        renderer.domElement.addEventListener("webglcontextlost", onContextLost);
        container.appendChild(renderer.domElement);
        sizes.observe(container);
        observer.observe(container);
        resize();
        // One local model fetch. Readable text and the poster never wait for it.
        new GLTFLoader().load(
          "/art/palash.glb",
          (gltf) => {
            if (disposed || failed) {
              disposeModel(gltf.scene);
              return;
            }
            model = gltf.scene;
            model.traverse((object) => {
              if (!(object instanceof THREE.Mesh)) return;
              const original = object.material as THREE.MeshStandardMaterial;
              const branch = original.name.includes("Branch");
              const warm = original.name.includes("Vermilion");
              const amber = original.name.includes("Amber");
              const material = new THREE.MeshPhysicalMaterial({
                color: branch
                  ? "#8a8370"
                  : warm
                    ? "#d99b8e"
                    : amber
                      ? "#ebc2a8"
                      : "#f0e6da",
                roughness: branch ? 0.35 : 0.32,
                transmission: branch ? 0.12 : 0.72,
                thickness: 0.18,
                ior: 1.44,
                clearcoat: 0.3,
                envMapIntensity: 0.8,
                side: THREE.DoubleSide,
              });
              material.onBeforeCompile = (shader) => {
                shader.uniforms.uStudyReveal = progress;
                shader.uniforms.uStudyExit = scroll;
                shader.fragmentShader = `uniform float uStudyReveal;\nuniform float uStudyExit;\n${shader.fragmentShader}`;
                shader.fragmentShader = shader.fragmentShader.replace(
                  "#include <clipping_planes_fragment>",
                  `
                #include <clipping_planes_fragment>
                vec2 grainCell = floor(gl_FragCoord.xy / 1.5);
                float grain = fract(sin(dot(grainCell, vec2(12.9898, 78.233))) * 43758.5453);
                if (grain > uStudyReveal || grain < uStudyExit * 0.7) discard;
              `,
                );
                shader.fragmentShader = shader.fragmentShader.replace(
                  "#include <dithering_fragment>",
                  `#include <dithering_fragment>
                  float frost = fract(sin(dot(floor(gl_FragCoord.xy), vec2(39.346, 11.135))) * 47453.5453);
                  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.973, 0.957, 0.933), frost * 0.17);
                  `,
                );
              };
              original.dispose();
              object.material = material;
            });
            scene.add(model);
            render();
            if (failed) return;
            container.dataset.state = "live";
            entrance = animate(progress, {
              value: [0, 1],
              duration: 1800,
              ease: "inOutCubic",
              onUpdate: invalidate,
              onComplete: invalidate,
            });
            if (hero)
              exit = gsap.to(scroll, {
                value: 1,
                ease: "none",
                onUpdate: invalidate,
                scrollTrigger: {
                  trigger: hero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.4,
                },
              });
          },
          undefined,
          fallback,
        );
      } catch {
        fallback();
      }
    }
    hero?.addEventListener("pointermove", move, { passive: true });
    hero?.addEventListener("pointerleave", leave);
    preference.addEventListener("change", reducedMotion);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      entrance?.revert();
      drift?.revert();
      exit?.scrollTrigger?.kill();
      exit?.kill();
      observer.disconnect();
      sizes.disconnect();
      hero?.removeEventListener("pointermove", move);
      hero?.removeEventListener("pointerleave", leave);
      preference.removeEventListener("change", reducedMotion);
      document.removeEventListener("visibilitychange", visibility);
      if (model) disposeModel(model);
      environment?.dispose();
      if (renderer) {
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          onContextLost,
        );
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      }
    };
  }, [ready]);

  return (
    <div ref={host} data-hero-canvas data-state="poster" aria-hidden="true" />
  );
}

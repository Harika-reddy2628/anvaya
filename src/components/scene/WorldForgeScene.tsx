'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface WorldForgeSceneProps {
  readonly className?: string;
  readonly onStatsUpdate?: (stats: { fps: number; particleCount: number }) => void;
}

/**
 * Creates a procedural 64x64 Gaussian glow texture for soft circular particles.
 * Eliminates ugly 8-bit square pixels completely.
 */
function createParticleGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const WorldForgeScene: React.FC<WorldForgeSceneProps> = ({
  className = '',
  onStatsUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Depth Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060a, 0.038);

    // 2. Camera Setup (Offset slightly to left so singularity dominates right-center)
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 5.0);

    // 3. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 4. Studio Lighting Matrix
    const ambientLight = new THREE.AmbientLight(0x060913, 2.0);
    scene.add(ambientLight);

    // Key Light (Crisp off-white specular highlight)
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 2.6);
    keyLight.position.set(6, 8, 5);
    scene.add(keyLight);

    // Cyan Bioluminescent Rim Light
    const cyanLight = new THREE.PointLight(0x00f5d4, 5.0, 10);
    cyanLight.position.set(2.2, 0.4, 1.4);
    scene.add(cyanLight);

    // Crimson Colony Flare
    const crimsonLight = new THREE.PointLight(0xff2a55, 4.5, 9);
    crimsonLight.position.set(1.4, -1.4, 0.9);
    scene.add(crimsonLight);

    // Electric Violet Atmosphere Backlight
    const violetLight = new THREE.PointLight(0x8b5cf6, 4.0, 11);
    violetLight.position.set(-3.5, 2.2, -1.8);
    scene.add(violetLight);

    // Internal Heart Light (pulsing from the center of the crystal)
    const heartLight = new THREE.PointLight(0x00f5d4, 3.5, 4);
    heartLight.position.set(0, 0, 0);

    // 5. MASTER WORLD FORGE GROUP (Positioned on the right for desktop balance)
    const isDesktop = window.innerWidth >= 1024;
    const forgeGroup = new THREE.Group();
    forgeGroup.position.set(isDesktop ? 1.85 : 0, 0.25, 0);
    scene.add(forgeGroup);
    forgeGroup.add(heartLight);

    // 5.1 Inner Obsidian Core (Faceted Diamond-Cut Crystal)
    const coreGeo = new THREE.IcosahedronGeometry(0.74, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x060912,
      emissive: 0x00151a,
      emissiveIntensity: 0.4,
      roughness: 0.08,
      metalness: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.98,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    forgeGroup.add(coreMesh);

    // 5.2 Geometric Geodesic Outer Cage (Cyan Hologram)
    const cageGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x00f5d4,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    forgeGroup.add(cageMesh);

    // 5.3 Inner Dodecahedron Cage (Violet)
    const innerCageGeo = new THREE.DodecahedronGeometry(0.88, 0);
    const innerCageMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const innerCageMesh = new THREE.Mesh(innerCageGeo, innerCageMat);
    forgeGroup.add(innerCageMesh);

    // 5.4 Relativistic Gimbal Rings (Astrolabe Precision)
    const makeGimbal = (radius: number, tube: number, color: number, opacity: number) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 128);
      const mat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        metalness: 0.9,
        roughness: 0.15,
        transparent: true,
        opacity,
      });
      return new THREE.Mesh(geo, mat);
    };

    const ringCyan = makeGimbal(1.36, 0.009, 0x00f5d4, 0.85);
    const ringViolet = makeGimbal(1.58, 0.007, 0x8b5cf6, 0.75);
    const ringCrimson = makeGimbal(1.78, 0.006, 0xff2a55, 0.8);

    ringCyan.rotation.x = Math.PI / 4;
    ringViolet.rotation.y = Math.PI / 3;
    ringCrimson.rotation.z = Math.PI / 6;

    forgeGroup.add(ringCyan);
    forgeGroup.add(ringViolet);
    forgeGroup.add(ringCrimson);

    // 6. ACCRETION DISK (Keplerian Orbiting Bioluminescent Particles)
    const particleTexture = createParticleGlowTexture();
    const diskCount = 1800;
    const diskGeo = new THREE.BufferGeometry();
    const diskPositions = new Float32Array(diskCount * 3);
    const diskColors = new Float32Array(diskCount * 3);
    const diskVelocities = new Float32Array(diskCount);
    const diskRadii = new Float32Array(diskCount);
    const diskAngles = new Float32Array(diskCount);

    const cCyan = new THREE.Color(0x00f5d4);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cCrimson = new THREE.Color(0xff2a55);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < diskCount; i++) {
      const r = 1.15 + Math.pow(Math.random(), 1.5) * 1.6;
      const angle = Math.random() * Math.PI * 2;
      const spreadY = (Math.random() - 0.5) * 0.18 * (r * 0.4);

      diskRadii[i] = r;
      diskAngles[i] = angle;
      // Keplerian velocity: inner particles move faster (v ~ 1 / sqrt(r))
      diskVelocities[i] = 0.55 / Math.sqrt(r);

      diskPositions[i * 3] = r * Math.cos(angle);
      diskPositions[i * 3 + 1] = spreadY;
      diskPositions[i * 3 + 2] = r * Math.sin(angle);

      // Interpolate colors along radius (inner cyan -> middle violet -> outer crimson)
      const t = (r - 1.15) / 1.6;
      let particleColor = new THREE.Color();
      if (t < 0.35) {
        particleColor.lerpColors(cWhite, cCyan, t / 0.35);
      } else if (t < 0.7) {
        particleColor.lerpColors(cCyan, cViolet, (t - 0.35) / 0.35);
      } else {
        particleColor.lerpColors(cViolet, cCrimson, (t - 0.7) / 0.3);
      }

      diskColors[i * 3] = particleColor.r;
      diskColors[i * 3 + 1] = particleColor.g;
      diskColors[i * 3 + 2] = particleColor.b;
    }

    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    diskGeo.setAttribute('color', new THREE.BufferAttribute(diskColors, 3));

    const diskMat = new THREE.PointsMaterial({
      size: 0.055,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const accretionDisk = new THREE.Points(diskGeo, diskMat);
    accretionDisk.rotation.x = 0.42; // Elegant tilt to camera
    accretionDisk.rotation.z = -0.15;
    forgeGroup.add(accretionDisk);

    // 7. AMBIENT CELESTIAL STARDUST (800 softly floating background motes)
    const bgDustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(bgDustCount * 3);
    const dustColors = new Float32Array(bgDustCount * 3);

    for (let i = 0; i < bgDustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const rnd = Math.random();
      const col = rnd > 0.6 ? cCyan : rnd > 0.3 ? cViolet : cCrimson;
      dustColors[i * 3] = col.r;
      dustColors[i * 3 + 1] = col.g;
      dustColors[i * 3 + 2] = col.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.038,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bgDust = new THREE.Points(dustGeo, dustMat);
    scene.add(bgDust);

    // 8. THE CRIMSON COLONY SWARM (12 Autonomous Multi-Agent Workers)
    const swarmCount = 14;
    const swarmNodes: THREE.Mesh[] = [];
    const swarmPings: THREE.Mesh[] = [];
    const swarmGroup = new THREE.Group();
    forgeGroup.add(swarmGroup);

    const antHeadGeo = new THREE.SphereGeometry(0.024, 8, 8);
    const antMat = new THREE.MeshBasicMaterial({ color: 0xff2a55 });

    const pingGeo = new THREE.RingGeometry(0.01, 0.022, 16);
    const pingMat = new THREE.MeshBasicMaterial({
      color: 0xff2a55,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < swarmCount; i++) {
      const node = new THREE.Mesh(antHeadGeo, antMat);
      swarmGroup.add(node);
      swarmNodes.push(node);

      const ping = new THREE.Mesh(pingGeo, pingMat.clone());
      swarmGroup.add(ping);
      swarmPings.push(ping);
    }

    // 9. GYROSCOPIC MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0.4;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraX = mouseX * 0.45;
      targetCameraY = 0.4 - mouseY * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 10. RESIZE LISTENER
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      const desktop = window.innerWidth >= 1024;
      forgeGroup.position.set(desktop ? 1.85 : 0, 0.25, 0);
    };
    window.addEventListener('resize', handleResize);

    // 11. 60FPS RENDER LOOP
    let animId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // FPS Tracking
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        if (onStatsUpdate) {
          onStatsUpdate({
            fps: Math.round((frameCount * 1000) / (now - lastFpsTime)),
            particleCount: diskCount + bgDustCount + swarmCount,
          });
        }
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth camera parallax
      camera.position.x += (targetCameraX - camera.position.x) * 0.05;
      camera.position.y += (targetCameraY - camera.position.y) * 0.05;
      camera.lookAt(forgeGroup.position.x * 0.4, 0.1, 0);

      // 1. Crystal core rotation & breathing
      coreMesh.rotation.x = elapsed * 0.22;
      coreMesh.rotation.y = elapsed * 0.32;
      const breathe = 1.0 + Math.sin(elapsed * 2.5) * 0.035;
      coreMesh.scale.set(breathe, breathe, breathe);

      // 2. Holographic cages counter-rotation
      cageMesh.rotation.x = -elapsed * 0.14;
      cageMesh.rotation.y = elapsed * 0.18;

      innerCageMesh.rotation.y = -elapsed * 0.25;
      innerCageMesh.rotation.z = elapsed * 0.12;

      // 3. Astrolabe Rings precession
      ringCyan.rotation.x += 0.006;
      ringCyan.rotation.y += 0.004;

      ringViolet.rotation.y -= 0.005;
      ringViolet.rotation.z += 0.007;

      ringCrimson.rotation.z += 0.008;
      ringCrimson.rotation.x -= 0.003;

      // 4. Accretion Disk Keplerian particle simulation
      const posAttr = diskGeo.getAttribute('position') as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;

      for (let i = 0; i < diskCount; i++) {
        diskAngles[i] += diskVelocities[i] * 0.016;
        const r = diskRadii[i];
        positions[i * 3] = r * Math.cos(diskAngles[i]);
        positions[i * 3 + 2] = r * Math.sin(diskAngles[i]);
      }
      posAttr.needsUpdate = true;

      // 5. Stardust slow celestial drift
      bgDust.rotation.y = elapsed * 0.012;

      // 6. Colony Swarm Workers (Crimson multi-agents navigation)
      for (let i = 0; i < swarmCount; i++) {
        const t = elapsed * 0.65 + (i * Math.PI * 2) / swarmCount;
        // Harmonic Lissajous 3D paths
        const swarmRadius = 1.25 + 0.35 * Math.sin(t * 1.8 + i);
        const sx = swarmRadius * Math.cos(t);
        const sy = 0.5 * Math.sin(t * 2.2 + i * 0.5);
        const sz = swarmRadius * Math.sin(t);

        swarmNodes[i].position.set(sx, sy, sz);

        // Colony consensus ping pulse (expands and fades)
        const pingTime = (elapsed * 1.5 + i * 0.4) % 1.5;
        const pingScale = 0.1 + pingTime * 4.5;
        swarmPings[i].position.set(sx, sy, sz);
        swarmPings[i].scale.set(pingScale, pingScale, pingScale);
        (swarmPings[i].material as THREE.MeshBasicMaterial).opacity = Math.max(
          0,
          0.8 - pingTime * 0.55
        );
        swarmPings[i].lookAt(camera.position);
      }

      // 7. Pulse Point Lights
      cyanLight.intensity = 4.2 + Math.sin(elapsed * 3.0) * 0.8;
      crimsonLight.intensity = 3.8 + Math.cos(elapsed * 2.6) * 0.7;

      renderer.render(scene, camera);
    };
    animate();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      innerCageGeo.dispose();
      innerCageMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      antHeadGeo.dispose();
      antMat.dispose();
      pingGeo.dispose();
      pingMat.dispose();
    };
  }, [onStatsUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export interface MacbookNeuralSceneRef {
  toggleFlight: () => boolean;
  isInside: () => boolean;
}

export interface MacbookNeuralSceneProps {
  readonly onFlightChange?: (isInside: boolean) => void;
}

export const MacbookNeuralScene = forwardRef<MacbookNeuralSceneRef, MacbookNeuralSceneProps>(
  ({ onFlightChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isInsideRef = useRef<boolean>(false);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const screenMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);

    useImperativeHandle(ref, () => ({
      toggleFlight: () => {
        const nextState = !isInsideRef.current;
        isInsideRef.current = nextState;

        if (!cameraRef.current || !screenMaterialRef.current) return nextState;

        const tl = gsap.timeline();

        if (nextState) {
          // Camera flies toward and punches through the screen into the neural swarm
          tl.to(cameraRef.current.position, {
            x: 0.4,
            y: 0.45,
            z: 0.6,
            duration: 1.2,
            ease: 'power2.in',
          });

          tl.to(cameraRef.current.position, {
            x: 0,
            y: 0.5,
            z: -3.8,
            duration: 1.6,
            ease: 'power3.out',
          });

          tl.to(
            screenMaterialRef.current,
            {
              opacity: 0,
              duration: 0.4,
            },
            1.1
          );
        } else {
          // Camera pulls back out to the desk view
          tl.to(
            screenMaterialRef.current,
            {
              opacity: 1,
              duration: 0.6,
            },
            0.5
          );

          tl.to(cameraRef.current.position, {
            x: 0,
            y: 0.35,
            z: 3.2,
            duration: 1.8,
            ease: 'power3.inOut',
          });
        }

        if (onFlightChange) onFlightChange(nextState);
        return nextState;
      },
      isInside: () => isInsideRef.current,
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x07090e, 0.08);

      const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.35, 3.2);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // 2. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(2, 4, 3);
      scene.add(keyLight);

      const crimsonLight = new THREE.PointLight(0xff2a55, 3.2, 6);
      crimsonLight.position.set(-1.8, 1, 1);
      scene.add(crimsonLight);

      const cyanLight = new THREE.PointLight(0x00f5d4, 2.5, 6);
      cyanLight.position.set(1.8, 0.5, 1);
      scene.add(cyanLight);

      // 3. Procedural 3D MacBook Assembly
      const macbookGroup = new THREE.Group();
      macbookGroup.position.set(0.4, -0.15, 0);
      scene.add(macbookGroup);

      const aluminumMaterial = new THREE.MeshStandardMaterial({
        color: 0x161821,
        metalness: 0.88,
        roughness: 0.22,
      });

      const bezelMaterial = new THREE.MeshStandardMaterial({
        color: 0x050608,
        roughness: 0.1,
        metalness: 0.5,
      });

      // Terminal Canvas Texture
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 1024;
      screenCanvas.height = 640;
      const ctx = screenCanvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#080A10';
        ctx.fillRect(0, 0, 1024, 640);

        ctx.fillStyle = '#11141E';
        ctx.fillRect(0, 0, 1024, 48);

        ctx.fillStyle = '#FF5F56';
        ctx.beginPath();
        ctx.arc(28, 24, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FFBD2E';
        ctx.beginPath();
        ctx.arc(52, 24, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#27C93F';
        ctx.beginPath();
        ctx.arc(76, 24, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 18px "JetBrains Mono", monospace';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText('anvaya-os // core_v4.2 — bash', 110, 30);

        ctx.font = '22px "JetBrains Mono", monospace';
        ctx.fillStyle = '#FF2A55';
        ctx.fillText('ANVAYA PROTOCOL :: SYSTEMS OVER SLOP', 50, 105);

        ctx.fillStyle = '#F8FAFC';
        ctx.fillText('> anvaya sprint --target="Enterprise AI Platform"', 50, 155);

        ctx.font = '19px "JetBrains Mono", monospace';
        ctx.fillStyle = '#64748B';
        ctx.fillText('// Initializing Autonomous Multi-Agent Swarm...', 50, 205);

        ctx.fillStyle = '#00F5D4';
        ctx.fillText('● [AGENT_01] Scaffolding Next.js 16 App Router & Tailwind v4 [OK]', 50, 255);
        ctx.fillText('● [AGENT_02] Generating pgvector similarity embeddings [7.4ms]', 50, 300);
        ctx.fillText('● [AGENT_03] Draco WebGL compression: 18.4MB -> 1.2MB [OK]', 50, 345);
        ctx.fillText('● [AGENT_04] AST diff verification: 100% type-strict [OK]', 50, 390);

        ctx.strokeStyle = '#FF2A55';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 440, 924, 130);

        ctx.fillStyle = '#FF2A55';
        ctx.fillText('★ STATUS: 14-DAY CADENCE GUARANTEED // 100% DAY-1 IP TRANSFER', 80, 495);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = '16px "JetBrains Mono", monospace';
        ctx.fillText('P99 LATENCY: 11.2ms | LIGHTHOUSE: 100/100 | ZERO SLOP VERIFIED', 80, 535);
      }

      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screenMaterial = new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true,
        opacity: 1,
      });
      screenMaterialRef.current = screenMaterial;

      // Base
      const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.04, 1.25), aluminumMaterial);
      baseMesh.position.y = -0.02;
      macbookGroup.add(baseMesh);

      // Keyboard well
      const keyboardWell = new THREE.Mesh(
        new THREE.BoxGeometry(1.65, 0.005, 0.65),
        new THREE.MeshStandardMaterial({ color: 0x0a0c12, roughness: 0.7, metalness: 0.3 })
      );
      keyboardWell.position.set(0, 0.005, -0.15);
      macbookGroup.add(keyboardWell);

      // Trackpad
      const trackpad = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.005, 0.38),
        new THREE.MeshStandardMaterial({ color: 0x181a24, roughness: 0.15, metalness: 0.8 })
      );
      trackpad.position.set(0, 0.005, 0.38);
      macbookGroup.add(trackpad);

      // Lid Group
      const lidGroup = new THREE.Group();
      lidGroup.position.set(0, 0, -0.62);
      macbookGroup.add(lidGroup);

      const lidShell = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.25, 0.03), aluminumMaterial);
      lidShell.position.set(0, 0.62, -0.015);
      lidGroup.add(lidShell);

      const screenBezel = new THREE.Mesh(new THREE.PlaneGeometry(1.84, 1.2), bezelMaterial);
      screenBezel.position.set(0, 0.62, 0.002);
      lidGroup.add(screenBezel);

      const screenPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 1.08), screenMaterial);
      screenPlane.position.set(0, 0.62, 0.005);
      lidGroup.add(screenPlane);

      lidGroup.rotation.x = THREE.MathUtils.degToRad(-15);

      // 4. Bio-Neural Swarm
      const neuralGroup = new THREE.Group();
      neuralGroup.position.set(0, 0.5, -4.5);
      scene.add(neuralGroup);

      const particleCount = 3500;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const colorChoices = [
        new THREE.Color(0xff2a55),
        new THREE.Color(0x00f5d4),
        new THREE.Color(0x8b5cf6),
        new THREE.Color(0xffb703),
      ];

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.5 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);

        const c = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        particleColors[i * 3] = c.r;
        particleColors[i * 3 + 1] = c.g;
        particleColors[i * 3 + 2] = c.b;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      const particleMat = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      neuralGroup.add(particleSystem);

      // Agentic Hubs
      const agentHubs: THREE.Mesh[] = [];
      const hubConfigs = [
        { color: 0xff2a55, pos: [-1.8, 1.2, -1.0] },
        { color: 0x00f5d4, pos: [1.8, 1.0, -1.5] },
        { color: 0x8b5cf6, pos: [-1.2, -1.2, -2.0] },
        { color: 0xffb703, pos: [1.4, -1.0, -1.2] },
      ];

      hubConfigs.forEach((cfg) => {
        const hubGeo = new THREE.IcosahedronGeometry(0.35, 1);
        const hubMat = new THREE.MeshBasicMaterial({
          color: cfg.color,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
        const hub = new THREE.Mesh(hubGeo, hubMat);
        hub.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
        neuralGroup.add(hub);
        agentHubs.push(hub);
      });

      // Axon Filaments
      const axonMaterial = new THREE.LineBasicMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });

      for (let i = 0; i < agentHubs.length; i++) {
        for (let j = i + 1; j < agentHubs.length; j++) {
          const p1 = agentHubs[i].position;
          const p2 = agentHubs[j].position;
          const mid = p1
            .clone()
            .lerp(p2, 0.5)
            .add(
              new THREE.Vector3(
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 0.8
              )
            );

          const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
          const points = curve.getPoints(24);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, axonMaterial);
          neuralGroup.add(line);
        }
      }

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener('mousemove', onMouseMove);

      // Resize
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      };
      window.addEventListener('resize', onResize);

      // Animation Loop
      let animationFrameId: number;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isInsideRef.current) {
          macbookGroup.rotation.y = THREE.MathUtils.lerp(macbookGroup.rotation.y, mouseX * 0.25 - 0.2, 0.05);
          macbookGroup.rotation.x = THREE.MathUtils.lerp(macbookGroup.rotation.x, mouseY * 0.15 + 0.05, 0.05);
        } else {
          neuralGroup.rotation.y += 0.002;
          neuralGroup.rotation.x = THREE.MathUtils.lerp(neuralGroup.rotation.x, mouseY * 0.3, 0.05);
        }

        agentHubs.forEach((hub, idx) => {
          hub.rotation.x += 0.01 * (idx + 1);
          hub.rotation.y += 0.012;
        });

        particleSystem.rotation.y -= 0.001;

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
      };
    }, [onFlightChange]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
    );
  }
);

MacbookNeuralScene.displayName = 'MacbookNeuralScene';

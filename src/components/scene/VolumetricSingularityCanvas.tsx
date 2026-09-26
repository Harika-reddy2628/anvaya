'use client';

import React, { useRef, useEffect } from 'react';

export interface VolumetricSingularityCanvasProps {
  readonly className?: string;
}

export const VolumetricSingularityCanvas: React.FC<VolumetricSingularityCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
                       mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,1,0)), f.x),
                       mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
      }

      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100.0);
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 m = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        vec3 singularityPos = vec3(m.x * 0.75 + 0.32, m.y * 0.55, 0.0);

        vec3 voidColor = vec3(0.012, 0.015, 0.028);
        vec3 cyanBiolum = vec3(0.0, 0.96, 0.83);    // #00F5D4
        vec3 crimsonEnergy = vec3(1.0, 0.165, 0.33); // #FF2A55
        vec3 violetCore = vec3(0.55, 0.36, 0.96);    // #8B5CF6
        vec3 starlightGold = vec3(1.0, 0.72, 0.01);  // #FFB703

        vec3 col = voidColor;
        float distToCenter = length(uv - singularityPos.xy);

        // 1. Gravitational Lensing
        float gravity = 0.18 / (distToCenter * distToCenter + 0.02);
        vec2 bend = normalize(singularityPos.xy - uv) * gravity * 0.04;
        vec2 warpedUv = uv + bend;

        // 2. Einstein Photon Ring
        float eventHorizonRadius = 0.22;
        float ringDist = abs(distToCenter - eventHorizonRadius);
        float photonRing = 0.012 / (ringDist * ringDist + 0.003);
        float doppler = 1.0 + (uv.x - singularityPos.x) * 1.5;
        photonRing *= clamp(doppler, 0.3, 2.2);

        // 3. Volumetric Accretion Disk (Swirling Fluid)
        float angle = atan(warpedUv.y - singularityPos.y, warpedUv.x - singularityPos.x);
        float radius = length(warpedUv - singularityPos.xy);
        
        vec3 spiralCoord = vec3(
          radius * 4.0 - u_time * 0.6,
          angle * 2.0 + u_time * 0.4 + radius * 3.0,
          u_time * 0.2
        );
        
        float fluid = fbm(spiralCoord);
        fluid = smoothstep(0.3, 0.85, fluid) * smoothstep(1.6, 0.28, radius);

        vec3 accretionColor = mix(crimsonEnergy, cyanBiolum, smoothstep(0.2, 0.7, radius));
        accretionColor = mix(accretionColor, violetCore, smoothstep(0.6, 1.4, radius));
        accretionColor += starlightGold * photonRing * 0.5;

        col += accretionColor * fluid * 1.4;
        col += cyanBiolum * (photonRing * 0.4);
        col += crimsonEnergy * (photonRing * 0.25);

        // 4. Event Horizon Shadow
        float blackHoleShadow = smoothstep(eventHorizonRadius * 0.95, eventHorizonRadius * 0.6, distToCenter);
        col *= (1.0 - blackHoleShadow);

        // 5. Film Grain & Vignette
        float grain = (hash(vec3(gl_FragCoord.xy, u_time)) - 0.5) * 0.04;
        col += vec3(grain);

        float vignette = 1.0 - length(v_uv - 0.5) * 0.7;
        col *= clamp(vignette, 0.0, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(glCtx: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
        console.error(glCtx.getShaderInfoLog(s));
        glCtx.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uTime = gl.getUniformLocation(program, 'u_time');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let targetX = canvas.width * 0.65;
    let targetY = canvas.height * 0.5;
    let currentX = targetX;
    let currentY = targetY;

    const onMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      targetX = e.clientX * dpr;
      targetY = (window.innerHeight - e.clientY) * dpr;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      animId = requestAnimationFrame(render);
      const elapsed = (now - startTime) * 0.001;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      gl.uniform2f(uMouse, currentX, currentY);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};

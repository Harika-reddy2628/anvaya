import type { WebGLRenderer } from "three";

// Frames skipped after each start (shader compiles and the first upload are always slow), capped in time so a
// very slow device is not left running for long before the first decision.
const WARMUP = 12, WARMUP_MS = 1500;
// Frames averaged per decision, or fewer once this much time has been sampled.
const WINDOW = 30, WINDOW_MS = 1500, MIN_SAMPLES = 5;
const SLOW_MS = 34; // Below about 30 fps the scene costs more than it adds.
const STEP = .75; // Each step renders at three quarters of the previous pixel ratio.

/**
 * Keeps a WebGL scene inside a frame budget. Call `tick()` once per rendered frame and `reset()` whenever the loop
 * (re)starts. While frames stay slow it lowers the pixel ratio a step at a time, calling `resize` so the scene can
 * re-apply its size; once at 1x and still slow it calls `onTooSlow` once, so the scene can stop and show its fallback.
 */
export function frameBudget(renderer: WebGLRenderer, { resize, onTooSlow }: { resize: () => void; onTooSlow: () => void }) {
  let last = 0, started = 0, warm = false, samples = 0, total = 0, frames = 0, gaveUp = false;
  const reset = () => { last = 0; started = 0; warm = false; samples = 0; total = 0; frames = 0; };
  const tick = () => {
    if (gaveUp) return;
    const now = performance.now();
    const dt = last ? Math.min(now - last, 1000) : 0;
    last = now;
    if (!started) started = now;
    if (!warm) { warm = ++frames > WARMUP || now - started > WARMUP_MS; return; }
    total += dt; samples++;
    if (samples < WINDOW && !(total >= WINDOW_MS && samples >= MIN_SAMPLES)) return;
    const average = total / samples;
    samples = 0; total = 0;
    if (average <= SLOW_MS) return;
    const ratio = renderer.getPixelRatio();
    if (ratio > 1) { renderer.setPixelRatio(Math.max(1, ratio * STEP)); resize(); return; }
    gaveUp = true; onTooSlow();
  };
  return { tick, reset };
}

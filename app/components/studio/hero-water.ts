import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uArt;
  uniform vec2 uSize;
  uniform vec2 uImageSize;
  uniform float uTime;
  uniform vec4 uRipples[8];
  varying vec2 vUv;

  void main() {
    float aspect = uSize.x / uSize.y;
    float imageAspect = uImageSize.x / uImageSize.y;
    vec2 crop = vec2(min(aspect / imageAspect, 1.0), min(imageAspect / aspect, 1.0));
    // Match the poster's cover crop and 50% / 65% object-position.
    vec2 artUv = vUv * crop + (1.0 - crop) * vec2(0.5, 0.35);
    vec2 refraction = vec2(0.0);
    float light = 0.0;
    for (int i = 0; i < 8; i++) {
      float age = uTime - uRipples[i].z;
      if (age >= 0.0 && age < 3.5) {
        vec2 delta = (vUv - uRipples[i].xy) * vec2(aspect, 1.0);
        float distance = length(delta);
        float ring = distance - age * 0.16;
        float envelope = exp(-pow(ring * 18.0, 2.0)) * exp(-age * 1.05);
        float wave = sin(ring * 78.0) * envelope * smoothstep(0.0, 0.08, age);
        vec2 direction = delta / max(distance, 0.001) / vec2(aspect, 1.0);
        refraction += direction * wave * 0.006 * uRipples[i].w;
        light += cos(ring * 78.0) * envelope * 0.012 * uRipples[i].w;
      }
    }
    // Very small ambient water movement; typography is never in this texture.
    refraction += vec2(
      sin(vUv.y * 9.0 + uTime * 0.45),
      cos(vUv.x * 8.0 + uTime * 0.35)
    ) * 0.0008;
    artUv += clamp(refraction, vec2(-0.018), vec2(0.018)) * crop;
    gl_FragColor = texture2D(uArt, clamp(artUv, vec2(0.002), vec2(0.998)));
    gl_FragColor.rgb += light;
    #include <colorspace_fragment>
  }
`;

/** Optional, single-quad refraction. Stops when hidden, offscreen, or disposed. */
export function startWater(
  container: HTMLElement,
  image: HTMLImageElement,
  hero: HTMLElement,
) {
  const surface = container.querySelector<HTMLElement>("[data-water-surface]");
  if (!surface) return () => {};
  // A fresh graphics canvas per lifecycle avoids reusing a lost context on resume.
  const canvas = document.createElement("canvas");
  canvas.dataset.waterCanvas = "";
  let renderer: THREE.WebGLRenderer | undefined;
  let texture: THREE.Texture | undefined;
  let material: THREE.ShaderMaterial | undefined;
  let geometry: THREE.PlaneGeometry | undefined;
  let disposed = false;
  let failed = false;
  let inView = true;
  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let lastRipple = 0;
  let lastX = -100;
  let lastY = -100;
  let rippleIndex = 0;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const ripples = Array.from(
    { length: 8 },
    () => new THREE.Vector4(-1, -1, -100, 0),
  );
  const uniforms = {
    uArt: { value: null as THREE.Texture | null },
    uSize: { value: new THREE.Vector2(1, 1) },
    uImageSize: { value: new THREE.Vector2(1, 1) },
    uTime: { value: 0 },
    uRipples: { value: ripples },
  };

  function stop() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
  }
  function fallback() {
    failed = true;
    container.dataset.state = "poster";
    stop();
  }
  function render(now: number) {
    frame = 0;
    if (disposed || failed || !renderer || !inView || document.hidden) return;
    // Cap shader rendering to 30fps; do not jump time after visibility changes.
    if (!previous || now - previous >= 1000 / 30) {
      if (previous) elapsed += Math.min((now - previous) / 1000, 0.1);
      previous = now;
      uniforms.uTime.value = elapsed;
      try {
        renderer.render(scene, camera);
      } catch {
        fallback();
        return;
      }
    }
    frame = requestAnimationFrame(render);
  }
  function visibility() {
    if (!inView || document.hidden) stop();
    else if (!disposed && !failed && renderer && !frame)
      frame = requestAnimationFrame(render);
  }
  function resize() {
    if (!renderer || disposed || failed) return;
    const { width, height } = container.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height, false);
    uniforms.uSize.value.set(width, height);
    visibility();
  }
  function ripple(event: PointerEvent, force = false) {
    if (
      event.pointerType !== "mouse" ||
      failed ||
      !inView ||
      document.hidden ||
      !renderer
    )
      return;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const now = performance.now();
    if (
      !force &&
      (now - lastRipple < 50 || Math.hypot(x - lastX, y - lastY) < 12)
    )
      return;
    ripples[rippleIndex].set(
      x / rect.width,
      1 - y / rect.height,
      elapsed,
      force ? 1.6 : 1,
    );
    rippleIndex = (rippleIndex + 1) % ripples.length;
    lastRipple = now;
    lastX = x;
    lastY = y;
  }
  const move = (event: PointerEvent) => ripple(event);
  const press = (event: PointerEvent) => ripple(event, true);
  const contextLost = (event: Event) => {
    event.preventDefault();
    fallback();
  };
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    visibility();
  });
  const sizes = new ResizeObserver(resize);

  function load() {
    if (disposed || failed || renderer || !image.naturalWidth) return;
    try {
      surface!.appendChild(canvas);
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.debug.onShaderError = fallback;
      texture = new THREE.Texture(image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.needsUpdate = true;
      uniforms.uArt.value = texture;
      uniforms.uImageSize.value.set(image.naturalWidth, image.naturalHeight);
      geometry = new THREE.PlaneGeometry(2, 2);
      material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
      scene.add(new THREE.Mesh(geometry, material));
      resize();
      renderer.render(scene, camera);
      if (!failed) container.dataset.state = "live";
      visibility();
    } catch {
      fallback();
    }
  }

  container.dataset.state = "poster";
  observer.observe(hero);
  sizes.observe(container);
  document.addEventListener("visibilitychange", visibility);
  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerdown", press, { passive: true });
  canvas.addEventListener("webglcontextlost", contextLost);
  image.addEventListener("load", load);
  image.addEventListener("error", fallback);
  if (image.complete) {
    if (image.naturalWidth) load();
    else fallback();
  }

  return () => {
    disposed = true;
    stop();
    observer.disconnect();
    sizes.disconnect();
    document.removeEventListener("visibilitychange", visibility);
    hero.removeEventListener("pointermove", move);
    hero.removeEventListener("pointerdown", press);
    canvas.removeEventListener("webglcontextlost", contextLost);
    image.removeEventListener("load", load);
    image.removeEventListener("error", fallback);
    geometry?.dispose();
    material?.dispose();
    texture?.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
    canvas.remove();
    container.dataset.state = "poster";
  };
}

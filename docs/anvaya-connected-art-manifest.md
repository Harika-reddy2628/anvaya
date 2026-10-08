# Connected studio artwork and sources

Recorded 8 October 2026. The current website uses original code-generated architecture and connection geometry. It contains no purchased photographs, copied reference-site meshes, client screenshots, generated client evidence or remote image dependencies.

## Original artwork

| Asset | Reproducible source | Runtime size / characteristics |
| --- | --- | --- |
| Architectural aperture hero | `app/components/connected/HeroScene.tsx` | Three.js procedural geometry; 18,998 triangles and 8 draw calls in the recorded desktop/mobile captures |
| Desktop fallback | `public/art/anvaya-aperture-desktop.webp` | 951 × 960; 19,080 bytes |
| Mobile fallback | `public/art/anvaya-aperture-mobile.webp` | 429 × 535; 6,348 bytes |
| Four practice illustrations | `WorldArt` in `app/components/connected/Shared.tsx` | Inline SVG browser, product, workflow and spatial compositions; included in page markup |
| Terracotta thread and bindu | `Hero.tsx`, `Intro.tsx`, `Shared.tsx`, `app/connected.css` | Original paths and CSS geometry; no downloaded animation |

Posters are direct captures of the repository's procedural scene, with UI, shading overlays and the thread hidden. Regenerate against a running local site with:

```bash
node scripts/capture-connected.mjs http://localhost:3000 --posters
```

No Blender, image generation service or external model was used for this iteration. The scene source, materials, lights and camera remain in the repository. The scene renders on initial load and resize, rather than running a continuous GPU animation. GSAP owns the SVG thread animation. Reduced-motion visitors use the poster, and WebGL failures retain it.

## Existing local fonts

| Font / runtime file | Upstream identity | License retained locally |
| --- | --- | --- |
| Inter / `app/fonts/Inter-Latin.woff2` | Inter Project, https://github.com/rsms/inter | SIL OFL 1.1, `app/fonts/Inter-OFL.txt` |
| Hind / `app/fonts/Hind-Regular.ttf` | Indian Type Foundry, https://github.com/itfoundry/hind | SIL OFL 1.1, `app/fonts/Hind-OFL.txt` |
| Geist Mono / `app/fonts/geist-mono-latin.woff2` | Geist Project, https://github.com/vercel/geist-font | SIL OFL 1.1, `app/fonts/OFL.txt` |

These files were already present in the checkout. Exact original download URLs are not recorded here; the table identifies their projects and retained license notices. Other historical font files remain in the repository but are not imported by the current root layout. Fonts are served locally through `next/font/local`.

## Third-party code

The scene and page compositions are original application code. Their dependencies have independent licenses, retained in installed packages and resolved by the committed lockfile:

| Dependency | Installed version | License / source |
| --- | --- | --- |
| Three.js | 0.186.1 | MIT; https://github.com/mrdoob/three.js |
| GSAP | 3.15.0 | GSAP Standard License; https://gsap.com/standard-license |
| Next.js | 16.3.8 | MIT; https://github.com/vercel/next.js |
| Resend SDK | 6.32.1 | MIT; https://github.com/resend/resend-node |
| Sharp, poster conversion tooling | 0.35.5 | Apache-2.0; https://github.com/lovell/sharp |
| Playwright, browser verification tooling | 1.63.0 | Apache-2.0; https://github.com/microsoft/playwright |

No reference-site code or assets have been copied. Earlier lotus/water art and historical styling remain available as repository history/source but are not loaded by active pages.

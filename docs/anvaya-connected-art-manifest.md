# Connected studio artwork and sources

Recorded 8 October 2026. The current website uses original code-generated architecture and connection geometry. It contains no purchased photographs, copied reference-site meshes, client screenshots, generated client evidence or remote image dependencies.

## Original artwork

| Asset | Reproducible source | Runtime size / characteristics |
| --- | --- | --- |
| Architectural aperture hero | `app/components/cinema/HeroScene.tsx` | Three.js procedural geometry; 18,998 triangles and 8 draw calls in the recorded desktop/mobile captures |
| Desktop fallback | `public/art/anvaya-aperture-desktop.webp` | 1010 × 1002; 18,954 bytes (re-exported on ink `#0B0A09`, 23 October 2026) |
| Mobile fallback | `public/art/anvaya-aperture-mobile.webp` | 490 × 426; 4,586 bytes (re-exported on ink `#0B0A09`, 23 October 2026) |
| Four practice illustrations | `WorldArt` in `app/components/cinema/Shared.tsx` | Inline SVG browser, product, workflow and spatial compositions; included in page markup |
| Terracotta thread and bindu | `Hero.tsx`, `Intro.tsx`, `Shared.tsx`, `app/cinema.css` | Original paths and CSS geometry; no downloaded animation |

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

## Practice scene renders — 23 October 2026

| Assets | Reproducible source | Sizes |
| --- | --- | --- |
| `public/art/worlds/{digital-presence,digital-products,intelligent-operations,spatial-visuals}-wide.webp` (section 02 viewer) | `scripts/worlds/scenes.js`, rendered by `node scripts/render-worlds.mjs` | 1920 × 1080; 22–39 KB each |
| `public/art/worlds/*-frame.webp` (section 03 cards) | same scenes, closer second camera | 1600 × 1200; 20–37 KB each |

The scenes are original procedural Three.js geometry: boxes, cylinders, extruded arches, a tube-geometry thread and a RoomEnvironment for soft reflections, with UnrealBloom on the emissive thread. The script serves the scene and the installed `three` package from a temporary local server. It renders each still at 1.5× in installed Chrome, then downsamples with sharp (Lanczos) to WebP at quality 80. Scene sizes are 15–44k triangles. These stills ship as images; no scene code runs on the page for them.

## Cinematic redesign fonts — 23 October 2026

Taken from Fontsource npm packages (version 5.3.0, OFL-1.1). Each licence is kept beside its file.

| Runtime file | Source file | Bytes | SHA-256 |
| --- | --- | --- | --- |
| `app/fonts/InstrumentSerif-Latin.woff2` | `@fontsource/instrument-serif` `files/instrument-serif-latin-400-normal.woff2` | 21,032 | `5eb09b5ac0e28b67c2f041c8ba6d244604ca0c0980d65912ab2d47fed84ddc31` |
| `app/fonts/InstrumentSerif-Italic-Latin.woff2` | same package, `instrument-serif-latin-400-italic.woff2` | 22,128 | `5a51946dfffa82972bc98745359c46761515641fda557c25116459a9f83da4a7` |
| `app/fonts/InterTight-Latin.woff2` | `@fontsource-variable/inter-tight` `files/inter-tight-latin-wght-normal.woff2` | 44,872 | `77fefe8ca19b9f69b5284832c519e0493127c1f091f0a8936884be7721c4e618` |
| `app/fonts/JetBrainsMono-Latin.woff2` | `@fontsource-variable/jetbrains-mono` `files/jetbrains-mono-latin-wght-normal.woff2` | 40,404 | `18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e` |

Licences: `InstrumentSerif-OFL.txt`, `InterTight-OFL.txt`, `JetBrainsMono-OFL.txt`. The tour site's type choices were the visual reference only; no code or assets were copied from it.

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

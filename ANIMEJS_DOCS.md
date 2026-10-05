# Anime.js research for Anvaya

Researched 2026-10-03. Installed package: `animejs@4.5.0`.

## Research provenance

The requested local Firecrawl workflow was attempted with:

```sh
curl -X POST http://localhost:3002/v1/scrape \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://animejs.com/documentation/timeline/","formats":["markdown"],"onlyMainContent":true}'
```

The endpoint refused the connection, including outside the sandbox. Docker reported that its daemon was not running. The owner approved proceeding with official documentation directly. No successful local scrape is claimed. This file records the fallback research and the implementation decisions. Repeat the command when the owner's service is online; no hosted Firecrawl account or key is needed for that local endpoint.

## React lifecycle and ownership

The [official React guide](https://animejs.com/documentation/getting-started/using-with-react/) combines `useEffect`, a DOM ref, and `createScope`. Create animations inside the scope constructor and call `scope.revert()` in effect cleanup. The [Scope documentation](https://animejs.com/documentation/scope/) provides custom roots and responsive `mediaQueries`; named query results are available through `self.matches`.

`StudioIntro.tsx` owns its overlay timeline. `Hero.tsx` owns the editorial headline reveal. Following the owner's 2026-10-05 reference images and subsequent water-cursor request, `HeroBackdrop.tsx` uses separate layers: Anime.js owns the inner image's finite entrance; GSAP owns outer scroll, ambient floating, pointer-parallax, and cursor elements. `hero-water.ts` optionally refracts the artwork using a single Three.js shader quad. Typography never enters its texture. `Motion.tsx` owns section reveals. Each engine writes to a distinct element. The previous `HeroArtwork.tsx` and its Palash assets are preserved but are no longer loaded by the hero.

The [scope revert contract](https://animejs.com/documentation/scope/scope-methods/revert/) covers scoped Anime.js objects and constructor cleanup functions. Native listeners and timers still need explicit cleanup. The backdrop reverts its Anime.js scope and GSAP matchMedia context on pause or unmount; constructor cleanup removes listeners and observers. Its desktop-only water engine cancels pending animation frames and disposes texture, material, geometry, renderer, and canvas. A fresh canvas on resume avoids reusing a lost context. Motion-preference changes revert all optional effects; mobile and reduced motion never initialize the water renderer.

## Sequenced timelines

[Timeline documentation](https://animejs.com/documentation/timeline/) uses the v4 named export `createTimeline`. Its instance supports `.add(targets, parameters, position)` for animations and `.call(callback, position)` for events. Defaults belong in `defaults`; a completion callback belongs in `onComplete`.

The [time-position guide](https://animejs.com/documentation/timeline/time-position/) documents numeric positions in milliseconds, relative positions, and labels. The Bellhop-inspired intro uses timeline `.set()` to switch between four locally rendered `A.` monogram treatments at 400ms intervals, followed by a 520ms exit fade beginning at 2680ms. Its total sequence is approximately 3.2 seconds. The hero starts beneath the exit; interaction remains protected until the overlay finishes.

Do not substitute legacy v3 `anime({...})`, `anime.timeline()`, or `easing` examples for the installed v4 API. The installed TypeScript declarations were also inspected for `createScope`, `createTimeline`, and cleanup methods.

## SVG line drawing

[createDrawable documentation](https://animejs.com/documentation/svg/createdrawable/) describes an array of SVG proxies with a `draw` property. A string such as `"0 0"` hides the stroke segment; `"0 1"` draws its full length. Pass the proxies to `animate` or a timeline's `.add` and animate between these values. `stagger` offsets successive traces.

The initial implementation explored ornamental SVG seals. The owner subsequently requested a professional, minimal direction, so neither the hero nor loader uses those ornaments. `createDrawable` now serves technical project schematics only. The documentation warns that `vector-effect: non-scaling-stroke` adds per-tick scale calculations.

## Site-specific safeguards

- The intro's monogram sequence does not claim to measure resource/download progress. There is no progress bar or numerical loading counter.
- The intro runs once per tab session. Storage failures are caught and cannot block navigation.
- Reduced motion and direct section links bypass the intro. Reduced-motion hero content stays static.
- Skip and Escape release the overlay immediately; focus returns to the site. The short introduction temporarily makes background content inert.
- A five-second JavaScript timeout and independent CSS fail-open protect access. With JavaScript disabled, a noscript rule removes the overlay.
- Entrance and content motion stay finite: the 1.8-second image entrance, masked headline reveals, short section fades, and spatial-control camera transitions. The owner explicitly requested a moving water background: slow 10-second alternating float, small fine-pointer parallax, cursor-triggered ripples, and an 18px desktop scroll drift. Pause/Resume stops them; hidden/offscreen backgrounds suspend ongoing work. The five short desktop work pins remain responsive and clean up on navigation. No rotating motifs, magnetic controls, perpetual spins, or wheel interception.
- Service selections animate only the content inside their own rooted Anime.js scope. Arrow keys, Home, and End preserve tab focus and synchronize the project brief; cleanup reverts the finite transition. Native cursor behavior is retained, while header link rolls are CSS-only and disabled for reduced motion.
- The hero picture is visible immediately and does not depend on the intro or any model. Late image completion never replays the headline or delays navigation. Missing artwork or WebGL retains readable HTML over ivory. Mobile receives a smaller portrait WebP crop, floating motion, and no graphics context or decorative cursor.
- The image entrance pauses when the document is hidden and completes after 1.8 seconds. The optional desktop water shader is capped at 30fps and DPR 1; its loop stops offscreen, in hidden tabs, on pause, on context loss, and on teardown. Reduced motion removes every background effect.
- Cancellation, route changes, and React effect re-runs must restore scroll, focus access, listeners, and original inline styles.

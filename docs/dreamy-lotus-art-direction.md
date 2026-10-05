# Dreamy glass-lotus hero

Created 2026-10-05 using the built-in image-generation tool, then optimized locally with Sharp. No CLI image-generation fallback or external asset service was used.

## Reference roles

- `WhatsApp Image 2026-10-05 at 12.27.49.jpeg`: luminous garden depth and atmosphere only.
- `WhatsApp Image 2026-10-05 at 12.27.50 (1).jpeg`: translucent glass-lotus material, blush petals, and mint leaves.
- `WhatsApp Image 2026-10-05 at 12.27.50.jpeg`: serene aqua water and refracted light.

The generated composition is original. Reference watermarks, exact compositions, and decorative objects are not reused. The background is decorative art, not a client project or production capability claim. All typography remains separate HTML.

## Final generation prompt

Use case: stylized-concept
Asset type: original premium website hero background, very wide landscape composition, approximately 16:9.
Primary request: create a beautiful, dreamy yet professionally restrained botanical background for ANVAYA, a serious engineering studio. This is original artwork, not a recreation of any supplied reference.
Reference roles: reference 1 is only for painterly botanical depth and luminous garden atmosphere; reference 2 is for the beautifully crafted translucent glass lotus material, blush petals and mint glass leaves; reference 3 is for serene aqua water, refracted daylight and dreamy depth. Do not reproduce their exact compositions.
Scene/backdrop: luminous ivory and pearl mist transitioning subtly into pale aqua, muted jade and a whisper of warm blush. An ethereal water-garden interpreted as an elegant high-end editorial still life. Clear, polished, optical-glass lotus flowers with delicate translucent rose-pink petals, beautifully formed mint-green glass lily leaves and a few tiny water droplets.
Composition/framing: full-bleed wide hero art. Keep the central 65 percent and upper-middle of the frame extremely calm, light and uncluttered for a large dark serif website headline. Botanical elements are concentrated toward the lower left and lower right edges: one refined lotus in the lower-right foreground and a smaller, softly defocused lotus toward the lower-left edge; a few graceful translucent leaves frame the very bottom and far sides. No dense flower cluster in the center. Airy negative space, controlled asymmetry, believable depth, generous breathing room. Avoid any harsh horizon or hard edges.
Lighting/mood: soft cinematic daylight passing through glass and water, very gentle caustic reflections, pearl highlights, atmospheric depth, shallow depth of field; dreamy, peaceful, sophisticated and contemporary, never theatrical or mystical.
Style/medium: exceptionally refined photographic-quality 3D art direction, natural glass material and elegant botanical detail. Not a cartoon, not an illustration of synthetic rubber flowers.
Color palette: warm ivory #F8F4EE, pearl white, desaturated pale aqua, muted jade, very subtle blush rose. No saturated neon teal or magenta.
Constraints: no text, no letters, no logos, no watermark, no decorative frames, no vases, no birds, no pearls, no large bubbles, no butterflies, no glowing magical orbs, no religious symbols, no mandalas, no generic science-fiction particles. Flowers must feel elegant and recognizably lotus, not angular folded plastic. UI and typography will be separate HTML. The artwork must leave excellent readability for dark text over its center.

## Assets

- `assets/hero/dreamy-lotus-source.png`: preserved 1672 × 941 original.
- `public/art/dreamy-lotus-desktop.webp`: optimized landscape art.
- `public/art/dreamy-lotus-mobile.webp`: optimized 720 × 1100 portrait crop retaining the right-hand lotus.
- `scripts/prepare-lotus-art.mjs`: repeatable asset preparation; pass the preserved original to regenerate WebP variants.

CSS veils soften the center and lower edge for readable text. The image assets and original generation prompt are unchanged by the subsequent water-cursor request. Anime.js provides a finite 1.8-second image entrance; separate GSAP layers provide slow floating movement, small fine-pointer parallax, and an 18px desktop scroll drift. A fine desktop pointer gets a subtle glass cursor ring and optional single-quad water-refraction shader responding to movement and clicks. The native cursor remains visible; typography is separate, stable HTML. Touch uses ambient movement without a cursor or graphics context.

Pause/Resume controls all background motion. The shader is capped at 30fps and DPR 1, stops offscreen and in hidden tabs, and disposes graphics on pause, preference changes, or navigation. Reduced motion is fully static; unavailable WebGL and context loss retain the original image. The picture remains visible without JavaScript, and ivory remains if the image cannot load. No flower rotation, magnetic controls, or scroll interception is added.

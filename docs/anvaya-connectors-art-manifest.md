# Anvaya connector artwork

Created on 7 October 2026 for the isolated hero redesign using the built-in OpenAI image-generation tool. The tool did not expose a model/version identifier. No reference image, stock asset, third-party model, client screenshot or copied geometry was supplied. This is original generated presentation artwork; it is not evidence of a delivered project or a live Three.js render.

- Source: `assets/hero/anvaya-connectors-source.png`, 1774 × 887 pixels.
- Runtime derivative: `public/art/anvaya-connectors-editorial.webp`, 1190 × 595 pixels, WebP quality 85.
- Consumer: server-rendered `app/components/studio/Hero.tsx`, via `next/image`, with responsive sizes and reserved 2:1 dimensions. Empty alternative text marks this presentation art as decorative; all meaningful service copy stays in HTML.
- Transformation: downscale and encode only; no change to composition, colors or generated subject.
- Original tool output retained under the generating environment's generated-images directory. The project copies above are independent of that machine path.
- Attribution/license record: AI-generated for this project through the built-in tool; no separately licensed stock/model/code asset is embedded. Existing local font license notices remain under `app/fonts/`. The derived WebP uses the repository-installed Sharp encoder; its implementation/license is separate from the artwork.
- This static image does not satisfy the separate Three.js scene/poster quality checkpoint. Future live geometry should follow its own source/provenance record and visibly match the chosen art direction.

Regenerate the runtime derivative from the committed source after `npm ci`:

```bash
node scripts/prepare-connectors-art.mjs
```

## Generation prompt

Use case: stylized-concept. Asset type: a polished original artwork for the hero of Anvaya, a Bengaluru engineering collective. Create one wide landscape image, approximately 2:1. An abstract connection study of six beautifully manufactured rounded bridge and cross-shaped connector forms arranged in a calm diagonal composition at three depth layers: two opaque cobalt-blue forms (#2454FF), two porcelain-white forms, and two charcoal forms (#101116). One cobalt form is the focal point. Sculpted continuous surfaces, generous bevels, coherent geometry, subtle seams, broad controlled highlights and soft contact shadows, premium industrial product photography / photorealistic 3D studio render. A cool pale grey-lavender (#EEEFF5) seamless studio background. Keep generous quiet negative space and all objects well within the frame, occupying approximately the central 65% so a responsive wide crop retains the entire composition. Soft neutral studio lighting, modest gloss, opaque materials, controlled reflections. A mature editorial mood: clean, restrained, purposeful. No text, no lettering, no logo, no people, no mascot, no lotus, no glass, no gold, no rainbow, no neon, no glowing trails, no particles, no futuristic tunnel, no busy interface, no theme-park spectacle. The visual expresses disciplines connecting into a useful system; it must have dimensional depth and plausible manufactured silhouettes.

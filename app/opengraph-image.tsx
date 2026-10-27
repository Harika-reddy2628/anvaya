import { ImageResponse } from "next/og";

export const alt = "Anvaya — Make. Move. Matter.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Rendered once at build time, which also lets it export to static hosting.
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D1114",
          color: "#F2F4F6",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 10 }}>
          ANVAYA<span style={{ color: "#8CC8F0" }}>.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 112, lineHeight: 1.05, fontFamily: "serif" }}>
          <span>Make. Move.</span>
          <span style={{ fontStyle: "italic", color: "#8CC8F0" }}>Matter.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "rgba(242,244,246,0.7)" }}>
          Technology and design studio · India, working globally
        </div>
      </div>
    ),
    size,
  );
}

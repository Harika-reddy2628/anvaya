import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const source = process.argv[2] || "assets/hero/anvaya-connectors-source.png";
await mkdir("public/art", { recursive: true });
await sharp(source)
  .resize({ width: 1190 })
  .webp({ quality: 85 })
  .toFile("public/art/anvaya-connectors-editorial.webp");

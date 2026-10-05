import sharp from "sharp";
import { mkdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const source = process.argv[2];
if (!source) throw new Error("Pass the generated original PNG path.");
const root = process.cwd();
const sourceFolder = path.join(root, "assets", "hero");
const destination = path.join(root, "public", "art");
await mkdir(sourceFolder, { recursive: true });
await mkdir(destination, { recursive: true });
const preserved = path.join(sourceFolder, "dreamy-lotus-source.png");
if (path.resolve(source) !== preserved) {
  await copyFile(source, preserved, 1); // Never overwrite a preserved original.
}

const metadata = await sharp(preserved).metadata();
if (!metadata.width || !metadata.height)
  throw new Error("Invalid source image.");
const desktop = path.join(destination, "dreamy-lotus-desktop.webp");
const mobile = path.join(destination, "dreamy-lotus-mobile.webp");
await sharp(preserved).webp({ quality: 85, effort: 6 }).toFile(desktop);
// A right-side portrait crop retains the main lotus and calm upper space.
const cropWidth = Math.round(metadata.height * (720 / 1100));
await sharp(preserved)
  .extract({
    left: metadata.width - cropWidth,
    top: 0,
    width: cropWidth,
    height: metadata.height,
  })
  .resize(720, 1100)
  .webp({ quality: 82, effort: 6 })
  .toFile(mobile);
for (const file of [desktop, mobile]) {
  console.log(`${path.relative(root, file)}: ${(await stat(file)).size} bytes`);
}

import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "og");
const TRUCKS_FILE = path.join(ROOT, "src", "data", "trucks.ts");

function getTruckImageEntries() {
  const source = readFileSync(TRUCKS_FILE, "utf8");
  const entries = [...source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?images:\s*\[\s*"([^"]+)"/g)];

  return entries.map(([, slug, imagePath]) => ({ slug, imagePath }));
}

async function generateOgImages() {
  mkdirSync(OUT_DIR, { recursive: true });
  const trucks = getTruckImageEntries();

  for (const { slug, imagePath } of trucks) {
    const inputPath = path.join(ROOT, "public", imagePath.replace(/^\//, ""));
    const outputPath = path.join(OUT_DIR, `${slug}.jpg`);

    await sharp(inputPath)
      .resize(1200, 630, {
        fit: "cover",
        position: "centre",
      })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(outputPath);

    console.log(`Generated OG image: /og/${slug}.jpg`);
  }
}

generateOgImages().catch((error) => {
  console.error("Failed to generate Open Graph images:", error);
  process.exit(1);
});

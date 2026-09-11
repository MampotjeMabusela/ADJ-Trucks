import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { SITE_OG_IMAGE } from "@/lib/constants";

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "image/png";
}

export async function loadPublicImageDataUrl(
  relativePath: string
): Promise<string | null> {
  const normalizedPath = relativePath.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", normalizedPath);

  if (!existsSync(filePath)) {
    return null;
  }

  const buffer = await readFile(filePath);
  const mime = getMimeType(filePath);
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export async function loadTruckOgImageDataUrl(
  imagePath: string
): Promise<string> {
  const truckImage = await loadPublicImageDataUrl(imagePath);
  if (truckImage) {
    return truckImage;
  }

  const fallback = await loadPublicImageDataUrl(SITE_OG_IMAGE);
  if (fallback) {
    return fallback;
  }

  throw new Error("Unable to load truck or fallback Open Graph image.");
}

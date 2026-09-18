import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getTruckBySlug } from "@/data/trucks";
import { SITE_OG_IMAGE } from "@/lib/constants";

export const runtime = "nodejs";
export const alt = "Truck for sale at ADJ TRUCKS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

async function readImageDataUrl(relativePath: string): Promise<string> {
  const absolutePath = path.join(process.cwd(), "public", relativePath.replace(/^\//, ""));
  const buffer = await readFile(absolutePath);
  const extension = path.extname(relativePath).toLowerCase();
  const mime =
    extension === ".png" ? "image/png" : extension === ".webp" ? "image/webp" : "image/jpeg";

  return `data:${mime};base64,${buffer.toString("base64")}`;
}

export default async function OpenGraphImage({ params }: { params: { slug: string } }) {
  const truck = getTruckBySlug(params.slug);
  const candidates = truck
    ? [`/images/og/${truck.slug}.jpg`, truck.images[0], SITE_OG_IMAGE]
    : [SITE_OG_IMAGE];

  for (const imagePath of candidates) {
    try {
      const dataUrl = await readImageDataUrl(imagePath);
      return new ImageResponse(
        (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0D0D0E",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dataUrl}
              alt={truck?.title ?? "ADJ TRUCKS"}
              width={1200}
              height={630}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        ),
        { ...size }
      );
    } catch {
      continue;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0D0D0E",
          color: "#F5A623",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        ADJ TRUCKS
      </div>
    ),
    { ...size }
  );
}

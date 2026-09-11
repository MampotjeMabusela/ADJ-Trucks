import { ImageResponse } from "next/og";
import { getTruckBySlug } from "@/data/trucks";
import { loadTruckOgImageDataUrl } from "@/lib/og-image";
import { formatPrice } from "@/lib/utils";

export const runtime = "nodejs";
export const alt = "ADJ TRUCKS vehicle listing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface OgImageProps {
  params: { slug: string };
}

export default async function OgImage({ params }: OgImageProps) {
  const truck = getTruckBySlug(params.slug);

  if (!truck) {
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
      size
    );
  }

  const imageDataUrl = await loadTruckOgImageDataUrl(truck.images[0]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0D0D0E",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- required for next/og ImageResponse */}
        <img
          src={imageDataUrl}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(13,13,14,0.1) 0%, rgba(13,13,14,0.45) 55%, rgba(13,13,14,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 42,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              color: "#F5A623",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            ADJ TRUCKS
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {truck.title}
          </div>
          <div
            style={{
              color: "#FFD166",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            {formatPrice(truck.price)}
          </div>
        </div>
      </div>
    ),
    size
  );
}

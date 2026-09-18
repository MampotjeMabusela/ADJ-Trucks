import type { Truck } from "@/types/truck";
import { SITE_OG_IMAGE } from "@/lib/constants";
import { getAbsoluteUrl } from "@/lib/site-url";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export function getTruckOgImageUrl(truck: Truck): string {
  return getAbsoluteUrl(`/images/og/${truck.slug}.jpg`);
}

export function getTruckPhotoImageUrl(truck: Truck): string {
  return getAbsoluteUrl(truck.images[0]);
}

export function getSiteLogoOgImageUrl(): string {
  return getAbsoluteUrl(SITE_OG_IMAGE);
}

export function getTruckOgImageMeta(truck: Truck) {
  const url = getTruckOgImageUrl(truck);

  return {
    url,
    secureUrl: url,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: `${truck.title} for sale at ADJ TRUCKS`,
    type: "image/jpeg" as const,
  };
}

export function getSiteLogoOgImageMeta() {
  const url = getSiteLogoOgImageUrl();

  return {
    url,
    secureUrl: url,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: "ADJ TRUCKS - Albert de Jongh Trucks",
    type: "image/png" as const,
  };
}

/** Primary truck photo for social previews, with ADJ logo as guaranteed fallback. */
export function getTruckSocialPreviewImages(truck: Truck) {
  return [getTruckOgImageMeta(truck), getSiteLogoOgImageMeta()];
}

import type { Truck } from "@/types/truck";
import { getAbsoluteUrl } from "@/lib/site-url";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export function getTruckOgImageUrl(truck: Truck): string {
  return getAbsoluteUrl(`/og/${truck.slug}.jpg`);
}

export function getTruckOgImageMeta(truck: Truck) {
  const url = getTruckOgImageUrl(truck);

  return {
    url,
    secureUrl: url,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    alt: `${truck.title} for sale at ADJ TRUCKS`,
    type: "image/jpeg",
  };
}

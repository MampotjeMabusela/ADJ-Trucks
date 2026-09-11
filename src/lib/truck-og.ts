import type { Truck } from "@/types/truck";
import { getAbsoluteUrl } from "@/lib/site-url";

const TRUCK_OG_WIDTH = 1024;
const TRUCK_OG_HEIGHT = 472;

function getTruckOgImageType(imagePath: string): string {
  return imagePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
}

export function getTruckOgImageUrl(truck: Truck): string {
  return getAbsoluteUrl(truck.images[0]);
}

export function getTruckOgImageMeta(truck: Truck) {
  const url = getTruckOgImageUrl(truck);

  return {
    url,
    secureUrl: url,
    width: TRUCK_OG_WIDTH,
    height: TRUCK_OG_HEIGHT,
    alt: truck.title,
    type: getTruckOgImageType(truck.images[0]),
  };
}

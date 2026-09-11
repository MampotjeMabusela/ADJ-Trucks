import type { Truck } from "@/types/truck";
import { getAbsoluteUrl } from "@/lib/site-url";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const TRUCK_PHOTO_WIDTH = 1024;
const TRUCK_PHOTO_HEIGHT = 472;

function getTruckPhotoType(imagePath: string): string {
  return imagePath.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
}

export function getTruckOgImageUrl(truck: Truck): string {
  return getAbsoluteUrl(`/images/og/${truck.slug}.jpg`);
}

export function getTruckPhotoImageUrl(truck: Truck): string {
  return getAbsoluteUrl(truck.images[0]);
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

export function getTruckPhotoImageMeta(truck: Truck) {
  const url = getTruckPhotoImageUrl(truck);

  return {
    url,
    secureUrl: url,
    width: TRUCK_PHOTO_WIDTH,
    height: TRUCK_PHOTO_HEIGHT,
    alt: `${truck.title} for sale at ADJ TRUCKS`,
    type: getTruckPhotoType(truck.images[0]),
  };
}

export function getTruckSocialPreviewImages(truck: Truck) {
  return [getTruckOgImageMeta(truck), getTruckPhotoImageMeta(truck)];
}

import type { Truck } from "@/types/truck";
import { formatPrice } from "@/lib/utils";

const DEFAULT_SITE_URL = "https://adjtrucks.co.za";

export function getSiteOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : DEFAULT_SITE_URL)
  );
}

export function getTruckShareUrl(slug: string, origin = getSiteOrigin()): string {
  return `${origin.replace(/\/$/, "")}/inventory/${slug}`;
}

export function getTruckShareText(truck: Truck): string {
  return `${truck.title} — ${formatPrice(truck.price)} | ADJ TRUCKS`;
}

export function getTruckShareMessage(truck: Truck, url: string): string {
  return `${getTruckShareText(truck)}\n${url}`;
}

export function getFacebookShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

export async function copyTruckShareLink(message: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(message);
    return true;
  } catch {
    return false;
  }
}

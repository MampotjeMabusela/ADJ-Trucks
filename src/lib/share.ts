import type { Truck } from "@/types/truck";
import { getTruckOgImageUrl } from "@/lib/truck-og";
import { getSiteUrl } from "@/lib/site-url";
import { formatMileage, formatPrice } from "@/lib/utils";

const SHORT_DESCRIPTION_LENGTH = 140;

export function getSiteOrigin(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getSiteUrl();
}

export function getTruckShareUrl(slug: string, origin = getSiteOrigin()): string {
  return `${origin.replace(/\/$/, "")}/inventory/${slug}`;
}

export function getTruckShareImageUrl(truck: Truck, origin = getSiteOrigin()): string {
  if (typeof window !== "undefined") {
    return `${origin.replace(/\/$/, "")}/inventory/${truck.slug}/opengraph-image`;
  }

  return getTruckOgImageUrl(truck);
}

export function getTruckShareText(truck: Truck): string {
  return `${truck.title} — ${formatPrice(truck.price)} | ADJ TRUCKS`;
}

export function getTruckShortDescription(
  truck: Truck,
  maxLength = SHORT_DESCRIPTION_LENGTH
): string {
  const trimmed = truck.description.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  const shortened = trimmed.slice(0, maxLength).trimEnd();
  const lastSpace = shortened.lastIndexOf(" ");
  const base = lastSpace > 80 ? shortened.slice(0, lastSpace) : shortened;
  return `${base}...`;
}

function getTruckShareSummary(truck: Truck): string {
  return `${truck.year} · ${formatMileage(truck.mileage)} · ${truck.specs.transmission}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function getTruckSharePlainText(truck: Truck, url: string): string {
  return [
    getTruckShareText(truck),
    getTruckShareSummary(truck),
    "",
    getTruckShortDescription(truck),
    "",
    url,
  ].join("\n");
}

export function getTruckShareHtml(truck: Truck, url: string): string {
  const imageUrl = getTruckShareImageUrl(truck, getSiteOriginFromUrl(url));
  const title = escapeHtml(getTruckShareText(truck));
  const summary = escapeHtml(getTruckShareSummary(truck));
  const description = escapeHtml(getTruckShortDescription(truck));
  const safeUrl = escapeHtml(url);
  const safeImageUrl = escapeHtml(imageUrl);
  const alt = escapeHtml(truck.title);

  return [
    "<div>",
    `<p><strong>${title}</strong></p>`,
    `<p>${summary}</p>`,
    `<p>${description}</p>`,
    `<p><a href="${safeUrl}">View listing on ADJ TRUCKS</a></p>`,
    `<p><img src="${safeImageUrl}" alt="${alt}" /></p>`,
    "</div>",
  ].join("");
}

function getSiteOriginFromUrl(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return getSiteOrigin();
  }
}

/** @deprecated Use getTruckSharePlainText instead */
export function getTruckShareMessage(truck: Truck, url: string): string {
  return getTruckSharePlainText(truck, url);
}

export function getFacebookShareUrl(pageUrl: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
}

export async function copyTruckShareContent(truck: Truck, url: string): Promise<boolean> {
  if (typeof navigator === "undefined") {
    return false;
  }

  const plain = getTruckSharePlainText(truck, url);
  const html = getTruckShareHtml(truck, url);

  try {
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": new Blob([plain], { type: "text/plain" }),
          "text/html": new Blob([html], { type: "text/html" }),
        }),
      ]);
      return true;
    }
  } catch {
    // Fall through to plain-text copy.
  }

  if (!navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(plain);
    return true;
  } catch {
    return false;
  }
}

/** @deprecated Use copyTruckShareContent instead */
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

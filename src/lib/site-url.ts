const DEFAULT_SITE_URL = "https://adjtrucks.co.za";

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return normalizeSiteUrl(configured);
  }

  if (process.env.VERCEL_ENV === "production") {
    return DEFAULT_SITE_URL;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return normalizeSiteUrl(`https://${vercelUrl}`);
  }

  return DEFAULT_SITE_URL;
}

export function getAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TruckDetail } from "@/components/TruckDetail";
import { getAllSlugs, getTruckBySlug } from "@/data/trucks";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";
import { getTruckOgImageUrl, getTruckPhotoImageUrl } from "@/lib/truck-og";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const truck = getTruckBySlug(params.slug);
  if (!truck) return { title: "Vehicle Not Found" };

  const pageUrl = `${getSiteUrl()}/inventory/${truck.slug}`;
  const description = `${truck.title} for sale — ${formatPrice(truck.price)}. ${truck.description.slice(0, 120)}...`;
  const ogTitle = `${truck.title} for Sale | ADJ TRUCKS`;
  const ogImageUrl = getTruckOgImageUrl(truck);

  return {
    title: truck.title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "ADJ TRUCKS",
      locale: "en_ZA",
      title: ogTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${truck.title} for sale at ADJ TRUCKS`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function TruckDetailPage({ params }: PageProps) {
  const truck = getTruckBySlug(params.slug);
  if (!truck) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: truck.title,
    description: truck.description,
    brand: { "@type": "Brand", name: truck.make },
    model: truck.model,
    vehicleModelDate: String(truck.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: truck.mileage,
      unitCode: "KMT",
    },
    offers: {
      "@type": "Offer",
      price: truck.price,
      priceCurrency: "ZAR",
      availability:
        truck.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "AutoDealer",
        name: "Albert de Jongh Trucks",
      },
    },
    image: [
      getTruckOgImageUrl(truck),
      getTruckPhotoImageUrl(truck),
      ...truck.images.slice(1).map((image) => getAbsoluteUrl(image)),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TruckDetail truck={truck} />
    </>
  );
}

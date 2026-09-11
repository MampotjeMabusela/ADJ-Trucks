import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TruckDetail } from "@/components/TruckDetail";
import { getAllSlugs, getTruckBySlug } from "@/data/trucks";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/site-url";
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
  const description = `${truck.title} - ${formatPrice(truck.price)}. ${truck.description.slice(0, 150)}...`;
  const ogImageUrl = getAbsoluteUrl(`/inventory/${truck.slug}/opengraph-image`);

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
      title: `${truck.title} | ADJ TRUCKS`,
      description: truck.description,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: truck.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${truck.title} | ADJ TRUCKS`,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: truck.title,
        },
      ],
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
    image: truck.images.map((image) => getAbsoluteUrl(image)),
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

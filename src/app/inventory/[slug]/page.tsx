import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TruckDetail } from "@/components/TruckDetail";
import { getAllSlugs, getTruckBySlug } from "@/data/trucks";
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

  return {
    title: truck.title,
    description: `${truck.title} - ${formatPrice(truck.price)}. ${truck.description.slice(0, 150)}...`,
    openGraph: {
      title: `${truck.title} | ADJ TRUCKS`,
      description: truck.description,
      images: [{ url: truck.images[0], width: 1200, height: 630, alt: truck.title }],
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
    image: truck.images,
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

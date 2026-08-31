import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { COMPANY, SITE_OG_IMAGE } from "@/lib/constants";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://adjtrucks.co.za");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${COMPANY.name} | ${COMPANY.fullName} - Commercial Vehicle Dealership`,
    template: `%s | ${COMPANY.name}`,
  },
  description: `${COMPANY.slogan}. Browse premium heavy-duty trucks, tippers, dropsides, and horse units in Pretoria, South Africa. Certified inspection, transparent pricing.`,
  keywords: [
    "trucks for sale South Africa",
    "commercial vehicles Pretoria",
    "Hino trucks",
    "Isuzu trucks",
    "Mercedes-Benz trucks",
    "used trucks Gauteng",
    "ADJ TRUCKS",
    "Albert de Jongh Trucks",
    "wholesale trucks",
    "heavy duty vehicles",
  ],
  authors: [{ name: COMPANY.fullName }],
  creator: COMPANY.fullName,
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: siteUrl,
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Premium Commercial Vehicles`,
    description: COMPANY.slogan,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${COMPANY.name} - ${COMPANY.fullName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Premium Commercial Vehicles`,
    description: COMPANY.slogan,
    images: [SITE_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D0D0E",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: COMPANY.fullName,
  alternateName: COMPANY.name,
  description: COMPANY.slogan,
  url: "https://adjtrucks.co.za",
  telephone: COMPANY.contact.mobile,
  email: COMPANY.contact.email,
  foundingDate: "2007",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.suburb,
    addressRegion: "Gauteng",
    postalCode: COMPANY.address.postal,
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.address.latitude,
    longitude: COMPANY.address.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  priceRange: "R$$$",
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} font-sans antialiased bg-charcoal-deep text-foreground min-h-screen overflow-x-hidden`}
      >
        <Navbar />
        <main className="pb-safe">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}


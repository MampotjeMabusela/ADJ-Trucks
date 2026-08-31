"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Settings2,
  Fuel,
  Weight,
  Hash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppInquiryButton } from "@/components/WhatsAppButton";
import { TruckShareButtons } from "@/components/TruckShareButtons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { COMPANY } from "@/lib/constants";
import { formatMileage, formatPrice, cn } from "@/lib/utils";
import type { Truck } from "@/types/truck";

interface TruckDetailClientProps {
  truck: Truck;
}

export function TruckDetailClient({ truck }: TruckDetailClientProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const statusColors = {
    available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    sold: "bg-red-500/20 text-red-400 border-red-500/30",
    reserved: "bg-zinc-500/20 text-zinc-300 border-zinc-500/30",
  };

  const specItems = [
    { icon: Calendar, label: "Year", value: String(truck.year) },
    { icon: Gauge, label: "Mileage", value: formatMileage(truck.mileage) },
    { icon: Settings2, label: "Transmission", value: truck.specs.transmission },
    { icon: Fuel, label: "Engine", value: truck.specs.engine },
    { icon: Weight, label: "GVM", value: truck.specs.gvm },
    { icon: Hash, label: "Axles", value: truck.specs.axles },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/inventory"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Showroom
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/5">
              <Image
                src={truck.images[currentImage]}
                alt={truck.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {truck.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage(
                        (prev) => (prev - 1 + truck.images.length) % truck.images.length
                      )
                    }
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 rounded-full bg-charcoal-deep/80 text-white hover:bg-gold hover:text-charcoal-deep transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentImage((prev) => (prev + 1) % truck.images.length)
                    }
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 rounded-full bg-charcoal-deep/80 text-white hover:bg-gold hover:text-charcoal-deep transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              <span
                className={cn(
                  "absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded border",
                  statusColors[truck.status]
                )}
              >
                {truck.status}
              </span>
            </div>

            {truck.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
                {truck.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-colors snap-start touch-manipulation",
                      i === currentImage
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${truck.title} - image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-sm text-gold font-medium uppercase tracking-wider">
              {truck.hideCategory
                ? `${truck.make} · Ref #${truck.id}`
                : `${truck.make} · ${truck.category} · Ref #${truck.id}`}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-3 sm:mb-4 break-words">
              {truck.title}
            </h1>
            <p className="text-2xl sm:text-3xl font-bold text-gold mb-4 sm:mb-6">
              {formatPrice(truck.price)}
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {truck.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {specItems.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-lg bg-metallic-gradient border border-white/5"
                >
                  <spec.icon className="h-4 w-4 text-gold/60 mb-1.5" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {spec.label}
                  </p>
                  <p className="text-sm font-medium mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <WhatsAppInquiryButton
                truckTitle={truck.title}
                truckId={truck.id}
                className="flex-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-11 px-6 bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
              />
              <Button variant="outline" className="flex-1" asChild>
                <a href={`tel:${COMPANY.contact.mobileRaw}`}>Call to Enquire</a>
              </Button>
            </div>

            <TruckShareButtons truck={truck} className="mb-10" />

            <Separator className="mb-8" />

            <h2 className="text-lg font-bold mb-4">Full Specification</h2>
            <div className="rounded-xl border border-white/5 overflow-x-auto mb-10">
              <table className="w-full text-sm min-w-[300px]">
                <tbody>
                  {[
                    ["Make", truck.make],
                    ["Model", truck.model],
                    ["Year", String(truck.year)],
                    ["Category", truck.category],
                    ["Engine", truck.specs.engine],
                    ["Transmission", truck.specs.transmission],
                    ["Fuel Type", truck.specs.fuelType],
                    ["Axle Configuration", truck.specs.axles],
                    ["Gross Vehicle Mass", truck.specs.gvm],
                    ...(truck.specs.payload
                      ? [["Payload Capacity", truck.specs.payload] as const]
                      : []),
                    ...(truck.specs.vin ? [["VIN", truck.specs.vin] as const] : []),
                    ["Mileage", formatMileage(truck.mileage)],
                    ["Price", formatPrice(truck.price)],
                  ].map(([label, value], i) => (
                    <tr
                      key={label}
                      className={cn(
                        "border-b border-white/5 last:border-0",
                        i % 2 === 0 ? "bg-charcoal/30" : ""
                      )}
                    >
                      <td className="px-4 py-3 text-muted-foreground font-medium w-1/3">
                        {label}
                      </td>
                      <td className="px-4 py-3">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-lg font-bold mb-4">Make an Offer / Enquire</h2>
            <div className="rounded-xl border border-white/5 bg-metallic-gradient p-4 sm:p-6">
              <ContactForm truckTitle={truck.title} truckId={truck.id} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



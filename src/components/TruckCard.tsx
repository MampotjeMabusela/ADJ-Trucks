"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Settings2,
  Eye,
} from "lucide-react";
import { WhatsAppInquiryButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { formatMileage, formatPrice, cn } from "@/lib/utils";
import type { Truck } from "@/types/truck";

interface TruckCardProps {
  truck: Truck;
  view?: "grid" | "list";
  index?: number;
}

export function TruckCard({ truck, view = "grid", index = 0 }: TruckCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % truck.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + truck.images.length) % truck.images.length);
  };

  const statusColors = {
    available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    sold: "bg-red-500/20 text-red-400 border-red-500/30",
    reserved: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="rounded-xl border border-white/5 bg-metallic-gradient hover:border-gold/30 transition-all duration-500 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <Link
            href={`/inventory/${truck.slug}`}
            className="relative w-full md:w-72 h-48 md:h-44 rounded-lg overflow-hidden shrink-0 group/image"
          >
            <Image
              src={truck.images[0]}
              alt={truck.title}
              fill
              className="object-cover group-hover/image:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 288px"
            />
            <span
              className={cn(
                "absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded border",
                statusColors[truck.status]
              )}
            >
              {truck.status}
            </span>
          </Link>
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-gold font-medium uppercase tracking-wider">
                    {truck.hideCategory ? truck.make : `${truck.make} · ${truck.category}`}
                  </p>
                  <Link href={`/inventory/${truck.slug}`}>
                    <h3 className="text-lg font-bold mt-1 hover:text-gold transition-colors">
                      {truck.title}
                    </h3>
                  </Link>
                </div>
                <p className="text-xl font-bold text-gold shrink-0">
                  {formatPrice(truck.price)}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {truck.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5" /> {formatMileage(truck.mileage)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Settings2 className="h-3.5 w-3.5" /> {truck.specs.transmission}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 max-w-md md:max-w-sm md:ml-auto w-full">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-full min-w-0 px-2 text-xs sm:text-sm"
                asChild
              >
                <Link href={`/inventory/${truck.slug}`}>
                  <Eye className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">Details</span>
                </Link>
              </Button>
              <WhatsAppInquiryButton
                truckTitle={truck.title}
                truckId={truck.id}
                className="h-10 w-full min-w-0 inline-flex items-center justify-center gap-1.5 rounded-md px-2 text-xs sm:text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all duration-300"
              >
                Inquire
              </WhatsAppInquiryButton>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="group relative rounded-xl border border-white/5 bg-metallic-gradient overflow-hidden hover:border-gold/30 hover:shadow-gold-sm transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Link href={`/inventory/${truck.slug}`}>
            <Image
              src={truck.images[currentImage]}
              alt={truck.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>

          {truck.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-charcoal-deep/80 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-charcoal-deep touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-charcoal-deep/80 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-charcoal-deep touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {truck.images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === currentImage ? "w-4 bg-gold" : "w-1 bg-white/40"
                    )}
                  />
                ))}
              </div>
            </>
          )}

          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded border backdrop-blur-sm",
              statusColors[truck.status]
            )}
          >
            {truck.status}
          </span>

          {truck.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded bg-gold/90 text-charcoal-deep">
              Featured
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gold font-medium uppercase tracking-wider">
                {truck.hideCategory ? truck.make : `${truck.make} · ${truck.category}`}
              </p>
              <Link href={`/inventory/${truck.slug}`}>
                <h3 className="text-base font-bold mt-0.5 group-hover:text-gold transition-colors line-clamp-2 sm:line-clamp-1">
                  {truck.title}
                </h3>
              </Link>
            </div>
          </div>

          <p className="text-xl sm:text-2xl font-bold text-gold mb-4">{formatPrice(truck.price)}</p>

          <div className="grid grid-cols-3 gap-2 mb-5 text-xs text-muted-foreground">
            <div className="flex flex-col items-center p-2 rounded-lg bg-charcoal/50">
              <Calendar className="h-3.5 w-3.5 mb-1 text-gold/60" />
              <span>{truck.year}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-charcoal/50">
              <Gauge className="h-3.5 w-3.5 mb-1 text-gold/60" />
              <span>{(truck.mileage / 1000).toFixed(0)}k km</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-charcoal/50">
              <Settings2 className="h-3.5 w-3.5 mb-1 text-gold/60" />
              <span className="truncate w-full text-center">
                {truck.specs.transmission.split(" ")[0]}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-10 w-full min-w-0 px-2 text-xs sm:text-sm"
              asChild
            >
              <Link href={`/inventory/${truck.slug}`}>
                <Eye className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">Details</span>
              </Link>
            </Button>
            <WhatsAppInquiryButton
              truckTitle={truck.title}
              truckId={truck.id}
              className="h-10 w-full min-w-0 inline-flex items-center justify-center gap-1.5 rounded-md px-2 text-xs sm:text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20BD5A] transition-all duration-300"
            >
              Inquire
            </WhatsAppInquiryButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

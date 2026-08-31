"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TruckCard } from "@/components/TruckCard";
import { Button } from "@/components/ui/button";
import type { Truck } from "@/types/truck";

interface FeaturedInventoryProps {
  trucks: Truck[];
}

export function FeaturedInventory({ trucks }: FeaturedInventoryProps) {
  if (trucks.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-gold">
              Featured Stock
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Premium Selection
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Hand-picked commercial vehicles ready for immediate delivery.
              Every unit certified and inspected.
            </p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link href="/inventory">
              View All Stock
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trucks.map((truck, i) => (
            <TruckCard key={truck.id} truck={truck} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

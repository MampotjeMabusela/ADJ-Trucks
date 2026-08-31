"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COMPANY, PAGE_BACKGROUNDS } from "@/lib/constants";
import { trucks } from "@/data/trucks";
import type { TruckFilters } from "@/types/truck";

export function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    router.push(`/inventory?${params.toString()}`);
  };

  const handleFilterSearch = (filters: TruckFilters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.make !== "all") params.set("make", filters.make);
    if (filters.minPrice > 0) params.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice < 3000000) params.set("maxPrice", String(filters.maxPrice));
    if (filters.maxMileage < 500000) params.set("maxMileage", String(filters.maxMileage));
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-charcoal-deep">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage: `url("${PAGE_BACKGROUNDS.showroom}")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/42 via-charcoal-deep/56 to-charcoal-deep" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,166,35,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-gold border border-gold/30 rounded-full bg-gold/5">
              Since {COMPANY.since} · Pretoria, South Africa
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 px-2 sm:px-0"
          >
            Heavy-Duty{" "}
            <span className="text-transparent bg-clip-text bg-gold-gradient">
              Reliability.
            </span>
            <br />
            Uncompromised{" "}
            <span className="text-transparent bg-clip-text bg-gold-gradient">
              Quality.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0"
          >
            {COMPANY.slogan}. Browse our premium selection of commercial vehicles
            with transparent pricing and certified inspection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 px-2 sm:px-0">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by make, model, or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-base bg-charcoal/80 backdrop-blur-sm border-white/10 w-full"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 sm:h-14 px-8 w-full sm:w-auto shrink-0">
                Search
              </Button>
            </form>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="mt-3 text-sm text-gold/80 hover:text-gold transition-colors"
            >
              {showFilters ? "Hide" : "Show"} Advanced Filters
            </button>
          </motion.div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="max-w-4xl mx-auto mb-8"
            >
              <FilterBar onFilter={handleFilterSearch} compact />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/inventory">
                Browse Showroom
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mt-12 sm:mt-20 px-2 sm:px-0"
        >
          {[
            { value: "17+", label: "Years Experience" },
            { value: "500+", label: "Trucks Sold" },
            { value: String(trucks.filter((t) => t.status === "available").length), label: "Vehicles In Stock" },
            { value: "100%", label: "Inspected" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-metallic-gradient border border-white/5"
            >
              <div className="text-2xl md:text-3xl font-bold text-gold">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

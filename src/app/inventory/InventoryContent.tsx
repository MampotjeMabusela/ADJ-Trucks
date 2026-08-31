"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { FilterBar } from "@/components/FilterBar";
import { PageHero } from "@/components/PageHero";
import { TruckCard } from "@/components/TruckCard";
import { PAGE_BACKGROUNDS } from "@/lib/constants";
import { filterTrucks, getMileageRange, getPriceRange } from "@/data/trucks";
import type { TruckFilters } from "@/types/truck";
import { cn } from "@/lib/utils";

export default function InventoryContent() {
  const searchParams = useSearchParams();
  const priceRange = getPriceRange();
  const mileageRange = getMileageRange();

  const initialFilters = useMemo<TruckFilters>(() => ({
    search: searchParams.get("search") ?? "",
    category: (searchParams.get("category") as TruckFilters["category"]) ?? "all",
    make: (searchParams.get("make") as TruckFilters["make"]) ?? "all",
    minPrice: Number(searchParams.get("minPrice")) || priceRange.min,
    maxPrice: Number(searchParams.get("maxPrice")) || priceRange.max,
    maxMileage: Number(searchParams.get("maxMileage")) || mileageRange.max,
  }), [searchParams, priceRange.min, priceRange.max, mileageRange.max]);

  const [filters, setFilters] = useState<TruckFilters>(initialFilters);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);

  const filteredTrucks = useMemo(
    () => filterTrucks(filters),
    [filters]
  );

  const handleFilter = useCallback((newFilters: TruckFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">
      <PageHero image={PAGE_BACKGROUNDS.showroom} className="mb-8 sm:mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            Showroom
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">
            Our Inventory
          </h1>
          <p className="text-muted-foreground">
            {filteredTrucks.length} vehicle{filteredTrucks.length !== 1 ? "s" : ""}{" "}
            available · Premium commercial trucks inspected and ready
          </p>
        </motion.div>
      </PageHero>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? "Hide" : "Show"} Filters
          </button>
          <div className="flex items-center gap-1 p-1 rounded-lg bg-charcoal border border-white/5">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-md transition-colors",
                view === "grid"
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={cn(
                "p-2 rounded-md transition-colors",
                view === "list"
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8"
          >
            <FilterBar
              onFilter={handleFilter}
              initialFilters={initialFilters}
            />
          </motion.div>
        )}

        {filteredTrucks.length > 0 ? (
          <div
            className={cn(
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            )}
          >
            {filteredTrucks.map((truck, i) => (
              <TruckCard key={truck.id} truck={truck} view={view} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg font-medium mb-2">No vehicles match your filters</p>
            <p className="text-sm text-muted-foreground mb-6">
              Try adjusting your search criteria or contact us for custom sourcing.
            </p>
            <button
              type="button"
              onClick={() =>
                handleFilter({
                  search: "",
                  category: "all",
                  make: "all",
                  minPrice: priceRange.min,
                  maxPrice: priceRange.max,
                  maxMileage: mileageRange.max,
                })
              }
              className="text-gold hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



"use client";

import { TRUCK_CATEGORIES, TRUCK_MAKES } from "@/lib/constants";
import { getMileageRange, getPriceRange } from "@/data/trucks";
import type { TruckFilters } from "@/types/truck";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  onFilter: (filters: TruckFilters) => void;
  compact?: boolean;
  initialFilters?: Partial<TruckFilters>;
}

const priceRange = getPriceRange();
const mileageRange = getMileageRange();

export function FilterBar({ onFilter, compact = false, initialFilters }: FilterBarProps) {
  const [filters, setFilters] = useState<TruckFilters>({
    search: initialFilters?.search ?? "",
    category: initialFilters?.category ?? "all",
    make: initialFilters?.make ?? "all",
    minPrice: initialFilters?.minPrice ?? priceRange.min,
    maxPrice: initialFilters?.maxPrice ?? priceRange.max,
    maxMileage: initialFilters?.maxMileage ?? mileageRange.max,
  });

  const updateFilter = <K extends keyof TruckFilters>(
    key: K,
    value: TruckFilters[K]
  ) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (!compact) onFilter(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const clearFilters = () => {
    const cleared: TruckFilters = {
      search: "",
      category: "all",
      make: "all",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      maxMileage: mileageRange.max,
    };
    setFilters(cleared);
    onFilter(cleared);
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== "all" ||
    filters.make !== "all" ||
    filters.minPrice > priceRange.min ||
    filters.maxPrice < priceRange.max ||
    filters.maxMileage < mileageRange.max;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-xl border border-white/10 bg-charcoal/80 backdrop-blur-xl p-3 sm:p-4 md:p-6",
        compact ? "shadow-gold-sm" : "shadow-glass"
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-2">
          <Label htmlFor="search" className="mb-2 block text-xs text-muted-foreground">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Make, model, keyword..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="mb-2 block text-xs text-muted-foreground">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(v) =>
              updateFilter("category", v as TruckFilters["category"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {TRUCK_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Make */}
        <div>
          <Label className="mb-2 block text-xs text-muted-foreground">Make</Label>
          <Select
            value={filters.make}
            onValueChange={(v) => updateFilter("make", v as TruckFilters["make"])}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Makes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {TRUCK_MAKES.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Max Price */}
        <div>
          <Label htmlFor="maxPrice" className="mb-2 block text-xs text-muted-foreground">
            Max Price (R)
          </Label>
          <Input
            id="maxPrice"
            type="number"
            min={priceRange.min}
            max={priceRange.max}
            step={50000}
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
          />
        </div>

        {/* Max Mileage */}
        <div>
          <Label htmlFor="maxMileage" className="mb-2 block text-xs text-muted-foreground">
            Max Mileage (km)
          </Label>
          <Input
            id="maxMileage"
            type="number"
            min={mileageRange.min}
            max={mileageRange.max}
            step={10000}
            value={filters.maxMileage}
            onChange={(e) => updateFilter("maxMileage", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <Button type="submit" size="sm">
          <Search className="h-4 w-4" />
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>
    </form>
  );
}



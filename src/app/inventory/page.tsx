import { Suspense } from "react";
import type { Metadata } from "next";
import InventoryContent from "./InventoryContent";

export const metadata: Metadata = {
  title: "Showroom Inventory",
  description:
    "Browse our full inventory of premium commercial trucks — dropsides, tippers, box trucks, horse units and more. All vehicles certified and inspected.",
};

export default function InventoryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 sm:pt-28 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading inventory...</div>
        </div>
      }
    >
      <InventoryContent />
    </Suspense>
  );
}



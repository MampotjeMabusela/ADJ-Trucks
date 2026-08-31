import type { Truck } from "@/types/truck";
import { TruckDetailClient } from "./TruckDetailClient";

interface TruckDetailProps {
  truck: Truck;
}

export function TruckDetail({ truck }: TruckDetailProps) {
  return <TruckDetailClient truck={truck} />;
}


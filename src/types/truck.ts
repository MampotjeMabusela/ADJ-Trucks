import { TRUCK_CATEGORIES, TRUCK_MAKES } from "@/lib/constants";

export type TruckCategory = (typeof TRUCK_CATEGORIES)[number];
export type TruckMake = (typeof TRUCK_MAKES)[number];

export interface TruckSpecs {
  engine: string;
  transmission: string;
  axles: string;
  gvm: string;
  payload?: string;
  fuelType: string;
  vin?: string;
}

export interface Truck {
  id: string;
  slug: string;
  title: string;
  make: TruckMake;
  model: string;
  year: number;
  category: TruckCategory;
  price: number;
  mileage: number;
  images: string[];
  featured: boolean;
  status: "available" | "sold" | "reserved";
  description: string;
  specs: TruckSpecs;
  hideCategory?: boolean;
}

export interface TruckFilters {
  search: string;
  category: TruckCategory | "all";
  make: TruckMake | "all";
  minPrice: number;
  maxPrice: number;
  maxMileage: number;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  truckId?: string;
}

export interface InquiryFormData extends ContactFormData {
  offerAmount?: string;
}


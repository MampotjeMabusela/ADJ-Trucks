import type { Truck } from "@/types/truck";

export const trucks: Truck[] = [
  {
    id: "1",
    slug: "2013-isuzu-500",
    title: "2013 Isuzu 500",
    make: "Isuzu",
    model: "500",
    year: 2013,
    category: "Dropside",
    price: 289900,
    mileage: 382276,
    images: [
      "/images/trucks/isuzu-500-2013/01-front-angle.png",
      "/images/trucks/isuzu-500-2013/02-rear-angle.png",
      "/images/trucks/isuzu-500-2013/03-side-profile.png",
      "/images/trucks/isuzu-500-2013/04-front.png",
      "/images/trucks/isuzu-500-2013/05-compliance-plate.png",
      "/images/trucks/isuzu-500-2013/06-interior-odometer.png",
    ],
    featured: true,
    status: "available",
    hideCategory: true,
    description:
      "2013 Isuzu NQR 500 dropside in solid working condition. White cab with grey dropside body, ideal for construction, logistics, and general haulage. Inspected and ready for immediate delivery.",
    specs: {
      engine: "4HK1-TC 5193cc Turbo Diesel",
      transmission: "Manual 6-Speed",
      axles: "4x2",
      gvm: "8,500 kg",
      payload: "4,050 kg",
      fuelType: "Diesel",
      vin: "ADJDNR89H0E901234",
    },
  },
  {
    id: "2",
    slug: "2013-isuzu-ftr-850",
    title: "2013 Isuzu FTR 850",
    make: "Isuzu",
    model: "FTR 850",
    year: 2013,
    category: "Tipper",
    price: 429900,
    mileage: 352267,
    images: [
      "/images/trucks/isuzu-ftr-850-2013/01-front-angle.png",
      "/images/trucks/isuzu-ftr-850-2013/02-front.jpg",
      "/images/trucks/isuzu-ftr-850-2013/03-side-profile.jpg",
      "/images/trucks/isuzu-ftr-850-2013/04-rear-angle.jpg",
      "/images/trucks/isuzu-ftr-850-2013/05-rear.jpg",
      "/images/trucks/isuzu-ftr-850-2013/06-tipper-body.jpg",
      "/images/trucks/isuzu-ftr-850-2013/07-compliance-plate.png",
      "/images/trucks/isuzu-ftr-850-2013/08-interior-odometer.png",
      "/images/trucks/isuzu-ftr-850-2013/09-cab-interior.jpg",
    ],
    featured: true,
    status: "available",
    hideCategory: true,
    description:
      "2013 Isuzu FTR 850 tipper with white cab and grey tipper body. Hydraulic tipper unit in good working condition, ideal for construction, mining, and bulk material transport. Inspected and ready for immediate deployment.",
    specs: {
      engine: "6HK1-TCC 7790cc Turbo Diesel",
      transmission: "Manual 6-Speed",
      axles: "4x2",
      gvm: "16,000 kg",
      payload: "9,195 kg",
      fuelType: "Diesel",
      vin: "ADJFTT53H0E901235",
    },
  },
  {
    id: "3",
    slug: "2009-isuzu-fvr-900",
    title: "2009 Isuzu FVR 900",
    make: "Isuzu",
    model: "FVR 900",
    year: 2009,
    category: "Box Truck",
    price: 399900,
    mileage: 412558,
    images: [
      "/images/trucks/isuzu-fvr-900-2009/01-front-angle.png",
      "/images/trucks/isuzu-fvr-900-2009/02-front.png",
      "/images/trucks/isuzu-fvr-900-2009/03-side-profile.jpg",
      "/images/trucks/isuzu-fvr-900-2009/04-rear-angle.jpg",
      "/images/trucks/isuzu-fvr-900-2009/05-rear.jpg",
      "/images/trucks/isuzu-fvr-900-2009/06-box-body.jpg",
      "/images/trucks/isuzu-fvr-900-2009/07-compliance-plate.png",
      "/images/trucks/isuzu-fvr-900-2009/08-interior-odometer.png",
      "/images/trucks/isuzu-fvr-900-2009/09-cab-interior.png",
    ],
    featured: true,
    status: "available",
    hideCategory: true,
    description:
      "2009 Isuzu FVR 900 box truck with white cab and grey box body. Enclosed cargo box ideal for distribution, logistics, and general freight. Inspected and ready for immediate delivery.",
    specs: {
      engine: "6HK1-TCC 7790cc Turbo Diesel",
      transmission: "Manual 6-Speed",
      axles: "4x2",
      gvm: "16,000 kg",
      payload: "9,295 kg",
      fuelType: "Diesel",
      vin: "ADJFVZ63H0E901236",
    },
  },
  {
    id: "4",
    slug: "2018-fuso-fa9",
    title: "2018 Fuso FA 9",
    make: "Fuso",
    model: "FA 9",
    year: 2018,
    category: "Flatbed",
    price: 349900,
    mileage: 298441,
    images: [
      "/images/trucks/fuso-fa9-2018/01-front-angle.jpg",
      "/images/trucks/fuso-fa9-2018/02-front.jpg",
      "/images/trucks/fuso-fa9-2018/03-side-profile.jpg",
      "/images/trucks/fuso-fa9-2018/04-rear-angle.jpg",
      "/images/trucks/fuso-fa9-2018/05-rear.jpg",
      "/images/trucks/fuso-fa9-2018/06-flatbed.jpg",
      "/images/trucks/fuso-fa9-2018/07-compliance-plate.jpg",
      "/images/trucks/fuso-fa9-2018/08-interior-odometer.jpg",
      "/images/trucks/fuso-fa9-2018/09-cab-interior.jpg",
      "/images/trucks/fuso-fa9-2018/10-engine-bay.jpg",
      "/images/trucks/fuso-fa9-2018/11-chassis.jpg",
    ],
    featured: true,
    status: "available",
    description:
      "2018 Fuso FA 9 flatbed truck with white cab and grey load bed with wooden side boards. Compact and versatile, ideal for construction, agriculture, and local delivery. Inspected and ready for immediate use.",
    specs: {
      engine: "4P10 2999cc Turbo Diesel",
      transmission: "Manual 5-Speed",
      axles: "4x2",
      gvm: "7,500 kg",
      payload: "4,350 kg",
      fuelType: "Diesel",
      vin: "ADJFA9A8J0E901237",
    },
  },
  {
    id: "5",
    slug: "2014-isuzu-fvm-1200",
    title: "2014 Isuzu FVM 1200",
    make: "Isuzu",
    model: "FVM 1200",
    year: 2014,
    category: "Tipper",
    price: 429900,
    mileage: 684937,
    images: [
      "/images/trucks/isuzu-fvm-1200-2014/01-front-angle.png",
      "/images/trucks/isuzu-fvm-1200-2014/02-side-profile.png",
      "/images/trucks/isuzu-fvm-1200-2014/03-rear-angle.png",
      "/images/trucks/isuzu-fvm-1200-2014/04-cab-interior.png",
      "/images/trucks/isuzu-fvm-1200-2014/05-compliance-plate.png",
      "/images/trucks/isuzu-fvm-1200-2014/06-interior-odometer.png",
    ],
    featured: true,
    status: "available",
    hideCategory: true,
    description:
      "2014 Isuzu FVM 1200 tipper with white cab and grey tipper body with wooden side boards. Hydraulic tipper unit in good working condition, ideal for construction, mining, and bulk material transport. Inspected and ready for immediate deployment.",
    specs: {
      engine: "6HK1-TCC 7790cc Turbo Diesel",
      transmission: "Manual 6-Speed",
      axles: "4x2",
      gvm: "16,000 kg",
      payload: "9,000 kg",
      fuelType: "Diesel",
      vin: "ADJFVM12H0E901238",
    },
  },
];

export function getTruckBySlug(slug: string): Truck | undefined {
  return trucks.find((t) => t.slug === slug);
}

export function getTruckById(id: string): Truck | undefined {
  return trucks.find((t) => t.id === id);
}

export function getFeaturedTrucks(): Truck[] {
  return trucks.filter((t) => t.featured && t.status === "available");
}

export function getAllSlugs(): string[] {
  return trucks.map((t) => t.slug);
}

export function getPriceRange(): { min: number; max: number } {
  const prices = trucks.map((t) => t.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function getMileageRange(): { min: number; max: number } {
  const mileages = trucks.map((t) => t.mileage);
  return { min: Math.min(...mileages), max: Math.max(...mileages) };
}

export function filterTrucks(
  filters: Partial<{
    search: string;
    category: string;
    make: string;
    minPrice: number;
    maxPrice: number;
    maxMileage: number;
  }>
): Truck[] {
  return trucks.filter((truck) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        truck.title.toLowerCase().includes(q) ||
        truck.make.toLowerCase().includes(q) ||
        truck.model.toLowerCase().includes(q) ||
        truck.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.category && filters.category !== "all" && truck.category !== filters.category) {
      return false;
    }
    if (filters.make && filters.make !== "all" && truck.make !== filters.make) {
      return false;
    }
    if (filters.minPrice !== undefined && truck.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && truck.price > filters.maxPrice) return false;
    if (filters.maxMileage !== undefined && truck.mileage > filters.maxMileage) return false;
    return true;
  });
}

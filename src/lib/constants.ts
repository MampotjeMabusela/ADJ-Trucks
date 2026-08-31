export const COMPANY = {
  name: "ADJ TRUCKS",
  fullName: "Albert de Jongh Trucks",
  slogan: "Retail & Wholesale of Heavy-Duty Commercial Vehicles | Since 2007",
  subtext: "Retail & Wholesale of Trucks | Since 2007",
  since: 2007,
  contact: {
    person: "Klaas",
    mobile: "+27 79 669 7147",
    mobileRaw: "27796697147",
    landline: "+27 83 305 3399",
    landlineRaw: "27833053399",
    email: "albert@adjt.co.za",
  },
  address: {
    street: "Stand 3 & 4, Cnr Sefako Makgatho Dr (Zambesi Drive) & Avocet Rd",
    suburb: "Montana Park",
    city: "Pretoria",
    postal: "0182",
    country: "South Africa",
    full: "Stand 3 & 4, Cnr Sefako Makgatho Dr (Zambesi Drive) & Avocet Rd, Montana Park, Pretoria, 0182, South Africa",
    latitude: -25.6795268,
    longitude: 28.266203,
    mapEmbed:
      "https://www.google.com/maps?q=Albert+de+Jongh+Trucks,+Stand+3+%26+4,+Cnr+Sefako+Makgatho+Dr+and+Avocet+Rd,+Montana+Park,+Pretoria,+0182,+South+Africa&ll=-25.6795268,28.266203&z=17&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Albert+de+Jongh+Trucks,+Stand+3+%26+4,+Cnr+Sefako+Makgatho+Dr+and+Avocet+Rd,+Montana+Park,+Pretoria,+0182,+South+Africa",
  },
  whatsapp: {
    number: "27796697147",
    message: "Hello ADJ TRUCKS, I would like to enquire about your commercial vehicles.",
  },
  social: {
    whatsapp: "https://wa.me/27796697147",
  },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Showroom" },
  { href: "/about", label: "About Us" },
  { href: "/financing", label: "Financing" },
  { href: "/contact", label: "Contact" },
] as const;

export const TRUCK_CATEGORIES = [
  "Dropside",
  "Tipper",
  "Box Truck",
  "Horse",
  "Flatbed",
  "Crane Truck",
] as const;

export const TRUCK_MAKES = [
  "Hino",
  "Isuzu",
  "Fuso",
  "Mercedes-Benz",
  "UD",
  "Volvo",
  "MAN",
] as const;

export const TRUST_BADGES = [
  {
    title: "Certified Inspection",
    description: "Every vehicle undergoes rigorous multi-point inspection before listing.",
  },
  {
    title: "Transparent Valuation",
    description: "Fair market pricing with full disclosure on vehicle history and condition.",
  },
  {
    title: "Direct Retail & Wholesale",
    description: "Competitive pricing for individual buyers and fleet operators alike.",
  },
  {
    title: "Since 2007",
    description: "Nearly two decades of trusted commercial vehicle trading in South Africa.",
  },
] as const;

export const SITE_OG_IMAGE = "/images/og-image.png";

export const PAGE_BACKGROUNDS = {
  showroom: "/images/backgrounds/showroom.png",
  about: "/images/backgrounds/about.jpg",
  financing: "/images/backgrounds/financing.png",
  contact: "/images/backgrounds/contact.jpg",
} as const;

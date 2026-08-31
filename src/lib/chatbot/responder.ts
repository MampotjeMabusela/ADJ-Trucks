import {
  COMPANY,
  NAV_LINKS,
  TRUCK_CATEGORIES,
  TRUCK_MAKES,
  TRUST_BADGES,
} from "@/lib/constants";
import { formatMileage, formatPrice } from "@/lib/utils";
import {
  filterTrucks,
  getFeaturedTrucks,
  getMileageRange,
  getPriceRange,
  trucks,
} from "@/data/trucks";
import type { Truck } from "@/types/truck";

export interface ChatLink {
  label: string;
  href: string;
}

export interface ChatResponse {
  text: string;
  links?: ChatLink[];
}

export const CHATBOT_NAME = "ADJ";

export const QUICK_PROMPTS = [
  "What trucks do you have?",
  "Where are you located?",
  "What are your opening hours?",
  "Tell me about financing",
  "How do I contact you?",
] as const;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function scoreTerms(text: string, terms: string[], weight = 1): number {
  return terms.reduce((score, term) => (text.includes(term) ? score + weight : score), 0);
}

function findTruck(text: string): Truck | undefined {
  const bySlug = trucks.find((truck) => text.includes(truck.slug.replace(/-/g, " ")));
  if (bySlug) return bySlug;

  const byTitle = trucks.find((truck) => text.includes(normalize(truck.title)));
  if (byTitle) return byTitle;

  return trucks.find((truck) => {
    const tokens = [
      normalize(truck.title),
      normalize(`${truck.make} ${truck.model}`),
      normalize(truck.model),
    ];
    return tokens.some((token) => token.length > 2 && text.includes(token));
  });
}

function formatTruckSummary(truck: Truck): string {
  return `• ${truck.title} — ${formatPrice(truck.price)}, ${formatMileage(truck.mileage)} (${truck.category}, ${truck.status})`;
}

function truckDetailResponse(truck: Truck): ChatResponse {
  const specLines = Object.entries(truck.specs)
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase());
      return `${label}: ${value}`;
    })
    .join("\n");

  return {
    text: [
      `${truck.title} (Ref #${truck.id})`,
      `Price: ${formatPrice(truck.price)}`,
      `Mileage: ${formatMileage(truck.mileage)}`,
      `Category: ${truck.category}`,
      `Status: ${truck.status}`,
      "",
      truck.description,
      "",
      "Specifications:",
      specLines,
    ].join("\n"),
    links: [{ label: "View full listing", href: `/inventory/${truck.slug}` }],
  };
}

function inventoryResponse(text: string): ChatResponse {
  const make = TRUCK_MAKES.find((item) => text.includes(item.toLowerCase()));
  const category = TRUCK_CATEGORIES.find((item) =>
    text.includes(item.toLowerCase())
  );

  let maxPrice: number | undefined;
  const underMatch = text.match(/under\s+r?\s?([\d\s]+)/);
  if (underMatch) {
    maxPrice = Number(underMatch[1].replace(/\s/g, ""));
    if (maxPrice < 1000) maxPrice *= 1000;
  }

  const filtered = filterTrucks({
    make: make ?? undefined,
    category: category ?? undefined,
    maxPrice,
  }).filter((truck) => truck.status === "available");

  const list = filtered.length > 0 ? filtered : trucks.filter((t) => t.status === "available");
  const priceRange = getPriceRange();

  const intro =
    filtered.length > 0 && (make || category || maxPrice)
      ? `Here ${filtered.length === 1 ? "is" : "are"} ${filtered.length} matching vehicle${filtered.length === 1 ? "" : "s"}:`
      : `We currently have ${list.length} vehicles in stock (from ${formatPrice(priceRange.min)} to ${formatPrice(priceRange.max)}):`;

  return {
    text: [intro, ...list.map(formatTruckSummary)].join("\n"),
    links: [
      { label: "Browse Showroom", href: "/inventory" },
      ...list.slice(0, 3).map((truck) => ({
        label: truck.title,
        href: `/inventory/${truck.slug}`,
      })),
    ],
  };
}

function greetingResponse(): ChatResponse {
  return {
    text: `Hi, I'm ${CHATBOT_NAME} — your guide to ${COMPANY.name}. I can help you browse trucks, find contact details, opening hours, financing, company history, and how to get around the website. What would you like to know?`,
    links: QUICK_PROMPTS.slice(0, 3).map((prompt) => ({
      label: prompt,
      href: `#prompt:${encodeURIComponent(prompt)}`,
    })),
  };
}

function navigationResponse(): ChatResponse {
  const pages = NAV_LINKS.map((link) => `• ${link.label} — ${link.href}`).join("\n");
  return {
    text: `Here are the main pages on our website:\n\n${pages}\n\nUse the menu at the top to navigate, or tap a link below.`,
    links: NAV_LINKS.map((link) => ({ label: link.label, href: link.href })),
  };
}

function contactResponse(): ChatResponse {
  return {
    text: [
      "Contact ADJ TRUCKS:",
      `• ${COMPANY.contact.person}: ${COMPANY.contact.mobile}`,
      `• Office: ${COMPANY.contact.landline}`,
      `• Email: ${COMPANY.contact.email}`,
      `• WhatsApp: available for instant chat`,
      `• Instagram: @adjtrucks`,
      "",
      "You can also use the Contact page to send us a message.",
    ].join("\n"),
    links: [
      { label: "Contact page", href: "/contact" },
      { label: "WhatsApp", href: COMPANY.social.whatsapp },
      { label: "Instagram", href: COMPANY.social.instagram },
    ],
  };
}

function hoursResponse(): ChatResponse {
  return {
    text: [
      "Our showroom hours:",
      "• Monday – Friday: 08:00 – 17:00",
      "• Saturday: 08:00 – 13:00",
      "• Sunday: Closed",
    ].join("\n"),
    links: [{ label: "Visit us", href: "/contact" }],
  };
}

function locationResponse(): ChatResponse {
  return {
    text: [
      "Find us at:",
      COMPANY.address.full,
      "",
      "We're in Montana Park, Pretoria — Stand 3 & 4 on the corner of Sefako Makgatho Dr (Zambesi Drive) and Avocet Rd.",
    ].join("\n"),
    links: [
      { label: "Contact & map", href: "/contact" },
      { label: "Open in Google Maps", href: COMPANY.address.mapLink },
    ],
  };
}

function aboutResponse(): ChatResponse {
  return {
    text: [
      `${COMPANY.fullName} (${COMPANY.name}) is a used heavy-duty truck dealership in Pretoria, founded in ${COMPANY.since} by Albert de Jongh.`,
      "",
      "The De Jongh family legacy in transport dates back to 1948. ADJT buys and sells pre-owned commercial vehicles for retail and wholesale customers across South Africa.",
      "",
      "Key milestones:",
      "• 1948 — De Jongh bus service begins in Pretoria",
      "• 1976 — Andre de Jongh joins the family dealership",
      "• 2007 — Albert de Jongh establishes ADJT",
      "",
      COMPANY.slogan,
    ].join("\n"),
    links: [{ label: "Read full history", href: "/about" }],
  };
}

function financingResponse(): ChatResponse {
  return {
    text: [
      "ADJ TRUCKS offers:",
      "• Vehicle financing through leading South African finance houses",
      "• Trade-in valuations with fair market pricing",
      "• Fleet solutions for bulk purchases",
      "• Documentation support (transfer, roadworthy, licensing)",
      "",
      `Contact ${COMPANY.contact.person} for a personalised quote — no obligation.`,
    ].join("\n"),
    links: [
      { label: "Financing page", href: "/financing" },
      { label: "WhatsApp for finance", href: COMPANY.social.whatsapp },
    ],
  };
}

function sellTruckResponse(): ChatResponse {
  return {
    text: [
      "Yes — ADJ TRUCKS also buys used trucks.",
      "",
      "Email us with details and photos of your vehicle, or contact us via WhatsApp or phone for a valuation.",
      "",
      `Email: ${COMPANY.contact.email}`,
    ].join("\n"),
    links: [
      { label: "Contact us", href: "/contact" },
      { label: "Email ADJT", href: `mailto:${COMPANY.contact.email}` },
    ],
  };
}

function trustResponse(): ChatResponse {
  return {
    text: TRUST_BADGES.map((badge) => `• ${badge.title} — ${badge.description}`).join("\n"),
  };
}

function categoriesResponse(): ChatResponse {
  return {
    text: [
      "We list trucks in these categories:",
      ...TRUCK_CATEGORIES.map((category) => `• ${category}`),
      "",
      "Current makes in stock include:",
      ...Array.from(new Set(trucks.map((truck) => truck.make))).map((make) => `• ${make}`),
      "",
      "Supported makes we trade in include:",
      ...TRUCK_MAKES.map((make) => `• ${make}`),
    ].join("\n"),
    links: [{ label: "Browse Showroom", href: "/inventory" }],
  };
}

function cheapestResponse(): ChatResponse {
  const cheapest = [...trucks].sort((a, b) => a.price - b.price)[0];
  return truckDetailResponse(cheapest);
}

function featuredResponse(): ChatResponse {
  const featured = getFeaturedTrucks();
  return {
    text: [
      "Featured vehicles on our homepage:",
      ...featured.map(formatTruckSummary),
    ].join("\n"),
    links: featured.map((truck) => ({
      label: truck.title,
      href: `/inventory/${truck.slug}`,
    })),
  };
}

function fallbackResponse(): ChatResponse {
  const mileageRange = getMileageRange();
  return {
    text: [
      `I'm not fully sure about that, but I can help with:`,
      `• Browsing our ${trucks.length} trucks in stock`,
      `• Prices from ${formatPrice(getPriceRange().min)} to ${formatPrice(getPriceRange().max)}`,
      `• Mileage from ${formatMileage(mileageRange.min)} to ${formatMileage(mileageRange.max)}`,
      "• Contact details, hours, and directions",
      "• Financing, trade-ins, and company history",
      "",
      "Try asking something like “What Isuzu trucks do you have?” or “Where are you located?”",
      "",
      `For anything else, contact ${COMPANY.contact.person} on ${COMPANY.contact.mobile}.`,
    ].join("\n"),
    links: [
      { label: "Browse Showroom", href: "/inventory" },
      { label: "Contact us", href: "/contact" },
      { label: "WhatsApp", href: COMPANY.social.whatsapp },
    ],
  };
}

export function getChatbotResponse(input: string): ChatResponse {
  const text = normalize(input);
  if (!text) return greetingResponse();

  const specificTruck = findTruck(text);
  if (specificTruck && scoreTerms(text, ["price", "cost", "mileage", "km", "spec", "detail", "tell me about", "info", "information"]) > 0) {
    return truckDetailResponse(specificTruck);
  }
  if (specificTruck && text.split(" ").length <= 6) {
    return truckDetailResponse(specificTruck);
  }

  const intents: { score: number; respond: () => ChatResponse }[] = [
    {
      score: scoreTerms(text, ["hello", "hi", "hey", "good morning", "good afternoon", "who are you", "your name"], 2),
      respond: greetingResponse,
    },
    {
      score: scoreTerms(text, ["navigate", "navigation", "where is", "find page", "go to", "menu", "lost", "help me find", "pages", "sections"], 2),
      respond: navigationResponse,
    },
    {
      score: scoreTerms(text, ["hour", "hours", "open", "opening", "close", "closing", "sunday", "saturday", "weekend"], 2),
      respond: hoursResponse,
    },
    {
      score: scoreTerms(text, ["address", "location", "located", "where are you", "directions", "map", "find you", "visit", "showroom"], 2),
      respond: locationResponse,
    },
    {
      score: scoreTerms(text, ["contact", "phone", "call", "email", "whatsapp", "instagram", "reach", "number"], 2),
      respond: contactResponse,
    },
    {
      score: scoreTerms(text, ["finance", "financing", "loan", "payment", "installment"], 2),
      respond: financingResponse,
    },
    {
      score: scoreTerms(text, ["trade in", "trade-in", "tradein", "valuation"], 2),
      respond: financingResponse,
    },
    {
      score: scoreTerms(text, ["sell my truck", "sell truck", "buy my truck", "buy trucks from me", "we buy"], 3),
      respond: sellTruckResponse,
    },
    {
      score: scoreTerms(text, ["about", "history", "legacy", "family", "founded", "who is adj", "adjt", "albert de jongh"], 2),
      respond: aboutResponse,
    },
    {
      score: scoreTerms(text, ["inspect", "inspection", "trust", "quality", "certified", "why choose"], 2),
      respond: trustResponse,
    },
    {
      score: scoreTerms(text, ["category", "categories", "makes", "brands", "types of trucks"], 2),
      respond: categoriesResponse,
    },
    {
      score: scoreTerms(text, ["featured", "homepage"], 2),
      respond: featuredResponse,
    },
    {
      score: scoreTerms(text, ["cheapest", "lowest price", "affordable", "budget"], 2),
      respond: cheapestResponse,
    },
    {
      score: scoreTerms(text, ["stock", "inventory", "showroom", "truck", "trucks", "vehicle", "vehicles", "isuzu", "fuso", "hino", "mercedes", "price", "available"], 1),
      respond: () => inventoryResponse(text),
    },
  ];

  if (includesAny(text, ["thank", "thanks", "appreciate"])) {
    return {
      text: "You're welcome! If you need anything else about ADJ TRUCKS, just ask.",
    };
  }

  if (includesAny(text, ["bye", "goodbye", "see you"])) {
    return {
      text: `Goodbye! Visit us in Montana Park or WhatsApp ${COMPANY.contact.mobile} anytime.`,
      links: [{ label: "Contact us", href: "/contact" }],
    };
  }

  const best = intents.sort((a, b) => b.score - a.score)[0];
  if (best && best.score > 0) {
    return best.respond();
  }

  if (specificTruck) return truckDetailResponse(specificTruck);

  return fallbackResponse();
}

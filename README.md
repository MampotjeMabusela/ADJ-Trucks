# ADJ TRUCKS — Albert de Jongh Trucks

Premium commercial vehicle dealership web application built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router, React Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + Shadcn UI components
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel (100% free tier compatible)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy

```bash
npm run build
npm start
```

Deploy directly to Vercel:

```bash
npx vercel
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Home
│   ├── inventory/        # Showroom & detail pages
│   ├── about/            # About Us
│   ├── financing/        # Financing & Trade-In
│   └── contact/          # Contact & lead forms
├── components/           # React components
│   ├── ui/               # Shadcn UI primitives
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── TruckCard.tsx
│   ├── FilterBar.tsx
│   ├── Footer.tsx
│   └── WhatsAppButton.tsx
├── data/trucks.ts        # Static inventory data
├── lib/                  # Utilities & constants
└── types/                # TypeScript definitions
public/
└── images/
    ├── logo/             # Brand assets
    └── inventory/        # Vehicle images
```

## Features

- Dark luxury industrial theme with gold accents
- Full inventory with search, filter, grid/list views
- Dynamic detail pages with image gallery
- WhatsApp inquiry integration (no API keys needed)
- Contact forms via mailto: (no email service required)
- Google Maps embed
- SEO metadata & Schema.org structured data
- Security headers (CSP, X-Frame-Options, etc.)
- Fully responsive design

## Company Info

**Albert de Jongh Trucks (ADJ TRUCKS)**
- Since 2007
- Montana Park, Pretoria, South Africa
- albert@adjt.co.za | +27 79 669 7147

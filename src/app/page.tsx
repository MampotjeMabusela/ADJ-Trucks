import { Hero } from "@/components/Hero";
import { FeaturedInventory } from "@/components/FeaturedInventory";
import { TrustSection } from "@/components/TrustSection";
import { getFeaturedTrucks } from "@/data/trucks";

export default function HomePage() {
  const featuredTrucks = getFeaturedTrucks();

  return (
    <>
      <Hero />
      <FeaturedInventory trucks={featuredTrucks} />
      <TrustSection />
    </>
  );
}

import { cn } from "@/lib/utils";

interface PageHeroProps {
  image: string;
  children: React.ReactNode;
  className?: string;
}

export function PageHero({ image, children, className }: PageHeroProps) {
  return (
    <section
      className={cn("relative py-16 sm:py-20 overflow-hidden", className)}
    >
      <div className="absolute inset-0 bg-charcoal-deep">
        <div
          className="absolute inset-0 opacity-[0.46] bg-cover bg-center"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-deep/42 via-charcoal-deep/56 to-charcoal-deep" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}

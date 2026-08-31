import type { Metadata } from "next";
import Link from "next/link";
import {
  Banknote,
  RefreshCw,
  Calculator,
  FileCheck,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { COMPANY, PAGE_BACKGROUNDS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Financing & Trade-In",
  description:
    "Flexible financing options and competitive trade-in valuations for commercial vehicles. ADJ TRUCKS helps you get on the road faster.",
};

const services = [
  {
    icon: Banknote,
    title: "Vehicle Financing",
    description:
      "We work with leading South African finance houses to offer competitive rates on commercial vehicle loans. Flexible terms tailored to your business cash flow.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In Valuations",
    description:
      "Upgrade your fleet with our transparent trade-in programme. We offer fair market valuations on your existing trucks with quick turnaround.",
  },
  {
    icon: Calculator,
    title: "Fleet Solutions",
    description:
      "Bulk purchasing and fleet management solutions for operators requiring multiple units. Volume discounts and dedicated account management.",
  },
  {
    icon: FileCheck,
    title: "Documentation Support",
    description:
      "We assist with all transfer documentation, roadworthy certificates, and licensing requirements to ensure a seamless handover process.",
  },
];

export default function FinancingPage() {
  const whatsappUrl = buildWhatsAppUrl(
    COMPANY.whatsapp.number,
    "Hello ADJ TRUCKS, I'd like to discuss financing or trade-in options for a commercial vehicle."
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">
      <PageHero image={PAGE_BACKGROUNDS.financing}>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            Finance & Trade-In
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6 max-w-3xl">
            Smart Financing.{" "}
            <span className="text-gold">Fair Trade-Ins.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            We make acquiring your next commercial vehicle straightforward.
            Explore our financing partnerships and trade-in options designed for
            South African businesses.
          </p>
      </PageHero>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-8 rounded-xl border border-white/5 bg-metallic-gradient hover:border-white/20 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                  <service.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="rounded-2xl border border-white/20 bg-metallic-gradient p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Discuss Your Options?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Contact {COMPANY.contact.person} for a personalised financing quote
              or trade-in valuation. No obligation, no pressure — just expert
              advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`tel:${COMPANY.contact.mobileRaw}`}>
                  <Phone className="h-5 w-5" />
                  {COMPANY.contact.mobile}
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/inventory">Browse Inventory</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



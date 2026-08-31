import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { COMPANY, PAGE_BACKGROUNDS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${COMPANY.fullName} in Montana Park, Pretoria. Call ${COMPANY.contact.mobile} or email ${COMPANY.contact.email}. Visit our showroom today.`,
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(
    COMPANY.whatsapp.number,
    COMPANY.whatsapp.message
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20">
      <PageHero image={PAGE_BACKGROUNDS.contact}>
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            Contact <span className="text-gold">ADJ TRUCKS</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Have a question about a vehicle, need a trade-in valuation, or want
            to discuss financing? We&apos;re here to help.
          </p>
      </PageHero>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-xl border border-white/5 bg-metallic-gradient">
                <h3 className="font-bold text-gold mb-4">Contact Details</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href={`tel:${COMPANY.contact.mobileRaw}`}
                      className="flex items-start gap-3 text-sm hover:text-gold transition-colors"
                    >
                      <Phone className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{COMPANY.contact.person}</p>
                        <p className="text-muted-foreground">
                          {COMPANY.contact.mobile}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${COMPANY.contact.landlineRaw}`}
                      className="flex items-start gap-3 text-sm hover:text-gold transition-colors"
                    >
                      <Phone className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Office</p>
                        <p className="text-muted-foreground">
                          {COMPANY.contact.landline}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${COMPANY.contact.email}`}
                      className="flex items-start gap-3 text-sm hover:text-gold transition-colors"
                    >
                      <Mail className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">
                          {COMPANY.contact.email}
                        </p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm hover:text-gold transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-muted-foreground">
                          Chat with us instantly
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl border border-white/5 bg-metallic-gradient">
                <h3 className="font-bold text-gold mb-4">Visit Our Showroom</h3>
                <div className="flex items-start gap-3 text-sm mb-4">
                  <MapPin className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{COMPANY.address.full}</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="h-5 w-5 text-gold/60 shrink-0 mt-0.5" />
                  <div className="text-muted-foreground">
                    <p>Mon – Fri: 08:00 – 17:00</p>
                    <p>Saturday: 08:00 – 13:00</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-xl border border-white/5 bg-metallic-gradient">
                <h2 className="text-xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill in the form below and we&apos;ll get back to you promptly.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-8 sm:mt-12">
            <div className="rounded-xl overflow-hidden border border-white/5 aspect-[4/3] sm:aspect-[21/9] min-h-[250px] sm:min-h-[400px]">
              <iframe
                src={COMPANY.address.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ADJ TRUCKS Location - Montana Park, Pretoria"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground text-center sm:text-left">
              {COMPANY.address.full}
              {" · "}
              <a
                href={COMPANY.address.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Open in Google Maps
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}



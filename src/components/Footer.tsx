import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Separator } from "@/components/ui/separator";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    COMPANY.whatsapp.number,
    COMPANY.whatsapp.message
  );

  return (
    <footer className="bg-charcoal-deep border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="lg" className="mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {COMPANY.slogan}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${COMPANY.contact.mobileRaw}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold/60 shrink-0" />
                  {COMPANY.contact.person}: {COMPANY.contact.mobile}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.contact.landlineRaw}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold/60 shrink-0" />
                  Office: {COMPANY.contact.landline}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-gold/60 shrink-0" />
                  {COMPANY.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-gold/60 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  <Instagram className="h-4 w-4 text-gold/60 shrink-0" />
                  @adjtrucks
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Visit Us
            </h4>
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 text-gold/60 shrink-0 mt-0.5" />
              <p>{COMPANY.address.full}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-gold/60 shrink-0" />
              <div>
                <p>Mon – Fri: 08:00 – 17:00</p>
                <p>Sat: 08:00 – 13:00</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.fullName}. All rights
            reserved.
          </p>
          <p>
            Retail &amp; Wholesale of Heavy-Duty Commercial Vehicles | Since{" "}
            {COMPANY.since}
          </p>
        </div>

        <p className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-muted-foreground/80">
          Website developed by Mampotje Mabusela
        </p>
      </div>
    </footer>
  );
}



"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn, buildWhatsAppUrl } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const whatsappUrl = buildWhatsAppUrl(
    COMPANY.whatsapp.number,
    COMPANY.whatsapp.message
  );

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-charcoal-deep/80 backdrop-blur-xl border-b border-white/5 shadow-glass"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 sm:h-24 items-center justify-between gap-3">
          <Logo size="lg" className="min-w-0 shrink" />

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  pathname === link.href
                    ? "text-gold bg-gold/10"
                    : "text-foreground/70 hover:text-gold hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="whatsapp" size="sm" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={`tel:${COMPANY.contact.mobileRaw}`}>
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-3 -mr-2 text-foreground touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 bg-gold transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-gold transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 bg-gold transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-6 border-t border-white/5"
          >
            <div className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-md transition-colors",
                    pathname === link.href
                      ? "text-gold bg-gold/10"
                      : "text-foreground/70 hover:text-gold"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4 px-4">
                <Button variant="whatsapp" size="sm" className="flex-1" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <a href={`tel:${COMPANY.contact.mobileRaw}`}>
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}

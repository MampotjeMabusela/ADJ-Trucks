"use client";

import { motion } from "framer-motion";
import { Shield, Scale, Truck, Award } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const icons = [Shield, Scale, Truck, Award];

export function TrustSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-gold">
            Why ADJ TRUCKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Trusted Heritage.{" "}
            <span className="text-gold">Proven Excellence.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Since 2007, Albert de Jongh Trucks has been the preferred choice for
            fleet operators, contractors, and businesses across South Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-xl border border-white/5 bg-metallic-gradient hover:border-gold/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-base font-bold mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

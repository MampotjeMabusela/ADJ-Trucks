"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

export function WhatsAppButton() {
  const url = buildWhatsAppUrl(
    COMPANY.whatsapp.number,
    COMPANY.whatsapp.message
  );

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed safe-bottom safe-right z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 transition-shadow duration-300 touch-manipulation"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]" />
      </span>
    </motion.a>
  );
}

interface WhatsAppInquiryButtonProps {
  truckTitle: string;
  truckId?: string;
  variant?: "default" | "outline" | "whatsapp";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppInquiryButton({
  truckTitle,
  truckId,
  variant = "whatsapp",
  size = "default",
  className,
  children,
}: WhatsAppInquiryButtonProps) {
  const message = `Hello ADJ TRUCKS, I'm interested in the ${truckTitle}${truckId ? ` (Ref: ${truckId})` : ""}. Please send me more information.`;
  const url = buildWhatsAppUrl(COMPANY.whatsapp.number, message);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-11 px-6 bg-[#25D366] text-white hover:bg-[#20BD5A] shadow-lg hover:shadow-[#25D366]/30 transition-all duration-300"
      }
    >
      <MessageCircle className="h-4 w-4" />
      {children ?? "Inquire on WhatsApp"}
    </Link>
  );
}


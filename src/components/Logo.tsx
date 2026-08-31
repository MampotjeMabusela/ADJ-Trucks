"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showSubtext?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10",
  md: "h-12 sm:h-14 md:h-16 w-auto",
  lg: "h-14 sm:h-16 md:h-[72px] w-auto",
} as const;

export function Logo({ className, showSubtext = false, size = "md" }: LogoProps) {
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <Image
        src="/images/logo/adj-trucks-logo-header.png"
        alt="ADJ TRUCKS - Albert de Jongh Trucks"
        width={1024}
        height={576}
        unoptimized
        className={cn(
          "shrink-0 w-auto transition-transform duration-300 group-hover:scale-105",
          sizeClasses[size]
        )}
        priority
      />
      {showSubtext && (
        <div className="hidden lg:block">
          <p className="text-xs text-muted-foreground tracking-wide">
            Retail &amp; Wholesale of Trucks
          </p>
          <p className="text-[10px] text-gold/70">Since 2007</p>
        </div>
      )}
    </Link>
  );
}

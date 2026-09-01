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
  sm: "h-12 w-auto max-w-[220px]",
  md: "h-14 sm:h-16 md:h-[4.5rem] w-auto max-w-[280px] sm:max-w-[320px]",
  lg: "h-16 sm:h-[4.75rem] md:h-24 lg:h-28 w-auto max-w-[300px] sm:max-w-[360px] md:max-w-[420px]",
} as const;

const sizeDimensions = {
  sm: { width: 760, height: 543 },
  md: { width: 760, height: 543 },
  lg: { width: 1520, height: 1086 },
} as const;

export function Logo({ className, showSubtext = false, size = "md" }: LogoProps) {
  const { width, height } = sizeDimensions[size];

  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)}>
      <Image
        src="/images/logo/adj-trucks-logo-header.png"
        alt="ADJ TRUCKS - Albert de Jongh Trucks"
        width={width}
        height={height}
        quality={100}
        sizes="(max-width: 640px) 300px, (max-width: 1024px) 360px, 420px"
        className={cn(
          "shrink-0 object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]",
          "brightness-[1.02] contrast-[1.28] saturate-[1.35]",
          "drop-shadow-[0_2px_10px_rgba(245,166,35,0.45)]",
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

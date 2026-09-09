"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { copyTruckShareContent, getTruckShareUrl } from "@/lib/share";
import type { Truck } from "@/types/truck";

interface TruckCopyShareButtonProps {
  truck: Truck;
  variant?: "icon" | "compact" | "full";
  className?: string;
  onCopied?: () => void;
}

export function TruckCopyShareButton({
  truck,
  variant = "compact",
  className,
  onCopied,
}: TruckCopyShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(getTruckShareUrl(truck.slug));
  }, [truck.slug]);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const url = shareUrl || getTruckShareUrl(truck.slug);
    const didCopy = await copyTruckShareContent(truck, url);
    if (!didCopy) return;

    setCopied(true);
    onCopied?.();
    window.setTimeout(() => setCopied(false), 2500);
  };

  const label = copied ? "Copied!" : "Copy";

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-charcoal/50 text-foreground transition-colors hover:border-gold/50 hover:text-gold touch-manipulation",
          className
        )}
        aria-label={copied ? `${truck.title} listing copied` : `Copy ${truck.title} listing`}
        title={copied ? "Listing copied" : "Copy description, image link, and listing URL"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2.5 text-sm font-medium text-gold transition-colors hover:bg-gold/20",
          className
        )}
        aria-label={copied ? `${truck.title} listing copied` : `Copy ${truck.title} listing`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy listing"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex h-10 w-full min-w-0 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-transparent px-2 text-xs font-semibold text-foreground transition-colors hover:border-gold/50 hover:text-gold sm:text-sm",
        className
      )}
      aria-label={copied ? `${truck.title} listing copied` : `Copy ${truck.title} listing`}
    >
      {copied ? <Check className="h-3.5 w-3.5 shrink-0" /> : <Copy className="h-3.5 w-3.5 shrink-0" />}
      <span className="truncate">{label}</span>
    </button>
  );
}

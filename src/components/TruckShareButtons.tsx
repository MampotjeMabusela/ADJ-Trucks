"use client";

import { useEffect, useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { cn } from "@/lib/utils";
import { COMPANY } from "@/lib/constants";
import {
  copyTruckShareLink,
  getFacebookShareUrl,
  getTruckShareMessage,
  getTruckShareUrl,
} from "@/lib/share";
import type { Truck } from "@/types/truck";

interface TruckShareButtonsProps {
  truck: Truck;
  className?: string;
}

type CopiedPlatform = "instagram" | "tiktok" | null;

export function TruckShareButtons({ truck, className }: TruckShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState(() =>
    typeof window !== "undefined" ? getTruckShareUrl(truck.slug) : ""
  );
  const [copiedPlatform, setCopiedPlatform] = useState<CopiedPlatform>(null);

  useEffect(() => {
    setShareUrl(getTruckShareUrl(truck.slug));
  }, [truck.slug]);

  const shareMessage = shareUrl ? getTruckShareMessage(truck, shareUrl) : getTruckShareMessage(truck, getTruckShareUrl(truck.slug));

  const handleCopyShare = async (platform: Exclude<CopiedPlatform, null>) => {
    const copied = await copyTruckShareLink(shareMessage);
    if (!copied) return;

    setCopiedPlatform(platform);
    window.setTimeout(() => setCopiedPlatform(null), 2500);

    if (platform === "instagram") {
      window.open(COMPANY.social.instagram, "_blank", "noopener,noreferrer");
    }

    if (platform === "tiktok") {
      window.open("https://www.tiktok.com/", "_blank", "noopener,noreferrer");
    }
  };

  const handleFacebookShare = () => {
    const url = shareUrl || getTruckShareUrl(truck.slug);
    window.open(
      getFacebookShareUrl(url),
      "_blank",
      "noopener,noreferrer,width=600,height=600"
    );
  };

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Share this listing
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleFacebookShare}
          disabled={false}
          className="inline-flex items-center gap-2 rounded-lg border border-[#1877F2]/40 bg-[#1877F2]/10 px-4 py-2.5 text-sm font-medium text-[#6BA3FF] transition-colors hover:bg-[#1877F2]/20"
          aria-label={`Share ${truck.title} on Facebook`}
        >
          <Facebook className="h-4 w-4" />
          Facebook
        </button>

        <button
          type="button"
          onClick={() => handleCopyShare("instagram")}
          disabled={false}
          className="inline-flex items-center gap-2 rounded-lg border border-[#E4405F]/40 bg-[#E4405F]/10 px-4 py-2.5 text-sm font-medium text-[#FF8FAB] transition-colors hover:bg-[#E4405F]/20"
          aria-label={`Share ${truck.title} on Instagram`}
        >
          <Instagram className="h-4 w-4" />
          {copiedPlatform === "instagram" ? "Link copied!" : "Instagram"}
        </button>

        <button
          type="button"
          onClick={() => handleCopyShare("tiktok")}
          disabled={false}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          aria-label={`Share ${truck.title} on TikTok`}
        >
          <TikTokIcon />
          {copiedPlatform === "tiktok" ? "Link copied!" : "TikTok"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Instagram and TikTok copy the listing link so you can paste it in a post, story, or message.
      </p>
    </div>
  );
}

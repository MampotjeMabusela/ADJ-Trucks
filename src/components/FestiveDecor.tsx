"use client";

import { useMemo } from "react";
import { isFestiveDecorActive } from "@/lib/festive";

const FLAKE_COUNT = 48;
const FIREWORK_COUNT = 6;

function HollySprig({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 16c-4-2-6-6-4-10 3 1 5 3 6 6-1 2-2 3-2 4Z"
        fill="#1F5C3A"
      />
      <path
        d="M20 8c0-5 3-8 7-8-1 4-1 7 1 10-3 0-6-1-8-2Z"
        fill="#2A7A4B"
      />
      <path
        d="M32 16c4-2 6-6 4-10-3 1-5 3-6 6 1 2 2 3 2 4Z"
        fill="#1F5C3A"
      />
      <circle cx="18" cy="18" r="2.2" fill="#C41E3A" />
      <circle cx="22" cy="17" r="2.2" fill="#A01830" />
      <circle cx="20" cy="21" r="2" fill="#E03454" />
    </svg>
  );
}

function ChristmasTree({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" aria-hidden>
      <ellipse cx="60" cy="148" rx="28" ry="6" fill="rgba(0,0,0,0.35)" />
      <rect x="54" y="128" width="12" height="22" rx="2" fill="#5C3A21" />
      <path d="M60 18 L98 62 H22 Z" fill="#1B5E3B" />
      <path d="M60 38 L108 88 H12 Z" fill="#207448" />
      <path d="M60 62 L116 120 H4 Z" fill="#18633C" />
      <path d="M60 18 L88 54 H32 Z" fill="#2A8F55" opacity="0.55" />
      <circle cx="60" cy="16" r="5" fill="#F5A623" />
      <path
        d="M60 8 L62.2 14.2 L68.8 14.2 L63.4 18 L65.6 24.2 L60 20.2 L54.4 24.2 L56.6 18 L51.2 14.2 L57.8 14.2 Z"
        fill="#FFD700"
      />
      <circle cx="42" cy="70" r="3" fill="#F5A623" className="festive-bauble" />
      <circle cx="74" cy="78" r="2.5" fill="#E8E8E8" className="festive-bauble" />
      <circle cx="52" cy="98" r="3.2" fill="#C41E3A" className="festive-bauble" />
      <circle cx="82" cy="104" r="2.8" fill="#F5A623" className="festive-bauble" />
      <circle cx="36" cy="112" r="2.6" fill="#E8E8E8" className="festive-bauble" />
      <circle cx="68" cy="56" r="2.4" fill="#C41E3A" className="festive-bauble" />
      <path
        d="M28 86 Q60 76 92 90"
        stroke="#F5A623"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M22 108 Q60 96 98 112"
        stroke="#FFD Pan"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function Poinsettia({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {[0, 45, 90, 135].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="32"
          rx="7"
          ry="18"
          fill="#B91C1C"
          transform={`rotate(${deg} 32 32)`}
          opacity="0.92"
        />
      ))}
      {[22, 67, 112, 157].map((deg) => (
        <ellipse
          key={`g-${deg}`}
          cx="32"
          cy="32"
          rx="5"
          ry="14"
          fill="#1F5C3A"
          transform={`rotate(${deg} 32 32)`}
          opacity="0.85"
        />
      ))}
      <circle cx="32" cy="32" r="4.5" fill="#F5A623" />
      <circle cx="32" cy="32" r="2.2" fill="#FFD700" />
    </svg>
  );
}

/** Slim gold season banner that sits above the main nav. */
export function FestiveBanner() {
  if (!isFestiveDecorActive()) return null;

  return (
    <div
      className="relative overflow-hidden border-b border-gold/40 bg-gradient-to-r from-[#120e08] via-[#1c160c] to-[#120e08]"
      role="note"
      aria-label="Seasonal greeting"
    >
      <div
        className="festive-string-lights pointer-events-none absolute inset-x-0 top-0 h-2"
        aria-hidden
      />
      <div
        className="festive-string-lights festive-string-lights--delay pointer-events-none absolute inset-x-0 bottom-0 h-1.5 opacity-70"
        aria-hidden
      />
      <div className="container mx-auto flex items-center justify-center gap-2 px-3 py-2.5 text-center sm:gap-4">
        <HollySprig className="hidden h-6 w-9 shrink-0 sm:block" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold drop-shadow-[0_0_12px_rgba(245,166,35,0.45)] sm:text-xs md:tracking-[0.22em]">
          Merry Christmas &amp; Happy New Year from ADJ TRUCKS
        </p>
        <HollySprig className="hidden h-6 w-9 shrink-0 scale-x-[-1] sm:block" />
      </div>
    </div>
  );
}

/** Full festive scene: white snow, trees, florals, fireworks. */
export function FestiveSnow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKE_COUNT }, (_, index) => ({
        id: index,
        left: `${(index * 21 + 7) % 100}%`,
        size: 3 + (index % 5),
        delay: `${(index % 14) * 0.35}s`,
        duration: `${7 + (index % 8)}s`,
        opacity: 0.45 + (index % 6) * 0.09,
        drift: index % 2 === 0 ? 18 : -14,
        blur: index % 4 === 0,
      })),
    []
  );

  const fireworks = useMemo(
    () =>
      Array.from({ length: FIREWORK_COUNT }, (_, index) => ({
        id: index,
        left: `${12 + ((index * 17) % 76)}%`,
        top: `${8 + (index % 3) * 14}%`,
        delay: `${index * 1.7}s`,
        hue: index % 3 === 0 ? "gold" : index % 3 === 1 ? "white" : "rose",
      })),
    []
  );

  if (!isFestiveDecorActive()) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden" aria-hidden>
      {/* Soft festive glow wash */}
      <div className="festive-glow absolute inset-x-0 top-0 h-40" />

      {/* White snowfall */}
      <div className="festive-snow absolute inset-0">
        {flakes.map((flake) => (
          <span
            key={flake.id}
            className={`festive-flake absolute top-[-16px] rounded-full bg-white ${
              flake.blur ? "festive-flake--soft" : ""
            }`}
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              ["--festive-drift" as string]: `${flake.drift}px`,
              boxShadow: "0 0 6px rgba(255,255,255,0.85)",
            }}
          />
        ))}
      </div>

      {/* New Year fireworks */}
      <div className="festive-fireworks absolute inset-0">
        {fireworks.map((burst) => (
          <span
            key={burst.id}
            className={`festive-firework festive-firework--${burst.hue}`}
            style={{
              left: burst.left,
              top: burst.top,
              animationDelay: burst.delay,
            }}
          />
        ))}
      </div>

      {/* Corner Christmas trees + florals */}
      <div className="festive-corner festive-corner--left absolute bottom-0 left-0 hidden sm:block">
        <ChristmasTree className="h-[170px] w-[128px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:h-[210px] md:w-[158px]" />
        <Poinsettia className="festive-flower absolute bottom-8 left-[100px] h-12 w-12 md:left-[122px] md:h-14 md:w-14" />
        <Poinsettia className="festive-flower absolute bottom-2 left-[78px] h-9 w-9 opacity-90 md:left-[96px]" />
      </div>

      <div className="festive-corner festive-corner--right absolute bottom-0 right-0 hidden sm:block">
        <ChristmasTree className="h-[170px] w-[128px] scale-x-[-1] drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] md:h-[210px] md:w-[158px]" />
        <Poinsettia className="festive-flower absolute bottom-8 right-[100px] h-12 w-12 md:right-[122px] md:h-14 md:w-14" />
        <Poinsettia className="festive-flower absolute bottom-2 right-[78px] h-9 w-9 opacity-90 md:right-[96px]" />
      </div>

      {/* Mobile: smaller single accents */}
      <div className="absolute bottom-20 left-1 sm:hidden">
        <ChristmasTree className="h-[96px] w-[72px] opacity-90" />
      </div>
      <div className="absolute bottom-20 right-1 sm:hidden">
        <ChristmasTree className="h-[96px] w-[72px] scale-x-[-1] opacity-90" />
      </div>
    </div>
  );
}

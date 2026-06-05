"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type CountryFlagProps = {
  iso: string;
  className?: string;
  size?: "sm" | "md";
};

const sizeMap = {
  sm: { width: 20, height: 15, cdn: "w20" },
  md: { width: 28, height: 21, cdn: "w40" },
} as const;

/** Renders an actual country flag image (ISO 3166-1 alpha-2). */
export default function CountryFlag({ iso, className, size = "sm" }: CountryFlagProps) {
  const [failed, setFailed] = useState(false);
  const code = iso?.trim().toLowerCase();
  const dims = sizeMap[size];

  if (!code || code.length !== 2 || failed) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-sm bg-slate-100 border border-slate-200 shrink-0",
          className
        )}
        style={{ width: dims.width, height: dims.height }}
        aria-hidden
      >
        <Globe className="w-3 h-3 text-slate-400" />
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/${dims.cdn}/${code}.png`}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      width={dims.width}
      height={dims.height}
      alt=""
      role="presentation"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn(
        "inline-block object-cover rounded-sm border border-slate-200/90 shadow-sm shrink-0",
        className
      )}
      style={{ width: dims.width, height: dims.height }}
    />
  );
}

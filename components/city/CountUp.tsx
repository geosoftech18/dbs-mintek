"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Parsed = {
  animate: boolean;
  end: number;
  decimals: number;
  prefix: string;
  suffix: string;
  staticText: string;
};

export function parseCountValue(raw: string): Parsed {
  const value = raw.trim();
  const staticResult = (text: string): Parsed => ({
    animate: false,
    end: 0,
    decimals: 0,
    prefix: "",
    suffix: "",
    staticText: text,
  });

  if (!/\d/.test(value)) return staticResult(value);
  if (/^\d+\/\d+$/.test(value)) return staticResult(value);
  if (/^\d+:\d+$/.test(value)) return staticResult(value);

  const lt = value.match(/^<\s*(\d+(?:\.\d+)?)\s*(.*)$/);
  if (lt) {
    const num = parseFloat(lt[1]);
    return {
      animate: true,
      end: num,
      decimals: lt[1].includes(".") ? lt[1].split(".")[1].length : 0,
      prefix: "< ",
      suffix: lt[2],
      staticText: "",
    };
  }

  const times = value.match(/^(\d+(?:\.\d+)?)×$/);
  if (times) {
    const num = parseFloat(times[1]);
    return {
      animate: true,
      end: num,
      decimals: times[1].includes(".") ? times[1].split(".")[1].length : 0,
      prefix: "",
      suffix: "×",
      staticText: "",
    };
  }

  const plus = value.match(/^\+(\d+(?:\.\d+)?)(%?)(.*)?$/);
  if (plus) {
    const num = parseFloat(plus[1]);
    return {
      animate: true,
      end: num,
      decimals: plus[1].includes(".") ? plus[1].split(".")[1].length : 0,
      prefix: "+",
      suffix: `${plus[2] || ""}${plus[3] || ""}`,
      staticText: "",
    };
  }

  const pct = value.match(/^(\d+(?:\.\d+)?)(%)$/);
  if (pct) {
    const num = parseFloat(pct[1]);
    return {
      animate: true,
      end: num,
      decimals: pct[1].includes(".") ? pct[1].split(".")[1].length : 0,
      prefix: "",
      suffix: "%",
      staticText: "",
    };
  }

  const mk = value.match(/^(\d+(?:\.\d+)?)([MK])(\+?)$/i);
  if (mk) {
    const num = parseFloat(mk[1]);
    return {
      animate: true,
      end: num,
      decimals: mk[1].includes(".") ? mk[1].split(".")[1].length : 0,
      prefix: "",
      suffix: `${mk[2].toUpperCase()}${mk[3]}`,
      staticText: "",
    };
  }

  const withUnit = value.match(/^(\d+(?:\.\d+)?)\s+(.+)$/);
  if (withUnit) {
    const num = parseFloat(withUnit[1]);
    return {
      animate: true,
      end: num,
      decimals: withUnit[1].includes(".") ? withUnit[1].split(".")[1].length : 0,
      prefix: "",
      suffix: ` ${withUnit[2]}`,
      staticText: "",
    };
  }

  const compactUnit = value.match(/^(\d+(?:\.\d+)?)(h|s|min)$/i);
  if (compactUnit) {
    const num = parseFloat(compactUnit[1]);
    return {
      animate: true,
      end: num,
      decimals: compactUnit[1].includes(".") ? compactUnit[1].split(".")[1].length : 0,
      prefix: "",
      suffix: compactUnit[2],
      staticText: "",
    };
  }

  const plain = value.match(/^(\d+(?:\.\d+)?)(\+?)$/);
  if (plain) {
    const num = parseFloat(plain[1]);
    return {
      animate: true,
      end: num,
      decimals: plain[1].includes(".") ? plain[1].split(".")[1].length : 0,
      prefix: "",
      suffix: plain[2],
      staticText: "",
    };
  }

  return staticResult(value);
}

function formatNumber(n: number, decimals: number): string {
  if (decimals > 0) return n.toFixed(decimals);
  return Math.round(n).toLocaleString();
}

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

export default function CountUp({
  value,
  className,
  duration = 2000,
}: CountUpProps) {
  const parsed = parseCountValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(
    parsed.animate ? formatNumber(0, parsed.decimals) : parsed.staticText
  );
  const ran = useRef(false);

  useEffect(() => {
    const p = parseCountValue(value);
    if (!p.animate) {
      setDisplay(p.staticText);
      ran.current = false;
      return;
    }
    ran.current = false;
    setDisplay(formatNumber(0, p.decimals));
  }, [value]);

  useEffect(() => {
    if (!parsed.animate || !ref.current) return;

    const el = ref.current;
    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || ran.current) return;
        ran.current = true;

        const steps = 60;
        const inc = parsed.end / steps;
        let cur = 0;
        interval = setInterval(() => {
          cur += inc;
          if (cur >= parsed.end) {
            setDisplay(formatNumber(parsed.end, parsed.decimals));
            clearInterval(interval);
          } else {
            setDisplay(formatNumber(cur, parsed.decimals));
          }
        }, duration / steps);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [parsed.animate, parsed.end, parsed.decimals, duration, value]);

  if (!parsed.animate) {
    return <span className={className}>{parsed.staticText}</span>;
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}

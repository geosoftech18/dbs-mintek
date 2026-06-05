"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  countries,
  formatDialCode,
  getCountryByIso,
  DEFAULT_COUNTRY_ISO,
} from "@/lib/countries";
import { detectCountryFromEmail } from "@/lib/detect-country-from-email";
import CountryFlag from "@/components/city/CountryFlag";

type PhoneInputProps = {
  countryIso: string;
  onCountryChange: (iso: string) => void;
  value: string;
  onChange: (value: string) => void;
  email?: string;
  required?: boolean;
  className?: string;
  id?: string;
};

export default function PhoneInput({
  countryIso,
  onCountryChange,
  value,
  onChange,
  email = "",
  required,
  className,
  id = "phone",
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const userPickedCountryRef = useRef(false);
  const lastDetectedEmailRef = useRef("");

  const country = getCountryByIso(countryIso) ?? getCountryByIso(DEFAULT_COUNTRY_ISO)!;

  useEffect(() => {
    if (!email || userPickedCountryRef.current) return;

    const detected = detectCountryFromEmail(email);
    if (!detected || detected === countryIso) {
      lastDetectedEmailRef.current = email;
      return;
    }

    if (lastDetectedEmailRef.current === email) return;
    lastDetectedEmailRef.current = email;

    const match = getCountryByIso(detected);
    if (match) onCountryChange(match.iso);
  }, [email, countryIso, onCountryChange]);

  const handleCountrySelect = (iso: string) => {
    userPickedCountryRef.current = true;
    onCountryChange(iso);
    setOpen(false);
  };

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "");
    onChange(digits);
  };

  return (
    <div className={cn("flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50 transition-colors bg-white", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1.5 pl-3 pr-2 py-2.5 border-r border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors shrink-0 min-w-[6.5rem]"
            aria-label="Select country code"
          >
            <CountryFlag iso={country.iso} size="sm" />
            <span className="text-slate-800 text-sm font-medium tabular-nums">
              {formatDialCode(country.dial)}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[min(100vw-2rem,20rem)] p-0"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Search country or code..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map((c) => (
                  <CommandItem
                    key={c.iso}
                    value={`${c.name} ${c.iso} ${c.dial} +${c.dial}`}
                    onSelect={() => handleCountrySelect(c.iso)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CountryFlag iso={c.iso} size="md" className="shrink-0" />
                    <span className="flex-1 truncate text-sm">{c.name}</span>
                    <span className="text-slate-500 text-xs tabular-nums shrink-0">
                      {formatDialCode(c.dial)}
                    </span>
                    {countryIso === c.iso && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        required={required}
        placeholder="98765 43210"
        value={value}
        onChange={(e) => handlePhoneChange(e.target.value)}
        className="flex-1 min-w-0 border-0 bg-transparent px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-0"
      />
    </div>
  );
}

export function buildFullPhoneNumber(countryIso: string, nationalNumber: string): string {
  const country = getCountryByIso(countryIso);
  const digits = nationalNumber.replace(/\D/g, "");
  if (!country || !digits) return digits;
  return `${formatDialCode(country.dial)}${digits}`;
}

"use client";

import { useState } from "react";
import { PhoneCall, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneInput, { buildFullPhoneNumber } from "@/components/city/PhoneInput";
import { DEFAULT_COUNTRY_ISO } from "@/lib/countries";

type CallbackRequestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CallbackRequestDialog({
  open,
  onOpenChange,
}: CallbackRequestDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setPhoneCountryIso(DEFAULT_COUNTRY_ISO);
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setTimeout(resetForm, 200);
    }
    onOpenChange(next);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const fullPhone = buildFullPhoneNumber(phoneCountryIso, phone);

    try {
      const res = await fetch("/api/callback-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone: fullPhone }),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setSubmitError(result.error || "Failed to submit. Please try again.");
      }
    } catch {
      setSubmitError("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden border-slate-200 sm:rounded-2xl [&>button]:text-white/90 [&>button]:hover:text-white [&>button]:hover:bg-white/15 [&>button]:top-5 [&>button]:right-5">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 px-6 pt-6 pb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(255,255,255,0.15),transparent)]" />
          <DialogHeader className="relative space-y-2 text-left">
            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-1">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <DialogTitle className="text-white text-xl font-extrabold tracking-tight">
              Request a Callback
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-sm">
              Share your details and our team will call you back shortly.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 bg-white">
          {submitted ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-slate-900 font-bold text-lg mb-1">Callback Scheduled</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Thanks, {name.split(" ")[0] || "there"}! We&apos;ll reach you on your number within 2 business hours.
              </p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-6 text-blue-600 text-sm font-semibold hover:underline"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <p className="text-blue-700 text-xs font-medium">Typical response within 2 hours</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="callback-name" className="text-slate-700 text-xs font-semibold">
                  Full Name *
                </label>
                <input
                  id="callback-name"
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="callback-email" className="text-slate-700 text-xs font-semibold">
                  Work Email *
                </label>
                <input
                  id="callback-email"
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="callback-phone" className="text-slate-700 text-xs font-semibold">
                  Phone Number *
                </label>
                <PhoneInput
                  id="callback-phone"
                  required
                  email={email}
                  countryIso={phoneCountryIso}
                  onCountryChange={setPhoneCountryIso}
                  value={phone}
                  onChange={setPhone}
                />
              </div>

              {submitError ? (
                <p className="text-red-600 text-xs text-center">{submitError}</p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-200/80 hover:-translate-y-0.5 disabled:translate-y-0"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    Request Callback
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-slate-400 text-[10px] text-center leading-snug">
                We respect your privacy. Your number is used only to return your call.
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

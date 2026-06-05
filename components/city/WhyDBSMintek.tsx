"use client";

import { useEffect, useRef, useState } from "react";
import {
  Server,
  Clock,
  Globe2,
  Users,
  PhoneForwarded,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";
import CountUp from "@/components/city/CountUp";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const advantages = [
  {
    icon: Server,
    title: "Enterprise Infrastructure",
    description:
      "Tier-4 data centres, geo-redundant failover, and carrier-grade telephony — zero single point of failure, 99.99% uptime guaranteed.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Round-the-clock network operations with real-time alerting. Our NOC team resolves incidents before your customers notice anything.",
    color: "cyan",
  },
  {
    icon: Globe2,
    title: "Multi-language Support",
    description:
      "Fluent agents across Hindi, Marathi, Gujarati, English, Tamil, and 10+ regional languages — every customer feels at home.",
    color: "emerald",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description:
      "Brand-immersed agents work exclusively on your account — no shared pools, no diluted focus, just deep product expertise.",
    color: "amber",
  },
  {
    icon: PhoneForwarded,
    title: "Custom IVR Design",
    description:
      "Bespoke IVR trees built around your workflows. Dynamic routing, voice biometrics, and AI-assisted self-service deflection.",
    color: "sky",
  },
  {
    icon: BarChart3,
    title: "Real-time Reporting",
    description:
      "Live dashboards and scheduled reports on every KPI — AHT, FCR, CSAT, NPS — delivered to your inbox or BI platform.",
    color: "rose",
  },
  {
    icon: ShieldCheck,
    title: "Data Security",
    description:
      "ISO 27001 certified, GDPR-compliant, PCI-DSS ready. End-to-end encryption, role-based access, and quarterly security audits.",
    color: "violet",
  },
];

const counters = [
  { end: 500, suffix: "+", label: "Enterprise Clients" },
  { end: 99, suffix: ".9%", label: "Uptime SLA" },
  { end: 15, suffix: "+", label: "Languages Supported" },
  { end: 2, suffix: "M+", label: "Calls / Month" },
];

const colorMap: Record<string, { icon: string; iconBg: string; border: string; glow: string }> = {
  blue:    { icon: "text-blue-400",    iconBg: "bg-blue-500/15 border-blue-500/25",    border: "hover:border-blue-500/40",    glow: "group-hover:shadow-blue-500/10" },
  cyan:    { icon: "text-cyan-400",    iconBg: "bg-cyan-500/15 border-cyan-500/25",    border: "hover:border-cyan-500/40",    glow: "group-hover:shadow-cyan-500/10" },
  emerald: { icon: "text-emerald-400", iconBg: "bg-emerald-500/15 border-emerald-500/25", border: "hover:border-emerald-500/40", glow: "group-hover:shadow-emerald-500/10" },
  amber:   { icon: "text-amber-400",   iconBg: "bg-amber-500/15 border-amber-500/25",   border: "hover:border-amber-500/40",   glow: "group-hover:shadow-amber-500/10" },
  sky:     { icon: "text-sky-400",     iconBg: "bg-sky-500/15 border-sky-500/25",     border: "hover:border-sky-500/40",     glow: "group-hover:shadow-sky-500/10" },
  rose:    { icon: "text-rose-400",    iconBg: "bg-rose-500/15 border-rose-500/25",    border: "hover:border-rose-500/40",    glow: "group-hover:shadow-rose-500/10" },
  violet:  { icon: "text-blue-300",   iconBg: "bg-blue-400/15 border-blue-400/25",   border: "hover:border-blue-400/40",   glow: "group-hover:shadow-blue-400/10" },
};

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function WhyDBSMintek() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#040d1f] py-24 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231e3a5f%22 fill-opacity=%220.15%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-700 rounded-full opacity-8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-cyan-600 rounded-full opacity-7 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        {/* ── Split-screen header ─────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-500/25 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              Why DBS Mintek
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              The Infrastructure &amp;{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Expertise Behind Every Call
              </span>
            </h2>
            <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed">
              DBS Mintek is not just another BPO. We are a technology-first contact centre partner with enterprise-grade infrastructure, proven operational playbooks, and a relentless focus on measurable outcomes.
            </p>

            {/* Trust signals */}
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Operational since 2009 — 15+ years of BPO excellence",
                "Headquartered in Mumbai with 3 delivery centres",
                "ISO 27001, ISO 9001 & NASSCOM certified",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="group mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 text-sm">
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: stat counters glassmorphism panel */}
          <div className="relative">
            {/* Glassmorphism card */}
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Performance at a Glance</p>
                  <p className="text-slate-400 text-xs">Live operational metrics</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Counter grid */}
              <div className="grid grid-cols-2 gap-5 mb-8">
                {counters.map(({ end, suffix, label }) => (
                  <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center hover:bg-white/8 transition-colors duration-200">
                    <CountUp
                      value={`${end}${suffix}`}
                      className="block text-3xl font-extrabold text-white leading-none"
                    />
                    <p className="text-slate-400 text-xs mt-2">{label}</p>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              {[
                { label: "Customer Satisfaction", value: 98, color: "bg-blue-400" },
                { label: "SLA Adherence", value: 99, color: "bg-cyan-400" },
                { label: "Agent Utilisation", value: 87, color: "bg-emerald-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-slate-300 text-xs font-medium">{label}</span>
                    <CountUp value={`${value}%`} className="text-white text-xs font-bold" />
                  </div>
                  <div className="w-full bg-white/8 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${color} transition-all duration-1000 ease-out`}
                      style={{ width: inView ? `${value}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Zap className="w-3 h-3" />
                AI-Augmented
              </div>
            </div>
          </div>
        </div>

        {/* ── Advantage cards grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {advantages.slice(0, 4).map((adv) => {
            const Icon = adv.icon;
            const c = colorMap[adv.color];
            return (
              <div
                key={adv.title}
                className={`
                  group relative rounded-2xl border border-white/8 bg-white/4
                  backdrop-blur-sm p-5 hover:bg-white/7
                  ${c.border} hover:shadow-lg ${c.glow}
                  transition-all duration-300 cursor-default
                `}
              >
                <div className={`w-10 h-10 rounded-xl border ${c.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{adv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{adv.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.slice(4).map((adv) => {
            const Icon = adv.icon;
            const c = colorMap[adv.color];
            return (
              <div
                key={adv.title}
                className={`
                  group relative rounded-2xl border border-white/8 bg-white/4
                  backdrop-blur-sm p-5 hover:bg-white/7
                  ${c.border} hover:shadow-lg ${c.glow}
                  transition-all duration-300 cursor-default
                `}
              >
                <div className={`w-10 h-10 rounded-xl border ${c.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{adv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{adv.description}</p>
              </div>
            );
          })}
        </div>

        {/* ── Bottom certification strip ───────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border border-white/8 rounded-2xl bg-white/3 backdrop-blur-sm py-5 px-8">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Certifications &amp; Partnerships</p>
          {["ISO 27001", "ISO 9001", "PCI-DSS", "NASSCOM", "GDPR Compliant", "Aspect Certified"].map((cert) => (
            <div key={cert} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3 h-3 text-cyan-400" />
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

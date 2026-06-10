"use client";

import { useState } from "react";
import CountUp from "@/components/city/CountUp";
import {
  HeadphonesIcon,
  Wrench,
  AlertCircle,
  TrendingUp,
  Users,
  Plane,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: HeadphonesIcon,
    title: "Customer Support & Inquiry ",
    subtitle: "Omnichannel Support",
    description:
      " Never miss a customer connection. From answering general product inquiries to handling complex customer complaints, our trained inbound agents act as a seamless extension of your brand, driving first-contact resolution (FCR) and higher CSAT scores.",
    features: [
      "First Call Resolution (FCR) focus",
      "CRM-integrated agent desktops",
      "Real-time quality monitoring",
      "Post-call CSAT surveys",
    ],
    metric: "91%",
    metricLabel: "First Call Resolution Rate",
    accentColor: "blue",
  },
  {
    icon: Wrench,
    title: "Technical Support & Help Desk ",
    subtitle: "Tier 1 – Tier 3 Coverage",
    description:
      "Resolve technical roadblocks swiftly. Our specialized tech-support teams handle Tier 1 and Tier 2 troubleshooting, software navigation guidance, hardware issue ticketing, and product configuration support to keep your users happy and engaged",
    features: [
      "Multi-tier escalation workflows",
      "Remote diagnostics & screen share",
      "Ticketing system integration",
      "SLA-driven resolution targets",
    ],
    metric: "4.2 min",
    metricLabel: "Average Resolution Time",
    accentColor: "cyan",
  },
  {
    icon: AlertCircle,
    title: "Complaint Resolution",
    subtitle: "Dispute & Escalation Management",
    description:
      "Turn frustrated customers into loyal advocates. Our structured complaint-handling framework ensures every grievance is logged, tracked, escalated, and resolved within SLA.",
    features: [
      "Structured escalation matrix",
      "Regulatory compliance logging",
      "Root-cause analysis reporting",
      "Proactive closure communication",
    ],
    metric: "98%",
    metricLabel: "Complaints Resolved Within SLA",
    accentColor: "rose",
  },
  {
    icon: TrendingUp,
    title: "Lead Conversion",
    subtitle: "Inbound Sales Acceleration",
    description:
      "Every inbound inquiry is a revenue opportunity. Our conversion-trained agents qualify prospects, uncover intent, and guide callers through the funnel with persuasive, consultative selling.",
    features: [
      "Lead scoring & qualification",
      "Product demonstration support",
      "CRM pipeline updates in real time",
      "A/B tested call scripts",
    ],
    metric: "34%",
    metricLabel: "Average Conversion Uplift",
    accentColor: "emerald",
  },
  {
    icon: Users,
    title: "HR Help Desk",
    subtitle: "Employee Support Services",
    description:
      "Streamline internal HR queries — payroll, leave management, onboarding, and benefits — with a dedicated help desk that keeps your workforce informed and productive.",
    features: [
      "HRIS & payroll system integration",
      "Policy FAQ knowledge base",
      "Confidential query handling",
      "Multi-language employee support",
    ],
    metric: "2.1 min",
    metricLabel: "Avg Query Handle Time",
    accentColor: "amber",
  },
  {
    icon: Plane,
    title: "Travel Support",
    subtitle: "Booking & Itinerary Assistance",
    description:
      "Provide travelers with round-the-clock booking assistance, itinerary changes, cancellations, and emergency support — delivered with speed and accuracy when it matters most.",
    features: [
      "GDS & booking platform access",
      "24/7 emergency travel support",
      "Visa & documentation guidance",
      "Corporate travel policy adherence",
    ],
    metric: "24/7",
    metricLabel: "Global Travel Desk Coverage",
    accentColor: "sky",
  },
];

const colorMap: Record<string, {
  icon: string; iconBg: string; tag: string; tagText: string;
  metric: string; checkmark: string; hoverBorder: string;
  pill: string; pillText: string; arrowHover: string;
}> = {
  blue: {
    icon: "text-blue-600", iconBg: "bg-blue-50", tag: "bg-blue-50", tagText: "text-blue-600",
    metric: "text-blue-700", checkmark: "text-blue-500", hoverBorder: "hover:border-blue-200",
    pill: "bg-blue-600", pillText: "text-white", arrowHover: "group-hover:text-blue-600",
  },
  cyan: {
    icon: "text-cyan-600", iconBg: "bg-cyan-50", tag: "bg-cyan-50", tagText: "text-cyan-700",
    metric: "text-cyan-700", checkmark: "text-cyan-500", hoverBorder: "hover:border-cyan-200",
    pill: "bg-cyan-600", pillText: "text-white", arrowHover: "group-hover:text-cyan-600",
  },
  rose: {
    icon: "text-rose-600", iconBg: "bg-rose-50", tag: "bg-rose-50", tagText: "text-rose-600",
    metric: "text-rose-700", checkmark: "text-rose-500", hoverBorder: "hover:border-rose-200",
    pill: "bg-rose-600", pillText: "text-white", arrowHover: "group-hover:text-rose-600",
  },
  emerald: {
    icon: "text-emerald-600", iconBg: "bg-emerald-50", tag: "bg-emerald-50", tagText: "text-emerald-700",
    metric: "text-emerald-700", checkmark: "text-emerald-500", hoverBorder: "hover:border-emerald-200",
    pill: "bg-emerald-600", pillText: "text-white", arrowHover: "group-hover:text-emerald-600",
  },
  amber: {
    icon: "text-amber-600", iconBg: "bg-amber-50", tag: "bg-amber-50", tagText: "text-amber-700",
    metric: "text-amber-700", checkmark: "text-amber-500", hoverBorder: "hover:border-amber-200",
    pill: "bg-amber-600", pillText: "text-white", arrowHover: "group-hover:text-amber-600",
  },
  sky: {
    icon: "text-sky-600", iconBg: "bg-sky-50", tag: "bg-sky-50", tagText: "text-sky-700",
    metric: "text-sky-700", checkmark: "text-sky-500", hoverBorder: "hover:border-sky-200",
    pill: "bg-sky-600", pillText: "text-white", arrowHover: "group-hover:text-sky-600",
  },
};

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      {/* Subtle top gradient bleed from dark section */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 opacity-80" />

      {/* Faint background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.05),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Core Inbound Offerings
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl">
          Comprehensive Inbound Call Center Solutions{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Tailored to Your Business
            </span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            From customer care to technical helpdesks, our six flagship service lines are engineered for Mumbai's enterprise market — delivered by trained agents, powered by technology.
          </p>

          {/* Stats strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { value: "6", label: "Service Lines" },
              { value: "500+", label: "Enterprise Clients" },
              { value: "99.2%", label: "SLA Compliance" },
              { value: "15+", label: "Industries Served" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <CountUp value={value} className="block text-2xl md:text-3xl font-extrabold text-slate-900" />
                <p className="text-slate-400 text-xs md:text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            const c = colorMap[service.accentColor];
            const isHovered = hovered === index;

            return (
              <div
                key={service.title}
                className={`
                  group relative flex flex-col bg-white rounded-2xl border border-slate-100
                  shadow-sm hover:shadow-xl ${c.hoverBorder}
                  transition-all duration-300 ease-out cursor-default overflow-hidden
                  ${isHovered ? "-translate-y-1.5" : ""}
                `}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${c.pill} transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                      <Icon className={`w-6 h-6 ${c.icon}`} />
                    </div>
                    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.tag} ${c.tagText}`}>
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title + description */}
                  <h3 className="text-slate-900 font-bold text-lg leading-snug mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 ${c.checkmark} flex-shrink-0 mt-0.5`} />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div className="h-px w-full bg-slate-100 mb-4" />

                  {/* Bottom row: metric + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <CountUp
                        value={service.metric}
                        className={`block text-xl font-extrabold ${c.metric} leading-none`}
                      />
                      <p className="text-slate-400 text-[11px] mt-1 leading-snug">
                        {service.metricLabel}
                      </p>
                    </div>
                    <button className={`
                      flex items-center gap-1.5 text-sm font-semibold text-slate-400
                      ${c.arrowHover} transition-colors duration-200
                    `}>
                      Learn more
                      <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isHovered ? "translate-x-1" : ""}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-8">
            <div>
              <p className="text-white font-bold text-xl">Need a custom service package?</p>
              <p className="text-blue-100 text-sm mt-1">
                We design bespoke call center solutions for enterprises of all sizes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button className="group flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-200 text-sm shadow-lg hover:-translate-y-0.5">
                Schedule a Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm backdrop-blur-sm">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

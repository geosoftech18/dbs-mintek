"use client";

import { useState } from "react";
import {
  TrendingUp,
  Globe2,
  Clock,
  Target,
  RefreshCw,
  Layers,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import CountUp from "@/components/city/CountUp";

const challenges = [
  {
    icon: TrendingUp,
    tag: "Rising Expectations",
    title: "Customers Demand Instant, Flawless Support",
    description:
      "Mumbai's hyper-competitive market means customers switch brands after a single poor experience. Meeting the 90-second answer threshold is no longer optional — it's the baseline.",
    stat: "76%",
    statLabel: "of customers leave after one bad call",
    color: "blue",
    gradient: "from-blue-600/20 to-blue-900/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    statColor: "text-blue-400",
    tagBg: "bg-blue-500/10",
    tagText: "text-blue-300",
  },
  {
    icon: Globe2,
    tag: "Multilingual Support",
    title: "Serve Every Customer in Their Language",
    description:
      "Mumbai's diverse population speaks Hindi, Marathi, Gujarati, English, and more. Businesses that offer native-language support see dramatically higher satisfaction and loyalty.",
    stat: "3.2×",
    statLabel: "higher retention with native-language support",
    color: "cyan",
    gradient: "from-cyan-600/20 to-cyan-900/10",
    border: "border-cyan-500/20",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    statColor: "text-cyan-400",
    tagBg: "bg-cyan-500/10",
    tagText: "text-cyan-300",
  },
  {
    icon: Clock,
    tag: "24/7 Availability",
    title: "Round-the-Clock Coverage Without Overtime Costs",
    description:
      "B2B clients and global customers don't operate on Mumbai Standard Time. A missed call after hours is a missed contract. Continuous coverage is the new competitive advantage.",
    stat: "68%",
    statLabel: "of critical calls happen outside office hours",
    color: "amber",
    gradient: "from-amber-600/20 to-amber-900/10",
    border: "border-amber-500/20",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    statColor: "text-amber-400",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-300",
  },
  {
    icon: Target,
    tag: "Lead Management",
    title: "Convert Inbound Inquiries into Revenue",
    description:
      "Every inbound call is a sales opportunity. Without structured lead capture, qualification, and CRM integration, Mumbai businesses lose lakhs in potential revenue every month.",
    stat: "48%",
    statLabel: "of inbound leads go unqualified without a system",
    color: "emerald",
    gradient: "from-emerald-600/20 to-emerald-900/10",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    statColor: "text-emerald-400",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-300",
  },
  {
    icon: RefreshCw,
    tag: "Customer Retention",
    title: "Keep Customers Coming Back, Not Walking Away",
    description:
      "Acquiring a new customer costs 5× more than retaining one. Proactive inbound support, churn prediction, and personalized service are the retention levers Mumbai's top brands rely on.",
    stat: "5×",
    statLabel: "costlier to acquire than to retain a customer",
    color: "rose",
    gradient: "from-rose-600/20 to-rose-900/10",
    border: "border-rose-500/20",
    iconBg: "bg-rose-500/15",
    iconColor: "text-rose-400",
    statColor: "text-rose-400",
    tagBg: "bg-rose-500/10",
    tagText: "text-rose-300",
  },
  {
    icon: Layers,
    tag: "Scalability",
    title: "Scale From 10 to 1,000 Agents Without the Headache",
    description:
      "Seasonal peaks, product launches, and rapid growth demand elastic capacity. An outsourced inbound call center scales instantly without recruitment, training, or infrastructure delays.",
    stat: "60%",
    statLabel: "lower cost-per-contact vs. in-house at scale",
    color: "sky",
    gradient: "from-sky-600/20 to-sky-900/10",
    border: "border-sky-500/20",
    iconBg: "bg-sky-500/15",
    iconColor: "text-sky-400",
    statColor: "text-sky-400",
    tagBg: "bg-sky-500/10",
    tagText: "text-sky-300",
  },
];

export default function WhyMumbaiSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-[#040d1f] py-24 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231e3a5f%22 fill-opacity=%220.12%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-700 rounded-full opacity-6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-cyan-600 rounded-full opacity-5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-500/25 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
            Mumbai Business Challenges
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
            Why Mumbai Businesses Need{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              Inbound Call Center Services
            </span>
          </h2>
          <p className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
            In a city that never sleeps, your customer support shouldn't either. Here's why leading Mumbai enterprises outsource their inbound operations to specialists.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {challenges.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.tag}
                className={`
                  group relative rounded-2xl border bg-gradient-to-br ${item.gradient} ${item.border}
                  backdrop-blur-sm p-6 cursor-default
                  transition-all duration-300 ease-out
                  ${isHovered ? "shadow-xl -translate-y-1 border-opacity-60" : "shadow-md"}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Top row: icon + tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                    <Icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${item.tagBg} ${item.tagText}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base leading-snug mb-2.5 group-hover:text-white transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 group-hover:text-slate-300 transition-colors">
                  {item.description}
                </p>

                {/* Divider */}
                <div className={`h-px w-full bg-gradient-to-r ${item.border.replace("border-", "from-").replace("/20", "/30")} to-transparent mb-4 opacity-50`} />

                {/* Stat */}
                <div className="flex items-end justify-between">
                  <div>
                    <CountUp
                      value={item.stat}
                      className={`block text-2xl font-extrabold ${item.statColor} leading-none`}
                    />
                    <p className="text-slate-500 text-[11px] mt-1 leading-snug max-w-[160px]">
                      {item.statLabel}
                    </p>
                  </div>
                  <div className={`
                    w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center
                    transition-all duration-300
                    ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
                  `}>
                    <ChevronRight className={`w-4 h-4 ${item.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/4 border border-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
          <div>
            <p className="text-white font-bold text-lg">Ready to solve these challenges?</p>
            <p className="text-slate-400 text-sm mt-1">
              Talk to our Mumbai operations team and get a custom solution in 24 hours.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 text-sm hover:-translate-y-0.5">
              Get Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 bg-white/8 hover:bg-white/14 border border-white/15 hover:border-blue-400/40 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm backdrop-blur-sm">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

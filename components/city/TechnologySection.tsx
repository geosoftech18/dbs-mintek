"use client";

import { useState } from "react";
import {
  PhoneCall,
  Database,
  GitMerge,
  MessageSquare,
  Mail,
  PieChart,
  Mic,
  Cpu,
  ArrowRight,
  Activity,
  Layers,
  Zap,
  CheckCircle2,
  TrendingUp,
  Circle,
} from "lucide-react";
import CountUp from "@/components/city/CountUp";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const technologies = [
  {
    id: "ivr",
    icon: PhoneCall,
    label: "IVR Systems",
    category: "Voice Automation",
    color: "blue",
    description:
      "Multi-level IVR trees with DTMF and speech recognition. Handles millions of calls autonomously with dynamic routing and contextual prompts.",
    specs: ["Natural language processing", "Voice biometric auth", "Dynamic menu builder", "Multi-language prompts"],
    metric: "72%", metricLabel: "Call deflection rate",
  },
  {
    id: "crm",
    icon: Database,
    label: "CRM Integration",
    category: "Data & Sync",
    color: "cyan",
    description:
      "Bi-directional integration with Salesforce, HubSpot, Zoho, and custom CRMs. Every call, chat, and email auto-logged with full context.",
    specs: ["Real-time screen pop", "Auto ticket creation", "360° customer view", "Salesforce / Zoho certified"],
    metric: "< 1s", metricLabel: "Data sync latency",
  },
  {
    id: "acd",
    icon: GitMerge,
    label: "ACD Technology",
    category: "Smart Routing",
    color: "sky",
    description:
      "Skills-based routing, priority queuing, and overflow management ensure every caller reaches the right agent at the right time.",
    specs: ["Skills-based routing", "Priority queue management", "Overflow & fallback rules", "Predictive queue ETA"],
    metric: "18s", metricLabel: "Average wait time",
  },
  {
    id: "chat",
    icon: MessageSquare,
    label: "Live Chat",
    category: "Digital Channels",
    color: "emerald",
    description:
      "Concurrent chat handling with AI-suggested responses, co-browsing, and seamless escalation to voice. Integrated across web and mobile.",
    specs: ["Co-browsing & screen share", "AI response suggestions", "Bot-to-human handoff", "Mobile SDK included"],
    metric: "94%", metricLabel: "Chat CSAT score",
  },
  {
    id: "email",
    icon: Mail,
    label: "Email Support",
    category: "Async Channels",
    color: "amber",
    description:
      "AI-categorised email routing, template-assisted responses, and SLA tracking across inbound email queues — all in one unified inbox.",
    specs: ["AI intent classification", "Template response library", "SLA breach alerts", "Multi-brand inboxes"],
    metric: "4h", metricLabel: "Avg first response time",
  },
  {
    id: "analytics",
    icon: PieChart,
    label: "Analytics Dashboard",
    category: "Business Intelligence",
    color: "rose",
    description:
      "Live KPI dashboards with drill-down capability. Track AHT, FCR, CSAT, NPS, and agent utilisation across all channels in one pane.",
    specs: ["Custom KPI builder", "Scheduled PDF/XLS reports", "BI tool connectors", "Anomaly detection alerts"],
    metric: "180+", metricLabel: "Metrics tracked live",
  },
  {
    id: "recording",
    icon: Mic,
    label: "Call Recording",
    category: "Compliance & QA",
    color: "orange",
    description:
      "100% call recording with encrypted storage, keyword search, sentiment tagging, and automated QA scoring powered by speech analytics.",
    specs: ["100% call coverage", "AI sentiment tagging", "Keyword & topic search", "GDPR-compliant storage"],
    metric: "100%", metricLabel: "Recording coverage",
  },
  {
    id: "ai",
    icon: Cpu,
    label: "AI-powered Routing",
    category: "Intelligent Automation",
    color: "violet",
    description:
      "Machine-learning routing engine predicts customer intent, agent fit, and expected handle time — increasing FCR while reducing AHT.",
    specs: ["Intent prediction engine", "Agent-fit scoring", "AHT prediction model", "Continuous model retraining"],
    metric: "31%", metricLabel: "AHT reduction vs baseline",
  },
];

type TechColor = "blue" | "cyan" | "sky" | "emerald" | "amber" | "rose" | "orange" | "violet";

const colorMap: Record<TechColor, {
  iconBg: string; icon: string; border: string; activeBorder: string;
  tag: string; tagText: string; metric: string; glow: string; bar: string;
}> = {
  blue:    { iconBg: "bg-blue-500/20",    icon: "text-blue-400",    border: "border-blue-500/20",    activeBorder: "border-blue-400/60",    tag: "bg-blue-500/15",    tagText: "text-blue-300",    metric: "text-blue-400",    glow: "shadow-blue-500/20",    bar: "bg-blue-400" },
  cyan:    { iconBg: "bg-cyan-500/20",    icon: "text-cyan-400",    border: "border-cyan-500/20",    activeBorder: "border-cyan-400/60",    tag: "bg-cyan-500/15",    tagText: "text-cyan-300",    metric: "text-cyan-400",    glow: "shadow-cyan-500/20",    bar: "bg-cyan-400" },
  sky:     { iconBg: "bg-sky-500/20",     icon: "text-sky-400",     border: "border-sky-500/20",     activeBorder: "border-sky-400/60",     tag: "bg-sky-500/15",     tagText: "text-sky-300",     metric: "text-sky-400",     glow: "shadow-sky-500/20",     bar: "bg-sky-400" },
  emerald: { iconBg: "bg-emerald-500/20", icon: "text-emerald-400", border: "border-emerald-500/20", activeBorder: "border-emerald-400/60", tag: "bg-emerald-500/15", tagText: "text-emerald-300", metric: "text-emerald-400", glow: "shadow-emerald-500/20", bar: "bg-emerald-400" },
  amber:   { iconBg: "bg-amber-500/20",   icon: "text-amber-400",   border: "border-amber-500/20",   activeBorder: "border-amber-400/60",   tag: "bg-amber-500/15",   tagText: "text-amber-300",   metric: "text-amber-400",   glow: "shadow-amber-500/20",   bar: "bg-amber-400" },
  rose:    { iconBg: "bg-rose-500/20",    icon: "text-rose-400",    border: "border-rose-500/20",    activeBorder: "border-rose-400/60",    tag: "bg-rose-500/15",    tagText: "text-rose-300",    metric: "text-rose-400",    glow: "shadow-rose-500/20",    bar: "bg-rose-400" },
  orange:  { iconBg: "bg-orange-500/20",  icon: "text-orange-400",  border: "border-orange-500/20",  activeBorder: "border-orange-400/60",  tag: "bg-orange-500/15",  tagText: "text-orange-300",  metric: "text-orange-400",  glow: "shadow-orange-500/20",  bar: "bg-orange-400" },
  violet:  { iconBg: "bg-blue-400/20",    icon: "text-blue-300",    border: "border-blue-400/20",    activeBorder: "border-blue-300/60",    tag: "bg-blue-400/15",    tagText: "text-blue-200",    metric: "text-blue-300",    glow: "shadow-blue-400/20",    bar: "bg-blue-300" },
};

/* ─── Mini dashboard preview ────────────────────────────────────────────── */
function DashboardPreview({ tech }: { tech: typeof technologies[0] }) {
  const c = colorMap[tech.color as TechColor];
  const bars = [65, 82, 54, 91, 73, 88, 60, 95];

  return (
    <div className="relative w-full rounded-xl border border-white/10 bg-[#06122a] overflow-hidden">
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-white/8 bg-white/3 min-w-0">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-slate-400 text-[10px] font-mono ml-1 sm:ml-2 truncate min-w-0">{tech.label} · Live View</span>
        <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-[10px]">Online</span>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="p-3 sm:p-4">
        {/* Top metric row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { l: "Today", v: tech.metric },
            { l: "Trend", v: "+12%" },
            { l: "Status", v: "Nominal" },
          ].map(({ l, v }) => (
            <div key={l} className="bg-white/4 border border-white/8 rounded-lg p-2.5 text-center">
              <CountUp value={v} className={`block text-sm font-extrabold ${c.metric}`} />
              <p className="text-slate-500 text-[10px] mt-0.5">{l}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white/3 border border-white/6 rounded-lg p-3 mb-3">
          <div className="flex items-end justify-between gap-1 h-16">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`flex-1 ${c.bar} rounded-sm opacity-70 hover:opacity-100 transition-opacity`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {["M", "T", "W", "T", "F", "S", "S", "—"].map((d, i) => (
              <span key={i} className="flex-1 text-center text-slate-600 text-[9px]">{d}</span>
            ))}
          </div>
        </div>

        {/* Activity list */}
        <div className="space-y-1.5">
          {["Routing engine active", "SLA within threshold", "Data synced"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-400 text-[10px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function TechnologySection() {
  const [active, setActive] = useState(0);
  const activeTech = technologies[active];
  const c = colorMap[activeTech.color as TechColor];

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-x-clip">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 opacity-80" />

      {/* Faint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(59,130,246,0.06),transparent)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-16 min-w-0">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <Zap className="w-3 h-3" />
            Technology & Infrastructure
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-5xl">
            Enterprise-Grade Tech Stack{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Powering Every Interaction
            </span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            Eight purpose-built technology pillars working in concert — from the moment a customer dials in to the final resolution report.
          </p>
        </div>

        {/* ── Workflow connector strip ─────────────────────────────────────── */}
        <div className="mb-8 md:mb-12 w-full min-w-0">
          {/* Mobile & tablet: grid — no horizontal scroll */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              const tc = colorMap[tech.color as TechColor];
              const isActive = active === i;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`
                    flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-xl border transition-all duration-200 w-full min-w-0
                    ${isActive
                      ? `${tc.iconBg} ${tc.activeBorder} shadow-md ${tc.glow}`
                      : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? tc.iconBg : "bg-slate-50"}`}>
                    <Icon className={`${isActive ? tc.icon : "text-slate-400"}`} size={16} />
                  </div>
                  <span className={`text-[10px] font-semibold text-center leading-tight line-clamp-2 ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                    {tech.label}
                  </span>
                  {isActive && <span className={`w-1.5 h-1.5 rounded-full ${tc.bar}`} />}
                </button>
              );
            })}
          </div>

          {/* Desktop: full-width row — fits container without scroll */}
          <div className="hidden lg:flex w-full items-stretch">
            {technologies.map((tech, i) => {
              const Icon = tech.icon;
              const tc = colorMap[tech.color as TechColor];
              const isActive = active === i;
              return (
                <div key={tech.id} className="contents">
                  <div className="flex-1 min-w-0 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      className={`
                        flex flex-col items-center gap-1.5 w-full max-w-[9.5rem] px-1.5 xl:px-2 py-2.5 rounded-xl border transition-all duration-200
                        ${isActive
                          ? `${tc.iconBg} ${tc.activeBorder} shadow-lg ${tc.glow}`
                          : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                        }
                      `}
                    >
                      <div className={`w-8 h-8 xl:w-9 xl:h-9 rounded-lg flex items-center justify-center ${isActive ? tc.iconBg : "bg-slate-50"}`}>
                        <Icon className={`${isActive ? tc.icon : "text-slate-400"}`} size={17} />
                      </div>
                      <span className={`text-[9px] xl:text-[10px] font-semibold text-center leading-tight line-clamp-2 px-0.5 ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                        {tech.label}
                      </span>
                      {isActive && <span className={`w-1.5 h-1.5 rounded-full ${tc.bar}`} />}
                    </button>
                  </div>
                  {i < technologies.length - 1 && (
                    <div className="flex items-center flex-shrink-0 self-center px-0.5 xl:px-1" aria-hidden>
                      <div className="w-2 xl:w-3 h-px bg-slate-200" />
                      <Circle className="w-1.5 h-1.5 text-slate-200 fill-slate-100 flex-shrink-0" />
                      <div className="w-2 xl:w-3 h-px bg-slate-200" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Detail panel ─────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start mb-10 md:mb-16 min-w-0">
          {/* Left: details */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 sm:p-8 min-w-0">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                {(() => { const Icon = activeTech.icon; return <Icon className={`w-7 h-7 ${c.icon}`} />; })()}
              </div>
              <div>
                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.tag} ${c.tagText}`}>
                  {activeTech.category}
                </span>
                <h3 className="text-slate-900 font-extrabold text-xl mt-1.5">{activeTech.label}</h3>
              </div>
            </div>

            <p className="text-slate-500 text-base leading-relaxed mb-6">{activeTech.description}</p>

            {/* Feature specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {activeTech.specs.map((spec) => (
                <div key={spec} className="flex items-start gap-2.5 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <CheckCircle2 className={`w-4 h-4 ${c.icon} flex-shrink-0 mt-0.5`} />
                  <span className="text-slate-700 text-xs font-medium leading-snug">{spec}</span>
                </div>
              ))}
            </div>

            {/* KPI metric highlight */}
            <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border ${c.border} bg-gradient-to-r from-slate-50 to-white p-4`}>
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <TrendingUp className={`w-5 h-5 ${c.icon}`} />
                </div>
                <div className="min-w-0">
                  <CountUp value={activeTech.metric} className={`block text-2xl font-extrabold ${c.metric}`} />
                  <p className="text-slate-400 text-xs mt-0.5">{activeTech.metricLabel}</p>
                </div>
              </div>
              <div className="sm:ml-auto flex-shrink-0">
                <button className={`flex items-center gap-1.5 text-xs font-semibold ${c.metric} hover:opacity-80 transition-opacity`}>
                  View details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: live dashboard preview */}
          <div className="space-y-4 min-w-0">
            {/* System topology diagram */}
            <div className="bg-[#050e22] rounded-2xl border border-white/10 p-4 sm:p-6 shadow-xl min-w-0 overflow-hidden">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-slate-300 text-xs font-semibold">System Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-400 text-[10px] font-medium">All systems operational</span>
                </div>
              </div>

              {/* Connection flow — vertical on mobile, horizontal on md+ */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2 mb-5">
                {["Inbound", "IVR/ACD", "Routing AI", "Agent", "CRM"].map((node, i) => (
                  <div key={node} className="flex flex-col md:flex-row md:items-center md:flex-1 md:min-w-0 md:gap-2">
                    <div className="w-full md:flex-1 md:min-w-0">
                      <div className={`
                        w-full text-center px-2 py-2 rounded-lg text-[10px] sm:text-[11px] font-semibold
                        ${i === 2 ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-white/6 border border-white/10 text-slate-300"}
                      `}>
                        {node}
                      </div>
                    </div>
                    {i < 4 && (
                      <>
                        <div className="flex md:hidden items-center justify-center py-0.5" aria-hidden>
                          <ArrowRight className="w-3 h-3 text-blue-500/50 rotate-90" />
                        </div>
                        <div className="hidden md:flex items-center gap-px flex-shrink-0" aria-hidden>
                          <div className="w-2 lg:w-3 h-px bg-blue-500/40" />
                          <ArrowRight className="w-3 h-3 text-blue-500/50" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <DashboardPreview tech={activeTech} />
            </div>
          </div>
        </div>

        {/* ── Tech grid overview ────────────────────────────────────────────── */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            const tc = colorMap[tech.color as TechColor];
            const isActive = active === i;
            return (
              <button
                key={tech.id}
                onClick={() => setActive(i)}
                className={`
                  group flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200
                  ${isActive
                    ? `${tc.iconBg} ${tc.activeBorder} shadow-md ${tc.glow} -translate-y-0.5`
                    : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-sm"
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? tc.iconBg : "bg-slate-50 group-hover:bg-slate-100"} transition-colors`}>
                  <Icon className={`w-4 h-4 ${isActive ? tc.icon : "text-slate-400"}`} />
                </div>
                <span className={`text-[10px] font-semibold leading-tight ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                  {tech.label}
                </span>
              </button>
            );
          })}
        </div> */}

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <div className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl px-5 py-6 sm:px-8 sm:py-7 shadow-xl shadow-blue-900/20 text-center sm:text-left">
          <div className="min-w-0">
            <p className="text-white font-bold text-lg sm:text-xl">Want a live technology demo?</p>
            <p className="text-blue-100 text-sm mt-1">See the full stack in action with your data and use case.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
            <button className="group flex items-center justify-center gap-2 bg-white text-blue-700 font-semibold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-all duration-200 text-sm shadow hover:-translate-y-0.5 w-full sm:w-auto">
              Request a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm w-full sm:w-auto">
              Tech Spec Sheet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

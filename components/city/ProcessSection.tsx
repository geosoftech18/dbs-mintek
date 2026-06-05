"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  ClipboardList,
  Settings2,
  GraduationCap,
  Rocket,
  BarChart2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Users,
  Zap,
} from "lucide-react";
import CountUp from "@/components/city/CountUp";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Consultation",
    subtitle: "Discovery & Alignment",
    color: "blue",
    duration: "Day 1–2",
    description:
      "A dedicated solutions architect conducts a deep-dive session to understand your business goals, customer journey pain points, and service volume expectations.",
    deliverables: ["Needs assessment report", "Scope of work outline", "Dedicated account lead assigned"],
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Requirement Analysis",
    subtitle: "Blueprint & Architecture",
    color: "cyan",
    duration: "Day 3–7",
    description:
      "We map every customer touchpoint, define SLAs, design IVR call flows, and finalise integration requirements with your existing CRM and tech stack.",
    deliverables: ["IVR call flow design", "SLA & KPI agreement", "Tech integration plan"],
  },
  {
    number: "03",
    icon: Settings2,
    title: "Process Setup",
    subtitle: "Build & Configure",
    color: "sky",
    duration: "Day 8–18",
    description:
      "Infrastructure provisioning, telephony stack configuration, CRM connectors, knowledge base creation, and quality framework documentation — all completed before a single call is taken.",
    deliverables: ["Telephony & CRM configured", "Knowledge base live", "QA scorecard finalised"],
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Team Training",
    subtitle: "Enablement & Certification",
    color: "amber",
    duration: "Day 19–26",
    description:
      "Dedicated agents undergo brand immersion, product certification, objection-handling workshops, and mock-call assessments before being cleared for live operations.",
    deliverables: ["Product certification complete", "Mock-call QA passed", "Playbook distributed"],
  },
  {
    number: "05",
    icon: Rocket,
    title: "Go Live",
    subtitle: "Launch & Stabilise",
    color: "emerald",
    duration: "Day 27–30",
    description:
      "Controlled ramp-up with real-time NOC monitoring, daily review calls, and rapid feedback loops to ensure zero-defect launch and immediate performance stability.",
    deliverables: ["Controlled volume ramp", "Daily review cadence", "Incident response active"],
  },
  {
    number: "06",
    icon: BarChart2,
    title: "Performance Optimisation",
    subtitle: "Continuous Improvement",
    color: "rose",
    duration: "Day 31+",
    description:
      "Ongoing analytics, monthly business reviews, agent coaching based on AI-scored calls, and iterative process improvements to drive CSAT and FCR higher every quarter.",
    deliverables: ["Monthly business reviews", "AI-scored QA coaching", "Quarterly improvement roadmap"],
  },
];

type StepColor = "blue" | "cyan" | "sky" | "amber" | "emerald" | "rose";

const colorMap: Record<StepColor, {
  bg: string; iconBg: string; icon: string; border: string;
  activeBorder: string; tag: string; tagText: string; dot: string;
  connector: string; number: string; pillBg: string;
}> = {
  blue:    { bg: "bg-blue-50",    iconBg: "bg-blue-600",    icon: "text-white", border: "border-blue-100",    activeBorder: "border-blue-400",    tag: "bg-blue-100",    tagText: "text-blue-700",    dot: "bg-blue-600",    connector: "from-blue-300",  number: "text-blue-200",  pillBg: "bg-blue-600"    },
  cyan:    { bg: "bg-cyan-50",    iconBg: "bg-cyan-600",    icon: "text-white", border: "border-cyan-100",    activeBorder: "border-cyan-400",    tag: "bg-cyan-100",    tagText: "text-cyan-700",    dot: "bg-cyan-600",    connector: "from-cyan-300",  number: "text-cyan-200",  pillBg: "bg-cyan-600"    },
  sky:     { bg: "bg-sky-50",     iconBg: "bg-sky-600",     icon: "text-white", border: "border-sky-100",     activeBorder: "border-sky-400",     tag: "bg-sky-100",     tagText: "text-sky-700",     dot: "bg-sky-600",     connector: "from-sky-300",   number: "text-sky-200",   pillBg: "bg-sky-600"     },
  amber:   { bg: "bg-amber-50",   iconBg: "bg-amber-500",   icon: "text-white", border: "border-amber-100",   activeBorder: "border-amber-400",   tag: "bg-amber-100",   tagText: "text-amber-700",   dot: "bg-amber-500",   connector: "from-amber-300", number: "text-amber-200", pillBg: "bg-amber-500"   },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-600", icon: "text-white", border: "border-emerald-100", activeBorder: "border-emerald-400", tag: "bg-emerald-100", tagText: "text-emerald-700", dot: "bg-emerald-600", connector: "from-emerald-300", number: "text-emerald-200", pillBg: "bg-emerald-600" },
  rose:    { bg: "bg-rose-50",    iconBg: "bg-rose-600",    icon: "text-white", border: "border-rose-100",    activeBorder: "border-rose-400",    tag: "bg-rose-100",    tagText: "text-rose-700",    dot: "bg-rose-600",    connector: "from-rose-300",  number: "text-rose-200",  pillBg: "bg-rose-600"    },
};

const AUTO_SCROLL_DELAY_MS = 4500;
const MANUAL_PAUSE_MS = AUTO_SCROLL_DELAY_MS * 2;

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pauseUntilRef = useRef(0);
  const active = steps[activeStep];
  const c = colorMap[active.color as StepColor];
  const trackProgress =
    steps.length > 1 ? (activeStep / (steps.length - 1)) * 100 : 0;

  const selectStep = (index: number) => {
    pauseUntilRef.current = Date.now() + MANUAL_PAUSE_MS;
    setActiveStep(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, AUTO_SCROLL_DELAY_MS);

    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} className="bg-white py-24 overflow-hidden relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 opacity-70" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <Zap className="w-3 h-3" />
            Our Onboarding Process
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl">
            Live in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              30 Days.
            </span>{" "}
            Optimised for Life.
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            A battle-tested six-stage onboarding framework refined over 15 years — designed to get you operational fast without cutting corners on quality or compliance.
          </p>
        </div>

        {/* ── Horizontal timeline ─────────────────────────────────────────── */}
        <div className="relative mb-12">
          {/* Mobile: step grid without connector line */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const sc = colorMap[step.color as StepColor];
              const isActive = activeStep === i;
              const isDone = i < activeStep;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => selectStep(i)}
                  className="flex flex-col items-center gap-2 px-2 py-3 rounded-xl transition-all duration-200"
                >
                  <div
                    className={`
                      relative w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                      ${isActive
                        ? `${sc.iconBg} ${sc.activeBorder} shadow-lg scale-110`
                        : isDone
                          ? `${sc.iconBg} border-transparent`
                          : "bg-white border-slate-200"
                      }
                    `}
                  >
                    {isDone && !isActive ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-slate-400"}`} size={18} />
                    )}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-current flex items-center justify-center">
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                      {step.number}
                    </p>
                    <p className={`text-xs font-semibold leading-tight ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop: line from 1st → last step center, fill stops at active step */}
          <div className="hidden md:block relative">
            <div
              className="pointer-events-none absolute z-0 h-1.5 rounded-full bg-slate-100 overflow-hidden"
              style={{
                top: "calc(0.75rem + 2.5rem + 0.25rem)",
                left: `${(0.5 / steps.length) * 100}%`,
                width: `${((steps.length - 1) / steps.length) * 100}%`,
              }}
            >
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: inView ? `${trackProgress}%` : "0%" }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const sc = colorMap[step.color as StepColor];
                const isActive = activeStep === i;
                const isDone = i < activeStep;

                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => selectStep(i)}
                    className="flex flex-col items-center gap-2 px-2 pt-3 pb-3 rounded-xl transition-all duration-200"
                  >
                    <div
                      className={`
                        relative z-10 w-10  h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300
                        ${isActive
                          ? `${sc.iconBg} ${sc.activeBorder} shadow-lg scale-110`
                          : isDone
                            ? `${sc.iconBg} border-transparent`
                            : "bg-white border-slate-200"
                        }
                      `}
                    >
                      {isDone && !isActive ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <Icon className={`w-4.5 h-4.5 ${isActive ? "text-white" : "text-slate-400"}`} size={18} />
                      )}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white border-2 border-current flex items-center justify-center">
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        </span>
                      )}
                    </div>

                    <div className="text-center mt-2">
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-slate-900" : "text-slate-400"}`}>
                        {step.number} 
                      </p>
                      <p className={`text-xs font-semibold leading-tight ${isActive ? "text-slate-800" : "text-slate-500"}`}>
                        {step.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Active step detail ──────────────────────────────────────────── */}
        <div
          key={activeStep}
          className="grid lg:grid-cols-5 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ animationDuration: "250ms" }}
        >
          {/* Left: large step card */}
          <div className={`lg:col-span-2 rounded-2xl border ${c.border} ${c.bg} p-8 flex flex-col`}>
            {/* Step header */}
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center flex-shrink-0 shadow-md`}>
                {(() => { const Icon = active.icon; return <Icon className="w-7 h-7 text-white" />; })()}
              </div>
              <div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${c.tag} ${c.tagText} mb-1.5`}>
                  Step {active.number}
                </span>
                <h3 className="text-slate-900 font-extrabold text-2xl leading-tight">{active.title}</h3>
                <p className="text-slate-500 text-sm">{active.subtitle}</p>
              </div>
            </div>

            {/* Duration badge */}
            <div className="flex items-center gap-2 mb-5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className={`text-sm font-semibold ${c.tagText}`}>{active.duration}</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">{active.description}</p>

            {/* Navigation */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => selectStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Previous
              </button>
              <button
                onClick={() => selectStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl ${c.pillBg} text-white text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                Next <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Middle: deliverables */}
          <div className="lg:col-span-1 rounded-2xl border border-slate-100 bg-white p-6 flex flex-col shadow-sm">
            <h4 className="text-slate-800 font-bold text-sm mb-4 flex items-center gap-2">
              <CheckCircle2 className={`w-4 h-4 ${c.tagText}`} />
              Key Deliverables
            </h4>
            <div className="flex flex-col gap-3 flex-1">
              {active.deliverables.map((d, i) => (
                <div
                  key={d}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${c.border} ${c.bg}`}
                >
                  <div className={`w-5 h-5 rounded-full ${c.pillBg} flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-[9px] font-bold`}>
                    {i + 1}
                  </div>
                  <span className="text-slate-700 text-xs font-medium leading-snug">{d}</span>
                </div>
              ))}
            </div>

            <div className={`mt-5 rounded-xl border ${c.border} ${c.bg} p-3 text-center`}>
              <p className={`text-xs font-semibold ${c.tagText}`}>Milestone complete</p>
              <p className="text-slate-500 text-[10px] mt-0.5">Sign-off required before next stage</p>
            </div>
          </div>

          {/* Right: all steps mini-list */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
              <h4 className="text-slate-800 font-bold text-sm">Full Journey Overview</h4>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5" />
                <span>~30 days to go-live</span>
              </div>
            </div>
            <div className="divide-y divide-slate-50">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const sc = colorMap[step.color as StepColor];
                const isActive = activeStep === i;
                const isDone = i < activeStep;

                return (
                  <button
                    key={step.number}
                    onClick={() => selectStep(i)}
                    className={`w-full flex items-center gap-4 px-6 py-3.5 text-left transition-all duration-150 group ${isActive ? `${sc.bg}` : "hover:bg-slate-50"}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${isActive ? sc.iconBg : isDone ? sc.iconBg : "bg-slate-100 group-hover:bg-slate-200"}`}>
                      {isDone && !isActive
                        ? <CheckCircle2 className="w-4 h-4 text-white" />
                        : <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} size={14} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold ${isActive ? sc.tagText : "text-slate-400"}`}>{step.number}</span>
                        <span className={`text-sm font-semibold truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>{step.title}</span>
                      </div>
                      <p className="text-slate-400 text-[10px] truncate">{step.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${isDone ? sc.tag + " " + sc.tagText : "bg-slate-100 text-slate-400"}`}>
                        {isDone ? "Done" : step.duration}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? `${sc.tagText} translate-x-0.5` : "text-slate-300"}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom trust bar ─────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "30 days", label: "Average go-live time", icon: Rocket },
            { value: "100%", label: "Dedicated account support", icon: Users },
            { value: "Zero", label: "Defect launch guarantee", icon: CheckCircle2 },
            { value: "15+", label: "Years of onboarding expertise", icon: BarChart2 },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CountUp value={value} className="block text-slate-900 font-extrabold text-base leading-none" />
                <p className="text-slate-400 text-xs mt-1">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

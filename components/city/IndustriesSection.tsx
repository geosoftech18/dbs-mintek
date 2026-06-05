"use client";

import { useState } from "react";
import CountUp from "@/components/city/CountUp";
import {
  Landmark,
  Cpu,
  Radio,
  Building2,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Truck,
  ArrowUpRight,
  Users,
  PhoneCall,
  TrendingUp,
} from "lucide-react";

const industries = [
  {
    icon: Landmark,
    name: "BFSI",
    full: "Banking, Financial Services & Insurance",
    color: "blue",
    image: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Trusted by leading banks & insurers",
    description:
      "Handle account queries, loan applications, fraud alerts, and claims processing with compliant, secure inbound support built for regulated financial environments.",
    services: ["Account & balance enquiries", "Loan & EMI support", "Claims first notification", "Fraud alert response"],
    stat: { value: "60+", label: "BFSI clients" },
  },
  {
    icon: Cpu,
    name: "Fintech",
    full: "Financial Technology",
    color: "cyan",
    image: "https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Scaling with India's fastest-growing sector",
    description:
      "Support your digital-first customers across wallets, UPI, BNPL, and neo-banking products — high-velocity, API-integrated, and always-on.",
    services: ["Wallet & UPI transaction support", "KYC & onboarding help desk", "BNPL & credit query handling", "Escalation & chargeback desk"],
    stat: { value: "99.5%", label: "Uptime SLA" },
  },
  {
    icon: Radio,
    name: "Telecom",
    full: "Telecommunications",
    color: "sky",
    image: "https://images.pexels.com/photos/6457579/pexels-photo-6457579.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "High-volume, low-latency support at scale",
    description:
      "From prepaid recharges to enterprise SLA complaints, our agents handle millions of telecom interactions per month with speed and accuracy.",
    services: ["Plan upgrades & porting", "Network & billing complaints", "Enterprise leased line support", "Roaming & international queries"],
    stat: { value: "2M+", label: "Calls / month" },
  },
  {
    icon: Building2,
    name: "Real Estate",
    full: "Property & Real Estate",
    color: "amber",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Converting property enquiries into site visits",
    description:
      "Qualify inbound leads, schedule site visits, and manage post-sale queries for residential and commercial property developers across India.",
    services: ["Lead qualification & scoring", "Site visit scheduling", "Home loan query routing", "Post-possession helpdesk"],
    stat: { value: "34%", label: "Conversion uplift" },
  },
  {
    icon: Stethoscope,
    name: "Healthcare",
    full: "Healthcare & Pharma",
    color: "emerald",
    image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Compassionate support for critical journeys",
    description:
      "Appointment booking, insurance pre-authorisation, pharma helplines, and patient support — handled with empathy and HIPAA-aligned protocols.",
    services: ["Appointment scheduling", "Insurance pre-auth support", "Pharma product helplines", "Post-discharge follow-up"],
    stat: { value: "98%", label: "Patient CSAT" },
  },
  {
    icon: ShoppingCart,
    name: "E-commerce",
    full: "Retail & E-commerce",
    color: "rose",
    image: "https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Turning returns into repeat customers",
    description:
      "Order tracking, returns management, and seller support across peak sale events — scalable burst capacity when you need it most.",
    services: ["Order status & tracking", "Return & refund processing", "Seller & marketplace support", "Sale event burst staffing"],
    stat: { value: "< 45s", label: "Avg wait time" },
  },
  {
    icon: GraduationCap,
    name: "Education",
    full: "EdTech & Higher Education",
    color: "orange",
    image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Driving enrolments for leading institutions",
    description:
      "Counselling helplines, admission enquiries, fee payment support, and student services for universities, coaching centres, and EdTech platforms.",
    services: ["Admissions counselling", "Course & fee enquiries", "Student LMS helpdesk", "Scholarship query routing"],
    stat: { value: "28%", label: "Enrolment uplift" },
  },
  {
    icon: Truck,
    name: "Logistics",
    full: "Logistics & Supply Chain",
    color: "slate",
    image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800",
    tagline: "Keeping supply chains moving, 24/7",
    description:
      "Shipment tracking, delivery escalations, driver support, and B2B freight queries — handled across voice and digital channels around the clock.",
    services: ["Shipment tracking & ETA", "Delivery escalation desk", "Driver & fleet support line", "B2B freight query handling"],
    stat: { value: "24/7", label: "Operations coverage" },
  },
];

type IndustryColor = "blue" | "cyan" | "sky" | "amber" | "emerald" | "rose" | "orange" | "slate";

const colorMap: Record<IndustryColor, {
  pill: string; iconBg: string; icon: string;
  statColor: string; tagText: string;
}> = {
  blue:    { pill: "bg-blue-600",    iconBg: "bg-blue-50",    icon: "text-blue-600",    statColor: "text-blue-700",    tagText: "text-blue-600"    },
  cyan:    { pill: "bg-cyan-600",    iconBg: "bg-cyan-50",    icon: "text-cyan-600",    statColor: "text-cyan-700",    tagText: "text-cyan-700"    },
  sky:     { pill: "bg-sky-600",     iconBg: "bg-sky-50",     icon: "text-sky-600",     statColor: "text-sky-700",     tagText: "text-sky-700"     },
  amber:   { pill: "bg-amber-500",   iconBg: "bg-amber-50",   icon: "text-amber-600",   statColor: "text-amber-700",   tagText: "text-amber-700"   },
  emerald: { pill: "bg-emerald-600", iconBg: "bg-emerald-50", icon: "text-emerald-600", statColor: "text-emerald-700", tagText: "text-emerald-700" },
  rose:    { pill: "bg-rose-600",    iconBg: "bg-rose-50",    icon: "text-rose-600",    statColor: "text-rose-700",    tagText: "text-rose-600"    },
  orange:  { pill: "bg-orange-500",  iconBg: "bg-orange-50",  icon: "text-orange-600",  statColor: "text-orange-700",  tagText: "text-orange-700"  },
  slate:   { pill: "bg-slate-700",   iconBg: "bg-slate-100",  icon: "text-slate-600",   statColor: "text-slate-700",   tagText: "text-slate-600"   },
};

export default function IndustriesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(59,130,246,0.05),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 opacity-80" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            Industries We Serve
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl">
            Deep Domain Expertise{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Across 8 Verticals
            </span>
          </h2>
          <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
            Every industry has unique workflows, compliance requirements, and customer expectations. Our vertical-trained teams bring domain-specific knowledge to every call.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-8 md:gap-14">
            {[
              { Icon: Users, value: "500+", label: "Enterprise clients served" },
              { Icon: PhoneCall, value: "2M+", label: "Calls handled monthly" },
              { Icon: TrendingUp, value: "15+", label: "Years of domain expertise" },
            ].map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <CountUp value={value} className="block text-2xl font-extrabold text-slate-900 leading-none" />
                  <p className="text-slate-400 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const c = colorMap[industry.color as IndustryColor];
            const isHovered = hovered === index;

            return (
              <div
                key={industry.name}
                className={`
                  group relative flex flex-col bg-white rounded-2xl border overflow-hidden
                  transition-all duration-300 ease-out cursor-default
                  ${isHovered ? "border-slate-200 shadow-2xl -translate-y-2" : "border-slate-100 shadow-sm hover:shadow-lg"}
                `}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image banner */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-extrabold text-lg leading-none">{industry.name}</p>
                      <p className="text-white/70 text-[10px] mt-0.5 leading-snug">{industry.full}</p>
                    </div>
                    <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}>
                      <Icon className={`w-4.5 h-4.5 ${c.icon}`} size={18} />
                    </div>
                  </div>
                </div>

                {/* Card body — default: tagline + description; hover: tagline + services; stat always visible */}
                <div className="flex flex-col flex-1 min-h-[15.5rem] p-5">
                  <div className="relative flex-1 min-h-[8.5rem] mb-4">
                    {/* Default state */}
                    <div
                      className={`
                        flex flex-col h-full transition-all duration-300 ease-out
                        ${isHovered ? "opacity-0 pointer-events-none translate-y-1" : "opacity-100 translate-y-0"}
                      `}
                      aria-hidden={isHovered}
                    >
                      <p className={`text-xs font-semibold ${c.tagText} mb-2`}>{industry.tagline}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{industry.description}</p>
                    </div>

                    {/* Hover state */}
                    <div
                      className={`
                        absolute inset-0 flex flex-col transition-all duration-300 ease-out
                        ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-1"}
                      `}
                      aria-hidden={!isHovered}
                    >
                      <p className={`text-xs font-semibold ${c.tagText} mb-1`}>{industry.tagline}</p>
                      <p className="text-slate-900 text-[11px] font-bold mb-2.5">Key services</p>
                      <ul className="space-y-1.5">
                        {industry.services.map((service) => (
                          <li key={service} className="flex items-start gap-2">
                            <span className={`w-1 h-1 rounded-full ${c.pill} flex-shrink-0 mt-1.5`} />
                            <span className="text-slate-600 text-xs leading-snug">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stat footer — always visible */}
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CountUp
                          value={industry.stat.value}
                          className={`block text-base font-extrabold ${c.statColor} leading-none`}
                        />
                        <p className="text-slate-400 text-[10px] mt-0.5">{industry.stat.label}</p>
                      </div>
                      <div
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                          isHovered ? `${c.pill} border-transparent` : "bg-white border-slate-100"
                        }`}
                      >
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 transition-colors duration-200 ${isHovered ? "text-white" : "text-slate-400"}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`h-0.5 w-full ${c.pill} transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-100 rounded-2xl shadow-sm px-8 py-7">
          <div className="text-center md:text-left">
            <p className="text-slate-900 font-bold text-lg">Don't see your industry?</p>
            <p className="text-slate-500 text-sm mt-1">We've supported 25+ verticals. Tell us your use case and we'll tailor a solution.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-md shadow-blue-200 hover:-translate-y-0.5">
              Discuss Your Industry
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm hover:bg-slate-50">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

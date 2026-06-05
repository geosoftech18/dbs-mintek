"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  Award,
  Users,
  Headphones,
  Star,
  Send,
  Building2,
  Globe,
} from "lucide-react";
import PhoneInput, { buildFullPhoneNumber } from "@/components/city/PhoneInput";
import CountUp from "@/components/city/CountUp";
import { DEFAULT_COUNTRY_ISO } from "@/lib/countries";

const faqs = [
  {
    q: "How quickly can DBS Mintek get our call center operations live?",
    a: "Our proven six-stage onboarding framework gets most clients live within 30 days. For smaller deployments (under 20 seats), we can go live in as few as 14 days. Enterprise rollouts with complex CRM integrations are typically live within 45–60 days, with a controlled ramp-up to ensure zero-defect quality from day one.",
  },
  {
    q: "What industries does your team have direct experience in?",
    a: "We serve eight core verticals — BFSI, Fintech, Telecom, Real Estate, Healthcare, E-commerce, Education, and Logistics — and have supported clients across 25+ sub-sectors. Each vertical has dedicated team leads with domain certification and product training specific to your industry's compliance and workflow requirements.",
  },
  {
    q: "Do you offer 24/7 support coverage, including weekends and public holidays?",
    a: "Yes. All our inbound call center contracts include 24×7×365 coverage as standard. We operate with redundant staffing across three shifts, an in-house NOC for real-time monitoring, and automatic escalation protocols to ensure continuity even during peak surge periods and public holidays.",
  },
  {
    q: "How is quality monitored and what SLA commitments do you provide?",
    a: "Every call is recorded and scored by our AI-powered quality engine. Human QA analysts review a minimum of 10% of calls per agent per week, and monthly business reviews present full KPI dashboards to your team. Standard SLAs include ≥95% answer rate, ≤20s average speed of answer, and ≥90% CSAT — all contractually binding.",
  },
  {
    q: "Can you integrate with our existing CRM and ticketing systems?",
    a: "Absolutely. We hold native certified integrations with Salesforce, HubSpot, Zoho, Freshdesk, Zendesk, and ServiceNow. For proprietary platforms, our tech team builds custom API connectors. All integrations include bi-directional data sync, real-time screen pop for agents, and auto-ticket creation on every interaction.",
  },
  {
    q: "What is your pricing model — per seat, per call, or per minute?",
    a: "We offer flexible commercial structures: per-FTE monthly retainers for dedicated teams, per-minute billing for shared/overflow services, and hybrid models combining a committed seat base with burst capacity billed per interaction. We tailor the pricing to your volume profile during the initial consultation — there are no hidden per-call surcharges.",
  },
  {
    q: "Where are your operations based and is data stored securely?",
    a: "Our primary operations hub is in Mumbai, India, with a secondary DR site in Pune. All customer data is stored on ISO 27001-certified infrastructure in Indian data centres. We are fully compliant with DPDPA, GDPR, and PCI-DSS requirements. Data never leaves the agreed geographic boundary without explicit contractual consent.",
  },
  {
    q: "Do you support multilingual customer support?",
    a: "Yes. We currently support 12 Indian languages including Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and Gujarati, in addition to English. Multilingual routing is handled automatically by our IVR, and language-specific agent pools are available for all major Indian regional markets.",
  },
];

const trustBadges = [
  { Icon: Shield,    label: "ISO 9001 Certified"      },
  { Icon: Award,     label: "NASSCOM Member"            },
  { Icon: Globe,     label: "GDPR & DPDPA Compliant"   },
  { Icon: CheckCircle2, label: "PCI-DSS Ready"          },
];

const testimonials = [
  {
    quote:
      "Good place nice persons and very beautiful environment...Very hard to find a way to reach there... Not comfortable without burka... That's all",
    name: "Alvina Ansari",
    role: "Local Guide",
  },
  {
    quote:
      "Very experienced management and leadership team, though slightly away from station but company provides free pickup and drop from nearest railway station.",
    name: "Manju Jha",
    role: "",
  },
  {
    quote:
      "DBS Mintek 's biggest strength lies in its strong & deep tradition of 'Professionalism' & ` Respect for an Individual and Customers'.",
    name: "Imran",
    role: "",
  },
  {
    quote:
      "Very nice place easy ot travel and this place has no much restriction love this place",
    name: "Angelin Kurian",
    role: "",
  },
];

const TESTIMONIAL_AUTO_MS = 5000;
const TESTIMONIAL_MANUAL_PAUSE_MS = TESTIMONIAL_AUTO_MS * 2;

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: "", company: "", email: "", phone: "", industry: "", message: "",
  });
  const [phoneCountryIso, setPhoneCountryIso] = useState(DEFAULT_COUNTRY_ISO);
  const [phoneInputKey, setPhoneInputKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const testimonialPauseUntilRef = useRef(0);

  const goToTestimonial = (index: number) => {
    testimonialPauseUntilRef.current = Date.now() + TESTIMONIAL_MANUAL_PAUSE_MS;
    setActiveTestimonial(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < testimonialPauseUntilRef.current) return;
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_AUTO_MS);

    return () => clearInterval(interval);
  }, []);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  function resetForm() {
    setFormData({ name: "", company: "", email: "", phone: "", industry: "", message: "" });
    setPhoneCountryIso(DEFAULT_COUNTRY_ISO);
    setPhoneInputKey((k) => k + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const fullPhone = buildFullPhoneNumber(phoneCountryIso, formData.phone);

    try {
      const res = await fetch("/api/consultation-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: fullPhone }),
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
    <>
      {/* ── FAQ Section ──────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 opacity-80" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-2 rounded-full mb-5">
              <Headphones className="w-3 h-3" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-3xl">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Know Before You Start
              </span>
            </h2>
            <p className="mt-5 text-slate-500 text-base md:text-lg leading-relaxed max-w-2xl">
              Straight answers to the questions every procurement and operations leader asks before signing a BPO contract.
            </p>
          </div>

          {/* Two-column layout: FAQs + sidebar */}
          <div className="grid lg:grid-cols-3 gap-10 items-start">

            {/* Accordion */}
            <div className="lg:col-span-2 space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen ? "border-blue-200 shadow-md shadow-blue-50" : "border-slate-100 shadow-sm hover:border-slate-200 hover:shadow"}`}
                  >
                    <button
                      className="w-full flex items-start gap-4 px-6 py-5 text-left group"
                      onClick={() => toggle(i)}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${isOpen ? "bg-blue-600" : "bg-slate-100 group-hover:bg-slate-200"}`}>
                        <span className={`text-[10px] font-extrabold ${isOpen ? "text-white" : "text-slate-500"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className={`flex-1 text-sm font-semibold leading-snug transition-colors ${isOpen ? "text-blue-700" : "text-slate-800 group-hover:text-slate-900"}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-300 ${isOpen ? "rotate-180 text-blue-500" : "text-slate-400"}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="px-6 pb-5 pl-[4.25rem] text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                );
              })}

              <p className="text-slate-400 text-sm text-center pt-2">
                Still have questions?{" "}
                <a href="#contact" className="text-blue-600 font-semibold hover:underline">
                  Speak with a solutions expert
                </a>
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick contact card */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                <h3 className="text-slate-900 font-bold text-base mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  {[
                    { Icon: Phone, label: "+91 83800 55201", sub: "Mon–Sat, 9am–6pm IST" },
                    { Icon: Mail, label: "info@dbsmintek.com", sub: "Reply within 2 business hours" },
                    { Icon: MapPin, label: "Mumbai, Maharashtra", sub: "Mahape, Ghansoli & Turbhe" },
                    { Icon: Clock, label: "24×7 Operations", sub: "NOC monitoring always-on" },
                  ].map(({ Icon, label, sub }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-slate-800 text-sm font-semibold">{label}</p>
                        <p className="text-slate-400 text-xs">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
                <h3 className="text-slate-900 font-bold text-base mb-4">Certifications & Compliance</h3>
                <div className="grid grid-cols-2 gap-3">
                  {trustBadges.map(({ Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-slate-600 text-[10px] font-semibold leading-snug">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial carousel */}
              <div>
                <div className="relative overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                      width: `${testimonials.length * 100}%`,
                      transform: `translateX(-${(activeTestimonial / testimonials.length) * 100}%)`,
                    }}
                  >
                    {testimonials.map((item) => (
                      <div
                        key={item.name}
                        className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-cyan-500 p-6 text-white shadow-xl shadow-blue-200"
                        style={{ width: `${100 / testimonials.length}%` }}
                      >
                        <div className="flex gap-0.5 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-white text-white" />
                          ))}
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed italic mb-4 min-h-[4.5rem]">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-white text-xs font-bold">{item.name}</p>
                            <p className="text-white/70 text-[10px]">{item.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dot pagination */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goToTestimonial(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      aria-current={activeTestimonial === i ? "true" : undefined}
                      className={`
                        h-2 rounded-full transition-all duration-300
                        ${activeTestimonial === i
                          ? "w-6 bg-blue-600"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                        }
                      `}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA Section ─────────────────────────────────────────────── */}
      <section id="contact" className="bg-white py-24 relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(59,130,246,0.06),transparent)]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-16">

          {/* Pre-headline trust strip */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { Icon: Building2, stat: "500+", label: "Enterprise Clients" },
              { Icon: Headphones, stat: "2M+", label: "Calls / Month" },
              { Icon: Award, stat: "15+", label: "Years in BPO" },
              { Icon: Shield, stat: null, label: "ISO 9001 Certified" },
            ].map(({ Icon, stat, label }) => (
              <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-4 py-2">
                <Icon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-slate-600 text-xs font-semibold">
                  {stat ? (
                    <>
                      <CountUp value={stat} className="inline" /> {label}
                    </>
                  ) : (
                    label
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left: CTA copy */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight mb-6">
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Customer Experience?
                </span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8">
                Join 500+ enterprises who trust DBS Mintek to deliver consistent, compliant, and cost-efficient inbound call center services across India's most demanding industries.
              </p>

              {/* Value propositions */}
              <div className="space-y-4 mb-10">
                {[
                  { title: "Free 30-minute consultation",     desc: "A solutions architect maps your requirements at no cost or commitment." },
                  { title: "Go live in 30 days",              desc: "Our battle-tested onboarding process eliminates delays and quality risk." },
                  { title: "Flexible commercial terms",       desc: "Per-seat, per-minute, or hybrid — structured around your volume profile." },
                  { title: "Zero lock-in pilot option",       desc: "Start with a 90-day pilot before committing to a full-scale contract." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-800 text-sm font-semibold">{title}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-snug">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business image */}
              <div className="relative rounded-2xl overflow-hidden h-52 shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional team in a modern office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="text-white font-bold text-base">Mumbai Operations Centre</p>
                  <p className="text-white/70 text-xs mt-0.5">300+ seats · 24×7 · ISO certified</p>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100 p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-slate-900 font-extrabold text-xl mb-2">Request Received</h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                    Thank you. A solutions architect will reach out within 2 business hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); resetForm(); }}
                    className="mt-6 text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-slate-900 font-extrabold text-xl">Request a Free Consultation</h3>
                    <p className="text-slate-400 text-sm mt-1">No obligation · Response within 2 hours</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-semibold">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-semibold">Company *</label>
                        <input
                          type="text"
                          required
                          placeholder="Acme Corp"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-700 text-xs font-semibold">Work Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="rahul@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <label htmlFor="phone" className="text-slate-700 text-xs font-semibold">
                          Phone Number *
                        </label>
                        <PhoneInput
                          key={phoneInputKey}
                          id="phone"
                          required
                          email={formData.email}
                          countryIso={phoneCountryIso}
                          onCountryChange={setPhoneCountryIso}
                          value={formData.phone}
                          onChange={(phone) => setFormData({ ...formData, phone })}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-700 text-xs font-semibold">Industry</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors bg-white"
                      >
                        <option value="">Select your industry</option>
                        {["BFSI", "Fintech", "Telecom", "Real Estate", "Healthcare", "E-commerce", "Education", "Logistics", "Other"].map((v) => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-slate-700 text-xs font-semibold">Tell us about your requirements</label>
                      <textarea
                        rows={3}
                        placeholder="Monthly call volumes, current pain points, timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-colors resize-none"
                      />
                    </div>

                    {submitError ? (
                      <p className="text-red-600 text-xs text-center">{submitError}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-blue-200 hover:-translate-y-0.5 disabled:translate-y-0"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Request Free Consultation
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-slate-400 text-[10px] text-center leading-snug">
                      By submitting, you agree to our Privacy Policy. We never share your data with third parties.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

     
    </>
  );
}

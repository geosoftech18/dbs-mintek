"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  PhoneCall,
  Star,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Award,
  CheckCircle,
  HeadphonesIcon,
  BarChart2,
  Activity,
  ArrowRight,
  MessageSquare,
  Mic,
} from "lucide-react";
import CallbackRequestDialog from "@/components/city/CallbackRequestDialog";
import CountUp from "@/components/city/CountUp";

const trustBadges = [
  { icon: Shield, label: "ISO 27001 Certified" },
  { icon: Award, label: "Top BPO 2024" },
  { icon: CheckCircle, label: "NASSCOM Member" },
  { icon: Star, label: "4.9/5 Rated" },
];

const stats = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "98.5%", label: "CSAT Score" },
  { value: "2M+", label: "Calls Handled/Mo" },
  { value: "24/7", label: "Availability" },
];

const recentCalls = [
  { name: "Priya Sharma", time: "Just now", issue: "Account Support", status: "Resolved" },
  { name: "Rahul Mehta", time: "2m ago", issue: "Technical Query", status: "Active" },
  { name: "Anita Desai", time: "5m ago", issue: "Billing Issue", status: "Resolved" },
  { name: "Vikram Singh", time: "8m ago", issue: "Product Inquiry", status: "Resolved" },
];

export default function HeroSection() {
  const [activeCall, setActiveCall] = useState(0);
  const [callbackOpen, setCallbackOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCall((prev) => (prev + 1) % recentCalls.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#040d1f] pt-10">
      {/* Background grid + gradient orbs */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%231e3a5f%22 fill-opacity=%220.18%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-700 rounded-full opacity-10 blur-[120px]" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-cyan-500 rounded-full opacity-8 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-900 rounded-full opacity-20 blur-[100px]" />

      {/* Nav bar */}
      {/* <nav className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <HeadphonesIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">CallSphere<span className="text-cyan-400">.</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <a href="#" className="hover:text-white transition-colors">Services</a>
          <a href="#" className="hover:text-white transition-colors">Industries</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
        <a
          href="#"
          className="hidden md:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Phone className="w-4 h-4" />
          +91 83800 55201
        </a>
      </nav> */}

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-4 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-500/30 text-cyan-300 text-xs font-semibold px-4 py-2 rounded-full w-fit backdrop-blur-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            #1 Inbound Call Center in Mumbai
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
            Top-Rated
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                Inbound Call Center
              </span>
              <br />
              Services in Mumbai
            </h1>
            <p className="mt-5 text-slate-300 text-base md:text-lg leading-relaxed max-w-lg">
            Scale your customer support, boost retention, and deliver 24/7 exceptional experiences. Partner with Mumbai’s leading inbound BPO experts equipped with cutting-edge technology and premium talent.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/40 hover:shadow-blue-700/50 hover:-translate-y-0.5 text-sm"
            >
              Get Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="group flex items-center justify-center gap-2 bg-white/8 hover:bg-white/14 border border-white/20 hover:border-blue-400/50 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 backdrop-blur-sm text-sm"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              Request Callback
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-sm text-slate-300 text-xs font-medium px-3 py-2 rounded-lg hover:border-blue-400/30 hover:text-white transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                {label}
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <CountUp value={value} className="block text-2xl font-extrabold text-white" />
                <div className="text-xs text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — dashboard widgets */}
        <div className="relative flex flex-col gap-5 lg:pl-6">
          {/* Main dashboard card */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl shadow-black/40">
            {/* Dashboard header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">Live Call Dashboard</p>
                <p className="text-white font-bold text-base mt-0.5">Mumbai Operations</p>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            {/* Metric cards row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { icon: PhoneCall, label: "Active Calls", value: "247", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { icon: Clock, label: "Avg Handle Time", value: "3:42", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                { icon: TrendingUp, label: "FCR Rate", value: "91%", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
              ].map(({ icon: Icon, label, value, color, bg, border }) => (
                <div key={label} className={`${bg} border ${border} rounded-xl p-3 text-center`}>
                  <Icon className={`w-4 h-4 ${color} mx-auto mb-1.5`} />
                  <CountUp value={value} className="block text-white font-bold text-lg leading-none" />
                  <p className="text-slate-400 text-[10px] mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Analytics bar chart */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs font-medium">Call Volume — Last 7 Days</span>
                <span className="text-cyan-400 text-xs font-semibold">
                  +<CountUp value="18%" className="inline" /> WoW
                </span>
              </div>
              <div className="flex items-end gap-1.5 h-16">
                {[55, 72, 60, 85, 90, 78, 95].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md transition-all duration-700"
                      style={{
                        height: `${h}%`,
                        background: i === 6
                          ? "linear-gradient(to top, #0ea5e9, #38bdf8)"
                          : "rgba(56,189,248,0.25)",
                        borderTop: i === 6 ? "2px solid #38bdf8" : "none",
                      }}
                    />
                    <span className="text-[9px] text-slate-500">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent calls feed */}
            <div>
              <p className="text-slate-400 text-xs font-medium mb-2">Recent Calls</p>
              <div className="space-y-2">
                {recentCalls.map((call, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-500 ${
                      i === activeCall ? "bg-blue-500/15 border border-blue-500/25" : "bg-white/3 border border-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        i === activeCall ? "bg-blue-500 text-white" : "bg-white/10 text-slate-300"
                      }`}>
                        {call.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium leading-none">{call.name}</p>
                        <p className="text-slate-500 text-[10px] mt-0.5">{call.issue}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-slate-500 text-[10px]">{call.time}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        call.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-700/50 text-slate-400"
                      }`}>
                        {call.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating mini cards row */}
          <div className="grid grid-cols-2 gap-4">
            {/* CSAT widget */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-slate-300 text-xs font-medium">CSAT Score</span>
              </div>
              <CountUp value="98.5%" className="block text-white text-2xl font-extrabold" />
              <div className="mt-2 flex gap-0.5">
                {[100, 95, 98, 92, 99, 97, 100].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      height: "6px",
                      background: `rgba(251,191,36,${v / 100 * 0.8 + 0.2})`,
                    }}
                  />
                ))}
              </div>
              <p className="text-emerald-400 text-[10px] font-semibold mt-2">+2.1% vs last month</p>
            </div>

            {/* Agent status widget */}
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-slate-300 text-xs font-medium">Agent Status</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "On Call", count: 247, color: "bg-emerald-400", pct: "75%" },
                  { label: "Available", count: 58, color: "bg-blue-400", pct: "18%" },
                  { label: "On Break", count: 24, color: "bg-amber-400", pct: "7%" },
                ].map(({ label, count, color, pct }) => (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${color} flex-shrink-0`} />
                    <span className="text-slate-400 text-[10px] flex-1">{label}</span>
                    <CountUp value={String(count)} className="text-white text-[10px] font-semibold" />
                    <div className="w-12 bg-white/10 rounded-full h-1">
                      <div className={`h-1 rounded-full ${color}`} style={{ width: pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating notification card */}
          <div className="absolute -top-4 -right-4 hidden xl:flex items-center gap-3 bg-white/8 border border-white/15 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl animate-bounce-slow">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">AI Sentiment: Positive</p>
              <p className="text-slate-400 text-[10px]">Call #4821 — NPS Likely 9</p>
            </div>
          </div>

          {/* Floating bottom left card */}
          <div className="absolute -bottom-2 -left-6 hidden xl:flex items-center gap-3 bg-white/8 border border-emerald-500/20 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">SLA Compliance</p>
              <p className="text-emerald-400 text-[10px] font-bold">
                <CountUp value="99.2%" className="inline" /> — Excellent
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 1080 0 1440 40V80H0V40Z" fill="#040d1f" opacity="0.6" />
        </svg>
      </div>

      <CallbackRequestDialog open={callbackOpen} onOpenChange={setCallbackOpen} />
    </section>
  );
}

"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  ShieldCheck,
  Cpu,
  Activity,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Globe,
  Layers,
  Search,
  Lock,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DmpSelfPromotionShowcase() {
  return (
    <div className="space-y-8 py-2">
      {/* ── 1. HERO PITCH BANNER ────────────────────────────────────────────────── */}
      <Card className="dmp-hero-card border-[#10B981]/30 bg-gradient-to-br from-[#111111] via-[#0D1512] to-[#111111] shadow-2xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-[#10B981]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-96 rounded-full bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />

        <CardContent className="p-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-[#10B981]/40 bg-[#10B981]/10 text-[#10B981] font-mono text-xs gap-1.5 py-1 px-3">
                  <Zap className="size-3.5 fill-[#10B981]" />
                  Proprietary Data Management Platform
                </Badge>
                <Badge variant="outline" className="dmp-badge-version border-white/10 text-[#888888] font-mono text-xs">
                  AdsIdol Intelligence v3.4
                </Badge>
              </div>

              <h1 className="dmp-hero-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
                The Intelligence Layer That <span className="text-[#10B981] underline decoration-[#10B981]/40 underline-offset-8">Separates Us From Every Traditional Agency.</span>
              </h1>

              <p className="dmp-hero-p text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-sans pt-1">
                Traditional agencies buy media blindly through third-party DSPs and report vanity metrics. <strong className="dmp-hero-strong text-white">AdsIdol DMP</strong> operates directly on first-party device graphs, live telemetry, and raw conversion signals — giving you 100% transparent operational proof.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="dmp-stats-grid grid grid-cols-2 gap-0 shrink-0 bg-white/[0.03] border border-white/[0.08] rounded-2xl font-mono text-center overflow-hidden">
              {/* Audience Pool */}
              <div className="dmp-stats-divider-rb p-4 border-r border-b border-white/10 flex flex-col items-center gap-1">
                <span className="dmp-stats-label text-[10px] text-[#888888] uppercase block font-semibold tracking-wider">Audience Pool</span>
                <span className="text-2xl font-extrabold text-[#10B981]">85M+</span>
              </div>
              {/* IVT Traffic */}
              <div className="dmp-stats-divider-b p-4 border-b border-white/10 flex flex-col items-center gap-1">
                <span className="dmp-stats-label text-[10px] text-[#888888] uppercase block font-semibold tracking-wider">IVT Traffic</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold text-emerald-400">&lt;8%</span>
                </div>
              </div>
              {/* WW Traffic */}
              <div className="dmp-stats-divider-r p-4 border-r border-white/10 flex flex-col items-center gap-1">
                <span className="dmp-stats-label text-[10px] text-[#888888] uppercase block font-semibold tracking-wider">WW Traffic</span>
                <div className="flex items-center gap-1.5">
                  <Globe className="size-5 text-[#3B82F6] animate-spin" style={{ animationDuration: "6s" }} />
                  <span className="dmp-stats-globe-text text-2xl font-extrabold text-white">Global</span>
                </div>
              </div>
              {/* Conversion Rate */}
              <div className="p-4 flex flex-col items-center gap-1">
                <span className="dmp-stats-label text-[10px] text-[#888888] uppercase block font-semibold tracking-wider">Conversion Rate</span>
                <span className="text-2xl font-extrabold text-[#8B5CF6]">3–4%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. CORE DIFFERENTIATORS GRID (4 CARDS) ─────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="dmp-diff-section-heading text-base font-bold text-white font-sans tracking-tight">
            Why Enterprise Brands Partner With AdsIdol DMP
          </h2>
          <span className="dmp-diff-section-count text-xs font-mono text-[#888888]">4 Core Technology Pillars</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <Card className="dmp-diff-card bg-[#111111] border-white/[0.06] hover:border-[#10B981]/30 transition-all">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="size-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981] mb-2">
                <ShieldCheck className="size-5" />
              </div>
              <CardTitle className="dmp-diff-card-title text-sm font-bold text-white font-sans">
                100% Operational Transparency
              </CardTitle>
            </CardHeader>
            <CardContent className="dmp-diff-card-body px-5 pb-5 text-xs text-[#888888] leading-relaxed">
              We never swallow margins or hide behind CPC/CPM markups. Every metric represents raw campaign telemetry and verified postback events.
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="dmp-diff-card bg-[#111111] border-white/[0.06] hover:border-[#3B82F6]/30 transition-all">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="size-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] mb-2">
                <Cpu className="size-5" />
              </div>
              <CardTitle className="dmp-diff-card-title text-sm font-bold text-white font-sans">
                12.4M+ Direct MAID Vectors
              </CardTitle>
            </CardHeader>
            <CardContent className="dmp-diff-card-body px-5 pb-5 text-xs text-[#888888] leading-relaxed">
              Agencies rely on broad third-party interests. Our DMP maps raw Apple IDFA & Android GAID signals directly to high-converting seed profiles with 0.94 similarity.
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="dmp-diff-card bg-[#111111] border-white/[0.06] hover:border-[#8B5CF6]/30 transition-all">
            <CardHeader className="pb-2 pt-5 px-5">
              <div className="size-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-2">
                <Activity className="size-5" />
              </div>
              <CardTitle className="dmp-diff-card-title text-sm font-bold text-white font-sans">
                Postback-Verified Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="dmp-diff-card-body px-5 pb-5 text-xs text-[#888888] leading-relaxed">
              We track the complete journey beyond the click — from app launch and OTP verification to bank link and first transaction completion.
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="dmp-diff-card bg-[#111111] border-white/[0.06] hover:border-[#EC4899]/30 transition-all">
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="size-10 rounded-xl bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center text-[#EC4899] mb-2">
                <Sparkles className="size-5" />
              </div>
              <CardTitle className="dmp-diff-card-title text-sm font-bold text-white font-sans">
                Visual Hook Attribution
              </CardTitle>
            </CardHeader>
            <CardContent className="dmp-diff-card-body px-5 pb-5 text-xs text-[#888888] leading-relaxed">
              Our creative intelligence isolates individual design hooks (dynamic counters, 3s video retention) to rotate variants before ad fatigue hits.
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 3. COMPARISON TABLE: AGENCY VS. ADSIDOLE DMP ─────────────────────── */}
      <Card className="dmp-compare-card bg-[#111111] border-white/[0.06]">
        <CardHeader className="dmp-compare-header-border pb-4 pt-5 px-6 border-b border-white/[0.05]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="dmp-compare-title text-base font-bold text-white tracking-tight">
                Traditional Agency vs. AdsIdol Intelligence DMP
              </CardTitle>
              <p className="dmp-compare-subtitle text-xs text-[#888888] mt-1 font-mono">
                How our technology infrastructure outperforms manual agency media buying
              </p>
            </div>
            <Badge variant="outline" className="border-[#10B981]/30 bg-[#10B981]/10 text-[#10B981] font-mono text-[10px]">
              Direct Tech Architecture
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="dmp-table-head-row border-b border-white/[0.06] bg-white/[0.02]">
                <th className="dmp-table-head-dim py-3 px-6 text-[#888888] font-medium uppercase">Capability Dimension</th>
                <th className="dmp-table-head-dim py-3 px-6 text-red-400 font-medium uppercase">Traditional Media Agencies</th>
                <th className="dmp-table-head-dim py-3 px-6 text-[#10B981] font-bold uppercase">AdsIdol Intelligence DMP</th>
              </tr>
            </thead>
            <tbody className="dmp-table-row-dividers divide-y divide-white/[0.04]">
              <tr>
                <td className="dmp-table-dim-label py-3.5 px-6 text-white font-sans font-semibold">Data Source & Signal Depth</td>
                <td className="dmp-table-agency-cell py-3.5 px-6 text-[#888888] flex items-center gap-1.5">
                  <XCircle className="size-4 text-red-500/80 shrink-0" />
                  Aggregated 3rd-party DSP summary reports
                </td>
                <td className="dmp-table-dmp-cell py-3.5 px-6 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                  Raw 1st-party telemetry & MMP postbacks
                </td>
              </tr>
              <tr>
                <td className="dmp-table-dim-label py-3.5 px-6 text-white font-sans font-semibold">Audience Precision</td>
                <td className="dmp-table-agency-cell py-3.5 px-6 text-[#888888] flex items-center gap-1.5">
                  <XCircle className="size-4 text-red-500/80 shrink-0" />
                  Broad interest category targeting
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                  Direct MAID vector similarity matching (0.94)
                </td>
              </tr>
              <tr>
                <td className="dmp-table-dim-label py-3.5 px-6 text-white font-sans font-semibold">Post-Install Verification</td>
                <td className="dmp-table-agency-cell py-3.5 px-6 text-[#888888] flex items-center gap-1.5">
                  <XCircle className="size-4 text-red-500/80 shrink-0" />
                  Basic click & install counts
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                  In-app event milestone completion tracking
                </td>
              </tr>
              <tr>
                <td className="dmp-table-dim-label py-3.5 px-6 text-white font-sans font-semibold">Creative Optimization</td>
                <td className="dmp-table-agency-cell py-3.5 px-6 text-[#888888] flex items-center gap-1.5">
                  <XCircle className="size-4 text-red-500/80 shrink-0" />
                  Manual A/B testing after ad burnout
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                  Feature-isolated 3s hook retention decay
                </td>
              </tr>
              <tr>
                <td className="dmp-table-dim-label py-3.5 px-6 text-white font-sans font-semibold">Geographic Scaling</td>
                <td className="dmp-table-agency-cell py-3.5 px-6 text-[#888888] flex items-center gap-1.5">
                  <XCircle className="size-4 text-red-500/80 shrink-0" />
                  National level budget spend
                </td>
                <td className="py-3.5 px-6 text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-[#10B981] shrink-0" />
                  City-level velocity & regional dialect lift
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ── 4. INSTRUCTION BANNER (GUIDES USER TO TOP NAV TO LOAD LIVE DATA) ─── */}
      <div className="dmp-cta-banner rounded-2xl bg-gradient-to-r from-[#10B981]/15 via-[#111111] to-[#8B5CF6]/15 p-6 border border-[#10B981]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[#10B981] flex items-center justify-center text-black font-mono font-black text-sm shrink-0 shadow-[0_0_16px_rgba(16,185,129,0.4)]">
            GO
          </div>
          <div>
            <h3 className="dmp-cta-heading text-sm font-bold text-white font-sans">Ready to Analyze Live Campaign Intelligence?</h3>
            <p className="dmp-cta-p text-xs text-[#A0A0A0] font-mono mt-0.5">
              Select an <strong className="dmp-cta-strong text-white">Industry Vertical</strong> and <strong className="dmp-cta-strong text-white">App / Advertiser</strong> in the top navigation bar above, then hit <strong className="text-[#10B981]">Search</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          <span className="dmp-step-pill bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[#A0A0A0]">
            1. Select Vertical
          </span>
          <ArrowRight className="size-3.5 text-[#10B981]" />
          <span className="dmp-step-pill bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-[#A0A0A0]">
            2. Select App
          </span>
          <ArrowRight className="size-3.5 text-[#10B981]" />
          <span className="bg-[#10B981] text-black font-bold px-3 py-1.5 rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.4)]">
            3. Hit Search
          </span>
        </div>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Users,
  Cpu,
  Globe2,
  GitCommit,
  Sparkles,
  Eye,
  Info,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import type { AIEngineResult } from "@/lib/connectors/types"
import { TacticalGlobe3D } from "@/components/dashboard/tactical-globe-3d"

interface OperationalIntelligenceSuiteProps {
  data?: AIEngineResult | null
  activeSectionId?: string
}

// ─── Chart Eye Popover Helper ─────────────────────────────────────────────
function ChartEyePopover({
  title,
  description,
  howToRead,
  insight,
}: {
  title: string
  description: string
  howToRead: string
  insight: string
}) {
  return (
    <Popover>
      <PopoverTrigger className="p-1.5 rounded-md text-[#888888] hover:text-white hover:bg-white/10 transition-colors">
        <Eye className="size-3.5" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 bg-[#141414] border border-white/10 text-white p-4 shadow-2xl space-y-3 z-50"
      >
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <Info className="size-4 text-[#10B981]" />
          <h4 className="text-xs font-bold text-white font-mono">{title}</h4>
        </div>
        <div className="space-y-2 text-[11px] text-[#A0A0A0] leading-relaxed">
          <div>
            <p className="text-[10px] font-semibold text-[#888888] uppercase font-mono mb-0.5">What it measures</p>
            <p className="text-[#DDDDDD]">{description}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#888888] uppercase font-mono mb-0.5">How to read</p>
            <p className="text-[#DDDDDD]">{howToRead}</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
            <p className="text-[10px] font-bold font-mono uppercase mb-0.5">Campaign Outcome</p>
            <p className="text-[11px] text-emerald-300 font-medium">{insight}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ─── Stat Pill ──────────────────────────────────────────────────────────────
function StatPill({ label, value, trend, color = "#10B981" }: { label: string; value: string; trend?: string; color?: string }) {
  const isUp = trend?.startsWith("+")
  return (
    <div className="flex-1 min-w-[120px] bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
      <p className="text-[10px] text-[#888888] font-mono uppercase mb-1">{label}</p>
      <p className="text-xl font-extrabold font-mono" style={{ color }}>{value}</p>
      {trend && (
        <p className={`text-[10px] font-mono mt-0.5 flex items-center gap-0.5 ${isUp ? "text-emerald-400" : "text-red-400"}`}>
          {isUp ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {trend} vs prev. period
        </p>
      )}
    </div>
  )
}

export function OperationalIntelligenceSuite({ data, activeSectionId = "audience-intent" }: OperationalIntelligenceSuiteProps) {
  const appName = data?.metadata?.scannedApp || "FloatMe: Instant Cash Advance"
  const cleanAppName = appName.split(":")[0].trim()
  const [activeTab, setActiveTab] = useState(activeSectionId)

  React.useEffect(() => {
    if (activeSectionId) setActiveTab(activeSectionId)
  }, [activeSectionId])

  const sections = [
    { id: "audience-intent", label: "Audience Reach Report", icon: Users, badge: "Who We Reached" },
    { id: "hardware-matrix", label: "Delivery Quality Report", icon: Cpu, badge: "Device & OS Mix" },
    { id: "geo-expansion", label: "Geographic Performance", icon: Globe2, badge: "State-Level Results" },
    { id: "funnel-velocity", label: "Campaign Funnel Report", icon: GitCommit, badge: "Impression → Action" },
    { id: "creative-signals", label: "Creative Performance", icon: Sparkles, badge: "Ad Format Results" },
  ]

  // ─── Section Hero Meta ──────────────────────────────────────────────────
  const sectionMeta: Record<string, { title: string; subtitle: string; badge: string; color: string; kpis: { label: string; val: string }[] }> = {
    "audience-intent": {
      title: `Audience Reach & Segment Report — ${cleanAppName}`,
      subtitle: "A breakdown of the audiences we targeted, how they were segmented, and how each segment responded during the campaign flight.",
      badge: "Audience Report",
      color: "#10B981",
      kpis: [
        { label: "Total Unique Users Reached", val: "8.4M" },
        { label: "Highest Performing Segment", val: "Gig Workers" },
        { label: "Avg. Engagement Rate", val: "6.8%" },
      ],
    },
    "hardware-matrix": {
      title: `Ad Delivery Quality Report — ${cleanAppName}`,
      subtitle: "How campaign ads were delivered across different device types, operating systems, and connection environments.",
      badge: "Delivery Report",
      color: "#3B82F6",
      kpis: [
        { label: "iOS Share of Delivery", val: "61.4%" },
        { label: "Ads on Wi-Fi / 5G", val: "78.2%" },
        { label: "Successful Ad Renders", val: "98.7%" },
      ],
    },
    "geo-expansion": {
      title: `Geographic Campaign Performance — ${cleanAppName}`,
      subtitle: "Where the campaign ran, which states and cities drove the most installs, and where future scale opportunity remains.",
      badge: "Geo Report",
      color: "#8B5CF6",
      kpis: [
        { label: "States Covered", val: "38 States" },
        { label: "Top Converting State", val: "Texas" },
        { label: "Untapped Market Reach", val: "64.2%" },
      ],
    },
    "funnel-velocity": {
      title: `Campaign Funnel Performance — ${cleanAppName}`,
      subtitle: "How users moved from their first ad impression through to app install and first meaningful in-app action.",
      badge: "Funnel Report",
      color: "#F59E0B",
      kpis: [
        { label: "Impression → Install Rate", val: "3.2%" },
        { label: "Install → Registration", val: "68.4%" },
        { label: "Same-Day First Action", val: "54.6%" },
      ],
    },
    "creative-signals": {
      title: `Creative Performance Report — ${cleanAppName}`,
      subtitle: "Which ad formats performed best, which creative themes drove the most installs, and where drop-off happened.",
      badge: "Creative Report",
      color: "#EC4899",
      kpis: [
        { label: "Best Performing Format", val: "Short Video" },
        { label: "Top Creative Theme", val: "Instant Money" },
        { label: "Avg. Video Completion", val: "64.2%" },
      ],
    },
  }

  const currentMeta = sectionMeta[activeTab] || sectionMeta["audience-intent"]

  return (
    <div className="space-y-6">

      {/* ─── Section Hero Header ──────────────────────────────────────────── */}
      <Card className="bg-[#111111] border-white/[0.06]">
        <CardHeader className="pb-4 pt-5 px-6 border-b border-white/[0.05]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge style={{ background: `${currentMeta.color}15`, color: currentMeta.color, borderColor: `${currentMeta.color}30` }} className="text-[10px] font-mono">
                  {currentMeta.badge}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-white tracking-tight">
                {currentMeta.title}
              </CardTitle>
              <p className="text-xs text-[#888888] mt-1.5 leading-relaxed max-w-2xl">{currentMeta.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-[11px]">
              {currentMeta.kpis.map((kpi) => (
                <div key={kpi.label} className="bg-white/[0.03] border border-white/[0.06] px-3 py-2 rounded-lg min-w-[110px]">
                  <span className="text-[#888888] block text-[9px] uppercase mb-0.5">{kpi.label}</span>
                  <span className="font-bold text-[13px]" style={{ color: currentMeta.color }}>{kpi.val}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        {/* Section Tabs */}
        <div className="p-2 bg-[#0C0C0C] flex flex-wrap items-center gap-1.5">
          {sections.map((s) => {
            const Icon = s.icon
            const active = activeTab === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-[12px] font-medium transition-all ${
                  active
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                    : "text-[#888888] hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <Icon className={`size-3.5 ${active ? "text-[#10B981]" : "text-[#666666]"}`} />
                <span>{s.label}</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  active ? "bg-[#10B981]/20 text-[#10B981]" : "bg-white/5 text-[#666666]"
                }`}>
                  {s.badge}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* ─── MODULE 1: AUDIENCE REACH REPORT ─────────────────────────────── */}
      {activeTab === "audience-intent" && (
        <div className="space-y-5">
          {/* Top stat row */}
          <div className="flex flex-wrap gap-4">
            <StatPill label="Total Unique Users Reached" value="8.4M" trend="+18.2%" color="#10B981" />
            <StatPill label="Avg. Frequency Per User" value="3.6x" trend="+0.4x" color="#10B981" />
            <StatPill label="Audience Overlap Rate" value="4.2%" trend="-1.8%" color="#F59E0B" />
            <StatPill label="New-to-Brand Users" value="72.4%" color="#3B82F6" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">

            {/* Audience Segment Breakdown */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Audience Segments Targeted</CardTitle>
                  <ChartEyePopover
                    title="Audience Segments Targeted"
                    description="The audience groups we built and activated during this campaign, ranked by the share of total impressions delivered to each."
                    howToRead="Segments with higher impression share were prioritized by the campaign strategy. Compare the install rate column to see which segments were most efficient."
                    insight={`Gig workers and paycheck-to-paycheck earners drove 58% of all installs for ${cleanAppName} despite being 44% of impressions.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3.5">
                {[
                  { segment: "Gig & Freelance Workers", impressionShare: 28, installShare: "34.2%", color: "#10B981" },
                  { segment: "Paycheck-to-Paycheck Earners", impressionShare: 24, installShare: "23.8%", color: "#3B82F6" },
                  { segment: "Young Adults (18–28)", impressionShare: 22, installShare: "19.4%", color: "#8B5CF6" },
                  { segment: "Recent Job Starters", impressionShare: 15, installShare: "14.6%", color: "#F59E0B" },
                  { segment: "Credit-Building Seekers", impressionShare: 11, installShare: "8.0%", color: "#EC4899" },
                ].map((item) => (
                  <div key={item.segment} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#CCCCCC] font-medium">{item.segment}</span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>
                        {item.installShare} <span className="text-[9px] text-[#888888]">installs</span>
                      </span>
                    </div>
                    <Progress value={item.impressionShare} className="h-1.5 bg-white/5" />
                    <p className="text-[9px] text-[#666666] font-mono">{item.impressionShare}% of impressions</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Engagement by Segment */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Engagement Rate by Segment</CardTitle>
                  <ChartEyePopover
                    title="Engagement Rate by Segment"
                    description="How often users in each audience segment actually interacted with the ads shown to them — clicks, swipes, and taps counted."
                    howToRead="Higher engagement rates mean the message resonated with that group. A 6%+ rate is considered strong for financial app campaigns."
                    insight={`Gig workers had the highest engagement at 9.4%, nearly 2x the campaign average, confirming ${cleanAppName} solves a real pain point for that group.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { seg: "Gig Workers", rate: 9.4 },
                        { seg: "P2P Earners", rate: 7.2 },
                        { seg: "Age 18–28", rate: 6.1 },
                        { seg: "Job Starters", rate: 5.4 },
                        { seg: "Credit Build", rate: 4.8 },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="seg" tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#10B981" }}
                      />
                      <Bar dataKey="rate" fill="#10B981" radius={[4, 4, 0, 0]} name="Engagement %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Quality Post-Install */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Post-Install User Quality</CardTitle>
                  <ChartEyePopover
                    title="Post-Install User Quality"
                    description="After users installed the app, how many went on to complete a meaningful action — like registering, linking a bank account, or requesting an advance."
                    howToRead="This tells you if you attracted the right kind of user. High registration + action rates mean the audiences were well matched to the product."
                    insight={`72.4% of all installs from the Gig Workers segment completed registration within 24 hours — the strongest quality signal in the campaign.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {[
                  { label: "Completed Registration", val: 68.4, color: "#10B981" },
                  { label: "Linked a Bank Account", val: 52.6, color: "#3B82F6" },
                  { label: "Requested First Advance", val: 38.2, color: "#8B5CF6" },
                  { label: "Used App in Week 2", val: 29.4, color: "#F59E0B" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#CCCCCC] font-medium">{item.label}</span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>{item.val}%</span>
                    </div>
                    <Progress value={item.val} className="h-2 bg-white/5" />
                  </div>
                ))}
                <p className="text-[10px] font-mono text-[#666666] pt-1">
                  Based on verified in-app event postbacks from <strong className="text-white">{cleanAppName}</strong>
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      )}

      {/* ─── MODULE 2: DELIVERY QUALITY REPORT ────────────────────────────── */}
      {activeTab === "hardware-matrix" && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <StatPill label="Total Impressions Delivered" value="312M" trend="+22.4%" color="#3B82F6" />
            <StatPill label="Successful Ad Render Rate" value="98.7%" trend="+0.9%" color="#3B82F6" />
            <StatPill label="Viewable Impression Rate" value="81.4%" trend="+3.2%" color="#10B981" />
            <StatPill label="Invalid Traffic Blocked" value="1.3%" color="#F59E0B" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">

            {/* Device Type Split */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Delivery by Device Type</CardTitle>
                  <ChartEyePopover
                    title="Delivery by Device Type"
                    description="How the campaign's total ad impressions were split across iPhone, Android phones, and tablets."
                    howToRead="A heavy iOS skew typically means a higher-income, more engaged audience. For financial apps, iOS users tend to convert at higher rates."
                    insight={`iOS delivered 61.4% of impressions and produced 67.2% of installs — confirming that iPhone users are the core converting audience for ${cleanAppName}.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3.5">
                {[
                  { device: "iPhone (iOS)", share: 61.4, installs: "67.2% of installs", color: "#3B82F6" },
                  { device: "Android Phone", share: 34.8, installs: "29.6% of installs", color: "#10B981" },
                  { device: "Android Tablet", share: 2.4, installs: "2.2% of installs", color: "#8B5CF6" },
                  { device: "iPad", share: 1.4, installs: "1.0% of installs", color: "#F59E0B" },
                ].map((item) => (
                  <div key={item.device} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white font-medium">{item.device}</span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>{item.share}%</span>
                    </div>
                    <Progress value={item.share} className="h-1.5 bg-white/5" />
                    <p className="text-[9px] text-[#666666] font-mono">{item.installs}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* OS Version Split */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">OS Version Distribution</CardTitle>
                  <ChartEyePopover
                    title="OS Version Distribution"
                    description="The breakdown of iOS and Android versions across all devices that received the campaign's ad impressions."
                    howToRead="Modern OS versions (iOS 16+ / Android 13+) support richer ad formats and faster loading. Higher concentration here means better ad experience and fewer render failures."
                    insight={`84.6% of impressions reached users on modern OS versions, ensuring full ad format compatibility and zero rendering issues for ${cleanAppName}.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3">
                {[
                  { os: "iOS 17 & 18", share: 52.4, badge: "Current", color: "#3B82F6" },
                  { os: "iOS 15 & 16", share: 18.2, badge: "Supported", color: "#10B981" },
                  { os: "Android 13 & 14", share: 19.8, badge: "Current", color: "#8B5CF6" },
                  { os: "Android 11 & 12", share: 7.4, badge: "Supported", color: "#F59E0B" },
                  { os: "Older Versions", share: 2.2, badge: "Legacy", color: "#888888" },
                ].map((item) => (
                  <div key={item.os} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <p className="text-[11px] font-medium text-white">{item.os}</p>
                      <p className="text-[9px] font-mono" style={{ color: item.color }}>{item.badge}</p>
                    </div>
                    <span className="text-[13px] font-mono font-bold" style={{ color: item.color }}>{item.share}%</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Connection Quality */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Connection & Delivery Environment</CardTitle>
                  <ChartEyePopover
                    title="Connection & Delivery Environment"
                    description="The type of internet connection users had when they saw and interacted with the campaign ads."
                    howToRead="Wi-Fi and 5G environments lead to faster loading and higher completion rates for video ads. High quality connections also reduce drop-off during the install process."
                    insight={`78.2% of impressions were delivered on Wi-Fi or 5G — ideal conditions that contributed to the 98.7% successful render rate for ${cleanAppName}.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {[
                  { type: "Wi-Fi", pct: 54.6, note: "Highest completion rates", icon: CheckCircle2, iconColor: "#10B981" },
                  { type: "5G", pct: 23.6, note: "Strong video performance", icon: CheckCircle2, iconColor: "#10B981" },
                  { type: "4G LTE", pct: 18.4, note: "Good delivery, minor latency", icon: CheckCircle2, iconColor: "#F59E0B" },
                  { type: "3G / Weak Signal", pct: 3.4, note: "Higher drop-off risk", icon: AlertCircle, iconColor: "#EF4444" },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.type} className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <Icon className="size-3" style={{ color: item.iconColor }} />
                          <span className="text-white font-medium">{item.type}</span>
                          <span className="text-[9px] text-[#666666] font-mono">— {item.note}</span>
                        </div>
                        <span className="font-mono font-bold text-[#3B82F6]">{item.pct}%</span>
                      </div>
                      <Progress value={item.pct} className="h-1.5 bg-white/5" />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

          </div>
        </div>
      )}

      {/* ─── MODULE 3: GEOGRAPHIC PERFORMANCE ──────────────────────────────── */}
      {activeTab === "geo-expansion" && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <StatPill label="Top State by Installs" value="Texas" color="#8B5CF6" />
            <StatPill label="States with Active Campaigns" value="38 of 50" trend="+6 States" color="#8B5CF6" />
            <StatPill label="Highest Growth Region" value="Sun Belt" trend="+31% MoM" color="#10B981" />
            <StatPill label="Cities with 1K+ Installs" value="42 Cities" trend="+14" color="#F59E0B" />
          </div>          {/* 3D Tactical Radar Globe */}
          <TacticalGlobe3D
            appName={cleanAppName}
            browserUrl={`adsidol.com/geo-expansion?app=${cleanAppName.toLowerCase()}`}
            growthChange="+32.2%"
          />

          <div className="grid gap-5 lg:grid-cols-2">

            {/* Top Performing States */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Top Performing States</CardTitle>
                  <ChartEyePopover
                    title="Top Performing States"
                    description="States ranked by the number of app installs driven through the campaign, along with each state's share of total campaign installs."
                    howToRead="States with high install volume and growing week-over-week numbers are prime candidates for increased budget allocation."
                    insight={`Texas alone accounted for 18.4% of all installs. The Sun Belt corridor (TX, FL, AZ, GA) combined delivered 44% of the campaign's total installs.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3">
                {[
                  { state: "Texas", installs: "18.4%", wow: "+28% WoW", color: "#8B5CF6" },
                  { state: "Florida", installs: "12.6%", wow: "+22% WoW", color: "#8B5CF6" },
                  { state: "California", installs: "11.8%", wow: "+9% WoW", color: "#3B82F6" },
                  { state: "Arizona", installs: "7.4%", wow: "+36% WoW", color: "#10B981" },
                  { state: "Georgia", installs: "6.8%", wow: "+41% WoW", color: "#10B981" },
                  { state: "New York", installs: "6.2%", wow: "+7% WoW", color: "#F59E0B" },
                  { state: "Illinois", installs: "4.8%", wow: "+12% WoW", color: "#F59E0B" },
                  { state: "All Others", installs: "32.0%", wow: "", color: "#888888" },
                ].map((item) => (
                  <div key={item.state} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full" style={{ background: item.color }} />
                      <p className="text-[12px] font-medium text-white">{item.state}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.wow && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                          <ArrowUpRight className="size-3" />{item.wow}
                        </span>
                      )}
                      <span className="text-[12px] font-mono font-bold" style={{ color: item.color }}>{item.installs}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* City-Level Performance + Growth Opportunity */}
            <div className="space-y-5">
              <Card className="bg-[#111111] border-white/[0.06]">
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[13px] font-semibold text-white">Fastest Growing Cities</CardTitle>
                    <ChartEyePopover
                      title="Fastest Growing Cities"
                      description="Cities where installs grew the most week-over-week during the campaign, indicating high demand with relatively low saturation."
                      howToRead="Rapid growth in mid-size cities often signals untapped markets where the product fills a clear gap. These are ideal for increased media investment."
                      insight={`San Antonio, Phoenix, and Las Vegas all grew 40%+ week-over-week — emerging markets where ${cleanAppName} has strong product-market fit with minimal competition.`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-2.5">
                  {[
                    { city: "San Antonio, TX", growth: "+48% WoW" },
                    { city: "Phoenix, AZ", growth: "+44% WoW" },
                    { city: "Las Vegas, NV", growth: "+41% WoW" },
                    { city: "Jacksonville, FL", growth: "+38% WoW" },
                    { city: "Charlotte, NC", growth: "+35% WoW" },
                  ].map((item) => (
                    <div key={item.city} className="flex items-center justify-between text-[12px]">
                      <span className="text-white font-medium">{item.city}</span>
                      <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 font-mono text-[10px]">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-[#111111] border-white/[0.06]">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-[13px] font-semibold text-white">Regional Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-3">
                  {[
                    { region: "Sun Belt (South & Southwest)", share: "44%", note: "Primary growth engine" },
                    { region: "East Coast (NY, FL, GA, NC)", share: "28%", note: "High volume, moderately saturated" },
                    { region: "Midwest (IL, OH, MI)", share: "14%", note: "Untapped, growing" },
                    { region: "West Coast (CA, WA, OR)", share: "10%", note: "High competition, lower margin" },
                    { region: "Mountain & Plains", share: "4%", note: "Emerging opportunity" },
                  ].map((item) => (
                    <div key={item.region} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white font-medium">{item.region}</span>
                        <span className="font-mono font-bold text-[#8B5CF6]">{item.share}</span>
                      </div>
                      <p className="text-[9px] text-[#666666] font-mono">{item.note}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      )}

      {/* ─── MODULE 4: CAMPAIGN FUNNEL REPORT ─────────────────────────────── */}
      {activeTab === "funnel-velocity" && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <StatPill label="Total Impressions Served" value="312M" color="#F59E0B" />
            <StatPill label="Total Clicks Generated" value="9.96M" trend="+14.2%" color="#F59E0B" />
            <StatPill label="Total App Installs" value="318K" trend="+19.6%" color="#10B981" />
            <StatPill label="Qualified Actions (Post-Install)" value="164K" trend="+22.8%" color="#10B981" />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">

            {/* Campaign Funnel Steps */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Campaign Funnel: Impression to Action</CardTitle>
                  <ChartEyePopover
                    title="Campaign Funnel: Impression to Action"
                    description="The complete user journey from seeing an ad through to completing a meaningful in-app action, showing how many users made it through each stage."
                    howToRead="Each stage shows what percentage of users from the previous stage continued forward. Drop-offs are normal — the goal is to minimize drop-off at each step."
                    insight={`51.6% of people who installed ${cleanAppName} completed registration, and 38.2% of those went on to request their first advance — strong funnel efficiency for a financial app.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3">
                {[
                  { stage: "Ad Impressions Served", count: "312M", pct: 100, color: "#888888" },
                  { stage: "Ad Clicks", count: "9.96M", pct: 3.2, color: "#F59E0B" },
                  { stage: "App Store Page Visits", count: "6.84M", pct: 2.2, color: "#F59E0B" },
                  { stage: "App Installs", count: "318K", pct: 0.10, color: "#3B82F6" },
                  { stage: "Registration Completed", count: "164K", pct: 0.053, color: "#8B5CF6" },
                  { stage: "Bank Linked", count: "112K", pct: 0.036, color: "#10B981" },
                  { stage: "First Advance Requested", count: "84K", pct: 0.027, color: "#10B981" },
                ].map((item, i) => (
                  <div key={item.stage} className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-5 rounded-full bg-white/[0.05] text-[9px] font-mono text-[#888888] shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-white font-medium">{item.stage}</span>
                        <div className="text-right">
                          <span className="font-mono font-bold" style={{ color: item.color }}>{item.count}</span>
                          <span className="text-[9px] text-[#666666] font-mono ml-1">({item.pct}%)</span>
                        </div>
                      </div>
                      <Progress value={Math.min(item.pct * 30, 100)} className="h-1 bg-white/5" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Time-to-Install + Conversion Timing */}
            <div className="space-y-5">
              <Card className="bg-[#111111] border-white/[0.06]">
                <CardHeader className="pb-2 pt-4 px-5">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[13px] font-semibold text-white">Time from First Ad to Install</CardTitle>
                    <ChartEyePopover
                      title="Time from First Ad to Install"
                      description="How long it took users from the moment they first saw an ad to when they actually installed the app."
                      howToRead="A large share of same-day installs means the ad message creates immediate urgency. Longer windows suggest the product needs more consideration time."
                      insight={`54.6% of installs happened on the same day a user first saw the ad — indicating ${cleanAppName}'s messaging creates strong immediate intent.`}
                    />
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-3">
                  {[
                    { window: "Same Day (0–24 hrs)", share: 54.6, color: "#10B981" },
                    { window: "Day 2–3", share: 22.4, color: "#3B82F6" },
                    { window: "Day 4–7", share: 14.2, color: "#8B5CF6" },
                    { window: "Day 8–14", share: 5.8, color: "#F59E0B" },
                    { window: "After 14 Days", share: 3.0, color: "#888888" },
                  ].map((item) => (
                    <div key={item.window} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white font-medium">{item.window}</span>
                        <span className="font-mono font-bold" style={{ color: item.color }}>{item.share}%</span>
                      </div>
                      <Progress value={item.share} className="h-1.5 bg-white/5" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-[#111111] border-white/[0.06]">
                <CardHeader className="pb-2 pt-4 px-5">
                  <CardTitle className="text-[13px] font-semibold text-white">Weekly Install Trend</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <div className="h-[140px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { week: "Wk 1", installs: 38 },
                          { week: "Wk 2", installs: 52 },
                          { week: "Wk 3", installs: 61 },
                          { week: "Wk 4", installs: 74 },
                          { week: "Wk 5", installs: 69 },
                          { week: "Wk 6", installs: 88 },
                        ]}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                        <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} unit="K" />
                        <Tooltip
                          contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                          labelStyle={{ color: "#fff" }}
                          itemStyle={{ color: "#F59E0B" }}
                          formatter={(v) => [`${v}K installs`, "Installs"]}
                        />
                        <Line type="monotone" dataKey="installs" stroke="#F59E0B" strokeWidth={2} dot={{ fill: "#F59E0B", r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] font-mono text-[#666666] mt-2">Install volume trend over 6-week campaign flight</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      )}

      {/* ─── MODULE 5: CREATIVE PERFORMANCE REPORT ────────────────────────── */}
      {activeTab === "creative-signals" && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-4">
            <StatPill label="Ad Formats Tested" value="6 Formats" color="#EC4899" />
            <StatPill label="Creative Variants Run" value="28 Variants" trend="+8 this flight" color="#EC4899" />
            <StatPill label="Best Format Install Rate" value="4.8%" trend="+1.6% vs avg" color="#10B981" />
            <StatPill label="Avg. Video Completion" value="64.2%" trend="+6.4%" color="#3B82F6" />
          </div>

          <div className="grid gap-5 lg:grid-cols-3">

            {/* Ad Format Performance */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Performance by Ad Format</CardTitle>
                  <ChartEyePopover
                    title="Performance by Ad Format"
                    description="How different ad formats — short video, static banner, interactive, and native — compared against each other on install rate and engagement."
                    howToRead="Install rate is the most important metric here. A format with a higher install rate means it's more efficiently driving the outcome we care about."
                    insight={`Short video (15s) outperformed all other formats with a 4.8% install rate — nearly 2x the next best format. This should be the primary format for future flights.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-3.5">
                {[
                  { format: "Short Video (15s)", installRate: 4.8, share: "38%", color: "#EC4899" },
                  { format: "Vertical Story (Full Screen)", installRate: 3.2, share: "24%", color: "#8B5CF6" },
                  { format: "Native In-Feed", installRate: 2.6, share: "18%", color: "#3B82F6" },
                  { format: "Static Banner (320×50)", installRate: 1.4, share: "12%", color: "#F59E0B" },
                  { format: "Interactive Playable", installRate: 3.8, share: "8%", color: "#10B981" },
                ].map((item) => (
                  <div key={item.format} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white font-medium">{item.format}</span>
                      <span className="font-mono font-bold" style={{ color: item.color }}>{item.installRate}% install rate</span>
                    </div>
                    <Progress value={item.installRate * 15} className="h-1.5 bg-white/5" />
                    <p className="text-[9px] text-[#666666] font-mono">{item.share} of total impressions</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Creative Theme Performance */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Creative Theme Performance</CardTitle>
                  <ChartEyePopover
                    title="Creative Theme Performance"
                    description="Different creative messaging approaches were tested — each with a distinct hook or story angle. This shows which themes resonated most and drove users to install."
                    howToRead="Higher engagement rates mean the message caught attention. Pair with install rate to identify the themes that both engaged AND converted."
                    insight={`The 'Instant Access to Your Pay' theme outperformed all others with a 7.4% engagement rate and 4.2% install rate — the clearest product benefit that users respond to.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { theme: "Instant Pay", engagement: 7.4 },
                        { theme: "No Fees", engagement: 6.2 },
                        { theme: "Peer Stories", engagement: 5.8 },
                        { theme: "App Demo", engagement: 4.4 },
                        { theme: "Generic CTA", engagement: 2.6 },
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="theme" tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" />
                      <YAxis tick={{ fontSize: 9, fill: "#888888" }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip
                        contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: "#fff" }}
                        itemStyle={{ color: "#EC4899" }}
                        formatter={(v) => [`${v}%`, "Engagement Rate"]}
                      />
                      <Bar dataKey="engagement" fill="#EC4899" radius={[4, 4, 0, 0]} name="Engagement %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] font-mono text-[#666666] mt-1">Engagement rate by creative messaging theme</p>
              </CardContent>
            </Card>

            {/* Video Performance Breakdown */}
            <Card className="bg-[#111111] border-white/[0.06]">
              <CardHeader className="pb-2 pt-4 px-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[13px] font-semibold text-white">Video Watch & Completion Rates</CardTitle>
                  <ChartEyePopover
                    title="Video Watch & Completion Rates"
                    description="For video ads, this shows how much of the video users actually watched before either clicking through or scrolling away."
                    howToRead="A high 3-second view rate means the opening hook is working. A high completion rate means the full message is being seen. Both matter for install rate."
                    insight={`Videos that held attention through the 5-second mark converted at 2.3x the rate of videos where users dropped off before 5 seconds — making the first 5 seconds critical.`}
                  />
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-5 space-y-4">
                {[
                  { milestone: "Viewed First 3 Seconds", rate: 86.4, note: "Hook effectiveness", color: "#EC4899" },
                  { milestone: "Watched to 5 Seconds", rate: 72.8, note: "Core message delivered", color: "#8B5CF6" },
                  { milestone: "Watched to 10 Seconds", rate: 51.6, note: "Full story seen", color: "#3B82F6" },
                  { milestone: "Completed Full Video (15s)", rate: 64.2, note: "Avg across all lengths", color: "#10B981" },
                  { milestone: "Clicked After Completion", rate: 18.4, note: "High-intent actions", color: "#F59E0B" },
                ].map((item) => (
                  <div key={item.milestone} className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <div>
                        <span className="text-white font-medium">{item.milestone}</span>
                        <span className="text-[9px] text-[#666666] font-mono block">{item.note}</span>
                      </div>
                      <span className="font-mono font-bold" style={{ color: item.color }}>{item.rate}%</span>
                    </div>
                    <Progress value={item.rate} className="h-1.5 bg-white/5" />
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>
      )}

    </div>
  )
}

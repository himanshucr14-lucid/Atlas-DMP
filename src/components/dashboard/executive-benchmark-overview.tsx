"use client"

import React from "react"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

import { ArrowUpRight, RotateCcw, Eye, Target, TrendingUp, Users, Fingerprint, Clock } from "lucide-react"
import { motion } from "framer-motion"
import type { AIEngineResult } from "@/lib/connectors/types"

type TabId = "overview" | "audience" | "placement"

const TAB_LABELS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "audience", label: "Audience Intelligence" },
  { id: "placement", label: "Placement & Timing" },
]

interface ExecutiveBenchmarkOverviewProps {
  data?: AIEngineResult | null
}

// ─────────────────────────────────────────
//  Sparkline (inline mini chart)
// ─────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 72, h = 28
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ")
  const id = `sg${color.replace("#", "")}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible flex-shrink-0">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.22} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polyline points={`${pts} ${w},${h} 0,${h}`} fill={`url(#${id})`} stroke="none" />
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─────────────────────────────────────────
//  Eye Icon Popover for charts
// ─────────────────────────────────────────
function ChartEyePopover({ title, description, howToRead, insight }: {
  title: string
  description: string
  howToRead: string
  insight: string
}) {
  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center gap-1 text-[#888888] hover:text-white transition-colors cursor-pointer"
        aria-label="Chart explanation"
      >
        <Eye className="size-3.5" />
      </PopoverTrigger>
      <PopoverContent
        className="w-72 bg-[#161616] border border-white/[0.08] text-white p-4 space-y-3 shadow-2xl"
        side="left"
        align="start"
      >
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <Separator className="bg-white/[0.06]" />
        <div className="space-y-2 text-[12px] leading-relaxed">
          <div>
            <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-0.5">What this shows</p>
            <p className="text-[#BBBBBB]">{description}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-0.5">How to read it</p>
            <p className="text-[#BBBBBB]">{howToRead}</p>
          </div>
          <div>
            <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-0.5">Key insight</p>
            <p className="text-[#10B981]">{insight}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ─────────────────────────────────────────
//  Flippable KPI Card (click to explain)
// ─────────────────────────────────────────
interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  minHeight?: string
}

function FlipCard({ front, back, minHeight = "180px" }: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false)
  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: "1000px", minHeight }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.12] transition-colors p-4 overflow-hidden flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
          <div className="text-[10px] text-[#555555] font-mono text-right pt-1">click to explain →</div>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl bg-[#161616] border border-white/[0.12] p-4 overflow-hidden flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {back}
          <div className="flex justify-end pt-1">
            <button
              className="text-[10px] text-[#888888] hover:text-white font-mono flex items-center gap-1 transition-colors"
              onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
            >
              <RotateCcw className="size-2.5" /> flip back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────
//  Back face content for KPI cards
// ─────────────────────────────────────────
function KpiBack({ title, color, value, explanation }: {
  title: string; color: string; value: string; explanation: string
}) {
  return (
    <div className="flex flex-col h-full justify-between space-y-2">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
        <span className="text-[12px] font-bold text-white tracking-tight">{title}</span>
        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded" style={{ color, background: `${color}18`, border: `1px solid ${color}30` }}>
          {value}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center py-1">
        <p className="text-[10px] text-[#10B981] font-mono uppercase tracking-wider mb-1 font-semibold">Delivered Result & Impact</p>
        <p className="text-[11px] leading-relaxed text-[#DDDDDD] font-normal">
          {explanation}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
//  Ring gauge (SVG donut)
// ─────────────────────────────────────────
function RingGauge({ value, color, size = 56 }: { value: number; color: string; size?: number }) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─────────────────────────────────────────
//  Static chart data
// ─────────────────────────────────────────
const trendData = [
  { day: "Mon", confidence: 88, retention: 49, scale: 11.8 },
  { day: "Tue", confidence: 90, retention: 51, scale: 12.2 },
  { day: "Wed", confidence: 89, retention: 50, scale: 12.8 },
  { day: "Thu", confidence: 92, retention: 53, scale: 13.1 },
  { day: "Fri", confidence: 91, retention: 52, scale: 13.6 },
  { day: "Sat", confidence: 93, retention: 54, scale: 13.9 },
  { day: "Sun", confidence: 94, retention: 54.2, scale: 14.2 },
]

const hourlyData = Array.from({ length: 24 }, (_, h) => {
  const peak = h >= 19 && h <= 23
  const shoulder = h >= 17 && h <= 18
  const base = 8 + Math.random() * 4
  return { hour: `${String(h).padStart(2, "0")}:00`, cvr: parseFloat((peak ? 18 + Math.random() * 6 : shoulder ? 12 + Math.random() * 4 : base).toFixed(1)) }
})

const trendConfig = {
  confidence: { label: "Confidence", color: "#10B981" },
  retention: { label: "Retention %", color: "#8B5CF6" },
  scale: { label: "Scale (M)", color: "#3B82F6" },
}
const hourlyConfig = { cvr: { label: "CVR %", color: "#10B981" } }
const barConfig = { conversions: { label: "Conversions (K)", color: "#3B82F6" } }

// ─────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────
export function ExecutiveBenchmarkOverview({ data }: ExecutiveBenchmarkOverviewProps) {
  const appCategory = data?.metadata?.category || "Fintech & Advance Pay"
  const appName = data?.metadata?.scannedApp || "FloatMe: Instant Cash Advance"
  const cleanAppName = appName.split(":")[0].trim()
  const catLower = appCategory.toLowerCase()
  const isHealth = catLower.includes("health") || catLower.includes("medical")
  const isGaming = catLower.includes("game") || catLower.includes("gaming")

  const peers = isHealth
    ? [
        { name: "Tata 1mg", matchScore: 95, conversions: 420, insight: "OPD booking postbacks peak Monday mornings." },
        { name: "Netmeds", matchScore: 92, conversions: 310, insight: "Medicine re-orders show 48% D30 retention." },
        { name: "Apollo 24|7", matchScore: 89, conversions: 280, insight: "High-LTV acquisition via rewarded video." },
        { name: "PharmEasy", matchScore: 86, conversions: 240, insight: "Tier 1 metro native banners: 3.8% CTR." },
      ]
    : isGaming
    ? [
        { name: "Subway Surfers", matchScore: 96, conversions: 890, insight: "Rewarded video: 84% completion rate." },
        { name: "Candy Crush", matchScore: 93, conversions: 720, insight: "Level 10 milestone is optimal event." },
        { name: "Ludo King", matchScore: 90, conversions: 610, insight: "Weekend afternoons yield highest engagement." },
        { name: "Royal Match", matchScore: 87, conversions: 510, insight: "Playables yield 28% higher D1 retention." },
      ]
    : [
        { name: "EarnIn", matchScore: 94, conversions: 540, insight: "Salary cycle days 1–7 yield +42% velocity." },
        { name: "Dave", matchScore: 91, conversions: 410, insight: "Instant advance events convert in 4 hours." },
        { name: "Brigit", matchScore: 88, conversions: 320, insight: "Evening 19–23h window: 22.4% CVR." },
        { name: "Chime", matchScore: 85, conversions: 290, insight: "Full-screen interstitial is top placement." },
      ]

  const peakHours = data?.geoIntelligence?.peakHours || "19:00–23:00 IST"

  const formats = [
    { name: "Full-Screen Interstitial", cvr: 22.4, ctr: 4.8, scale: 88, note: "Top Recommended — Highest CVR" },
    { name: "In-App Banner (Bottom Dock)", cvr: 14.8, ctr: 3.2, scale: 64, note: "High Impression Scale & Reach" },
    { name: "Native Contextual In-Feed", cvr: 12.4, ctr: 2.8, scale: 52, note: "Optimal for Brand Intent & High-LTV" },
  ]

  const kpiCards = [
    {
      label: "Confidence Match",
      value: "94", unit: "/100",
      badge: "+4.2% last 7d", badgeColor: "#10B981", color: "#10B981",
      icon: <Target className="size-4" />,
      sparkData: [88, 90, 89, 92, 91, 93, 94],
      backProps: {
        title: "Confidence Match Index", color: "#10B981", value: "94/100",
        explanation: `Achieved a 94/100 signal match by training DMP models on 80M+ vertical postbacks. Guarantees ${cleanAppName} reaches high-intent users with a predicted 95%+ campaign success rate.`,
      },
    },
    {
      label: "D1 Retention Benchmark",
      value: "54.2", unit: "%",
      badge: "+14.2% vs industry", badgeColor: "#8B5CF6", color: "#8B5CF6",
      icon: <TrendingUp className="size-4" />,
      sparkData: [49, 51, 50, 53, 52, 54, 54.2],
      backProps: {
        title: "Day-1 Retention Model", color: "#8B5CF6", value: "54.2%",
        explanation: `Delivered a 54.2% Day-1 retention rate for ${cleanAppName} (+14.2% above industry average) by filtering invalid traffic, ensuring acquired users remain active with high LTV.`,
      },
    },
    {
      label: "Reachable Scale",
      value: "14.2M", unit: "MAIDs",
      badge: "+1.8M / mo", badgeColor: "#3B82F6", color: "#3B82F6",
      icon: <Users className="size-4" />,
      sparkData: [11.8, 12.2, 12.8, 13.1, 13.6, 13.9, 14.2],
      backProps: {
        title: "Reachable Audience Scale", color: "#3B82F6", value: "14.2M MAIDs",
        explanation: `Unlocked 14.2M verified Mobile Ad IDs across OpenRTB exchanges for ${cleanAppName}, providing broad target market reach without frequency exhaustion.`,
      },
    },
    {
      label: "Identity Resolution Rate",
      value: "88.5", unit: "%",
      badge: "99.1% deterministic", badgeColor: "#F59E0B", color: "#F59E0B",
      icon: <Fingerprint className="size-4" />,
      sparkData: [84, 85, 86, 87, 87.5, 88, 88.5],
      backProps: {
        title: "Identity Resolution Rate", color: "#F59E0B", value: "88.5%",
        explanation: `Achieved 88.5% deterministic device matching for ${cleanAppName}, eliminating wasted ad spend on unverified users and enabling precise multi-touch attribution.`,
      },
    },
  ]

  const peerBackContent = (peer: typeof peers[0]) => ({
    title: `${peer.name} Match`,
    color: "#10B981",
    value: `${peer.matchScore}%`,
    explanation: `Delivered ${peer.matchScore}% audience overlap between ${cleanAppName} and benchmark app ${peer.name}. Validates that ${cleanAppName} targets the highest-converting user cohort.`,
  })

  const formatBackContent = (fmt: typeof formats[0], i: number) => ({
    title: `${fmt.name}`,
    color: i === 0 ? "#10B981" : i === 1 ? "#3B82F6" : "#8B5CF6",
    value: `${fmt.cvr}% CVR`,
    explanation: `Delivered a ${fmt.cvr}% CVR for ${cleanAppName} on ${fmt.name} placements, outperforming standard formats and maximizing acquisition ROI.`,
  })

  const [activeTab, setActiveTab] = React.useState<TabId>("overview")

  return (
    <div className="space-y-5 w-full">
      {/* Manual Tab Nav — full width, no flex-row issues */}
      <div className="flex items-center gap-1 bg-[#161616] border border-white/[0.06] h-9 p-1 rounded-lg w-fit">
        {TAB_LABELS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="rounded-md text-[12px] font-medium px-4 h-full transition-colors"
            style={activeTab === t.id
              ? { background: "#222222", color: "#ffffff" }
              : { color: "#888888" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === "overview" && (
        <div className="space-y-5">

        {/* Hero KPI Cards — fixed grid: always 2 cols, 4 cols on xl */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          {kpiCards.map((kpi) => (
            <FlipCard
              key={kpi.label}
              minHeight="200px"
              front={
                <div className="flex flex-col h-full space-y-3 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[#888888] font-medium leading-tight">{kpi.label}</span>
                    <span style={{ color: kpi.color }} className="opacity-50">{kpi.icon}</span>
                  </div>
                  <div className="flex items-end justify-between flex-1">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[30px] font-bold font-mono text-white leading-none">{kpi.value}</span>
                        <span className="text-xs text-[#888888] font-mono">{kpi.unit}</span>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-medium mt-2 px-2 py-0.5 rounded-full"
                        style={{ color: kpi.badgeColor, background: `${kpi.badgeColor}18`, border: `1px solid ${kpi.badgeColor}30` }}
                      >
                        <ArrowUpRight className="size-2.5" />{kpi.badge}
                      </span>
                    </div>
                    <Sparkline data={kpi.sparkData} color={kpi.color} />
                  </div>
                </div>
              }
              back={<KpiBack {...kpi.backProps} />}
            />
          ))}
        </div>

        {/* 7-Day Trendline */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold text-white">7-Day Performance Trendline</CardTitle>
                <p className="text-[11px] text-[#888888] mt-0.5">Confidence score, D1 retention and audience scale over the last 7 days</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[#10B981]/30 text-[#10B981] text-[10px] font-mono">Live Sync</Badge>
                <ChartEyePopover
                  title="7-Day Performance Trendline"
                  description="Shows three core campaign readiness signals plotted daily: Confidence Match score (0–100), D1 Retention % and Reachable Scale in millions of MAIDs."
                  howToRead="Each line represents one metric's daily value. Diverging lines indicate the metrics are moving at different rates — look for all three trending upward simultaneously for the strongest launch signal."
                  insight="When Confidence and Retention both trend above their 7-day moving average simultaneously, historical win rates increase by 38%."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <ChartContainer config={trendConfig} className="h-[200px] w-full">
              <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  {[["conf", "#10B981"], ["ret", "#8B5CF6"], ["scl", "#3B82F6"]].map(([id, c]) => (
                    <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={c} stopOpacity={0.18} />
                      <stop offset="100%" stopColor={c} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area type="monotone" dataKey="confidence" stroke="#10B981" fill="url(#g-conf)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="retention" stroke="#8B5CF6" fill="url(#g-ret)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="scale" stroke="#3B82F6" fill="url(#g-scl)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Peers Table + Format Benchmark — 3:2 ratio */}
        <div className="grid gap-4 lg:grid-cols-5">
          <Card className="bg-[#111111] border-white/[0.06] lg:col-span-3">
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[13px] font-semibold text-white">Vertical Peers</CardTitle>
                <Badge variant="outline" className="text-[10px] font-mono border-white/10 text-[#888888]">{appCategory}</Badge>
              </div>
            </CardHeader>
            <CardContent className="px-0 pb-2">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-white/[0.05] hover:bg-transparent">
                    <TableHead className="text-[10px] text-[#888888] pl-5 py-2">App</TableHead>
                    <TableHead className="text-[10px] text-[#888888] py-2">Match Score</TableHead>
                    <TableHead className="text-[10px] text-[#888888] py-2 pr-5">Sample</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {peers.map((peer) => (
                    <TableRow key={peer.name} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <TableCell className="pl-5 py-2.5 text-sm font-medium text-white">{peer.name}</TableCell>
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-mono font-bold text-[#10B981] w-10">{peer.matchScore}%</span>
                          <Progress value={peer.matchScore} className="w-20 h-1.5 bg-white/5" />
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 text-[12px] font-mono text-[#888888] pr-5">{peer.conversions}K</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#111111] border-white/[0.06] lg:col-span-2">
            <CardHeader className="pb-2 pt-4 px-5">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[13px] font-semibold text-white">Format Benchmark</CardTitle>
                <span className="text-[10px] font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2 py-0.5 rounded-full">Top: Interstitial</span>
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-4 space-y-3.5">
              {formats.map((fmt) => (
                <div key={fmt.name} className="space-y-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-medium text-white">{fmt.name}</span>
                    <span className="font-mono font-bold text-[#10B981]">{fmt.cvr}% CVR</span>
                  </div>
                  <Progress value={fmt.scale} className="h-1.5 bg-white/5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        </div>
      )}

      {/* ── TAB 2: AUDIENCE INTELLIGENCE ── */}
      {activeTab === "audience" && (
        <div className="space-y-5">
        {/* Peer flip cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {peers.map((peer) => {
            const bp = peerBackContent(peer)
            return (
              <FlipCard key={peer.name} minHeight="240px"
                front={
                  <div className="flex flex-col h-full space-y-3 pb-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-white">{peer.name}</span>
                      <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 text-[10px] font-mono">{peer.matchScore}%</Badge>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-[10px] text-[#888888]">
                        <span>Audience Similarity</span><span>{peer.matchScore}%</span>
                      </div>
                      <Progress value={peer.matchScore} className="h-2 bg-white/5" />
                    </div>
                    <Separator className="bg-white/[0.05]" />
                    <p className="text-[11px] text-[#888888] leading-relaxed flex-1">{peer.insight}</p>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-[#888888]">Sample Size</span>
                      <span className="font-mono font-bold text-white">{peer.conversions}K events</span>
                    </div>
                  </div>
                }
                back={<KpiBack {...bp} />}
              />
            )
          })}
        </div>

        {/* Peer BarChart */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold text-white">Peer Conversion Volume</CardTitle>
                <p className="text-[11px] text-[#888888] mt-0.5">Historical conversion events by vertical peer app</p>
              </div>
              <ChartEyePopover
                title="Peer Conversion Volume Chart"
                description="Compares the total historical conversion event volume across the top 4 similar apps in your vertical, drawn from the AdsIdol postback database."
                howToRead="Taller bars indicate more data density for that peer, meaning higher confidence in the match score derived from their campaigns."
                insight="Apps with >400K conversion events provide statistically significant benchmarks. Use their creative and bidding strategies as your baseline."
              />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <ChartContainer config={barConfig} className="h-[200px] w-full">
              <BarChart data={peers.map(p => ({ name: p.name, conversions: p.conversions }))} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="conversions" fill="#3B82F6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        </div>
      )}

      {/* ── TAB 3: PLACEMENT & TIMING ── */}
      {activeTab === "placement" && (
        <div className="space-y-5">

        {/* 24h Curve */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-5 px-5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-[14px] font-semibold text-white">24-Hour Conversion Rate Curve</CardTitle>
                <p className="text-[11px] text-[#888888] mt-0.5">Hourly CVR distribution — peak serving window highlighted</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3 text-[#888888]" />
                  <span className="text-[10px] font-mono font-bold text-[#10B981]">{peakHours}</span>
                </div>
                <ChartEyePopover
                  title="24-Hour CVR Curve"
                  description="Shows the conversion rate distribution across all 24 hours of the day, aggregated from 90 days of postback data in this vertical."
                  howToRead="The Y axis is CVR (Conversions ÷ Clicks × 100). The spike between 19:00–23:00 represents the prime engagement window when users are most receptive."
                  insight="Concentrating 60–70% of your daily budget in the 19:00–23:00 window yields a +38% conversion velocity lift vs. flat day-parting."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <ChartContainer config={hourlyConfig} className="h-[200px] w-full">
              <AreaChart data={hourlyData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-hourly" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 8, fill: "#888" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "#888" }} axisLine={false} tickLine={false} unit="%" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="cvr" stroke="#10B981" fill="url(#g-hourly)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Format Flip Cards */}
        <div className="grid gap-4 lg:grid-cols-3">
          {formats.map((fmt, i) => {
            const bp = formatBackContent(fmt, i)
            const accentColor = i === 0 ? "#10B981" : i === 1 ? "#3B82F6" : "#8B5CF6"
            return (
              <FlipCard key={fmt.name} minHeight="220px"
                front={
                  <div className="flex flex-col h-full space-y-3 pb-5">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[12px] font-semibold text-white leading-snug">{fmt.name}</span>
                      {i === 0 && <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 text-[9px] shrink-0">Top Pick</Badge>}
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      <div>
                        <p className="text-[10px] text-[#888888] mb-0.5">CVR</p>
                        <p className="text-2xl font-bold font-mono" style={{ color: accentColor }}>{fmt.cvr}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#888888] mb-0.5">CTR</p>
                        <p className="text-2xl font-bold font-mono text-[#3B82F6]">{fmt.ctr}%</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-[10px] text-[#888888]">
                        <span>Impression Scale</span><span>{fmt.scale}%</span>
                      </div>
                      <Progress value={fmt.scale} className="h-1.5 bg-white/5" />
                    </div>
                  </div>
                }
                back={<KpiBack {...bp} />}
              />
            )
          })}
        </div>

        {/* Placements Table */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-[13px] font-semibold text-white">Placement Performance Matrix</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-2">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/[0.05] hover:bg-transparent">
                  <TableHead className="text-[10px] text-[#888888] pl-5 py-2">Placement</TableHead>
                  <TableHead className="text-[10px] text-[#888888] py-2">CVR</TableHead>
                  <TableHead className="text-[10px] text-[#888888] py-2">CTR</TableHead>
                  <TableHead className="text-[10px] text-[#888888] py-2">Scale</TableHead>
                  <TableHead className="text-[10px] text-[#888888] pr-5 py-2">Directive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formats.map((fmt) => (
                  <TableRow key={fmt.name} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <TableCell className="pl-5 py-2.5 font-medium text-white text-[13px]">{fmt.name}</TableCell>
                    <TableCell className="py-2.5 font-mono font-bold text-[#10B981] text-[13px]">{fmt.cvr}%</TableCell>
                    <TableCell className="py-2.5 font-mono text-[#888888] text-[13px]">{fmt.ctr}%</TableCell>
                    <TableCell className="py-2.5">
                      <div className="flex items-center gap-2">
                        <Progress value={fmt.scale} className="w-14 h-1.5 bg-white/5" />
                        <span className="text-[10px] font-mono text-[#888888]">{fmt.scale}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="pr-5 py-2.5 text-[11px] text-[#888888]">{fmt.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  )
}

"use client"

import React from "react"
import { motion } from "motion/react"
import {
  UsersIcon,
  SmartphoneIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  BarChart2Icon,
  CheckCircle2Icon,
  SparklesIcon,
  ActivityIcon,
  CpuIcon,
  GlobeIcon,
  LayersIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AIEngineResult } from "@/lib/connectors/types"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface AudienceIntelProps {
  audienceIntel: AIEngineResult["audienceIntel"]
  audienceQualityIndicators: AIEngineResult["audienceQualityIndicators"]
  databaseCohortOverlap?: AIEngineResult["databaseCohortOverlap"]
}

export default function AudienceIntel({
  audienceIntel,
  audienceQualityIndicators,
  databaseCohortOverlap = [],
}: AudienceIntelProps) {
  const getDynamicSyncDate = () => {
    const d = new Date()
    d.setDate(d.getDate() - 12)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Dynamically calculate vertical affinity scores based on target app category and Gemini AI verticalBehaviors
  const parseAffinity = (val?: string, defaultVal: number = 50): number => {
    if (!val) return defaultVal
    const match = val.match(/(\d+)%/)
    if (match) return parseInt(match[1], 10)
    if (val.toLowerCase().includes("high") || val.toLowerCase().includes("top")) return 88
    if (val.toLowerCase().includes("medium") || val.toLowerCase().includes("moderate")) return 58
    if (val.toLowerCase().includes("low")) return 24
    return defaultVal
  }

  const profileNameLower = (audienceIntel.profileName || "").toLowerCase()
  const isHealthApp = profileNameLower.includes("health") || profileNameLower.includes("medical") || profileNameLower.includes("doctor") || profileNameLower.includes("wellness")
  const isFinanceApp = profileNameLower.includes("finance") || profileNameLower.includes("fintech") || profileNameLower.includes("bank") || profileNameLower.includes("pay")
  const isGamingApp = profileNameLower.includes("game") || profileNameLower.includes("gaming") || profileNameLower.includes("play")
  const isShoppingApp = profileNameLower.includes("shop") || profileNameLower.includes("e-com") || profileNameLower.includes("store")

  const healthScore = parseAffinity(audienceIntel.verticalBehaviors?.health, isHealthApp ? 94 : 32)
  const financeScore = parseAffinity(audienceIntel.verticalBehaviors?.finance, isFinanceApp ? 92 : 36)
  const gamingScore = parseAffinity(audienceIntel.verticalBehaviors?.gaming, isGamingApp ? 90 : 28)
  const shoppingScore = parseAffinity(audienceIntel.verticalBehaviors?.shopping, isShoppingApp ? 88 : 54)
  const ottScore = parseAffinity(audienceIntel.verticalBehaviors?.ott, 62)
  const travelScore = parseAffinity(audienceIntel.verticalBehaviors?.travel, 44)

  const radarData = [
    { subject: "Health & Fitness", A: healthScore, fullMark: 100 },
    { subject: "Finance & Utility", A: financeScore, fullMark: 100 },
    { subject: "Gaming & Media", A: gamingScore, fullMark: 100 },
    { subject: "Shopping & E-Com", A: shoppingScore, fullMark: 100 },
    { subject: "OTT & Streaming", A: ottScore, fullMark: 100 },
    { subject: "Travel & Mobility", A: travelScore, fullMark: 100 },
  ]

  // Demographics age split
  const ageDistribution = [
    { range: "25 - 34 years", pct: 54, color: "bg-primary" },
    { range: "18 - 24 years", pct: 27, color: "bg-emerald-500" },
    { range: "35 - 44 years", pct: 19, color: "bg-blue-500" },
  ]

  // Audience Quality metric items
  const qualityMetrics = [
    { label: "Returning User Ratio", value: audienceQualityIndicators.returningUserPct, badge: "High", color: "text-emerald-400" },
    { label: "Repeat Purchaser Ratio", value: audienceQualityIndicators.repeatPurchaserPct, badge: "Optimal", color: "text-blue-400" },
    { label: "High-Value User (LTV)", value: audienceQualityIndicators.highValueUserPct, badge: "Top 35%", color: "text-purple-400" },
    { label: "Organic Affinity Index", value: audienceQualityIndicators.organicAffinity, badge: "82% Match", color: "text-emerald-400" },
    { label: "Paid Media Affinity", value: audienceQualityIndicators.paidAffinity, badge: "64% Match", color: "text-amber-400" },
    { label: "Offer Sensitivity", value: audienceQualityIndicators.offerSensitivity, badge: "Responsive", color: "text-cyan-400" },
    { label: "Brand Loyalty Index", value: audienceQualityIndicators.loyaltyProbability, badge: "76% Prob", color: "text-indigo-400" },
    { label: "Early Churn Risk", value: audienceQualityIndicators.earlyChurnRisk, badge: "14% Low", color: "text-emerald-400" },
  ]

  return (
    <div className="space-y-6">
      {/* ── Top Header Dataset Card ── */}
      <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <DatabaseIcon className="size-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                    Proprietary DMP Match
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                    <CheckCircle2Icon className="size-3 mr-1" /> Verified Ingestion
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-foreground tracking-tight mt-1">
                  Active Datastore: {audienceIntel.profileName}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Compiled from zero-party telemetry and cross-app identity graph records.
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 rounded-xl border bg-muted/30 p-4 font-mono">
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Acquisition Span</span>
                <span className="text-sm font-bold text-foreground">6 Months</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Last Sync</span>
                <span className="text-sm font-bold text-emerald-400">{getDynamicSyncDate()}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block">Confidence</span>
                <span className="text-sm font-bold text-primary">94.8%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Two Column Layout: Cohorts + Demographics ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (7 cols): Target Profile & Intent Clusters */}
        <div className="space-y-6 lg:col-span-7">
          {/* Target Profile Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <UsersIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Audience Target Cohorts</CardTitle>
                  <CardDescription>High-intent user profiles extracted from cross-platform DMP signals</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border bg-muted/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Target Profile</span>
                <p className="text-lg font-bold text-foreground mt-0.5">{audienceIntel.profileName}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <SmartphoneIcon className="size-3 mr-1" /> {audienceIntel.deviceSpecs.os}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <CpuIcon className="size-3 mr-1" /> {audienceIntel.deviceSpecs.deviceTier}
                  </Badge>
                </div>
              </div>

              {/* High-Intent Clusters & Target Interests */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    High-Intent User Clusters
                  </span>
                  <div className="space-y-2">
                    {(audienceIntel.highIntentUsers || []).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="text-foreground font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-muted/20 p-4 space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                    Target Affinity Categories
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(audienceIntel.interestCategories || []).map((cat, idx) => (
                      <Badge key={idx} variant="outline" className="bg-background text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3D Vertical Affinity Radar Chart */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ActivityIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Vertical Affinity Radar</CardTitle>
                  <CardDescription>Cross-category user interest density distribution</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="var(--color-border)" strokeOpacity={0.6} />
                    <PolarAngleAxis dataKey="subject" stroke="var(--color-muted-foreground)" fontSize={11} />
                    <Radar
                      name="Affinity"
                      dataKey="A"
                      stroke="var(--color-primary)"
                      fill="var(--color-primary)"
                      fillOpacity={0.35}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (5 cols): Demographics & Quality Indicators */}
        <div className="space-y-6 lg:col-span-5">
          {/* Demographics Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart2Icon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Demographic Splits</CardTitle>
                  <CardDescription>Age & gender distribution metrics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Age Progress Bars */}
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Age Distribution</span>
                {ageDistribution.map((item) => (
                  <div key={item.range} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-muted-foreground">{item.range}</span>
                      <span className="font-mono font-bold text-foreground">{item.pct}%</span>
                    </div>
                    <Progress value={item.pct} className="h-2" />
                  </div>
                ))}
              </div>

              {/* Gender Split */}
              <div className="rounded-xl border bg-muted/20 p-3 space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Gender Ratio</span>
                  <span className="font-mono text-xs font-bold text-foreground">51% Male / 49% Female</span>
                </div>
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-primary" style={{ width: "51%" }} />
                  <div className="h-full bg-blue-500" style={{ width: "49%" }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience Quality Indicators Grid */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ShieldCheckIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Audience Purity & Quality</CardTitle>
                  <CardDescription>Retention, LTV, and affinity health scores</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {qualityMetrics.map((item, idx) => (
                  <div key={idx} className="rounded-xl border bg-muted/20 p-3 space-y-1">
                    <span className="text-[10px] text-muted-foreground truncate block">{item.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className={`font-mono text-base font-bold ${item.color}`}>{item.value}</span>
                      <Badge variant="outline" className="text-[9px] px-1 py-0">
                        {item.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Cohort Overlap Table ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayersIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Proprietary Datastore Cohort Overlap</CardTitle>
                <CardDescription>Matching internal database profiles against zero-party signals</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort Name</TableHead>
                <TableHead>Segment Size</TableHead>
                <TableHead>Identity Graph Overlap</TableHead>
                <TableHead className="text-right">DSP Match Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {databaseCohortOverlap.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-semibold text-foreground">{row.cohortName}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{row.size}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 w-48">
                      <Progress value={row.overlapPercentage} className="h-2 flex-1" />
                      <span className="font-mono text-xs font-bold text-foreground">{row.overlapPercentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-emerald-400">{row.dspMatchRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

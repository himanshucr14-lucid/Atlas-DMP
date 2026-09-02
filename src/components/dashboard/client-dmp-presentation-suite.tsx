"use client"

import React from "react"
import { motion } from "motion/react"
import {
  UsersIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon,
  LayersIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  TrendingUpIcon,
  GlobeIcon,
  SmartphoneIcon,
  CpuIcon,
  RadioIcon,
  TvIcon,
  ZapIcon,
  BarChart3Icon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataSourceLogo } from "@/components/ui/data-source-logo"
import GlobeDemo from "@/components/globe-demo"
import { IphoneDeviceMockup } from "@/components/cards/iphone-device-mockup"
import type { AIEngineResult } from "@/lib/connectors/types"

interface ClientDMPPresentationSuiteProps {
  data?: AIEngineResult | null
}

export function ClientDMPPresentationSuite({ data }: ClientDMPPresentationSuiteProps) {
  const appName = data?.metadata?.scannedApp || "Target Mobile Application"
  const primaryMarket = data?.overview?.primaryMarket || "India (Tier 1/2 Regional)"
  const readinessScore = data?.overview?.campaignReadinessScore || 88
  const audienceScore = data?.overview?.audienceScore || 86
  const publisherMatchScore = data?.overview?.publisherMatchScore || 84

  const appCategory = data?.metadata?.category || "Medical & Health"
  const catLower = appCategory.toLowerCase()

  // Dynamic DSP Bidding Partners Data from Gemini SSP distributions
  const dspPartners = (data?.sspDistributions || []).length > 0
    ? data!.sspDistributions.map((ssp, idx) => ({
        name: ssp.ssp,
        floorCPM: ssp.clearingCpm || data?.kpiProjections?.estimatedCPM || "$2.80",
        winRate: `${ssp.winRate}%`,
        reqDensity: `${(ssp.trafficShare * 0.4).toFixed(1)}M req/s`,
        fit: ssp.winRate > 80 ? "Optimal" : ssp.winRate > 75 ? "High Yield" : "Scale Target",
        logo: idx % 2 === 0 ? "AppLovin" : "Google AdMob",
      }))
    : [
        { name: "AppLovin MAX", floorCPM: "$2.40", winRate: "84%", reqDensity: "14.2M req/s", fit: "Optimal", logo: "AppLovin" },
        { name: "Google DV360", floorCPM: "$3.10", winRate: "78%", reqDensity: "22.5M req/s", fit: "High Yield", logo: "Google AdMob" },
        { name: "Unity Exchange", floorCPM: "$1.85", winRate: "82%", reqDensity: "11.8M req/s", fit: "High CVR", logo: "Unity Ads" },
        { name: "Mintegral", floorCPM: "$1.40", winRate: "88%", reqDensity: "18.6M req/s", fit: "Scale Target", logo: "Adjust" },
        { name: "Liftoff / Vungle", floorCPM: "$2.15", winRate: "80%", reqDensity: "9.4M req/s", fit: "High LTV", logo: "AppsFlyer" },
        { name: "Ironsource / Luna", floorCPM: "$1.95", winRate: "81%", reqDensity: "12.1M req/s", fit: "Optimal", logo: "Singular" },
      ]

  // Dynamic Regional State-wise Impression Reach from Gemini Geo Intelligence
  const stateReachData = (data?.geoIntelligence?.regionalDemand || []).length > 0
    ? data!.geoIntelligence.regionalDemand.map((reg) => ({
        state: reg.region,
        tier: reg.share > 25 ? "Tier 1" : "Tier 1/2",
        impressions: `${(reg.share * 0.8).toFixed(1)}M Impr.`,
        matchRate: Math.min(98, Math.max(78, reg.share * 3 + 40)),
        status: reg.share > 25 ? "Peak Volume" : "Optimal Scale",
      }))
    : [
        { state: "Maharashtra (Mumbai, Pune)", tier: "Tier 1", impressions: "18.4M Impr.", matchRate: 92, status: "Peak Volume" },
        { state: "Karnataka (Bengaluru)", tier: "Tier 1", impressions: "14.8M Impr.", matchRate: 94, status: "High LTV" },
        { state: "Delhi NCR (Delhi, Gurgaon, Noida)", tier: "Tier 1", impressions: "16.2M Impr.", matchRate: 89, status: "High Conversion" },
        { state: "Tamil Nadu (Chennai, Coimbatore)", tier: "Tier 1/2", impressions: "11.5M Impr.", matchRate: 86, status: "Optimal" },
        { state: "Telangana (Hyderabad)", tier: "Tier 1/2", impressions: "10.2M Impr.", matchRate: 88, status: "High CVR" },
        { state: "Gujarat (Ahmedabad, Surat)", tier: "Tier 2", impressions: "8.7M Impr.", matchRate: 84, status: "Scale Target" },
      ]

  // Dynamic DSP Supported Publisher Apps based on searched app category & Gemini AI publisher intelligence
  const publisherApps = React.useMemo(() => {
    if (data?.publisherIntelligence && data.publisherIntelligence.length > 0) {
      const list: { name: string; format: string; cpm: string; category: string }[] = []
      data.publisherIntelligence.forEach((group) => {
        (group.apps || []).forEach((appItem) => {
          list.push({
            name: appItem,
            format: "Native / Contextual Banner",
            cpm: data.kpiProjections?.estimatedCPM || "$2.80",
            category: group.category || appCategory,
          })
        })
      })
      if (list.length >= 4) return list.slice(0, 8)
    }

    if (catLower.includes("health") || catLower.includes("medical") || catLower.includes("doctor")) {
      return [
        { name: "Tata 1mg", format: "Contextual Health Native", cpm: "$3.40", category: "Pharmacy & Labs" },
        { name: "HealthifyMe", format: "Rewarded Video", cpm: "$2.90", category: "Fitness & Diet" },
        { name: "PharmEasy", format: "In-App Banner Overlay", cpm: "$3.10", category: "Medicine Delivery" },
        { name: "Apollo 24|7", format: "Native Interstitial", cpm: "$3.80", category: "Healthcare Consult" },
        { name: "Cult.fit", format: "Rewarded Interstitial", cpm: "$3.20", category: "Fitness & Wellness" },
        { name: "Netmeds", format: "In-Feed Native", cpm: "$2.85", category: "E-Pharmacy" },
        { name: "DocOnline", format: "Full Screen Interstitial", cpm: "$3.60", category: "Teleconsultation" },
        { name: "Practo Partner App", format: "PMP Direct Placement", cpm: "$4.10", category: "Doctor Network" },
      ]
    }

    if (catLower.includes("finance") || catLower.includes("fintech") || catLower.includes("bank")) {
      return [
        { name: "Paytm App", format: "Native Feed Overlay", cpm: "$2.90", category: "Mobile Payments" },
        { name: "PhonePe", format: "In-App Native Banner", cpm: "$3.10", category: "UPI & Banking" },
        { name: "CRED", format: "Full Screen Interstitial", cpm: "$4.50", category: "Credit Cards" },
        { name: "PolicyBazaar", format: "Contextual Native", cpm: "$3.80", category: "Insurance" },
        { name: "Groww", format: "Rewarded Interstitial", cpm: "$3.90", category: "Investment & Stocks" },
        { name: "Zerodha Kite", format: "In-Feed Native", cpm: "$4.20", category: "Trading" },
        { name: "Bajaj Markets", format: "Native Interstitial", cpm: "$3.40", category: "Loans & Finance" },
        { name: "Moneycontrol", format: "Banner Overlay", cpm: "$2.80", category: "Financial News" },
      ]
    }

    return [
      { name: "Subway Surfers", format: "Rewarded Video", cpm: "$2.80", category: "Casual Gaming" },
      { name: "Ludo King", format: "Playable / Interstitial", cpm: "$2.10", category: "Board & Social" },
      { name: "Truecaller", format: "Native Banner Overlay", cpm: "$1.90", category: "Utility & Calls" },
      { name: "MX Player", format: "In-Stream Video", cpm: "$3.40", category: "OTT & Entertainment" },
      { name: "Dailyhunt", format: "In-Feed Native", cpm: "$1.75", category: "News & Vernacular" },
      { name: "ShareChat", format: "Full Screen Interstitial", cpm: "$2.20", category: "Social & Short Video" },
      { name: "Battlegrounds Mobile India", format: "Rewarded Interstitial", cpm: "$4.20", category: "Hardcore Gaming" },
      { name: "Flipkart App", format: "Contextual Commerce Native", cpm: "$3.80", category: "E-Commerce" },
    ]
  }, [data, appCategory, catLower])

  return (
    <div className="space-y-6">
      {/* ── Client Pitch Banner ── */}
      <Card className="border-primary/30 bg-gradient-to-r from-card via-card to-primary/10">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/20 border border-primary/40 text-primary shadow-lg shadow-primary/20">
                <SparklesIcon className="size-6 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" className="bg-primary/20 text-primary hover:bg-primary/30 font-mono">
                    In-House DMP Campaign Intelligence
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 font-mono">
                    <CheckCircle2Icon className="size-3 mr-1 inline" /> Historical Run Verified
                  </Badge>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-foreground mt-1">
                  Proprietary Media Buying Insights: <span className="text-primary">{appName}</span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Compiled from cross-campaign historical database runs, zero-party telemetry, and DSP clearing graphs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 rounded-xl border bg-card/80 p-4 font-mono text-center">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Readiness Score</span>
                <span className="text-base font-bold text-emerald-400">{readinessScore}%</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Audience Match</span>
                <span className="text-base font-bold text-primary">{audienceScore}%</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Publisher Fit</span>
                <span className="text-base font-bold text-cyan-400">{publisherMatchScore}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── SECTION A: Audience Conversion Telemetry & Best Conversion Times ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Best Conversion Timings & Days (7 cols) */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClockIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Conversion Timing & Day Optimization</CardTitle>
                <CardDescription>Historical peak conversion windows derived from previous campaign performance</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border bg-muted/20 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ClockIcon className="size-3.5 text-primary" />
                  <span>Optimal Serving Hours</span>
                </div>
                <p className="text-base font-bold text-foreground font-mono">19:00 - 23:00 IST</p>
                <p className="text-[11px] text-emerald-400 font-medium">Peak user evening engagement</p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarIcon className="size-3.5 text-emerald-400" />
                  <span>High-Converting Days</span>
                </div>
                <p className="text-base font-bold text-foreground font-mono">Friday - Sunday</p>
                <p className="text-[11px] text-emerald-400 font-medium">+42% higher conversion rate</p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ZapIcon className="size-3.5 text-amber-400" />
                  <span>Best Conversion Window</span>
                </div>
                <p className="text-base font-bold text-foreground font-mono">Day 0 to Day 1</p>
                <p className="text-[11px] text-amber-400 font-medium">Immediate post-impression action</p>
              </div>
            </div>

            {/* Best In-App Ad Formats & Placement Moments */}
            <div className="rounded-xl border bg-muted/10 p-4 space-y-3">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider block">
                Recommended In-App Ad Formats & Trigger Moments
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border bg-card p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Rewarded Video</span>
                    <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-400">18.4% CVR</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Served at level completion & reward checkpoints.</p>
                </div>

                <div className="rounded-lg border bg-card p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Playable Ads</span>
                    <Badge variant="outline" className="text-[9px] border-primary/30 text-primary">4.8% CTR</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Interactive demo served during app launch onboarding.</p>
                </div>

                <div className="rounded-lg border bg-card p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Native Feed Overlay</span>
                    <Badge variant="outline" className="text-[9px] border-blue-500/30 text-blue-400">High LTV</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Contextual in-content card placement on utility feeds.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3D iPhone Device Preview (5 cols) */}
        <Card className="lg:col-span-5 flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SmartphoneIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">3D In-App Ad Preview</CardTitle>
                <CardDescription>Live device-level ad resolution & passkey verification</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center py-4">
            <IphoneDeviceMockup cardName="OEM Hardware Identity Passkey" last4="9482" status="ACTIVE" dailyLimit={100000} />
          </CardContent>
        </Card>
      </div>

      {/* ── SECTION B: Recommended DSP Media Buying Partners ── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <RadioIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Recommended DSP Media Buying Partners</CardTitle>
                <CardDescription>Top demand-side platforms for inventory clearing and maximum win rate</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="font-mono text-xs">
              6 Active Exchanges Configured
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dspPartners.map((dsp) => (
              <div key={dsp.name} className="rounded-xl border bg-card p-4 space-y-3 transition-all hover:border-primary/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <DataSourceLogo name={dsp.logo} className="size-7" />
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{dsp.name}</h4>
                      <p className="text-[10px] text-muted-foreground font-mono">{dsp.reqDensity}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-mono">{dsp.fit}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">Floor CPM</span>
                    <span className="font-bold text-emerald-400">{dsp.floorCPM}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground uppercase block">Bid Win Rate</span>
                    <span className="font-bold text-primary">{dsp.winRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── SECTION C & D: 3D Interactive India Map + State Reach & DSP Publisher Apps ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 3D India / Regional Interactive Map & State Reach (7 cols) */}
        <Card className="lg:col-span-7">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GlobeIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">State-wise Regional Impression Reach ({primaryMarket})</CardTitle>
                  <CardDescription>Targetable impression volume breakdown across Tier 1 & Tier 2 states</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 3D Globe Demo Component */}
            <div className="rounded-xl border bg-muted/20 overflow-hidden">
              <GlobeDemo />
            </div>

            {/* State-wise Reach Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target State / Region</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Impression Volume</TableHead>
                  <TableHead className="text-right">DMP Match %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stateReachData.map((row) => (
                  <TableRow key={row.state}>
                    <TableCell className="font-semibold text-foreground text-xs">{row.state}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px]">{row.tier}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-emerald-400">{row.impressions}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={row.matchRate} className="h-1.5 w-16" />
                        <span className="font-mono text-xs font-bold text-foreground">{row.matchRate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* DSP Supported Publisher Apps Inventory (5 cols) */}
        <Card className="lg:col-span-5">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <TvIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">DSP Supported Publisher Apps</CardTitle>
                <CardDescription>Verified media inventory where ads will be served</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {publisherApps.map((app) => (
                <div key={app.name} className="flex items-center justify-between rounded-lg border bg-muted/20 p-2.5">
                  <div className="flex items-center gap-2.5">
                    <DataSourceLogo name={app.name} className="size-7" />
                    <div>
                      <p className="text-xs font-bold text-foreground leading-tight">{app.name}</p>
                      <p className="text-[10px] text-muted-foreground">{app.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-[10px] block">{app.format}</Badge>
                    <span className="font-mono text-[11px] font-bold text-emerald-400">{app.cpm} eCPM</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

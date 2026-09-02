"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import {
  LayersIcon,
  RadioIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  SlidersIcon,
  ArrowUpRightIcon,
  TrendingUpIcon,
  ZapIcon,
  ActivityIcon,
  CpuIcon,
  RefreshCwIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataSourceLogo } from "@/components/ui/data-source-logo"

import { useActiveAIAnalysis } from "@/hooks/use-active-ai-analysis"

export function DspBiddingPartnersClient() {
  const activeData = useActiveAIAnalysis()
  const defaultFloor = activeData?.kpiProjections?.estimatedCPM?.replace("$", "") || "2.50"
  const defaultCpa = activeData?.kpiProjections?.estimatedCPA?.replace("$", "") || "12.00"

  const [selectedDsp, setSelectedDsp] = useState("applovin")
  const [floorPrice, setFloorPrice] = useState(defaultFloor)
  const [targetCpa, setTargetCpa] = useState(defaultCpa)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const dspExchanges = [
    {
      id: "applovin",
      name: "AppLovin MAX DSP",
      logo: "AppLovin",
      floorCPM: "$2.40",
      liveCPM: "$2.85",
      winRate: "84%",
      reqDensity: "14.2M req/s",
      fit: "Optimal",
      color: "border-emerald-500/30 bg-emerald-500/5",
    },
    {
      id: "dv360",
      name: "Google DV360 DSP",
      logo: "Google AdMob",
      floorCPM: "$3.10",
      liveCPM: "$3.60",
      winRate: "78%",
      reqDensity: "22.5M req/s",
      fit: "High Yield",
      color: "border-blue-500/30 bg-blue-500/5",
    },
    {
      id: "unity",
      name: "Unity Exchange DSP",
      logo: "Unity Ads",
      floorCPM: "$1.85",
      liveCPM: "$2.25",
      winRate: "82%",
      reqDensity: "11.8M req/s",
      fit: "High CVR",
      color: "border-purple-500/30 bg-purple-500/5",
    },
    {
      id: "mintegral",
      name: "Mintegral DSP",
      logo: "Adjust",
      floorCPM: "$1.40",
      liveCPM: "$1.75",
      winRate: "88%",
      reqDensity: "18.6M req/s",
      fit: "Scale Target",
      color: "border-cyan-500/30 bg-cyan-500/5",
    },
  ]

  const marketExchanges = [
    { name: "AppLovin MAX", symbol: "APPL-MAX", floorCPM: "$2.40", volume: "14.2M", trend: "+4.2%", logo: "AppLovin" },
    { name: "Google DV360", symbol: "DV360-RTB", floorCPM: "$3.10", volume: "22.5M", trend: "+2.8%", logo: "Google AdMob" },
    { name: "Unity Exchange", symbol: "UNITY-DSP", floorCPM: "$1.85", volume: "11.8M", trend: "+5.1%", logo: "Unity Ads" },
    { name: "Mintegral Network", symbol: "MINT-RTB", floorCPM: "$1.40", volume: "18.6M", trend: "+6.4%", logo: "Adjust" },
    { name: "Liftoff / Vungle", symbol: "LIFT-VUNG", floorCPM: "$2.15", volume: "9.4M", trend: "+3.6%", logo: "AppsFlyer" },
    { name: "Ironsource / Luna", symbol: "IRON-LUNA", floorCPM: "$1.95", volume: "12.1M", trend: "+1.9%", logo: "Singular" },
  ]

  const handleUpdateFloor = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-primary/20 bg-card p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/30 text-primary">
            <LayersIcon className="size-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">DSP Bidding Partners & RTB Clearing Engine</h1>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 font-mono text-[10px]">
                <CheckCircle2Icon className="size-3 mr-1 inline" /> Auction Clearing Active
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono">
              Real-time bid CPM floors, clearing prices, and demand-side exchange liquidity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="rounded-xl border bg-muted/30 px-3.5 py-2">
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Average Win Rate</span>
            <span className="font-bold text-emerald-400">78.4% Win Rate</span>
          </div>
          <div className="rounded-xl border bg-muted/30 px-3.5 py-2">
            <span className="text-[10px] text-muted-foreground uppercase block font-semibold">RTB Density</span>
            <span className="font-bold text-primary">14,820 req/s</span>
          </div>
        </div>
      </div>

      {/* Bento 3D DSP Cards (4 Cards Grid) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dspExchanges.map((dsp) => {
          const isSelected = selectedDsp === dsp.id
          return (
            <motion.div
              key={dsp.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedDsp(dsp.id)}
              className="cursor-pointer"
            >
              <Card className={`relative overflow-hidden transition-all ${isSelected ? "ring-2 ring-primary border-primary" : "border-border/60 hover:border-primary/50"}`}>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <DataSourceLogo name={dsp.logo} className="size-8" />
                      <div>
                        <h3 className="text-sm font-bold text-foreground leading-tight">{dsp.name}</h3>
                        <span className="text-[10px] font-mono text-primary font-semibold">{dsp.reqDensity}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[10px] font-mono">{dsp.fit}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Floor CPM</span>
                      <span className="font-bold text-emerald-400">{dsp.floorCPM}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase block">Win Rate</span>
                      <span className="font-bold text-foreground">{dsp.winRate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* RTB Floor Configurator & Exchange Clearing Table (2 Columns) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Exchange Clearing Table (8 Cols) */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ActivityIcon className="size-4" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">Ad Exchange Bidding Clearing Market</CardTitle>
                  <CardDescription>Real-time clearing CPM rates and bid volume</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exchange Name</TableHead>
                  <TableHead>Symbol Code</TableHead>
                  <TableHead>Floor eCPM</TableHead>
                  <TableHead>Req Volume</TableHead>
                  <TableHead className="text-right">Yield Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketExchanges.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell className="font-bold text-foreground text-xs">
                      <div className="flex items-center gap-2.5">
                        <DataSourceLogo name={row.logo} className="size-7" />
                        <span>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.symbol}</TableCell>
                    <TableCell className="font-mono text-xs font-bold text-emerald-400">{row.floorCPM}</TableCell>
                    <TableCell className="font-mono text-xs text-foreground">{row.volume} req/s</TableCell>
                    <TableCell className="text-right font-mono text-xs font-bold text-primary">{row.trend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* RTB Floor Configurator Form (4 Cols) */}
        <Card className="lg:col-span-4 flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SlidersIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">RTB Floor Configurator</CardTitle>
                <CardDescription>Adjust clearing floors and CPA ceilings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-mono">Floor CPM ($)</label>
              <Input
                value={floorPrice}
                onChange={(e) => setFloorPrice(e.target.value)}
                className="font-mono text-xs h-9"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground font-mono">Target CPA Ceiling ($)</label>
              <Input
                value={targetCpa}
                onChange={(e) => setTargetCpa(e.target.value)}
                className="font-mono text-xs h-9"
              />
            </div>

            <div className="rounded-xl border bg-muted/20 p-3 space-y-1 font-mono text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Win Rate:</span>
                <span className="font-bold text-emerald-400">82.4%</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Projected eCPM:</span>
                <span className="font-bold text-primary">${floorPrice} eCPM</span>
              </div>
            </div>

            <Button
              onClick={handleUpdateFloor}
              disabled={isUpdating}
              className="w-full h-10 gap-2 text-xs font-bold bg-primary text-primary-foreground"
            >
              {isUpdating ? (
                <RefreshCwIcon className="size-4 animate-spin" />
              ) : updateSuccess ? (
                <CheckCircle2Icon className="size-4 text-emerald-400" />
              ) : (
                <ZapIcon className="size-4" />
              )}
              {isUpdating ? "Re-indexing Floor..." : updateSuccess ? "Floor Re-indexed!" : "Update Clearing Floor"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

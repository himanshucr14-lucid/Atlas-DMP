"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TacticalGlobe3D } from "@/components/dashboard/tactical-globe-3d"
import type { AIEngineResult } from "@/lib/connectors/types"

const cityCorridorData = [
  { city: "Austin-Dallas Tech Corridor", index: 96, growth: "+44% WoW" },
  { city: "NY-SF Metro Core", index: 88, growth: "+18% WoW" },
  { city: "Bengaluru-Hyderabad Hubs", index: 94, growth: "+52% WoW" },
  { city: "London-Berlin Expat Nodes", index: 78, growth: "+28% WoW" },
]

const dialectReceptivity = [
  { dialect: "English (US Standard)", share: 64.2, lift: "Baseline" },
  { dialect: "Spanish (LATAM / US Expat)", share: 18.4, lift: "+36.0% Lift" },
  { dialect: "Hindi & Regional South Asian", share: 12.8, lift: "+48.0% Lift" },
  { dialect: "Portuguese & Regional EU", share: 4.6, lift: "+22.4% Lift" },
]

export function AccountsPageClient() {
  const [data, setData] = useState<AIEngineResult | null>(null)
  const appName = data?.metadata?.scannedApp?.split(":")[0]?.trim() || "FloatMe"

  useEffect(() => {
    try {
      const s = sessionStorage.getItem("active_ai_analysis")
      if (s) setData(JSON.parse(s))
    } catch {}
  }, [])

  return (
    <div className="space-y-6 min-h-screen p-6 bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20 text-[10px] font-mono">
              Geographic Expansion Radar
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Geographic Expansion & Regional Velocity — {appName}</h1>
          <p className="text-sm text-[#888888] mt-0.5">City-level conversion corridors and regional localization performance</p>
        </div>

        <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 font-mono text-xs px-3 py-1">
          Tier-2 Velocity: +44% WoW
        </Badge>
      </div>

      {/* 3D Tactical Globe Visualization */}
      <TacticalGlobe3D
        appName={appName}
        browserUrl={`adsidol.com/tactical-radar?app=${appName.toLowerCase()}`}
        growthChange="+32.2%"
      />

      {/* Corridor & Localization Grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-[13px] font-semibold text-white">Top Converting City Corridors</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3">
            {cityCorridorData.map((item) => (
              <div key={item.city} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div>
                  <p className="text-xs font-bold text-white">{item.city}</p>
                  <p className="text-[10px] text-[#888888] font-mono mt-0.5">Corridor Affinity Index: {item.index}/100</p>
                </div>
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 font-mono text-xs">
                  {item.growth}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-[13px] font-semibold text-white">Language & Regional Dialect Receptivity</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-3.5">
            {dialectReceptivity.map((item) => (
              <div key={item.dialect} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.dialect}</span>
                  <span className="font-mono font-bold text-[#8B5CF6]">{item.share}% ({item.lift})</span>
                </div>
                <Progress value={item.share} className="h-2 bg-white/5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

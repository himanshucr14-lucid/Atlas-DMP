"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { AIEngineResult } from "@/lib/connectors/types"

const microIntentTriggers = [
  { trigger: "Fast-Track Identity Verification (<5m)", score: 96.5, velocity: "Immediate LTV" },
  { trigger: "High-Frequency Session Burst (3+/day)", score: 92.1, velocity: "High Engagement" },
  { trigger: "In-App Financial Goal Setting", score: 88.4, velocity: "Core Intent" },
  { trigger: "Peer-to-Peer Transfer Trigger", score: 79.8, velocity: "Viral Growth" },
]

const lookalikeVectorData = [
  { cohort: "Tier 1 Seed Vector (Top 5%)", dist: "0.94 Similarity", scale: "12.4M MAIDs", color: "#10B981" },
  { cohort: "Tier 2 Expansion Vector (Top 15%)", dist: "0.86 Similarity", scale: "28.1M MAIDs", color: "#3B82F6" },
  { cohort: "Broad Category Vector (Top 30%)", dist: "0.72 Similarity", scale: "45.2M MAIDs", color: "#8B5CF6" },
]

export function TransfersPageClient() {
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
            <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 text-[10px] font-mono">
              Audience & Intent Signals
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Audience Micro-Intent & Vector Distance — {appName}</h1>
          <p className="text-sm text-[#888888] mt-0.5">Predictive LTV micro-intent triggers and lookalike similarity vectors</p>
        </div>

        <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 font-mono text-xs px-3 py-1">
          Vector Match: 0.94 Cosine
        </Badge>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Micro-Intent Triggers */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">Behavioral Micro-Intent Triggers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {microIntentTriggers.map((item) => (
              <div key={item.trigger} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.trigger}</span>
                  <span className="font-mono text-[#10B981] font-bold">{item.score} <span className="text-[10px] text-[#888888]">({item.velocity})</span></span>
                </div>
                <Progress value={item.score} className="h-1.5 bg-white/5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lookalike Vector Distance */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">Lookalike Vector Distance Matrix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lookalikeVectorData.map((item) => (
              <div key={item.cohort} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white">{item.cohort}</p>
                  <p className="text-[10px] font-mono text-[#888888]">Reachable Scale: <strong className="text-white">{item.scale}</strong></p>
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.dist}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

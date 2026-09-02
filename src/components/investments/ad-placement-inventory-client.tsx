"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import type { AIEngineResult } from "@/lib/connectors/types"

const chipsetTierData = [
  { chip: "Apple A17/A18 Pro (Flagship)", share: 44.2, perf: "99.4% Velocity" },
  { chip: "Qualcomm Snapdragon 8 Gen 2/3", share: 32.8, perf: "98.6% Velocity" },
  { chip: "MediaTek Dimensity 9000+", share: 16.4, perf: "95.1% Velocity" },
  { chip: "Legacy Processors", share: 6.6, perf: "84.2% Velocity" },
]

const carrierLatencyData = [
  { carrier: "Verizon / AT&T 5G mmWave", latency: "12ms", integrity: "99.9%" },
  { carrier: "T-Mobile 5G UC", latency: "18ms", integrity: "99.7%" },
  { carrier: "Fiber Wi-Fi 6 Nodes", latency: "15ms", integrity: "99.8%" },
  { carrier: "Regional 4G LTE", latency: "38ms", integrity: "98.4%" },
]

const hardwareAttestationNodes = [
  { node: "Secure Enclave Crypto Vault Node 01", status: "Active Lock", passRate: 99.85 },
  { node: "Play Integrity Hardware Verdict Node 02", status: "Active Lock", passRate: 99.62 },
  { node: "Biometric Hardware Token Node 03", status: "Active Lock", passRate: 99.40 },
  { node: "Low-Latency Edge Telemetry Node 04", status: "Active Lock", passRate: 99.10 },
]

export function AdPlacementInventoryClient() {
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
            <Badge className="bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20 text-[10px] font-mono">
              Device & Infrastructure Matrix
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Hardware, Network & Attestation Matrix — {appName}</h1>
          <p className="text-sm text-[#888888] mt-0.5">Chipset rendering tiers, network latency, and hardware attestation verdicts</p>
        </div>

        <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 font-mono text-xs px-3 py-1">
          Crypto Hardware Lock: 99.85%
        </Badge>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Chipset Tiers */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">Chipset & Rendering Tiers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {chipsetTierData.map((item) => (
              <div key={item.chip} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.chip}</span>
                  <span className="font-mono text-[#3B82F6] font-bold">{item.share}%</span>
                </div>
                <Progress value={item.share} className="h-1.5 bg-white/5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Carrier Latency */}
        <Card className="bg-[#111111] border-white/[0.06]">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-white">Carrier Network Latency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {carrierLatencyData.map((item) => (
              <div key={item.carrier} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white">{item.carrier}</p>
                  <p className="text-[10px] font-mono text-[#888888]">Ping Latency: <strong className="text-[#10B981]">{item.latency}</strong></p>
                </div>
                <Badge className="bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20 font-mono text-xs">
                  {item.integrity} Integrity
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Hardware Attestation Grid */}
      <Card className="bg-[#111111] border-white/[0.06]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-white">Hardware Cryptographic Attestation Verdicts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hardwareAttestationNodes.map((n) => (
            <div key={n.node} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
              <p className="text-xs font-medium text-white">{n.node}</p>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#888888]">{n.status}</span>
                <span className="text-[#10B981] font-bold">{n.passRate}% Pass</span>
              </div>
              <Progress value={n.passRate} className="h-1.5 bg-white/5" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

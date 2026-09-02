"use client"

import { ActivityIcon, ShieldCheckIcon, CpuIcon, LayersIcon } from "lucide-react"

export function LiveTicker() {
  return (
    <div className="w-full border-b bg-card/60 px-4 py-2 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-400">DSP RTB ENGINE LIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-muted-foreground font-mono">
            <ActivityIcon className="size-3.5 text-primary" />
            <span>Ingestion Rate:</span>
            <span className="font-semibold text-foreground">14,820 req/s</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-muted-foreground font-mono">
            <ShieldCheckIcon className="size-3.5 text-emerald-500" />
            <span>Anti-Fraud Score:</span>
            <span className="font-semibold text-emerald-500">99.8% Clean</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-muted-foreground font-mono">
            <CpuIcon className="size-3.5 text-blue-400" />
            <span>OEM Knox Sync:</span>
            <span className="font-semibold text-foreground">28.4M Devices</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono">
          <span>Latency: <strong className="text-foreground">12ms</strong></span>
          <span>Target Market: <strong className="text-foreground">Global Tier 1/2/3</strong></span>
        </div>
      </div>
    </div>
  )
}

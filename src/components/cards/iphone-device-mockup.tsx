"use client"

import { motion } from "motion/react"
import { ShieldCheckIcon, CpuIcon, SignalIcon, WifiIcon, ActivityIcon, ServerIcon } from "lucide-react"

interface IphoneDeviceMockupProps {
  cardName: string
  last4: string
  status: string
  dailyLimit: number
}

export function IphoneDeviceMockup({ cardName, last4, status, dailyLimit }: IphoneDeviceMockupProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* 3D DSP Node Container */}
      <motion.div
        initial={{ rotateY: -12, rotateX: 6, scale: 0.95 }}
        animate={{ rotateY: 0, rotateX: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative h-[380px] w-[210px] rounded-[38px] border-[6px] border-neutral-800 bg-neutral-950 p-2.5 shadow-2xl shadow-primary/20 ring-1 ring-white/10"
      >
        {/* Top Status Bar */}
        <div className="absolute left-1/2 top-3 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black z-20 flex items-center justify-between px-2">
          <div className="size-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <div className="size-1.5 rounded-full bg-cyan-500/80" />
        </div>

        {/* Screen Content */}
        <div className="flex h-full w-full flex-col justify-between rounded-[30px] bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-3.5 pt-6 text-foreground overflow-hidden">
          {/* Screen Top Status */}
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1">
            <span>RTB-NODE-01</span>
            <div className="flex items-center gap-1">
              <SignalIcon className="size-3 text-emerald-400" />
              <WifiIcon className="size-3 text-emerald-400" />
            </div>
          </div>

          {/* On-Device Resolution Card */}
          <div className="space-y-3 my-auto">
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
              <ShieldCheckIcon className="size-3.5" /> DSP Node Connected
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold truncate max-w-[120px]">{cardName}</span>
                <ServerIcon className="size-4 text-emerald-400 shrink-0" />
              </div>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground tracking-wider">
                NODE-{last4}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono">
                <span className="text-muted-foreground">AUCTION LATENCY</span>
                <span className="text-emerald-400 font-bold">1.2ms SUB-2ms</span>
              </div>
            </div>

            {/* Ingestion Metric */}
            <div className="rounded-lg bg-secondary/40 p-2.5 border border-white/5 font-mono">
              <p className="text-[9px] uppercase font-semibold text-muted-foreground">QPS Request Capacity</p>
              <p className="text-sm font-bold text-foreground mt-0.5">
                {dailyLimit.toLocaleString("en-US")} <span className="text-[9px] font-normal text-muted-foreground">REQ/SEC</span>
              </p>
            </div>
          </div>

          {/* Screen Bottom Dock */}
          <div className="flex items-center justify-center pt-2">
            <div className="h-1 w-20 rounded-full bg-white/30" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

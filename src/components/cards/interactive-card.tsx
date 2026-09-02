"use client"

import { CpuIcon, ShieldCheckIcon, LockIcon, KeyIcon, ActivityIcon, RadioIcon, LayersIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/seed"

interface InteractiveCardProps {
  card: CardData
  frozen: boolean
}

export function InteractiveCard({
  card,
  frozen,
}: InteractiveCardProps) {
  return (
    <div className="w-full sm:max-w-[400px]">
      <div
        className={cn(
          "relative flex flex-col justify-between rounded-2xl p-6 border shadow-xl transition-all",
          card.color || "bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-950 border-slate-800 text-slate-100"
        )}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <LayersIcon className="size-4" />
            </div>
            <span className="text-sm font-bold tracking-tight">{card.name}</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPENRTB 2.5 KEY
          </span>
        </div>

        {/* Middle Hardware Specs */}
        <div className="my-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <KeyIcon className="size-3.5 text-primary" />
            <span>Auction Clearing Hash:</span>
          </div>
          <p className="font-mono text-base font-bold tracking-wider text-foreground">
            {card.cardNumber}
          </p>
          <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono pt-1">
            <span>Latency: <strong className="text-emerald-400">{card.cvv || "1.2ms"}</strong></span>
            <span>Clearing: <strong className="text-primary">100% RTB Verified</strong></span>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="flex items-end justify-between border-t border-white/10 pt-4 text-xs font-mono">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase block">SSP Exchange Partner</span>
            <span className="font-semibold text-foreground">{card.holder}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-muted-foreground uppercase block">Auth Protocol</span>
            <span className="font-bold text-primary">{card.expiry || "AES-256 HMAC"}</span>
          </div>
        </div>

        {frozen && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm">
            <span className="flex items-center gap-1.5 text-xs font-bold text-destructive font-mono">
              <LockIcon className="size-4" /> Bidding Paused
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

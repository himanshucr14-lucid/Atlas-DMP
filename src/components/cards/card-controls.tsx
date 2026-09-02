"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CardData } from "@/data/seed"

interface CardControlsProps {
  card: CardData
  frozen: boolean
  onToggleFreeze: () => void
  dailyLimit: number
  onDailyLimitChange: (val: number) => void
}

function formatQps(value: number): string {
  return `${value.toLocaleString()} REQ/SEC`
}

export function CardControls({
  card,
  frozen,
  onToggleFreeze,
  dailyLimit,
  onDailyLimitChange,
}: CardControlsProps) {
  const spendPercent =
    card.monthlyLimit > 0
      ? Math.round((card.monthlySpend / card.monthlyLimit) * 100)
      : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">DSP Bidder & Clearing Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* ── Bidding Toggle ── */}
        <div className="flex items-center justify-between font-mono">
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-foreground">Bidding Clearing Status</p>
            <p
              className={cn(
                "text-[11px]",
                frozen ? "text-destructive font-bold" : "text-emerald-400 font-bold",
              )}
            >
              {frozen ? "Paused (Bids Suppressed)" : "Active (Clearing OpenRTB 2.5)"}
            </p>
          </div>
          <Switch
            checked={frozen}
            onCheckedChange={(checked) => {
              if (checked !== frozen) onToggleFreeze()
            }}
          />
        </div>

        {/* ── QPS Capacity Limit ── */}
        <div className="space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground">Target QPS Cap (Req/s)</p>
            <span className="text-xs font-bold tabular-nums text-primary">
              {formatQps(dailyLimit)}
            </span>
          </div>
          <Slider
            value={[dailyLimit]}
            min={1000}
            max={50000}
            step={1000}
            onValueChange={(value) => {
              const v = Array.isArray(value) ? value[0] : value
              onDailyLimitChange(v)
            }}
          />
          <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
            <span>1,000 REQ/S</span>
            <span>50,000 REQ/S</span>
          </div>
        </div>

        {/* ── Monthly Allocation ── */}
        <div className="space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-foreground font-sans">Monthly QPS Capacity</p>
            <span className="text-xs text-muted-foreground tabular-nums">
              {spendPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                spendPercent >= 90
                  ? "bg-destructive"
                  : spendPercent >= 70
                    ? "bg-amber-500"
                    : "bg-primary",
              )}
              style={{ width: `${Math.min(spendPercent, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
            <span>{formatQps(card.monthlySpend)}</span>
            <span>{formatQps(card.monthlyLimit)}</span>
          </div>
        </div>

        {/* ── Security Specs ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground font-mono">Protocol & Security</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="font-mono text-[10px]">
              OpenRTB 2.5 Compliant
            </Badge>
            <Badge variant="outline" className="font-mono text-[10px] uppercase border-emerald-500/30 text-emerald-400">
              AES-256 HMAC Auth
            </Badge>
            <span className="text-[10px] text-muted-foreground font-mono">
              KEY-ID: {card.last4}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { SlidersIcon, UsersIcon, DollarSignIcon, AwardIcon, TrendingUpIcon } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChannelAllocation {
  channel: string
  allocation: number
  rationale: string
}

interface BudgetSimulatorProps {
  allocations: ChannelAllocation[]
  predictedKPIs: {
    estimatedCPI: string
    estimatedCTR: string
    estimatedCVR: string
    estimatedROAS: string
  }
}

export default function BudgetSimulator({ allocations, predictedKPIs }: BudgetSimulatorProps) {
  const parseRange = (val: string, fallback: number): number => {
    try {
      const clean = val.replace(/[^0-9.-]/g, "")
      if (clean.includes("-")) {
        const parts = clean.split("-").map(Number)
        return (parts[0] + parts[1]) / 2
      }
      return Number(clean) || fallback
    } catch {
      return fallback
    }
  }

  const cpiBaseline = parseRange(predictedKPIs.estimatedCPI, 0.85)
  const ctrBaseline = parseRange(predictedKPIs.estimatedCTR, 2.4) / 100
  const cvrBaseline = parseRange(predictedKPIs.estimatedCVR, 12.8) / 100
  const roasBaseline = parseRange(predictedKPIs.estimatedROAS, 2.14)

  const [budget, setBudget] = useState(25000)
  const [cpi, setCpi] = useState(cpiBaseline)
  const [targetRoas, setTargetRoas] = useState(roasBaseline)

  const installs = Math.round(budget / Math.max(0.1, cpi))
  const clicks = Math.round(installs / Math.max(0.01, cvrBaseline))
  const impressions = Math.round(clicks / Math.max(0.001, ctrBaseline))
  const projectedRevenue = budget * targetRoas
  const netProfit = projectedRevenue - budget

  const colors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"]
  const chartData = allocations.map((item, idx) => ({
    name: item.channel,
    value: Math.round((budget * item.allocation) / 100),
    percentage: item.allocation,
    color: colors[idx % colors.length],
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SlidersIcon className="size-4" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Media Planning & Financial Simulator</CardTitle>
            <p className="text-xs text-muted-foreground">Interactive budget projections & programmatic yield modeling</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          {/* Sliders */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {/* Monthly Ad Budget Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Monthly Ad Budget</span>
                  <span className="font-mono font-bold text-emerald-500">${budget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>$5K</span>
                  <span>$250K</span>
                  <span>$500K</span>
                </div>
              </div>

              {/* Cost Per Action (CPA/CPI) Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Target Cost Per Action (CPI)</span>
                  <span className="font-mono font-bold text-blue-400">${cpi.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.20"
                  max="10.00"
                  step="0.05"
                  value={cpi}
                  onChange={(e) => setCpi(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>$0.20</span>
                  <span>$5.00</span>
                  <span>$10.00</span>
                </div>
              </div>

              {/* Target ROAS Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Target ROAS Multiple</span>
                  <span className="font-mono font-bold text-amber-400">{targetRoas.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={targetRoas}
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-muted appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>0.5x</span>
                  <span>2.5x</span>
                  <span>5.0x</span>
                </div>
              </div>
            </div>

            {/* Rationale List */}
            <div className="rounded-xl border bg-muted/30 p-3 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Allocation Rationale</p>
              <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xs">
                {allocations.map((item, idx) => (
                  <p key={idx} className="text-muted-foreground">
                    <span className="font-semibold text-foreground">{item.channel}:</span> {item.rationale}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics & Pie Chart */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <UsersIcon className="size-3.5" />
                  <span>Projected Installs</span>
                </div>
                <p className="font-mono text-lg font-bold text-foreground mt-1">{installs.toLocaleString()}</p>
              </div>

              <div className="rounded-xl border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <DollarSignIcon className="size-3.5" />
                  <span>Gross Revenue</span>
                </div>
                <p className="font-mono text-lg font-bold text-emerald-500 mt-1">${Math.round(projectedRevenue).toLocaleString()}</p>
              </div>

              <div className="rounded-xl border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <AwardIcon className="size-3.5" />
                  <span>Net Campaign Yield</span>
                </div>
                <p className={`font-mono text-lg font-bold mt-1 ${netProfit >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                  ${Math.round(netProfit).toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl border bg-muted/30 p-3">
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                  <TrendingUpIcon className="size-3.5" />
                  <span>Impressions Needed</span>
                </div>
                <p className="font-mono text-lg font-bold text-foreground mt-1">{impressions.toLocaleString()}</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="relative flex items-center justify-center h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] text-muted-foreground uppercase font-medium">Budget</span>
                <span className="font-mono text-sm font-bold text-foreground">${budget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

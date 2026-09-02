"use client"

import { useState } from "react"
import { accountCards, walletBalance } from "@/data/seed"
import {
  DatabaseIcon,
  ActivityIcon,
  CpuIcon,
  TrendingUpIcon,
  PlusIcon,
  CheckCircle2Icon,
  LoaderCircleIcon,
  XIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const sourceIcons = [
  <DatabaseIcon key="1" className="size-4 text-emerald-400" />,
  <ActivityIcon key="2" className="size-4 text-cyan-400" />,
  <CpuIcon key="3" className="size-4 text-purple-400" />,
]

export function AccountCards() {
  const [sources, setSources] = useState(accountCards)
  const [adding, setAdding] = useState(false)
  const [newSourceName, setNewSourceName] = useState("")

  const handleAdd = () => {
    if (!newSourceName.trim()) return
    const newSource = {
      id: String(sources.length + 1),
      label: newSourceName,
      balance: "12,500,000",
      currency: "signals",
      variant: "default" as const,
    }
    setSources((prev) => [...prev, newSource])
    setNewSourceName("")
    setAdding(false)
  }

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Data Sources & Ingestion Streams</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 text-xs"
            onClick={() => setAdding(!adding)}
          >
            {adding ? <XIcon className="size-3" /> : <PlusIcon className="size-3" />}
            {adding ? "Cancel" : "Add Source"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Form */}
        <AnimatePresence>
          {adding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex gap-2 overflow-hidden pb-2"
            >
              <Input
                placeholder="New Data Source Name..."
                value={newSourceName}
                onChange={(e) => setNewSourceName(e.target.value)}
                className="h-8 text-xs font-mono"
              />
              <Button size="sm" className="h-8 text-xs" onClick={handleAdd}>
                Connect
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Sources List */}
        <div className="space-y-2.5">
          {sources.map((src, i) => (
            <div
              key={src.id}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 p-3 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-background border shadow-xs">
                  {sourceIcons[i % sourceIcons.length]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{src.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">SRC-{src.id}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-bold tabular-nums text-foreground">
                  {src.balance} <span className="text-[10px] font-normal text-muted-foreground">signals</span>
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] font-medium text-emerald-500">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Profiles Summary */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-muted-foreground">Unified Customer Profiles</p>
              <p className="text-xl font-bold tabular-nums text-foreground">
                {walletBalance.amount.toLocaleString("en-US")}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-500">
              <TrendingUpIcon className="size-3.5" />
              +{walletBalance.changePercent}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

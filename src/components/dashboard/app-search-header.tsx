"use client"

import { useState } from "react"
import { SearchIcon, SparklesIcon, ZapIcon, LayersIcon, Loader2Icon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import LoadingExperience from "@/components/LoadingExperience"
import type { AIEngineResult } from "@/lib/connectors/types"

const DEMO_PRESETS = [
  { name: "Duolingo", url: "https://play.google.com/store/apps/details?id=com.duolingo" },
  { name: "Tinder", url: "https://apps.apple.com/app/id547702041" },
  { name: "Candy Crush", url: "https://play.google.com/store/apps/details?id=com.king.candycrushsaga" },
  { name: "Spotify", url: "https://apps.apple.com/app/id324684580" },
]

interface AppSearchHeaderProps {
  onAnalysisComplete?: (data: AIEngineResult) => void
}

export function AppSearchHeader({ onAnalysisComplete }: AppSearchHeaderProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [analyzedApp, setAnalyzedApp] = useState<AIEngineResult | null>(null)
  const [errorMsg, setErrorMsg] = useState("")

  const handleAnalyze = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    setErrorMsg("")
    setLoading(true)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlOrId: searchQuery.trim() }),
      })

      if (!res.ok) {
        throw new Error("Analysis failed. Please check the URL or try again.")
      }

      const data = (await res.json()) as AIEngineResult
      setAnalyzedApp(data)
      onAnalysisComplete?.(data)
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to analyze app")
    } finally {
      setLoading(false)
    }
  }

  const appMeta = analyzedApp?.metadata
  const appOverview = analyzedApp?.overview
  const kpis = analyzedApp?.kpiProjections

  return (
    <div className="flex flex-col gap-4">
      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <LoadingExperience onComplete={() => {}} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Card */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SparklesIcon className="size-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-tight">App Intelligence Search</h2>
                <p className="text-xs text-muted-foreground">
                  Paste any App Store URL, Package ID, or Store ID for live Gemini campaign analysis
                </p>
              </div>
            </div>
            <Badge variant="outline" className="hidden sm:flex gap-1 text-[10px]">
              <ZapIcon className="size-3 text-primary" /> Live Gemini Engine
            </Badge>
          </div>

          {/* Search Input Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze(query)}
                placeholder="Paste App URL (e.g. https://play.google.com/store/apps/details?id=com.duolingo)..."
                className="h-10 pl-9 pr-4 text-xs font-mono"
              />
            </div>
            <Button
              onClick={() => handleAnalyze(query)}
              disabled={loading || !query.trim()}
              className="h-10 gap-2 px-5 text-xs font-semibold"
            >
              {loading ? <Loader2Icon className="size-3.5 animate-spin" /> : <SparklesIcon className="size-3.5" />}
              Analyze App
            </Button>
          </div>

          {/* Presets Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
            <span className="text-[11px] font-medium">Quick Presets:</span>
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setQuery(preset.url)
                  handleAnalyze(preset.url)
                }}
                className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {preset.name}
              </button>
            ))}
          </div>

          {errorMsg && (
            <p className="text-xs font-medium text-destructive">{errorMsg}</p>
          )}
        </CardContent>
      </Card>

      {/* Scanned App Banner */}
      {analyzedApp && appMeta && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border bg-card p-4"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {appMeta.icon ? (
                <img
                  src={appMeta.icon}
                  alt={appMeta.scannedApp}
                  className="size-12 rounded-xl border object-cover"
                />
              ) : (
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <LayersIcon className="size-6" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">{appMeta.scannedApp}</h3>
                  <Badge variant="secondary" className="text-[10px]">
                    {appMeta.platform === "ios" ? "🍎 iOS" : "🤖 Android"}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span>{appOverview?.primaryMarket || "Global"}</span>
                  <span>•</span>
                  <span>{appMeta.installs ? `${appMeta.installs} Installs` : "Active Campaign"}</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-500">
                    Readiness: {appOverview?.campaignReadinessScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* KPI Metrics */}
            {kpis && (
              <div className="grid grid-cols-3 gap-3 border-t pt-3 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Target CPI</p>
                  <p className="font-mono text-sm font-bold text-emerald-500">{kpis.estimatedCPI}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Est. CPM</p>
                  <p className="font-mono text-sm font-bold">{kpis.estimatedCPM}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Target ROAS</p>
                  <p className="font-mono text-sm font-bold text-primary">{kpis.estimatedROAS}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

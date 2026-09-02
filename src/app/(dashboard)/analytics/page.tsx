"use client"

import { useState, useEffect } from "react"
import { ActiveAppHeaderBanner } from "@/components/dashboard/active-app-header-banner"
import { SiteIdAudit } from "@/components/dashboard/site-id-audit"
import { AiInsights } from "@/components/analytics/ai-insights"
import type { AIEngineResult } from "@/lib/connectors/types"

export default function Page() {
  const [analyzedData, setAnalyzedData] = useState<AIEngineResult | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("active_ai_analysis")
      if (stored) {
        try {
          setAnalyzedData(JSON.parse(stored))
        } catch {}
      }
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
      <ActiveAppHeaderBanner data={analyzedData} />
      <SiteIdAudit data={analyzedData} />
      <AiInsights />
    </div>
  )
}

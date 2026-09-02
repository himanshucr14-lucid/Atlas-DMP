"use client"

import { useState, useEffect } from "react"
import { ActiveAppHeaderBanner } from "@/components/dashboard/active-app-header-banner"
import { AdPlacementShowcase } from "@/components/dashboard/ad-placement-showcase"
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
      <AdPlacementShowcase data={analyzedData} />
    </div>
  )
}

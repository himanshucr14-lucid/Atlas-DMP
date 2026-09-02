"use client"

import { useState, useEffect } from "react"
import type { AIEngineResult } from "@/lib/connectors/types"

export function useActiveAIAnalysis() {
  const [data, setData] = useState<AIEngineResult | null>(null)

  useEffect(() => {
    const loadCached = () => {
      const cached = sessionStorage.getItem("active_ai_analysis")
      if (cached) {
        try {
          setData(JSON.parse(cached))
        } catch (e) {
          console.error("Failed to parse cached AI analysis:", e)
        }
      }
    }

    loadCached()

    // Listen for storage changes if analysis is updated
    window.addEventListener("storage", loadCached)
    return () => window.removeEventListener("storage", loadCached)
  }, [])

  return data
}

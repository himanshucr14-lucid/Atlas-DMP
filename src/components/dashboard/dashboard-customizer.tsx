"use client"

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DmpTopNavigation, AppOption } from "@/components/dashboard/dmp-top-navigation"
import { ActiveAppHeaderBanner } from "@/components/dashboard/active-app-header-banner"
import { ExecutiveBenchmarkOverview } from "@/components/dashboard/executive-benchmark-overview"
import { OperationalIntelligenceSuite } from "@/components/dashboard/operational-intelligence-suite"
import { DmpSelfPromotionShowcase } from "@/components/dashboard/dmp-self-promotion-showcase"
import type { AIEngineResult } from "@/lib/connectors/types"
import { motion, AnimatePresence } from "framer-motion"

export function DashboardCustomizer() {
  const [analyzedData, setAnalyzedData] = useState<AIEngineResult | null>(null)
  const [selectedApp, setSelectedApp] = useState<AppOption | null>(null)
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const activeSection = searchParams.get("section") || "audience-intent"

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

  // Triggered when user clicks the Search button in the top navigation bar
  const handleSearchSubmit = (app: AppOption, countries: string[], query: string) => {
    setSelectedApp(app)
    setFilteredCountries(countries)
    setSearchQuery(query)
    setIsDataLoaded(true)
  }

  return (
    <div className="flex flex-1 flex-col gap-0 p-0 bg-[#0A0A0A] min-h-screen">
      {/* Top Navigation Bar with Flow & Border Spacing */}
      <DmpTopNavigation
        onSearchSubmit={handleSearchSubmit}
        onCountryFilterChange={(codes) => setFilteredCountries(codes)}
      />

      <div className="p-4 space-y-6">
        <AnimatePresence mode="wait">
          {!isDataLoaded ? (
            /* Pre-Search State: High-Impact Self-Promotion Presentation Suite */
            <motion.div
              key="self-promotion-showcase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <DmpSelfPromotionShowcase />
            </motion.div>
          ) : (
            /* Loaded State: Renders App Header Banner, Benchmark Overview & Intelligence Suite */
            <motion.div
              key="loaded-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {searchParams.has("section") ? (
                <div>
                  <OperationalIntelligenceSuite data={analyzedData} activeSectionId={activeSection} />
                </div>
              ) : (
                <div className="space-y-6">
                  <ActiveAppHeaderBanner data={analyzedData} selectedAppOption={selectedApp} />
                  <ExecutiveBenchmarkOverview data={analyzedData} />
                  <OperationalIntelligenceSuite data={analyzedData} activeSectionId="audience-intent" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

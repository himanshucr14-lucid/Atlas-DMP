"use client"

import * as React from "react"
import { DmpTopNavigation, AppOption } from "@/components/dashboard/dmp-top-navigation"

interface GlobalFilterBarProps {
  onAppChange?: (app: string) => void
  onTimeframeChange?: (timeframe: string) => void
  onRegionChange?: (region: string) => void
}

export function GlobalFilterBar({
  onAppChange,
  onTimeframeChange,
  onRegionChange,
}: GlobalFilterBarProps) {
  const handleSearchSubmit = (app: AppOption, codes: string[]) => {
    onAppChange?.(app.id)
    onRegionChange?.(codes.join(","))
  }

  const handleCountryFilterChange = (codes: string[]) => {
    onRegionChange?.(codes.join(","))
  }

  return (
    <DmpTopNavigation
      onSearchSubmit={handleSearchSubmit}
      onCountryFilterChange={handleCountryFilterChange}
    />
  )
}

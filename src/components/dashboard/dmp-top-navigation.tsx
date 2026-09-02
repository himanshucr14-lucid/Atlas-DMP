"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Globe,
  X,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// ─── DATA TYPES & DATASET ───────────────────────────────────────────────────

export interface CountryMarket {
  code: string // 3-letter ISO code (e.g., "IND", "USA", "CAN", "MEX")
  name: string // Full Country Name
  flag: string // Flag Emoji / SVG Icon
}

export interface AppOption {
  id: string
  name: string
  verticalId: string
  verticalName: string
  icon: string
  developer: string
  category: string
  installs: string
  rating: number
  reviewsCount: number
  platform: "android" | "ios"
  countries: CountryMarket[]
}

export interface VerticalOption {
  id: string
  name: string
  icon: string
}

// ─── 1. INDUSTRY VERTICALS ──────────────────────────────────────────────────
export const VERTICALS: VerticalOption[] = [
  { id: "fintech", name: "Fintech & Banking", icon: "💳" },
  { id: "crypto", name: "Crypto & Web3", icon: "🪙" },
  { id: "gaming", name: "Gaming & Interactive", icon: "🎮" },
  { id: "health", name: "Health & Medical", icon: "🩺" },
  { id: "entertainment", name: "Entertainment & Media", icon: "🍿" },
  { id: "social", name: "Social & Dating", icon: "💬" },
]

// ─── 2. APPS DATASET WITH DYNAMIC ISO COUNTRY LISTS ─────────────────────────
export const APPS_DATASET: AppOption[] = [
  // ── Fintech ──
  {
    id: "floatme",
    name: "FloatMe: Instant Cash Advance",
    verticalId: "fintech",
    verticalName: "Fintech & Banking",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/43/91/b6439159-24f3-5c7b-afe5-77f6e03ae20d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    developer: "FloatMe Corp",
    category: "Fintech & Advance Pay",
    installs: "10,000,000+",
    rating: 4.7,
    reviewsCount: 520000,
    platform: "android",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
      { code: "MEX", name: "Mexico", flag: "🇲🇽" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
    ],
  },
  {
    id: "earnin",
    name: "EarnIn: Your Money in Advance",
    verticalId: "fintech",
    verticalName: "Fintech & Banking",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/bf/fb/14/bffb145a-c603-fb94-1a97-9e4719b0d1e3/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Activehours Inc",
    category: "Fintech & Payroll Advance",
    installs: "10,000,000+",
    rating: 4.6,
    reviewsCount: 480000,
    platform: "ios",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
    ],
  },
  {
    id: "dave",
    name: "Dave: Banking & Micro Cash",
    verticalId: "fintech",
    verticalName: "Fintech & Banking",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/fa/1c/02/fa1c0282-3d74-c361-9c3f-4e0d9b4b0a0a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Dave Inc",
    category: "Fintech & Personal Finance",
    installs: "10,000,000+",
    rating: 4.8,
    reviewsCount: 610000,
    platform: "android",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
    ],
  },
  {
    id: "chime",
    name: "Chime: Mobile Banking",
    verticalId: "fintech",
    verticalName: "Fintech & Banking",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/10/7b/09/107b0959-1e35-5154-7221-50eef58ab837/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Chime Financial Inc",
    category: "Neobanking & Spending",
    installs: "25,000,000+",
    rating: 4.8,
    reviewsCount: 890000,
    platform: "android",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
    ],
  },

  // ── Crypto ──
  {
    id: "bybit",
    name: "Bybit: Crypto Trading & Web3",
    verticalId: "crypto",
    verticalName: "Crypto & Web3",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/4a/12/35/4a1235ee-82eb-3774-6725-b4618e4efbc2/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Bybit Fintech",
    category: "Crypto Exchange & Spot",
    installs: "50,000,000+",
    rating: 4.7,
    reviewsCount: 750000,
    platform: "android",
    countries: [
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "ARE", name: "United Arab Emirates", flag: "🇦🇪" },
      { code: "SGP", name: "Singapore", flag: "🇸🇬" },
      { code: "IDN", name: "Indonesia", flag: "🇮🇩" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "JPN", name: "Japan", flag: "🇯🇵" },
    ],
  },
  {
    id: "binance",
    name: "Binance: BTC & Crypto Exchange",
    verticalId: "crypto",
    verticalName: "Crypto & Web3",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f2/8e/31/f28e31a8-8b98-3860-2394-b1eb2f01a0a5/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Binance Inc",
    category: "Crypto Exchange",
    installs: "100,000,000+",
    rating: 4.6,
    reviewsCount: 1400000,
    platform: "android",
    countries: [
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "FRA", name: "France", flag: "🇫🇷" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "JPN", name: "Japan", flag: "🇯🇵" },
      { code: "ARE", name: "United Arab Emirates", flag: "🇦🇪" },
      { code: "SGP", name: "Singapore", flag: "🇸🇬" },
      { code: "MEX", name: "Mexico", flag: "🇲🇽" },
      { code: "TUR", name: "Turkey", flag: "🇹🇷" },
    ],
  },
  {
    id: "coinbase",
    name: "Coinbase: Buy Bitcoin & Ether",
    verticalId: "crypto",
    verticalName: "Crypto & Web3",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/58/01/5e/58015e1a-3e12-4015-8c01-7290fa8b2b1a/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Coinbase Global",
    category: "Crypto Exchange & Wallet",
    installs: "50,000,000+",
    rating: 4.7,
    reviewsCount: 920000,
    platform: "ios",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "AUS", name: "Australia", flag: "🇦🇺" },
    ],
  },

  // ── Gaming ──
  {
    id: "candycrush",
    name: "Candy Crush Saga",
    verticalId: "gaming",
    verticalName: "Gaming & Interactive",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/91/42/1d/91421d01-e6e2-2f3b-6385-3b02227d81a9/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
    developer: "King Games",
    category: "Casual Match-3 Puzzle",
    installs: "1,000,000,000+",
    rating: 4.6,
    reviewsCount: 34000000,
    platform: "android",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "JPN", name: "Japan", flag: "🇯🇵" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "FRA", name: "France", flag: "🇫🇷" },
      { code: "ESP", name: "Spain", flag: "🇪🇸" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
      { code: "AUS", name: "Australia", flag: "🇦🇺" },
      { code: "MEX", name: "Mexico", flag: "🇲🇽" },
      { code: "KOR", name: "South Korea", flag: "🇰🇷" },
    ],
  },
  {
    id: "subway",
    name: "Subway Surfers",
    verticalId: "gaming",
    verticalName: "Gaming & Interactive",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/ca/87/90/ca87900b-e4a0-53ab-b8eb-9d95514f77c3/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    developer: "SYBO Games",
    category: "Endless Runner Action",
    installs: "1,000,000,000+",
    rating: 4.5,
    reviewsCount: 42000000,
    platform: "android",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "MEX", name: "Mexico", flag: "🇲🇽" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "IDN", name: "Indonesia", flag: "🇮🇩" },
      { code: "PHL", name: "Philippines", flag: "🇵🇭" },
    ],
  },

  // ── Health & Fitness ──
  {
    id: "practo",
    name: "Practo: Book Doctors & Consult",
    verticalId: "health",
    verticalName: "Health & Medical",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/6d/df/ef/6ddfef56-11f4-3d07-29ef-29ee442e6162/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Practo Technologies",
    category: "Telehealth & Clinic Bookings",
    installs: "10,000,000+",
    rating: 4.5,
    reviewsCount: 380000,
    platform: "android",
    countries: [
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "ARE", name: "United Arab Emirates", flag: "🇦🇪" },
      { code: "SGP", name: "Singapore", flag: "🇸🇬" },
      { code: "MYS", name: "Malaysia", flag: "🇲🇾" },
      { code: "KSA", name: "Saudi Arabia", flag: "🇸🇦" },
      { code: "IDN", name: "Indonesia", flag: "🇮🇩" },
    ],
  },
  {
    id: "headspace",
    name: "Headspace: Mindful Meditation",
    verticalId: "health",
    verticalName: "Health & Medical",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/4c/a2/6b/4ca26b64-83eb-5683-1498-8df0c3482df7/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
    developer: "Headspace Inc",
    category: "Mental Health & Sleep",
    installs: "10,000,000+",
    rating: 4.8,
    reviewsCount: 290000,
    platform: "ios",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
      { code: "AUS", name: "Australia", flag: "🇦🇺" },
    ],
  },

  // ── Entertainment ──
  {
    id: "spotify",
    name: "Spotify: Music & Podcasts",
    verticalId: "entertainment",
    verticalName: "Entertainment & Media",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/58/e7/7b/58e77b63-8321-4f10-91a1-2679237c7689/AppIcon-0-0-1x_U007emarketing-0-11-0-85-220.png/512x512bb.jpg",
    developer: "Spotify AB",
    category: "Audio Streaming",
    installs: "1,000,000,000+",
    rating: 4.8,
    reviewsCount: 28000000,
    platform: "ios",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "FRA", name: "France", flag: "🇫🇷" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "JPN", name: "Japan", flag: "🇯🇵" },
      { code: "CAN", name: "Canada", flag: "🇨🇦" },
    ],
  },

  // ── Social & Dating ──
  {
    id: "tinder",
    name: "Tinder: Dating & Matchmaking",
    verticalId: "social",
    verticalName: "Social & Dating",
    icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d9/3a/06/d93a06fa-a83d-3f0e-3652-32a2254e0c4a/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
    developer: "Match Group",
    category: "Social Matchmaking",
    installs: "500,000,000+",
    rating: 4.4,
    reviewsCount: 6100000,
    platform: "ios",
    countries: [
      { code: "USA", name: "United States", flag: "🇺🇸" },
      { code: "GBR", name: "United Kingdom", flag: "🇬🇧" },
      { code: "FRA", name: "France", flag: "🇫🇷" },
      { code: "DEU", name: "Germany", flag: "🇩🇪" },
      { code: "BRA", name: "Brazil", flag: "🇧🇷" },
      { code: "IND", name: "India", flag: "🇮🇳" },
      { code: "JPN", name: "Japan", flag: "🇯🇵" },
      { code: "AUS", name: "Australia", flag: "🇦🇺" },
    ],
  },
]

interface DmpTopNavigationProps {
  onSearchSubmit?: (app: AppOption, countries: string[], query: string) => void
  onCountryFilterChange?: (selectedCountryCodes: string[]) => void
}

export function DmpTopNavigation({
  onSearchSubmit,
  onCountryFilterChange,
}: DmpTopNavigationProps) {
  // ── 1. Flow State (Initially Null / Unselected) ──
  const [selectedVerticalId, setSelectedVerticalId] = useState<string | null>(null)
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Scroll Container Ref for Mouse Wheel Horizontal Scrolling
  const chipsScrollRef = useRef<HTMLDivElement>(null)

  // Available apps for selected vertical
  const availableApps = selectedVerticalId
    ? APPS_DATASET.filter((a) => a.verticalId === selectedVerticalId)
    : []
  const currentApp = selectedAppId ? APPS_DATASET.find((a) => a.id === selectedAppId) || null : null

  // Whenever Vertical Changes -> Unlock Apps Dropdown and reset selection to null
  const handleVerticalChange = (verticalId: string | null) => {
    setSelectedVerticalId(verticalId)
    setSelectedAppId(null) // App selection remains unselected initially!
    setSelectedCountries([])
  }

  // Handle App Change
  const handleAppChange = (appId: string | null) => {
    setSelectedAppId(appId)
    setSelectedCountries([]) // Reset country filter selection
  }

  // Submit Search / Load Data Event
  const triggerSearch = () => {
    if (!currentApp) return
    setIsSearching(true)

    setTimeout(() => {
      setIsSearching(false)
      onSearchSubmit?.(currentApp, selectedCountries, searchQuery)
    }, 400)
  }

  // Toggle Country Selection
  const toggleCountry = (code: string) => {
    let next: string[]
    if (selectedCountries.includes(code)) {
      next = selectedCountries.filter((c) => c !== code)
    } else {
      next = [...selectedCountries, code]
    }
    setSelectedCountries(next)
    onCountryFilterChange?.(next)
  }

  // Mouse wheel horizontal scroll handler
  const handleChipsWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (chipsScrollRef.current) {
      chipsScrollRef.current.scrollLeft += e.deltaY * 0.8
    }
  }

  return (
    <div className="dmp-top-nav sticky top-0 z-30 w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/[0.06] px-4 py-3 shadow-lg transition-all">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* ── LEFT GROUP: Filter Flow (Vertical -> Apps -> Search Input + Search Button) ─── */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          
          {/* Brand Logo Mark */}
          <div className="dmp-nav-divider flex items-center gap-2.5 pr-3.5 border-r border-white/10 shrink-0">
            <div className="size-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center font-mono font-black text-black text-xs shadow-[0_0_12px_rgba(16,185,129,0.35)]">
              AI
            </div>
            <div className="hidden sm:block leading-none">
              <span className="dmp-brand-label-text text-[9px] font-mono text-[#888888] block mb-0.5 uppercase tracking-wider">AdsIdol DMP</span>
              <span className="dmp-brand-name-text text-xs font-bold text-white tracking-tight">Intelligence</span>
            </div>
          </div>

          {/* 1. Industry Vertical Selector */}
          <div className="w-[185px] sm:w-[210px] shrink-0">
            <Select value={selectedVerticalId || ""} onValueChange={(val) => handleVerticalChange(val || null)}>
              <SelectTrigger className="dmp-select-trigger h-9 bg-[#141414] border-white/10 text-xs font-mono text-white focus:ring-0 focus:ring-offset-0 hover:border-white/20 transition-all rounded-xl">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-sm">
                    {VERTICALS.find((v) => v.id === selectedVerticalId)?.icon || "📁"}
                  </span>
                  <span className="truncate font-semibold">
                    {VERTICALS.find((v) => v.id === selectedVerticalId)?.name || "Vertical"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent className="dmp-select-content bg-[#161616] border-white/10 text-white font-mono text-xs z-50 rounded-xl min-w-[230px] w-max p-1 shadow-2xl">
                {VERTICALS.map((v) => (
                  <SelectItem key={v.id} value={v.id} className="focus:bg-[#10B981]/15 focus:text-[#10B981] whitespace-nowrap">
                    <span className="mr-2.5 text-sm">{v.icon}</span>
                    <span className="font-medium text-white">{v.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2. Apps Selector (STRICTLY LOCKED OUT / GREYED OUT UNTIL VERTICAL IS SELECTED) */}
          <div className="w-[195px] sm:w-[220px] shrink-0">
            <Select
              disabled={!selectedVerticalId}
              value={selectedAppId || ""}
              onValueChange={(val) => handleAppChange(val || null)}
            >
              <SelectTrigger
                className={`dmp-select-trigger h-9 text-xs font-mono transition-all rounded-xl border ${
                  !selectedVerticalId
                    ? "bg-[#0A0A0A] border-white/[0.04] text-[#444444] cursor-not-allowed opacity-40 shadow-none"
                    : "bg-[#141414] border-white/10 text-white hover:border-[#10B981]/40 focus:ring-0"
                }`}
              >
                {selectedAppId && currentApp ? (
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={currentApp.icon}
                      alt={currentApp.name}
                      className="size-4 rounded-md object-cover shrink-0"
                    />
                    <span className="truncate text-white font-medium">{currentApp.name.split(":")[0]}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                    {!selectedVerticalId && <Lock className="size-3 text-[#555555]" />}
                    <span className={!selectedVerticalId ? "text-[#555555]" : "text-[#888888]"}>
                      {selectedVerticalId ? "Apps" : "Apps (Select Vertical)"}
                    </span>
                  </div>
                )}
              </SelectTrigger>
              <SelectContent className="dmp-select-content bg-[#161616] border-white/10 text-white font-mono text-xs z-50 rounded-xl min-w-[240px] w-max p-1 shadow-2xl">
                {availableApps.map((a) => (
                  <SelectItem key={a.id} value={a.id} className="focus:bg-[#10B981]/15 focus:text-[#10B981] whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <img src={a.icon} alt={a.name} className="size-4 rounded object-cover shrink-0" />
                      <span className="font-medium text-white">{a.name.split(":")[0]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Search / Load Intelligence Button (DISABLED UNTIL APP IS SELECTED) */}
          <Button
            disabled={!selectedAppId || isSearching}
            onClick={triggerSearch}
            className={`h-9 px-4 text-xs font-mono font-bold rounded-xl transition-all gap-1.5 shadow-lg shrink-0 ${
              !selectedAppId
                ? "bg-white/5 border border-white/[0.05] text-[#444444] cursor-not-allowed opacity-40 shadow-none"
                : "bg-[#10B981] text-black hover:bg-[#10B981]/90 shadow-[0_0_14px_rgba(16,185,129,0.3)]"
            }`}
          >
            {isSearching ? (
              <Sparkles className="size-3.5 animate-spin" />
            ) : (
              <Search className="size-3.5" />
            )}
            <span>Search</span>
          </Button>
        </div>

        {/* ── RIGHT GROUP: Full-Width Active Markets (Countries NOT a dropdown) ─── */}
        <div className="flex items-center gap-3 min-w-0 flex-1 justify-start overflow-hidden">
          
          {/* Active Target Countries (Spans full available width on right side) */}
          {currentApp && currentApp.countries.length > 0 ? (
            <div className="flex items-center gap-2.5 min-w-0 overflow-hidden w-full justify-start">
              {/* Header Label */}
              <div className="dmp-nav-divider flex items-center gap-1.5 text-[11px] font-mono text-[#888888] shrink-0 border-l border-white/10 pl-3">
                <Globe className="size-3.5 text-[#10B981] animate-pulse" />
                <span className="dmp-active-markets-label font-semibold text-white uppercase tracking-wider text-[10px]">
                  Active Markets:
                </span>
              </div>

              {/* Scrollable Country Pills Bar (Uses entire remaining width, Mouse Wheel Support) */}
              <div
                ref={chipsScrollRef}
                onWheel={handleChipsWheel}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 flex-nowrap min-w-0 w-full scroll-smooth"
              >
                {currentApp.countries.map((c) => {
                  const isSelected = selectedCountries.includes(c.code)
                  return (
                    <motion.button
                      key={c.code}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleCountry(c.code)}
                      title={`${c.name} (${c.code}) — Click to filter dashboard`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 border cursor-pointer ${
                        isSelected
                          ? "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/60 shadow-[0_0_12px_rgba(16,185,129,0.3)] ring-1 ring-[#10B981]/30 font-bold"
                          : "dmp-country-pill-default bg-white/[0.04] text-[#A0A0A0] border-white/[0.08] hover:bg-white/[0.08] hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span className="text-xs leading-none">{c.flag}</span>
                      <span className="text-[11px] font-bold font-mono tracking-tight">{c.code}</span>
                      {isSelected && <CheckCircle2 className="size-3 text-[#10B981] ml-0.5" />}
                    </motion.button>
                  )
                })}
              </div>

              {/* Multi-Select Active Badge Count */}
              {selectedCountries.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCountries([])
                    onCountryFilterChange?.([])
                  }}
                  className="shrink-0 text-[10px] font-mono text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 px-2.5 py-1 rounded-full hover:bg-[#8B5CF6]/20 transition-all"
                  title="Clear country filters"
                >
                  {selectedCountries.length} Filtered ×
                </button>
              )}
            </div>
          ) : (
            <div className="dmp-empty-state hidden xl:flex items-center gap-2 text-xs font-mono text-[#555555]">
              <span>Select Vertical & App to view Active Markets</span>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}

"use client"

import React from "react"
import { useRouter } from "next/navigation"
import type { AIEngineResult } from "@/lib/connectors/types"
import type { AppOption } from "@/components/dashboard/dmp-top-navigation"

interface ActiveAppHeaderBannerProps {
  data?: AIEngineResult | null
  selectedAppOption?: AppOption | null
}

export function ActiveAppHeaderBanner({ data, selectedAppOption }: ActiveAppHeaderBannerProps) {
  const router = useRouter()

  const scannedApp = selectedAppOption?.name || data?.metadata?.scannedApp || "FloatMe: Instant Cash Advance"
  const platform = selectedAppOption?.platform || data?.metadata?.platform || "android"
  const icon = selectedAppOption?.icon || data?.metadata?.icon || "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/43/91/b6439159-24f3-5c7b-afe5-77f6e03ae20d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg"
  const installs = selectedAppOption?.installs || data?.metadata?.installs || "10,000,000+"
  const category = selectedAppOption?.category || data?.metadata?.category || "Fintech & Advance Pay"
  const rating = selectedAppOption?.rating || data?.metadata?.rating || 4.7
  const reviewsCount = selectedAppOption?.reviewsCount || data?.metadata?.reviewsCount || 520000
  const developer = selectedAppOption?.developer || data?.metadata?.developer || "FloatMe Corp"

  const isAndroid = platform === "android"

  return (
    <div className="space-y-6">
      {/* Layer 1 Hero: Selected App Header */}
      <div className="rounded-2xl bg-[#111111] p-6 border border-white/[0.05] shadow-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left: App Artwork & Metadata */}
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              {icon ? (
                <img
                  src={icon}
                  alt={scannedApp}
                  className="size-16 rounded-2xl border border-white/10 object-cover bg-black shadow-xl"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white/5 text-white border border-white/10 font-mono font-bold text-xl">
                  DMP
                </div>
              )}
              <span className="absolute -bottom-1 -right-1 flex size-3.5">
                <span className="relative inline-flex size-3.5 rounded-full bg-[#10B981]" />
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono font-medium text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-2.5 py-0.5 rounded-full">
                  Model: AdsIdol-v3.4-Flash
                </span>
                <span className="text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2.5 py-0.5 rounded-full">
                  Confidence: 96.8%
                </span>
                <span className="text-[11px] font-mono text-[#888888] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/[0.04]">
                  Bi-Weekly Batch Sync
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                {scannedApp}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#A0A0A0] font-sans">
                {developer && <span className="text-white font-medium">{developer}</span>}
                {category && (
                  <>
                    <span>•</span>
                    <span className="text-white font-semibold">{category}</span>
                  </>
                )}
                {installs && (
                  <>
                    <span>•</span>
                    <span className="text-[#10B981] font-bold font-mono">{installs} Installs</span>
                  </>
                )}
                {rating && (
                  <>
                    <span>•</span>
                    <span className="text-amber-400 font-bold font-mono">
                      ★ {rating.toFixed(1)}
                      {reviewsCount && <span className="text-[11px] text-[#A0A0A0] font-normal"> ({(reviewsCount / 1000).toFixed(0)}k reviews)</span>}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="flex items-center gap-3 border-t border-white/[0.05] pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <button
              onClick={() => router.push("/")}
              className="rounded-xl bg-white/10 px-5 py-2.5 text-xs font-mono font-bold text-white transition-all hover:bg-white/20 border border-white/10 shadow-lg"
            >
              ANALYZE NEW APP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

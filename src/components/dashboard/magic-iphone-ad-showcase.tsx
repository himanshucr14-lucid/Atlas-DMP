"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Iphone } from "@/registry/magicui/iphone"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  SparklesIcon,
  TvIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  XIcon,
  PlayIcon,
  SignalIcon,
  WifiIcon,
  LayoutIcon,
  PanelBottomIcon,
  NewspaperIcon,
} from "lucide-react"
import type { AIEngineResult } from "@/lib/connectors/types"

interface MagicIphoneAdShowcaseProps {
  data?: AIEngineResult | null
}

type PlacementType = "interstitial" | "banner" | "native"

const placements: { id: PlacementType; label: string; icon: React.ReactNode; cvr: string; scale: string }[] = [
  { id: "interstitial", label: "Full-Screen Interstitial", icon: <LayoutIcon className="size-3.5" />, cvr: "22.4%", scale: "88%" },
  { id: "banner", label: "In-App Banner Dock", icon: <PanelBottomIcon className="size-3.5" />, cvr: "14.8%", scale: "64%" },
  { id: "native", label: "Native In-Feed", icon: <NewspaperIcon className="size-3.5" />, cvr: "12.4%", scale: "52%" },
]

export function MagicIphoneAdShowcase({ data }: MagicIphoneAdShowcaseProps) {
  const appName = data?.metadata?.scannedApp || "FloatMe: Instant Cash Advance"
  const cleanAppName = appName.split(":")[0].trim()
  const appIcon = data?.metadata?.icon || "/placeholder.svg"

  const creativeData = data?.adCreativePreview || {
    headline: "Get Up To $500 Cash Advance",
    subtext: "No credit check required. Fast instant transfer to your bank account.",
    cta: "Get Cash Now",
  }

  const [placement, setPlacement] = useState<PlacementType>("interstitial")
  const [modalOpen, setModalOpen] = useState(false)

  const activePlacement = placements.find(p => p.id === placement)!

  return (
    <Card className="bg-[#111111] border-white/[0.06]">
      <CardHeader className="pb-4 pt-5 px-5">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge className="bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/25 font-mono text-[10px]">
            <TvIcon className="size-3 mr-1 inline" /> 3D Ad Placement Preview
          </Badge>
          <Badge variant="outline" className="border-[#10B981]/25 text-[#10B981] font-mono text-[10px]">
            <CheckCircle2Icon className="size-3 mr-1 inline" /> Interactive Creative
          </Badge>
        </div>
        <CardTitle className="text-[16px] font-bold text-white tracking-tight">
          In-App Ad Placement Preview: <span className="text-[#10B981]">{cleanAppName}</span>
        </CardTitle>
        <p className="text-[12px] text-[#888888]">
          3D device mockup showing contextual in-app ad placement. Switch between formats below.
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-6">
        {/* Placement toggle tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {placements.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlacement(p.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={
                placement === p.id
                  ? { background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.3)" }
                  : { background: "rgba(255,255,255,0.04)", color: "#888888", border: "1px solid rgba(255,255,255,0.06)" }
              }
            >
              {p.icon}{p.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* 3D iPhone */}
          <div className="flex-shrink-0 flex items-center justify-center" style={{ minHeight: 680 }}>
            <Iphone>
              {/* Status bar */}
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-5 pt-10 pb-2">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <SignalIcon className="size-3 text-white" />
                  <WifiIcon className="size-3 text-white" />
                  <span className="text-[9px] text-white font-bold">5G</span>
                </div>
              </div>

              {/* App content behind ad */}
              <div className="flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 mx-2 rounded-2xl p-5 space-y-3 border border-white/5"
                style={{ height: placement === "interstitial" ? 280 : 340 }}
              >
                <div className="size-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center">
                  <PlayIcon className="size-8 text-indigo-300 animate-pulse" />
                </div>
                <p className="text-xs font-bold text-slate-100 font-mono">Puzzle Quest Legend</p>
                <p className="text-[10px] text-slate-400">Level 24 · High Score: 48,200</p>
                <div className="h-1.5 w-28 rounded-full bg-indigo-500/30 overflow-hidden">
                  <div className="h-full w-3/4 bg-indigo-400 rounded-full" />
                </div>
              </div>

              {/* Placement-specific ad content */}
              <AnimatePresence mode="wait">
                {placement === "interstitial" && (
                  <motion.div
                    key="interstitial"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black flex flex-col items-center justify-center p-6 space-y-4"
                    style={{ borderRadius: 42, top: 8, left: 8, right: 8, bottom: 8 }}
                  >
                    {/* Close button */}
                    <button className="absolute top-12 right-4 size-7 rounded-full bg-white/10 flex items-center justify-center">
                      <XIcon className="size-3 text-white/60" />
                    </button>
                    <span className="text-[9px] font-mono text-[#888888] bg-white/5 px-2 py-0.5 rounded">SPONSORED</span>
                    <div className="size-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <img src={appIcon} alt={cleanAppName} className="size-full object-cover" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-base font-extrabold text-white leading-tight">{creativeData.headline}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{creativeData.subtext}</p>
                    </div>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="w-full h-11 rounded-xl bg-[#10B981] text-black font-bold text-sm transition-all hover:bg-[#0ea572]"
                    >
                      {creativeData.cta}
                    </button>
                    <p className="text-[9px] text-slate-500">CVR benchmark: 22.4%</p>
                  </motion.div>
                )}

                {placement === "banner" && (
                  <motion.div
                    key="banner"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-8 left-3 right-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-[#10B981]/40 p-3 shadow-2xl"
                    onClick={() => setModalOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        <img src={appIcon} alt={cleanAppName} className="size-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-0.5">
                          <span className="text-[8px] font-bold text-[#10B981] bg-[#10B981]/10 px-1 py-0.5 rounded font-mono">AD</span>
                          <span className="text-[10px] font-bold text-white truncate">{cleanAppName}</span>
                        </div>
                        <p className="text-[9px] text-slate-400 truncate">{creativeData.headline}</p>
                      </div>
                      <div className="bg-[#10B981] text-black text-[9px] font-bold px-2 py-1 rounded-lg flex-shrink-0">
                        {creativeData.cta}
                      </div>
                    </div>
                  </motion.div>
                )}

                {placement === "native" && (
                  <motion.div
                    key="native"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="mx-2 mt-3 rounded-2xl bg-slate-800/80 border border-white/10 overflow-hidden"
                    onClick={() => setModalOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="px-3 py-2 flex items-center gap-2 border-b border-white/5">
                      <div className="size-7 rounded-full overflow-hidden border border-white/10">
                        <img src={appIcon} alt={cleanAppName} className="size-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-white">{cleanAppName}</p>
                        <p className="text-[8px] text-slate-400">Sponsored</p>
                      </div>
                      <span className="text-[8px] text-[#888888] border border-white/10 px-1 py-0.5 rounded">AD</span>
                    </div>
                    <div className="px-3 py-3 space-y-2">
                      <p className="text-[11px] font-bold text-white leading-snug">{creativeData.headline}</p>
                      <p className="text-[9px] text-slate-400 leading-relaxed">{creativeData.subtext}</p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[8px] text-[#10B981]">CVR benchmark: 12.4%</span>
                        <div className="bg-[#10B981] text-black text-[9px] font-bold px-2 py-0.5 rounded-lg">{creativeData.cta}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Iphone>
          </div>

          {/* Right panel */}
          <div className="flex-1 w-full space-y-4">
            {/* Active placement stats */}
            <div className="rounded-xl bg-[#161616] border border-white/[0.06] p-5 space-y-4">
              <div className="flex items-center gap-2">
                <SparklesIcon className="size-4 text-[#10B981]" />
                <h3 className="text-[14px] font-semibold text-white">Placement Benchmark</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 rounded-xl p-3.5 border border-white/[0.04]">
                  <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-1">Format</p>
                  <p className="text-sm font-bold text-white">{activePlacement.label}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-3.5 border border-white/[0.04]">
                  <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-1">Historical CVR</p>
                  <p className="text-sm font-bold text-[#10B981]">{activePlacement.cvr}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-3.5 border border-white/[0.04]">
                  <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-1">Impression Scale</p>
                  <p className="text-sm font-bold text-[#8B5CF6]">{activePlacement.scale}</p>
                </div>
                <div className="bg-black/40 rounded-xl p-3.5 border border-white/[0.04]">
                  <p className="text-[10px] text-[#888888] uppercase tracking-wider font-medium mb-1">Optimal Window</p>
                  <p className="text-sm font-bold text-[#F59E0B]">19:00–23:00 IST</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/[0.05] space-y-1.5 text-[11px] text-[#888888]">
                <p><span className="text-white font-semibold">Creative Key: </span>{creativeData.headline}</p>
                <p><span className="text-white font-semibold">CTA: </span>{creativeData.cta}</p>
              </div>
            </div>

            {/* All placements summary */}
            <div className="space-y-2">
              {placements.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlacement(p.id)}
                  className="w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all text-left"
                  style={
                    placement === p.id
                      ? { background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)" }
                      : { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }
                  }
                >
                  <div className="flex items-center gap-2">
                    <span style={{ color: placement === p.id ? "#10B981" : "#888888" }}>{p.icon}</span>
                    <span className="text-[12px] font-medium" style={{ color: placement === p.id ? "#fff" : "#888888" }}>{p.label}</span>
                  </div>
                  <span className="text-[12px] font-mono font-bold text-[#10B981]">{p.cvr} CVR</span>
                </button>
              ))}
            </div>

            <Button
              onClick={() => setModalOpen(true)}
              className="w-full h-10 bg-[#10B981] hover:bg-[#0ea572] text-black font-bold text-[13px] transition-all"
            >
              Test Ad Click <ExternalLinkIcon className="size-3.5 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-md rounded-2xl bg-[#111111] border border-white/[0.08] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-3">
                  <img src={appIcon} alt={cleanAppName} className="size-10 rounded-xl object-cover border border-white/10" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{cleanAppName}</h3>
                    <p className="text-[10px] text-[#10B981] font-mono">Simulated Ad Conversion</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-[#888888] hover:text-white transition-colors">
                  <XIcon className="size-5" />
                </button>
              </div>
              <div className="rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 p-5 text-center space-y-3">
                <Badge variant="outline" className="border-[#10B981]/30 text-[#10B981] text-[10px]">Official App Link</Badge>
                <h4 className="text-base font-extrabold text-white">{creativeData.headline}</h4>
                <p className="text-xs text-[#888888]">{creativeData.subtext}</p>
                <Button
                  onClick={() => {
                    if (data?.metadata?.storeUrl) window.open(data.metadata.storeUrl, "_blank")
                    else setModalOpen(false)
                  }}
                  className="w-full h-10 bg-[#10B981] hover:bg-[#0ea572] text-black font-bold text-sm"
                >
                  Open Official Store Listing <ExternalLinkIcon className="size-3.5 ml-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XIcon, ExternalLinkIcon, Star, Zap, TrendingUp, DollarSign, Activity, MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react"
import type { AIEngineResult } from "@/lib/connectors/types"

interface AdPlacementShowcaseProps {
  data?: AIEngineResult | null
}

// ─── Titanium iPhone Frame ────────────────────────────────────────────────
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 216,
        height: 448,
        borderRadius: 38,
        background: "linear-gradient(165deg, #323235 0%, #1E1E20 40%, #121214 100%)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.8)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Metallic Side buttons */}
      <div style={{ position: "absolute", right: -2.5, top: 90, width: 3, height: 48, borderRadius: 2, background: "#3A3A3D", border: "0.5px solid rgba(255,255,255,0.1)" }} />
      <div style={{ position: "absolute", left: -2.5, top: 80, width: 3, height: 28, borderRadius: 2, background: "#3A3A3D", border: "0.5px solid rgba(255,255,255,0.1)" }} />
      <div style={{ position: "absolute", left: -2.5, top: 116, width: 3, height: 44, borderRadius: 2, background: "#3A3A3D", border: "0.5px solid rgba(255,255,255,0.1)" }} />
      <div style={{ position: "absolute", left: -2.5, top: 168, width: 3, height: 44, borderRadius: 2, background: "#3A3A3D", border: "0.5px solid rgba(255,255,255,0.1)" }} />

      {/* Screen bezel */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          right: 6,
          bottom: 6,
          borderRadius: 33,
          overflow: "hidden",
          background: "#000",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Dynamic Island */}
        <div style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: 86,
          height: 22,
          borderRadius: 11,
          background: "#000",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#111", border: "0.5px solid #282828", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 2.5, height: 2.5, borderRadius: "50%", background: "#10B981" }} />
          </div>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#222" }} />
        </div>

        {/* Status bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 40, zIndex: 30, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 16px 4px" }}>
          <span style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div style={{ display: "flex", gap: 1 }}>
              {[3,5,7,9].map(h => <div key={h} style={{ width: 2, height: h, background: "rgba(255,255,255,0.8)", borderRadius: 1 }} />)}
            </div>
            <div style={{ width: 15, height: 7, border: "1px solid rgba(255,255,255,0.6)", borderRadius: 2, padding: "0.5px", display: "flex", alignItems: "center" }}>
              <div style={{ width: "80%", height: "100%", background: "#10B981", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Glass reflection glare */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 40%)",
          zIndex: 50,
          pointerEvents: "none",
          borderRadius: 33,
        }} />

        {/* Inner screen content */}
        <div style={{ position: "absolute", inset: 0, borderRadius: 33 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── App Brand Theme & Logo Resolver ──────────────────────────────────────
function getAppBrandTheme(name: string, category: string) {
  const n = name.toLowerCase()
  const c = category.toLowerCase()

  if (n.includes("subway") || n.includes("candy") || n.includes("ludo") || n.includes("royal") || c.includes("game")) {
    return {
      primary: "#FF2A5F",
      bg: "#FF2A5F15",
      border: "rgba(255,42,95,0.4)",
      badgeBg: "rgba(255,42,95,0.18)",
      glow: "rgba(255,42,95,0.35)",
      ctaText: "#FFFFFF",
      gradient: "linear-gradient(135deg, #FF2A5F 0%, #FF7597 100%)",
      interstitialBg: "linear-gradient(170deg, #1C0512 0%, #2D0A20 50%, #0E0309 100%)",
      adCardBg: "linear-gradient(145deg, rgba(255,42,95,0.18) 0%, rgba(18,22,34,0.95) 100%)",
      bannerBg: "linear-gradient(90deg, #FF2A5F 0%, #E91E63 100%)",
      bannerTextColor: "#FFFFFF",
      bannerCtaBg: "#FFFFFF",
      bannerCtaText: "#000000",
    }
  }
  if (n.includes("practo") || n.includes("1mg") || n.includes("netmeds") || n.includes("apollo") || c.includes("health")) {
    return {
      primary: "#00C49F",
      bg: "#00C49F15",
      border: "rgba(0,196,159,0.4)",
      badgeBg: "rgba(0,196,159,0.18)",
      glow: "rgba(0,196,159,0.35)",
      ctaText: "#000000",
      gradient: "linear-gradient(135deg, #00C49F 0%, #008E73 100%)",
      interstitialBg: "linear-gradient(170deg, #041715 0%, #092C28 50%, #020C0B 100%)",
      adCardBg: "linear-gradient(145deg, rgba(0,196,159,0.18) 0%, rgba(18,22,34,0.95) 100%)",
      bannerBg: "linear-gradient(90deg, #00C49F 0%, #009688 100%)",
      bannerTextColor: "#000000",
      bannerCtaBg: "#000000",
      bannerCtaText: "#FFFFFF",
    }
  }
  if (n.includes("earnin") || n.includes("dave") || n.includes("brigit") || n.includes("chime")) {
    return {
      primary: "#3B82F6",
      bg: "#3B82F615",
      border: "rgba(59,130,246,0.4)",
      badgeBg: "rgba(59,130,246,0.18)",
      glow: "rgba(59,130,246,0.35)",
      ctaText: "#FFFFFF",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      interstitialBg: "linear-gradient(170deg, #071328 0%, #0F254B 50%, #040915 100%)",
      adCardBg: "linear-gradient(145deg, rgba(59,130,246,0.18) 0%, rgba(18,22,34,0.95) 100%)",
      bannerBg: "linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)",
      bannerTextColor: "#FFFFFF",
      bannerCtaBg: "#FFFFFF",
      bannerCtaText: "#000000",
    }
  }

  // Default FloatMe / Fintech Brand Theme (FloatMe Emerald Green Banner)
  return {
    primary: "#00E676",
    bg: "#00E67615",
    border: "rgba(0,230,118,0.4)",
    badgeBg: "rgba(0,230,118,0.18)",
    glow: "rgba(0,230,118,0.35)",
    ctaText: "#000000",
    gradient: "linear-gradient(135deg, #00E676 0%, #00B0FF 100%)",
    interstitialBg: "linear-gradient(170deg, #051622 0%, #0A263B 50%, #040E17 100%)",
    adCardBg: "linear-gradient(145deg, rgba(0,230,118,0.14) 0%, rgba(10,38,59,0.95) 100%)",
    bannerBg: "linear-gradient(90deg, #00E676 0%, #00C853 100%)",
    bannerTextColor: "#000000",
    bannerCtaBg: "#000000",
    bannerCtaText: "#FFFFFF",
  }
}

// ─── Real App Icon Resolver (Verified High-Res Apple CDN Artwork URLs) ───
const APP_ICON_MAP: Record<string, string> = {
  floatme: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b6/43/91/b6439159-24f3-5c7b-afe5-77f6e03ae20d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  practo: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/f0/94/9a/f0949ad7-1a40-dbb9-9ae6-8c40625b9663/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  subwaysurfers: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/b4/1f/24/b41f24cc-6b35-c66d-5109-7ac330bdc059/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg",
  earnin: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/df/68/70/df687025-6752-73c7-1f2a-82396303918e/AppIcon-0-0-1x_U007ephone-0-1-0-0-85-220.png/512x512bb.jpg",
  duolingo: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/37/10/ec/3710ecf6-fa0f-155e-04f7-ff3b7a5996a6/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  candycrush: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/71/6a/d2/716ad205-04bc-69aa-8b54-9469275b22b1/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  tinder: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/64/09/b3/6409b307-e85d-85fa-805d-8e4d3dbec6e6/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  spotify: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/94/a3/9b/94a39bd5-5f25-885a-0639-652f2fcf1180/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
}

function resolveAppIconUrl(name: string, rawSrc?: string): string {
  if (rawSrc && rawSrc !== "/placeholder.svg" && rawSrc.trim().length > 5) {
    return rawSrc
  }
  const cleanKey = name.toLowerCase().replace(/[^a-z0-9]/g, "")
  for (const [k, url] of Object.entries(APP_ICON_MAP)) {
    if (cleanKey.includes(k)) return url
  }
  return ""
}

function AppIcon({ src, name, category = "", size = 32 }: { src?: string; name: string; category?: string; size?: number }) {
  const [imgError, setImgError] = useState(false)
  const theme = getAppBrandTheme(name, category)
  const resolvedUrl = resolveAppIconUrl(name, src)
  const isPlaceholder = !resolvedUrl || imgError

  if (isPlaceholder) {
    const n = name.toLowerCase()
    const c = category.toLowerCase()
    const isGaming = n.includes("subway") || n.includes("candy") || c.includes("game")
    const isHealth = n.includes("practo") || n.includes("1mg") || c.includes("health")

    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: theme.gradient,
        boxShadow: `0 4px 14px ${theme.glow}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid rgba(255,255,255,0.3)",
        position: "relative",
        overflow: "hidden",
      }}>
        {isGaming ? (
          <Zap style={{ width: size * 0.5, height: size * 0.5, color: "#fff" }} />
        ) : isHealth ? (
          <Activity style={{ width: size * 0.5, height: size * 0.5, color: "#fff" }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <DollarSign style={{ width: size * 0.55, height: size * 0.55, color: "#fff", strokeWidth: 2.5 }} />
          </div>
        )}
      </div>
    )
  }

  return (
    <img
      src={resolvedUrl}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        objectFit: "cover",
        flexShrink: 0,
        boxShadow: `0 3px 10px ${theme.glow}`,
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    />
  )
}

// ─── LIVE GAME APP BACKGROUND (For Phone 1 & 2) ──────────────────────────
function LiveGameApp() {
  const [score, setScore] = useState(14820)
  const [grid, setGrid] = useState(["#8B5CF6","#10B981","#F59E0B","#EF4444","#3B82F6","#10B981","#8B5CF6","#F59E0B","#3B82F6","#EF4444","#F59E0B","#10B981","#8B5CF6","#3B82F6","#F59E0B"])

  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prev => prev + 100)
      setGrid(prev => {
        const next = [...prev]
        const idx = Math.floor(Math.random() * next.length)
        const colors = ["#8B5CF6","#10B981","#F59E0B","#EF4444","#3B82F6"]
        next[idx] = colors[Math.floor(Math.random() * colors.length)]
        return next
      })
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(165deg, #0F0A1E 0%, #1E0A3A 50%, #0A142F 100%)", position: "relative", overflow: "hidden" }}>
      {/* Game HUD Header */}
      <div style={{ position: "absolute", top: 44, left: 10, right: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: 8, padding: "3px 8px", display: "flex", alignItems: "center", gap: 4 }}>
          <Star style={{ width: 8, height: 8, color: "#FFD700", fill: "#FFD700" }} />
          <span style={{ fontSize: 8.5, fontWeight: 800, color: "#FFD700", fontFamily: "monospace" }}>{score.toLocaleString()}</span>
        </div>
        <div style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: 8, padding: "3px 8px" }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: "#C4B5FD", fontFamily: "monospace" }}>LVL 14</span>
        </div>
      </div>

      {/* Live animated puzzle grid */}
      <div style={{ position: "absolute", top: "24%", left: "50%", transform: "translateX(-50%)", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 4 }}>
        {grid.map((c, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            style={{ width: 28, height: 28, borderRadius: 7, background: c, border: `1px solid ${c}AA`, boxShadow: `0 0 8px ${c}55` }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── LIVE SCROLLING SOCIAL/NEWS FEED APP (For Phone 3 Native In-Feed) ─────
function LiveSocialNewsFeed({ cleanAppName, appIcon, appCategory, headline, subtext, cta }: {
  cleanAppName: string; appIcon: string; appCategory: string; headline: string; subtext: string; cta: string
}) {
  const feedRef = useRef<HTMLDivElement>(null)
  const theme = getAppBrandTheme(cleanAppName, appCategory)

  // Infinite seamless scroll loop
  useEffect(() => {
    const el = feedRef.current
    if (!el) return
    let pos = 0
    let animId: number
    
    const step = () => {
      pos += 0.35
      const halfHeight = el.scrollHeight / 2
      if (halfHeight > 0 && pos >= halfHeight) {
        pos -= halfHeight
      }
      el.scrollTop = pos
      animId = requestAnimationFrame(step)
    }

    animId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animId)
  }, [])

  const FeedContent = () => (
    <>
      {/* Organic Post 1 */}
      <div style={{ background: "#131A27", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", padding: 9 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1E293B", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: "#38BDF8" }}>TC</span>
          </div>
          <div>
            <p style={{ fontSize: 7.5, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "sans-serif" }}>TechCrunch Daily</p>
            <p style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", margin: 0 }}>10m ago · Verified</p>
          </div>
        </div>
        <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.35, margin: "0 0 6px", fontFamily: "sans-serif" }}>
          Global tech startup investments cross $14B in Q3 with mobile apps leading the wave. 🚀
        </p>
        <div style={{ display: "flex", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 5 }}>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 2 }}><Heart style={{ width: 7, height: 7 }} /> 420</span>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 2 }}><MessageSquare style={{ width: 7, height: 7 }} /> 34</span>
        </div>
      </div>

      {/* ── NATIVE IN-FEED SPONSORED AD (Styled with dynamic app theme!) ── */}
      <div style={{
        background: theme.adCardBg,
        borderRadius: 12,
        border: `1px solid ${theme.border}`,
        padding: 10,
        boxShadow: `0 4px 20px ${theme.glow}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <AppIcon src={appIcon} name={cleanAppName} category={appCategory} size={28} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 8.5, fontWeight: 800, color: "#fff", fontFamily: "sans-serif" }}>{cleanAppName}</span>
                <span style={{ fontSize: 6, fontWeight: 700, color: theme.primary, fontFamily: "monospace", background: theme.badgeBg, padding: "1px 4px", borderRadius: 3, border: `0.5px solid ${theme.border}` }}>SPONSORED</span>
              </div>
              <span style={{ fontSize: 6.5, color: theme.primary, fontWeight: 600, fontFamily: "sans-serif" }}>Promoted App Result</span>
            </div>
          </div>
          <MoreHorizontal style={{ width: 10, height: 10, color: "rgba(255,255,255,0.4)" }} />
        </div>

        <p style={{ fontSize: 7.5, fontWeight: 700, color: "#fff", margin: "0 0 3px", fontFamily: "sans-serif" }}>{headline}</p>
        <p style={{ fontSize: 7, color: "rgba(255,255,255,0.6)", lineHeight: 1.35, margin: "0 0 8px", fontFamily: "sans-serif" }}>{subtext}</p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${theme.border}`, paddingTop: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 6.5, height: 6.5, color: "#F59E0B", fill: "#F59E0B" }} />)}
            <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginLeft: 2 }}>4.7</span>
          </div>
          <div style={{ background: theme.primary, borderRadius: 6, padding: "4px 10px", boxShadow: `0 2px 8px ${theme.glow}` }}>
            <span style={{ fontSize: 7.5, fontWeight: 800, color: theme.ctaText, fontFamily: "sans-serif" }}>{cta}</span>
          </div>
        </div>
      </div>

      {/* Organic Post 2 */}
      <div style={{ background: "#131A27", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", padding: 9 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1E293B", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 7, fontWeight: 800, color: "#10B981" }}>FW</span>
          </div>
          <div>
            <p style={{ fontSize: 7.5, fontWeight: 700, color: "#fff", margin: 0, fontFamily: "sans-serif" }}>App Digest</p>
            <p style={{ fontSize: 6, color: "rgba(255,255,255,0.35)", margin: 0 }}>1h ago</p>
          </div>
        </div>
        <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.35, margin: "0 0 6px", fontFamily: "sans-serif" }}>
          Top recommendations for high-converting mobile applications this month.
        </p>
        <div style={{ display: "flex", gap: 12, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 5 }}>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 2 }}><Heart style={{ width: 7, height: 7 }} /> 189</span>
          <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 2 }}><Share2 style={{ width: 7, height: 7 }} /> Share</span>
        </div>
      </div>
    </>
  )

  return (
    <div style={{ width: "100%", height: "100%", background: "#0B0F17", position: "relative", overflow: "hidden" }}>
      {/* Feed App Header */}
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, height: 32, background: "rgba(11,15,23,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 12px", backdropFilter: "blur(8px)" }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 8.5, fontWeight: 800, color: theme.primary, borderBottom: `1.5px solid ${theme.primary}`, paddingBottom: 6, fontFamily: "sans-serif" }}>For You</span>
          <span style={{ fontSize: 8.5, fontWeight: 600, color: "rgba(255,255,255,0.4)", paddingBottom: 6, fontFamily: "sans-serif" }}>Trending</span>
        </div>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: theme.primary }} />
      </div>

      {/* Live Auto-scrolling Feed Container */}
      <div
        ref={feedRef}
        style={{
          position: "absolute",
          top: 72,
          bottom: 0,
          left: 0,
          right: 0,
          overflowY: "hidden",
          padding: "8px 10px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <FeedContent />
        <FeedContent />
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export function AdPlacementShowcase({ data }: AdPlacementShowcaseProps) {
  const appName = data?.metadata?.scannedApp || "FloatMe: Instant Cash Advance"
  const cleanAppName = appName.split(":")[0].trim()
  const appIcon = data?.metadata?.icon || ""
  const appCategory = data?.metadata?.category || "Fintech & Advance Pay"

  const theme = getAppBrandTheme(cleanAppName, appCategory)

  const headline = data?.adCreativePreview?.headline || "Get Up To $500 Cash Advance"
  const subtext = data?.adCreativePreview?.subtext || "No credit check required. Instant transfer."
  const cta = data?.adCreativePreview?.cta || "Get Cash Now"

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Card className="bg-[#0A0A0A] border-white/[0.06] overflow-hidden shadow-2xl">
      <CardHeader className="pb-4 pt-5 px-6 border-b border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25 text-[10px] font-mono">
                Interactive Ad Preview
              </Badge>
              <Badge variant="outline" className="border-white/10 text-[#888888] text-[10px] font-mono">
                Branded App Placement Mockups
              </Badge>
            </div>
            <CardTitle className="text-[15px] font-bold text-white tracking-tight">
              Ad Creative & Placement Demonstration — <span style={{ color: theme.primary }}>{cleanAppName}</span>
            </CardTitle>
            <p className="text-[11px] text-[#888888]">
              Live interactive ad placement preview tailored for <span className="text-white font-medium">{cleanAppName}</span> ({appCategory}). Click any phone to inspect ad details.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-8">
        {/* 3 Titanium iPhone Mockups Grid */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">

          {/* ─── MOCKUP 1: In-App Banner Ad ───────────────────────── */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full max-w-[216px] px-1 font-mono text-[11px]">
              <span className="font-bold text-white">1. In-App Banner</span>
              <span style={{ color: theme.primary }} className="font-bold">14.8% CVR</span>
            </div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <PhoneFrame>
                <LiveGameApp />
                {/* Banner Ad Overlaid at Bottom (Solidly Colored in App's Brand Theme) */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  background: theme.bannerBg,
                  padding: "7px 10px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 20,
                  boxShadow: "0 -4px 15px rgba(0,0,0,0.5)",
                }}>
                  <AppIcon src={appIcon} name={cleanAppName} category={appCategory} size={28} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
                      <span style={{ fontSize: 6, fontWeight: 900, color: theme.bannerCtaBg, textTransform: "uppercase", fontFamily: "monospace", background: "rgba(0,0,0,0.15)", padding: "1px 4px", borderRadius: 3 }}>SPONSORED</span>
                      <span style={{ fontSize: 8.5, fontWeight: 800, color: theme.bannerTextColor, fontFamily: "sans-serif" }}>{cleanAppName}</span>
                    </div>
                    <p style={{ fontSize: 7, fontWeight: 600, color: theme.bannerTextColor, opacity: 0.9, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "sans-serif" }}>{headline}</p>
                  </div>
                  <div style={{ background: theme.bannerCtaBg, borderRadius: 6, padding: "5px 9px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
                    <span style={{ fontSize: 7, fontWeight: 800, color: theme.bannerCtaText, fontFamily: "sans-serif", whiteSpace: "nowrap" }}>{cta}</span>
                  </div>
                </div>
              </PhoneFrame>
            </motion.div>

            <p className="text-[10px] text-[#888888] font-mono text-center max-w-[200px]">
              Continuous engagement inside live gaming feeds
            </p>
          </div>

          {/* ─── MOCKUP 2: Full-Screen Interstitial (Styled with App Theme Color) ─── */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full max-w-[216px] px-1 font-mono text-[11px]">
              <span className="font-bold text-white">2. Interstitial</span>
              <div className="flex items-center gap-1.5">
                <span style={{ color: theme.primary }} className="font-bold">22.4% CVR</span>
                <Badge style={{ background: theme.badgeBg, color: theme.primary, borderColor: theme.border }} className="text-[8px] px-1.5 py-0">Top</Badge>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <PhoneFrame>
                {/* Full screen Interstitial Ad takeover */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: theme.interstitialBg,
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "44px 16px 16px",
                  zIndex: 25,
                  overflow: "hidden",
                }}>
                  {/* Ambient brand glow spot */}
                  <div style={{ position: "absolute", top: "25%", width: 140, height: 140, borderRadius: "50%", background: theme.glow, filter: "blur(35px)", opacity: 0.6, pointerEvents: "none" }} />

                  {/* Header bar */}
                  <div style={{ position: "absolute", top: 44, left: 12, right: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 7, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", textTransform: "uppercase" }}>ADVERTISEMENT</span>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <XIcon style={{ width: 8, height: 8, color: "rgba(255,255,255,0.6)" }} />
                    </div>
                  </div>

                  {/* Centered Ad Creative */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", zIndex: 2 }}>
                    <div style={{
                      width: 68, height: 68, borderRadius: 18,
                      background: theme.bg,
                      border: `1.5px solid ${theme.border}`,
                      padding: 4,
                      boxShadow: `0 0 30px ${theme.glow}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <AppIcon src={appIcon} name={cleanAppName} category={appCategory} size={60} />
                    </div>

                    <div>
                      <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "sans-serif" }}>{cleanAppName}</p>
                      <p style={{ fontSize: 9, fontWeight: 700, color: theme.primary, margin: "4px 0 2px", fontFamily: "sans-serif" }}>{headline}</p>
                      <p style={{ fontSize: 7.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, margin: 0, fontFamily: "sans-serif" }}>{subtext}</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "2px 8px" }}>
                      {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 7, height: 7, color: "#F59E0B", fill: "#F59E0B" }} />)}
                      <span style={{ fontSize: 6.5, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>4.7</span>
                    </div>
                  </div>

                  {/* Big CTA */}
                  <div style={{
                    width: "100%",
                    height: 36,
                    borderRadius: 10,
                    background: theme.primary,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 4px 20px ${theme.glow}`,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: theme.ctaText, fontFamily: "sans-serif", letterSpacing: 0.3 }}>{cta}</span>
                  </div>
                </div>
              </PhoneFrame>
            </motion.div>

            <p className="text-[10px] text-[#888888] font-mono text-center max-w-[200px]">
              Highest conversion rates across all verticals
            </p>
          </div>

          {/* ─── MOCKUP 3: Native In-Feed ─── */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-between w-full max-w-[216px] px-1 font-mono text-[11px]">
              <span className="font-bold text-white">3. Native In-Feed</span>
              <span style={{ color: theme.primary }} className="font-bold">12.4% CVR</span>
            </div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <PhoneFrame>
                <LiveSocialNewsFeed
                  cleanAppName={cleanAppName}
                  appIcon={appIcon}
                  appCategory={appCategory}
                  headline={headline}
                  subtext={subtext}
                  cta={cta}
                />
              </PhoneFrame>
            </motion.div>

            <p className="text-[10px] text-[#888888] font-mono text-center max-w-[200px]">
              Live scrolling feed with native ad integration
            </p>
          </div>

        </div>

        {/* Format Performance Strip */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { label: "In-App Banner CVR", value: "14.8%", sub: "Continuous gaming feed engagement", color: "#3B82F6" },
            { label: "Interstitial CVR", value: "22.4%", sub: "Top converting format overall", color: theme.primary },
            { label: "Native In-Feed CVR", value: "12.4%", sub: "Organic social feed recommendation", color: "#8B5CF6" },
          ].map(s => (
            <div key={s.label} className="rounded-xl bg-[#141414] border border-white/[0.05] p-3.5 text-center">
              <p className="text-[10px] text-[#888888] mb-1">{s.label}</p>
              <p className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-[#555555] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Interactive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-[#111111] border border-white/[0.08] p-6 shadow-2xl text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <div className="flex items-center gap-3">
                  <AppIcon src={appIcon} name={cleanAppName} category={appCategory} size={40} />
                  <div>
                    <h3 className="text-sm font-bold text-white">{cleanAppName}</h3>
                    <p className="text-[10px] font-mono" style={{ color: theme.primary }}>Simulated Ad Conversion</p>
                  </div>
                </div>
                <button onClick={() => setModalOpen(false)} className="text-[#888888] hover:text-white">
                  <XIcon className="size-5" />
                </button>
              </div>
              <div style={{ background: theme.bg, borderColor: theme.border }} className="rounded-xl border p-5 text-center space-y-3">
                <Badge style={{ background: theme.badgeBg, color: theme.primary, borderColor: theme.border }} className="text-[10px]">Verified Ad Destination</Badge>
                <h4 className="text-base font-extrabold text-white">{headline}</h4>
                <p className="text-xs text-[#888888]">{subtext}</p>
                <button
                  onClick={() => {
                    if (data?.metadata?.storeUrl) window.open(data.metadata.storeUrl, "_blank")
                    else setModalOpen(false)
                  }}
                  style={{ background: theme.primary, color: theme.ctaText }}
                  className="w-full h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  Open Store Listing <ExternalLinkIcon className="size-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

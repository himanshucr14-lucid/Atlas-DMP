"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import BlurText from "@/components/BlurText"
import GradientText from "@/components/GradientText"
// ─────────────────────────────────────────────
//  Animated Network Canvas — right-side visual
// ─────────────────────────────────────────────
function NetworkCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener("resize", resize)

    // Fixed node positions (normalised 0–1)
    const nodesDef = [
      { x: 0.18, y: 0.22 },
      { x: 0.45, y: 0.12 },
      { x: 0.72, y: 0.28 },
      { x: 0.88, y: 0.55 },
      { x: 0.60, y: 0.70 },
      { x: 0.30, y: 0.78 },
      { x: 0.12, y: 0.55 },
      { x: 0.50, y: 0.45 },
    ]

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
      [5, 6], [6, 0], [1, 7], [2, 7], [4, 7], [6, 7],
    ]

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      const nodes = nodesDef.map((n) => ({
        x: n.x * W,
        y: n.y * H,
      }))

      // Draw edges
      edges.forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b]
        const pulse = 0.04 + 0.06 * Math.abs(Math.sin(t * 0.5 + a + b))
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        ctx.lineTo(nb.x, nb.y)
        ctx.strokeStyle = `rgba(59,130,246,${pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Animated packet travelling along edges
      edges.forEach(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const progress = ((t * 0.3 + i * 0.37) % 1 + 1) % 1
        const px = na.x + (nb.x - na.x) * progress
        const py = na.y + (nb.y - na.y) * progress
        ctx.beginPath()
        ctx.arc(px, py, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6,182,212,0.5)`
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((n, i) => {
        const pulse = 0.9 + 0.1 * Math.sin(t * 0.8 + i)
        const r = 3.5 * pulse

        // outer glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12)
        grad.addColorStop(0, "rgba(59,130,246,0.18)")
        grad.addColorStop(1, "rgba(59,130,246,0)")
        ctx.beginPath()
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.55)"
        ctx.fill()
      })

      t += 0.008
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  )
}

// ─────────────────────────────────────────────
//  Main Page
// ─────────────────────────────────────────────
export default function InternalAuthPortal() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPw, setShowPw] = React.useState(false)
  const [remember, setRemember] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [emailFocused, setEmailFocused] = React.useState(false)
  const [pwFocused, setPwFocused] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => router.push("/dashboard"), 900)
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "#05070B", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #0d1117 inset !important;
          -webkit-text-fill-color: #f0f6fc !important;
        }
      `}</style>

      {/* ── Gradient atmosphere — only two orbs, very restrained ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary: blue, only top-left */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.13) 0%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />
        {/* Secondary: emerald, only bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "8%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* ── Top bar ── */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 12H2L8 2Z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" fill="none" />
              <circle cx="8" cy="9" r="2" fill="rgba(37,99,235,0.9)" />
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.01em" }}>
            AdsIdol Intelligence
          </span>
        </div>

        {/* Status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 12px",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 6px #10B981",
            }}
          />
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.03em" }}>
            Secure Internal Access
          </span>
        </div>
      </header>

      {/* ── Two-column body ── */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)]">

        {/* ── LEFT: Auth card ── */}
        <div className="flex flex-1 items-center justify-center px-8 py-12 lg:flex-none lg:w-[480px] xl:w-[520px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%", maxWidth: 400 }}
          >
            {/* Brand + heading */}
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, fontWeight: 500 }}>
                Internal Data Management Platform
              </p>
              
              <GradientText
                colors={["#40ffaa", "#40c9ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-3xl tracking-tight mb-2 -ml-2"
              >
                Welcome back
              </GradientText>

              <BlurText
                text="Sign in to access audience intelligence, campaign analytics, DSP tools and the internal media buying platform."
                delay={50}
                animateBy="words"
                direction="top"
                className="text-[13.5px] text-white/40 leading-relaxed font-normal"
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.45)", marginBottom: 7, letterSpacing: "0.01em" }}
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="you@adsidol.com"
                  style={{
                    width: "100%",
                    height: 42,
                    padding: "0 14px",
                    borderRadius: 10,
                    border: `1px solid ${emailFocused ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.09)"}`,
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 14,
                    outline: "none",
                    boxShadow: emailFocused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
                    transition: "border 0.15s, box-shadow 0.15s",
                  }}
                />
              </div>

              {/* Password field */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <label
                    htmlFor="password"
                    style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.45)", letterSpacing: "0.01em" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    style={{ fontSize: 12, color: "rgba(59,130,246,0.8)", textDecoration: "none", fontWeight: 500 }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#3B82F6")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(59,130,246,0.8)")}
                  >
                    Forgot password?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setPwFocused(true)}
                    onBlur={() => setPwFocused(false)}
                    placeholder="••••••••••"
                    style={{
                      width: "100%",
                      height: 42,
                      padding: "0 42px 0 14px",
                      borderRadius: 10,
                      border: `1px solid ${pwFocused ? "rgba(59,130,246,0.6)" : "rgba(255,255,255,0.09)"}`,
                      background: "rgba(255,255,255,0.04)",
                      color: "rgba(255,255,255,0.9)",
                      fontSize: 14,
                      outline: "none",
                      boxShadow: pwFocused ? "0 0 0 3px rgba(59,130,246,0.12)" : "none",
                      transition: "border 0.15s, box-shadow 0.15s",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember device */}
              <label
                style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer", userSelect: "none", paddingTop: 2 }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  style={{ width: 15, height: 15, accentColor: "#3B82F6", cursor: "pointer" }}
                />
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontWeight: 400 }}>
                  Remember this device for 30 days
                </span>
              </label>

              {/* Sign In button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ backgroundColor: loading ? "#1d4ed8" : "#2563EB" }}
                whileTap={{ scale: 0.99 }}
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 10,
                  border: "none",
                  background: "#1D4ED8",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  letterSpacing: "-0.01em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "background 0.15s",
                  marginTop: 4,
                  opacity: loading ? 0.75 : 1,
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    Signing in…
                  </>
                ) : (
                  "Sign in to AdsIdol"
                )}
              </motion.button>
            </form>

            {/* Protected notice */}
            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShieldCheck size={13} color="rgba(255,255,255,0.25)" />
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.25)", lineHeight: 1.5 }}>
                Protected internal system. Authorised employees &amp; partners only.
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          className="hidden lg:block"
          style={{
            width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)",
            flexShrink: 0,
          }}
        />

        {/* ── RIGHT: Animated canvas + 2 floating data cards ── */}
        <div className="relative hidden flex-1 overflow-hidden lg:flex">
          {/* Network canvas fills entire right panel */}
          <NetworkCanvas />

          {/* Floating card 1 — top-left of right panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "18%",
              left: "10%",
              background: "rgba(13,17,23,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px 20px",
              minWidth: 220,
            }}
          >
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
              Identity Graph
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "-0.025em", lineHeight: 1 }}>
              14.2M
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", marginTop: 4 }}>
              Deterministic MAID matches
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "rgba(16,185,129,0.75)", fontWeight: 500 }}>Sync active</span>
            </div>
          </motion.div>

          {/* Floating card 2 — bottom-right of right panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: "16%",
              right: "10%",
              background: "rgba(13,17,23,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "16px 20px",
              minWidth: 210,
            }}
          >
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>
              Bid Engine
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.88)", letterSpacing: "-0.025em", lineHeight: 1 }}>
              4ms
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", marginTop: 4 }}>
              Avg. OpenRTB response time
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />
              <span style={{ fontSize: 11, color: "rgba(59,130,246,0.75)", fontWeight: 500 }}>24.2k req/sec</span>
            </div>
          </motion.div>

          {/* Center label */}
          <div
            style={{
              position: "absolute",
              bottom: "6%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 11,
              color: "rgba(255,255,255,0.15)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            AdsIdol Audience Intelligence Network
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(5,7,11,0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 30,
        }}
      >
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>
          © 2026 AdsIdol Intelligence
        </span>
        <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>
          Confidential · Internal Use Only
        </span>
      </footer>
    </div>
  )
}

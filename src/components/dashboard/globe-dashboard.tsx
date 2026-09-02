"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import * as THREE from "three"

export interface CountryData {
  id: string
  code: string
  name: string
  subtitle: string
  latitude: number
  longitude: number
  installs: string
  ctr: string
  cvr: string
  cpa: string
  available: boolean
  formats: string[]
  flag?: string
}

export const DEFAULT_COUNTRIES: CountryData[] = [
  {
    id: "in",
    code: "IN",
    name: "India",
    subtitle: "South Asia",
    latitude: 20.5937,
    longitude: 78.9629,
    installs: "1.8M",
    ctr: "5.6%",
    cvr: "18.4%",
    cpa: "$0.42",
    available: true,
    formats: ["Rewarded Video", "Interstitial", "Native"],
    flag: "🇮🇳",
  },
  {
    id: "ny",
    code: "US",
    name: "United States",
    subtitle: "North America",
    latitude: 40.7128,
    longitude: -74.006,
    installs: "3.4M",
    ctr: "4.2%",
    cvr: "15.8%",
    cpa: "$1.85",
    available: true,
    formats: ["Rewarded Video", "Interstitial", "Banner"],
    flag: "🇺🇸",
  },
  {
    id: "lon",
    code: "GB",
    name: "United Kingdom",
    subtitle: "Europe",
    latitude: 51.5074,
    longitude: -0.1278,
    installs: "1.2M",
    ctr: "6.1%",
    cvr: "21.2%",
    cpa: "$1.45",
    available: true,
    formats: ["Rewarded Video", "Native", "Interstitial"],
    flag: "🇬🇧",
  },
  {
    id: "dxb",
    code: "AE",
    name: "United Arab Emirates",
    subtitle: "Middle East",
    latitude: 25.2048,
    longitude: 55.2708,
    installs: "890K",
    ctr: "7.4%",
    cvr: "24.1%",
    cpa: "$1.10",
    available: true,
    formats: ["Rewarded Video", "Banner"],
    flag: "🇦🇪",
  },
  {
    id: "tyo",
    code: "JP",
    name: "Japan",
    subtitle: "Asia Pacific",
    latitude: 35.6762,
    longitude: 139.6503,
    installs: "2.1M",
    ctr: "5.9%",
    cvr: "19.7%",
    cpa: "$2.15",
    available: true,
    formats: ["Rewarded Video", "Interstitial"],
    flag: "🇯🇵",
  },
  {
    id: "sao",
    code: "BR",
    name: "Brazil",
    subtitle: "Latin America",
    latitude: -23.5505,
    longitude: -46.6333,
    installs: "1.5M",
    ctr: "4.8%",
    cvr: "16.5%",
    cpa: "$0.65",
    available: true,
    formats: ["Rewarded Video", "Native"],
    flag: "🇧🇷",
  },
  {
    id: "syd",
    code: "AU",
    name: "Australia",
    subtitle: "Oceania",
    latitude: -33.8688,
    longitude: 151.2093,
    installs: "750K",
    ctr: "6.8%",
    cvr: "22.5%",
    cpa: "$1.95",
    available: true,
    formats: ["Rewarded Video", "Interstitial"],
    flag: "🇦🇺",
  },
]

function getRealTime30DaysData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const now = new Date()

  // Yesterday's date (real-time)
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)

  // 30 days ago (starting date)
  const startDate = new Date(yesterday)
  startDate.setDate(yesterday.getDate() - 29)

  const formatDateShort = (d: Date) => `${d.getDate()} ${months[d.getMonth()]}`

  const dateRangeStr = `${formatDateShort(startDate)} – ${formatDateShort(yesterday)}`

  // 15 bar line points summing to 255 events
  const rawValues = [12, 18, 14, 22, 15, 28, 19, 25, 11, 16, 21, 17, 24, 9, 4]
  const maxVal = Math.max(...rawValues)

  const barData = rawValues.map((val, idx) => {
    const pointDate = new Date(startDate)
    pointDate.setDate(startDate.getDate() + idx * 2)
    const dateStr = formatDateShort(pointDate)
    const height = Math.round((val / maxVal) * 100)
    return {
      val,
      height,
      dateStr,
    }
  })

  return {
    dateRangeStr,
    startDateStr: formatDateShort(startDate),
    midDateStr: barData[7].dateStr,
    endDateStr: formatDateShort(yesterday),
    barData,
  }
}

// Ease-in-out cubic easing
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Shortest rotational path angle difference
const shortestAngleDiff = (from: number, to: number): number => {
  let diff = (to - from) % (2 * Math.PI)
  if (diff > Math.PI) diff -= 2 * Math.PI
  if (diff < -Math.PI) diff += 2 * Math.PI
  return diff
}

interface GlobeDashboardProps {
  appName?: string
  browserUrl?: string
  metricTitle?: string
  dateRange?: string
  growthChange?: string
  countries?: CountryData[]
}

export function GlobeDashboard({
  browserUrl = "zukunftsberatung.net",
  metricTitle = "255 Events",
  growthChange = "+32.2%",
  countries = DEFAULT_COUNTRIES,
}: GlobeDashboardProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [activeSidePanelIdx, setActiveSidePanelIdx] = useState<number | null>(null)
  const [hoveredCountryData, setHoveredCountryData] = useState<CountryData | null>(null)
  const [ThreeGlobeClass, setThreeGlobeClass] = useState<any>(null)

  const globeRef = useRef<any>(null)

  // Drag with Inertia Physics Refs
  const isDraggingRef = useRef<boolean>(false)
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // Rotation Focus Controller Animation State
  const animRef = useRef<{
    isAnimating: boolean
    startTime: number
    duration: number
    startRotY: number
    startRotX: number
    targetRotY: number
    targetRotX: number
    targetIdx: number | null
  }>({
    isAnimating: false,
    startTime: 0,
    duration: 850,
    startRotY: 0,
    startRotX: 0,
    targetRotY: 0,
    targetRotX: 0,
    targetIdx: null,
  })

  const activeIdxRef = useRef<number | null>(null)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoRotatingRef = useRef<boolean>(true)

  // Real-time 30-day date range ending yesterday
  const realTimeData = useMemo(() => getRealTime30DaysData(), [])

  // Dynamic import of three-globe to prevent SSR window reference errors
  useEffect(() => {
    import("three-globe").then((mod) => {
      setThreeGlobeClass(() => mod.default)
    })
  }, [])

  useEffect(() => {
    const container = mountRef.current
    if (!container || !ThreeGlobeClass) return

    const width = container.clientWidth || 900
    const height = container.clientHeight || 560

    // ── 1. Scene, Camera, Renderer ───────────────────────────────────────────
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 245

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // ── 2. Realistic SaaS Lighting System ────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const mainSunLight = new THREE.DirectionalLight(0xffffff, 2.2)
    mainSunLight.position.set(300, 150, 400)
    scene.add(mainSunLight)

    const cyanAtmosphereLight = new THREE.DirectionalLight(0x00bcd4, 1.6)
    cyanAtmosphereLight.position.set(-300, -100, -200)
    scene.add(cyanAtmosphereLight)

    // ── 3. Native ThreeGlobe 3D Instance ──────────────────────────────────────
    const globe = new ThreeGlobeClass()
      .globeImageUrl("https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg")
      .atmosphereColor("#00bcd4")
      .atmosphereAltitude(0.18)
      .pointsData(countries)
      .pointLat((d: any) => d.latitude)
      .pointLng((d: any) => d.longitude)
      .pointAltitude((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        return itemIdx === activeIdxRef.current ? 0.04 : 0.01
      })
      .pointRadius((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        return itemIdx === activeIdxRef.current ? 1.6 : 0.85
      })
      .pointColor((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        if (activeIdxRef.current !== null) {
          return itemIdx === activeIdxRef.current ? "#FF9F1C" : "rgba(96, 165, 250, 0.35)"
        }
        return "#60A5FA"
      })
      .pointsMerge(false)

    // Scale globe size to 0.60 (60 radius) for clean fit inside container
    globe.scale.set(0.60, 0.60, 0.60)
    globe.rotation.order = "YXZ"

    scene.add(globe)
    globeRef.current = globe

    // ── 4. Mouse Drag with Natural Inertia Momentum ───────────────────────────
    const domEl = renderer.domElement

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true
      prevPointerRef.current = { x: e.clientX, y: e.clientY }
      velocityRef.current = { x: 0, y: 0 }
      isAutoRotatingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !globeRef.current) return
      const deltaX = e.clientX - prevPointerRef.current.x
      const deltaY = e.clientY - prevPointerRef.current.y

      velocityRef.current = { x: deltaX * 0.005, y: deltaY * 0.005 }
      globeRef.current.rotation.y += velocityRef.current.x
      globeRef.current.rotation.x = Math.max(-0.8, Math.min(0.8, globeRef.current.rotation.x + velocityRef.current.y))

      prevPointerRef.current = { x: e.clientX, y: e.clientY }
    }

    const onPointerUp = () => {
      isDraggingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => {
        isAutoRotatingRef.current = true
      }, 2000)
    }

    domEl.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    // ── 5. 60 FPS Render & Animation Loop ───────────────────────────────────
    let animationFrameId: number

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const anim = animRef.current

      // Handle Smooth Focus Rotation Animation
      if (anim.isAnimating) {
        const elapsed = time - anim.startTime
        const progress = Math.min(1, elapsed / anim.duration)
        const easeT = easeInOutCubic(progress)

        globe.rotation.y = anim.startRotY + (anim.targetRotY - anim.startRotY) * easeT
        globe.rotation.x = anim.startRotX + (anim.targetRotX - anim.startRotX) * easeT

        if (progress >= 1) {
          anim.isAnimating = false
          if (anim.targetIdx !== null) {
            setActiveSidePanelIdx(anim.targetIdx)
          }
        }
      }
      // Handle Mouse Drag Friction / Inertia Damping
      else if (!isDraggingRef.current && Math.hypot(velocityRef.current.x, velocityRef.current.y) > 0.0001) {
        globe.rotation.y += velocityRef.current.x
        globe.rotation.x = Math.max(-0.8, Math.min(0.8, globe.rotation.x + velocityRef.current.y))
        velocityRef.current.x *= 0.92
        velocityRef.current.y *= 0.92
      }
      // Handle Idle Auto-Rotation
      else if (isAutoRotatingRef.current && !isDraggingRef.current) {
        globe.rotation.y += 0.0025
        globe.rotation.x += (0 - globe.rotation.x) * 0.04
      }

      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Resize handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      domEl.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [ThreeGlobeClass, countries])

  // Update ThreeGlobe point styling on selection change
  useEffect(() => {
    if (!globeRef.current) return
    const globe = globeRef.current
    activeIdxRef.current = hoveredIdx

    globe
      .pointAltitude((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        return itemIdx === hoveredIdx ? 0.04 : 0.01
      })
      .pointRadius((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        return itemIdx === hoveredIdx ? 1.6 : 0.8
      })
      .pointColor((d: any) => {
        const itemIdx = countries.findIndex((c) => c.id === d.id)
        if (hoveredIdx !== null) {
          return itemIdx === hoveredIdx ? "#FF9F1C" : "rgba(96, 165, 250, 0.35)"
        }
        return "#60A5FA"
      })
  }, [hoveredIdx, countries])

  // Country Focus Controller: 100% Dead Center Viewport Rotation
  const handleCountryFocus = (idx: number, country: CountryData) => {
    setHoveredIdx(idx)
    setHoveredCountryData(country)

    // Pause auto-rotation & clear timer
    isAutoRotatingRef.current = false
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)

    if (globeRef.current) {
      const globe = globeRef.current
      const lat = country.latitude
      const lng = country.longitude

      // Exact ThreeGlobe Front-Center Viewport Rotation:
      // Greenwich (0° lng) faces +Z at globe.rotation.y = 0.
      // To bring longitude `lng` to face front center (+Z axis facing camera):
      // targetY = -(lng * Math.PI / 180)
      // To bring latitude `lat` to equator line facing camera:
      // targetX = -(lat * Math.PI / 180)
      const targetY_raw = -((lng * Math.PI) / 180)
      const targetX_raw = Math.max(-0.85, Math.min(0.85, -((lat * Math.PI) / 180)))

      const currentY = globe.rotation.y
      const currentX = globe.rotation.x

      // Calculate shortest rotational path along Y axis
      const diffY = shortestAngleDiff(currentY, targetY_raw)
      const diffX = targetX_raw - currentX

      const targetY = currentY + diffY
      const targetX = targetX_raw

      // Check if target is already within ~15° (0.26 rad)
      const angularDist = Math.hypot(diffY, diffX)
      if (angularDist < 0.26) {
        setActiveSidePanelIdx(idx)
        return
      }

      // Interrupt previous animation and start smooth 850ms easeInOutCubic rotation
      const now = performance.now()
      animRef.current = {
        isAnimating: true,
        startTime: now,
        duration: 850,
        startRotY: currentY,
        startRotX: currentX,
        targetRotY: targetY,
        targetRotX: targetX,
        targetIdx: idx,
      }
    }
  }

  const handleCountryLeave = () => {
    setHoveredIdx(null)
    setHoveredCountryData(null)
    activeIdxRef.current = null

    // Resume auto-rotation after 2 seconds of inactivity
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(() => {
      isAutoRotatingRef.current = true
    }, 2000)
  }

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-[#070D1A] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.6)] font-mono transition-all">
      {/* ── BROWSER CHROME TOPBAR ──────────────────────────────────────────── */}
      <div className="h-10 bg-[#0A101D] border-b border-white/[0.06] px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="size-2.5 rounded-full bg-[#FF5F57]" />
          <div className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="size-2.5 rounded-full bg-[#28C840]" />
        </div>

        {/* Center URL Capsule */}
        <div className="flex-1 flex justify-center">
          <div className="h-6 bg-white/[0.07] border border-white/[0.05] rounded-md px-3.5 flex items-center justify-center gap-1.5 text-[11px] text-[#888888]">
            <span className="text-[10px] opacity-60">🔒</span>
            <span className="text-white/70 font-medium">{browserUrl}</span>
          </div>
        </div>

        <div className="w-12 shrink-0" />
      </div>

      {/* ── CANVAS & GLASS PANELS CONTAINER ────────────────────────────────── */}
      <div className="relative h-[520px] sm:h-[580px] w-full overflow-hidden bg-[#070D1A]">
        {/* 3D WebGL Canvas Layer */}
        <div ref={mountRef} className="absolute inset-0 z-0 flex items-center justify-center cursor-grab active:cursor-grabbing" />

        {/* ── LEFT GLASS PANEL (Metrics & Real-Time Last 30 Days Bars) ──────── */}
        <div className="absolute top-6 left-6 z-10 w-[260px] sm:w-[280px] p-5 rounded-2xl bg-[#0F172A]/80 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] text-white space-y-4">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none font-sans flex items-baseline gap-2">
              <span>255</span>
              <span className="text-xl sm:text-2xl font-bold text-white/90">Events</span>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[11px] text-[#9CA3AF] font-sans">
                {realTimeData.dateRangeStr}
              </span>
              <span className="text-[10px] font-bold text-[#34D399] bg-[#34D399]/15 border border-[#34D399]/30 px-2 py-0.5 rounded font-mono">
                {growthChange}
              </span>
            </div>
          </div>

          {/* Bar Chart Bars (15 Event Conversion Lines across Real-Time Last 30 Days) */}
          <div className="pt-2">
            <div className="flex items-end gap-1 h-20 px-1">
              {realTimeData.barData.map((bar, i) => (
                <div
                  key={i}
                  title={`${bar.dateStr}: ${bar.val} Event Conversions`}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-pointer"
                >
                  <div
                    className="w-full rounded-sm bg-[#60A5FA] transition-all duration-300 group-hover:bg-[#93C5FD] group-hover:scale-y-110 origin-bottom"
                    style={{ height: `${bar.height}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Real-time X-Axis Date Labels Ending Yesterday */}
            <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1.5 px-1 font-mono">
              <span>{realTimeData.startDateStr}</span>
              <span>{realTimeData.midDateStr}</span>
              <span className="text-[#34D399] font-bold">{realTimeData.endDateStr}</span>
            </div>
          </div>

          {/* Dynamic Hover Tooltip Card (Installs, CTR, CVR, CPA) */}
          {hoveredCountryData && (
            <div className="pt-3 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-white font-sans">
                <span>{hoveredCountryData.flag} {hoveredCountryData.name}</span>
                <span className="text-[10px] text-[#34D399] bg-[#34D399]/15 px-1.5 py-0.5 rounded">Active</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-[#9CA3AF] text-[9px]">Installs</div>
                  <div className="font-bold text-white">{hoveredCountryData.installs}</div>
                </div>
                <div className="bg-white/5 p-1.5 rounded">
                  <div className="text-[#9CA3AF] text-[9px]">CTR / CVR</div>
                  <div className="font-bold text-[#60A5FA]">{hoveredCountryData.ctr} / {hoveredCountryData.cvr}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT GLASS PANEL (Locations List) ─────────────────────────────── */}
        <div className="absolute top-6 right-6 z-10 w-[220px] sm:w-[240px] p-4 rounded-2xl bg-[#0F172A]/75 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] text-white space-y-3">
          <div className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase">
            LOCATIONS
          </div>

          <div className="space-y-1 divide-y divide-white/[0.06]">
            {countries.map((c, idx) => {
              const isHovered = hoveredIdx === idx
              const isActive = activeSidePanelIdx === idx || isHovered
              const isInactive = hoveredIdx !== null && !isHovered

              return (
                <div
                  key={c.id}
                  onClick={() => handleCountryFocus(idx, c)}
                  onMouseEnter={() => handleCountryFocus(idx, c)}
                  onMouseLeave={handleCountryLeave}
                  style={{ opacity: isInactive ? 0.6 : 1 }}
                  className={`pt-2.5 first:pt-0 pb-2 px-2 rounded-lg cursor-pointer transition-all flex items-center gap-2.5 ${
                    isActive
                      ? "bg-white/15 text-white shadow-md border-l-2 border-l-[#FF9F1C]"
                      : "hover:bg-white/5 text-[#E2E8F0]"
                  }`}
                >
                  <div
                    className={`size-2 rounded-full shrink-0 transition-all ${
                      isActive ? "bg-[#FF9F1C] scale-125 shadow-[0_0_10px_#FF9F1C]" : "bg-[#60A5FA]/70"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold font-sans text-white leading-snug truncate flex items-center justify-between">
                      <span>{c.name}</span>
                      <span className="text-[10px] font-mono opacity-80">{c.flag}</span>
                    </div>
                    <div className="text-[10px] text-[#9CA3AF] font-sans truncate flex items-center justify-between mt-0.5">
                      <span>{c.subtitle}</span>
                      <span className="font-mono text-[#34D399] font-bold">{c.cvr} CVR</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

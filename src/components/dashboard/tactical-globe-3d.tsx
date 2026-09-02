"use client"

import React, { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from "react"
import * as THREE from "three"
import { getCountryByISO, CountryData } from "@/lib/data/countries"

export interface TacticalLocation {
  id: string
  code: string
  name: string
  city: string
  subtitle: string
  latitude: number
  longitude: number
  installs: string
  ctr: string
  cvr: string
  status: "ACTIVE" | "STANDBY"
  flag?: string
}

export const EXACT_FRAMER_LOCATIONS: TacticalLocation[] = [
  { id: "tyo", code: "JP", name: "Japan", city: "Tokyo", subtitle: "Asia Pacific", latitude: 35.6762, longitude: 139.6503, installs: "2.1M", ctr: "5.9%", cvr: "19.7%", status: "ACTIVE", flag: "🇯🇵" },
  { id: "ber", code: "DE", name: "Germany", city: "Berlin", subtitle: "Central Europe", latitude: 52.52, longitude: 13.405, installs: "1.4M", ctr: "6.3%", cvr: "22.1%", status: "ACTIVE", flag: "🇩🇪" },
  { id: "sar", code: "BA", name: "Bosnia & Herz.", city: "Sarajevo", subtitle: "Southeast Europe", latitude: 43.8563, longitude: 18.4131, installs: "420K", ctr: "7.1%", cvr: "24.5%", status: "ACTIVE", flag: "🇧🇦" },
  { id: "ny", code: "US", name: "United States", city: "New York", subtitle: "North America", latitude: 40.7128, longitude: -74.006, installs: "3.4M", ctr: "4.2%", cvr: "15.8%", status: "ACTIVE", flag: "🇺🇸" },
  { id: "lon", code: "GB", name: "United Kingdom", city: "London", subtitle: "Western Europe", latitude: 51.5074, longitude: -0.1278, installs: "1.2M", ctr: "6.1%", cvr: "21.2%", status: "ACTIVE", flag: "🇬🇧" },
  { id: "dxb", code: "AE", name: "United Arab Emirates", city: "Dubai", subtitle: "Middle East", latitude: 25.2048, longitude: 55.2708, installs: "890K", ctr: "7.4%", cvr: "24.1%", status: "ACTIVE", flag: "🇦🇪" },
  { id: "in", code: "IN", name: "India", city: "New Delhi", subtitle: "South Asia", latitude: 20.5937, longitude: 78.9629, installs: "1.8M", ctr: "5.6%", cvr: "18.4%", status: "ACTIVE", flag: "🇮🇳" },
]

export interface MarkerOptions {
  id?: string
  country: string
  color?: string
  size?: number
  label?: string
}

export interface FocusOptions {
  duration?: number
  easing?: "easeInOutCubic" | "linear"
}

export interface GlobeSelection {
  name: string
  iso2: string
  iso3: string
  latitude: number
  longitude: number
}

export interface TacticalGlobe3DHandle {
  focusCountry: (iso: string, options?: FocusOptions) => void
  clearSelection: () => void
  setMarker: (options: MarkerOptions) => void
  removeMarker: (idOrCountry: string) => void
  resetRotation: () => void
}

interface TacticalGlobe3DProps {
  appName?: string
  browserUrl?: string
  growthChange?: string
  locations?: TacticalLocation[]
  onCountryHover?: (country: GlobeSelection | null) => void
  onCountryClick?: (country: GlobeSelection) => void
}

function getRealTime30DaysData() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  const startDate = new Date(yesterday)
  startDate.setDate(yesterday.getDate() - 29)

  const formatDateShort = (d: Date) => `${d.getDate()} ${months[d.getMonth()]}`
  const dateRangeStr = `${formatDateShort(startDate)} – ${formatDateShort(yesterday)}`
  const rawValues = [12, 18, 14, 22, 15, 28, 19, 25, 11, 16, 21, 17, 24, 9, 4]
  const maxVal = Math.max(...rawValues)

  const barData = rawValues.map((val, idx) => {
    const pointDate = new Date(startDate)
    pointDate.setDate(startDate.getDate() + idx * 2)
    return { val, height: Math.round((val / maxVal) * 100), dateStr: formatDateShort(pointDate) }
  })

  return {
    dateRangeStr,
    startDateStr: formatDateShort(startDate),
    midDateStr: barData[7].dateStr,
    endDateStr: formatDateShort(yesterday),
    barData,
  }
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = lat * (Math.PI / 180)
  const theta = lng * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    -radius * Math.cos(phi) * Math.cos(theta)
  )
}

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const shortestAngleDiff = (from: number, to: number): number => {
  let diff = (to - from) % (2 * Math.PI)
  if (diff > Math.PI) diff -= 2 * Math.PI
  if (diff < -Math.PI) diff += 2 * Math.PI
  return diff
}

export const TacticalGlobe3D = forwardRef<TacticalGlobe3DHandle, TacticalGlobe3DProps>(({
  appName = "FloatMe",
  browserUrl = "adsidol.com/tactical-radar?app=floatme",
  growthChange = "+32.2%",
  locations = EXACT_FRAMER_LOCATIONS,
  onCountryHover,
  onCountryClick,
}, ref) => {
  const mountRef = useRef<HTMLDivElement>(null)
  
  // UI State
  const [activeSidePanelIdx, setActiveSidePanelIdx] = useState<number | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<TacticalLocation | GlobeSelection | null>(null)
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string; subtext: string }>({
    visible: false, x: 0, y: 0, text: "", subtext: ""
  })

  // Three.js Refs
  const globeGroupRef = useRef<THREE.Group | null>(null)
  const redPinsGroupRef = useRef<THREE.Group | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  
  // Interaction Refs
  const isDraggingRef = useRef<boolean>(false)
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2())
  const hoveredMeshRef = useRef<THREE.Object3D | null>(null)

  // Markers Map (to avoid React re-renders on marker updates)
  const customMarkersRef = useRef<Map<string, THREE.Group>>(new Map())

  // Focus Animation State
  const animRef = useRef<{
    isAnimating: boolean
    startTime: number
    duration: number
    startRotY: number
    startRotX: number
    targetRotY: number
    targetRotX: number
    targetIdx?: number | null
  }>({
    isAnimating: false, startTime: 0, duration: 1200,
    startRotY: 0, startRotX: 0, targetRotY: 0, targetRotX: 0
  })

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isAutoRotatingRef = useRef<boolean>(true)

  const realTimeData = useMemo(() => getRealTime30DaysData(), [])

  // Provide API via forwardRef
  useImperativeHandle(ref, () => ({
    focusCountry: (iso: string, options?: FocusOptions) => {
      const country = getCountryByISO(iso)
      if (!country || !globeGroupRef.current) return
      
      const lat = country.latitude
      const lng = country.longitude
      
      const targetY_raw = (180 - lng) * (Math.PI / 180)
      const targetX_raw = Math.max(-0.85, Math.min(0.85, lat * (Math.PI / 180)))

      const currentY = globeGroupRef.current.rotation.y
      const currentX = globeGroupRef.current.rotation.x
      const targetY = currentY + shortestAngleDiff(currentY, targetY_raw)

      isAutoRotatingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      
      animRef.current = {
        isAnimating: true,
        startTime: performance.now(),
        duration: options?.duration || 1200,
        startRotY: currentY,
        startRotX: currentX,
        targetRotY: targetY,
        targetRotX: targetX_raw,
      }
      
      setHoveredLocation({
        name: country.name,
        iso2: country.iso2,
        iso3: country.iso3,
        latitude: country.latitude,
        longitude: country.longitude
      })
      
      inactivityTimerRef.current = setTimeout(() => {
        isAutoRotatingRef.current = true
      }, 8000)
    },
    clearSelection: () => {
      setHoveredLocation(null)
      setActiveSidePanelIdx(null)
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      isAutoRotatingRef.current = true
    },
    setMarker: (options: MarkerOptions) => {
      const country = getCountryByISO(options.country)
      if (!country || !redPinsGroupRef.current) return
      
      const id = options.id || options.country
      if (customMarkersRef.current.has(id)) {
        // Remove existing marker with same id
        const existing = customMarkersRef.current.get(id)!
        redPinsGroupRef.current.remove(existing)
      }
      
      const size = options.size || 1.0
      const color = options.color ? new THREE.Color(options.color) : new THREE.Color(0xff3b30)
      
      const pos = latLngToVector3(country.latitude, country.longitude, 64)
      const pinGroup = new THREE.Group()
      pinGroup.position.copy(pos)
      const normal = pos.clone().normalize()
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal)
      
      const headGeo = new THREE.SphereGeometry(2.4 * size, 16, 16)
      const headMat = new THREE.MeshBasicMaterial({ color })
      const headMesh = new THREE.Mesh(headGeo, headMat)
      headMesh.position.y = 2.5 * size
      
      // Store country data for raycaster
      headMesh.userData = { isMarker: true, country }
      
      const glowGeo = new THREE.SphereGeometry(3.8 * size, 16, 16)
      const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 })
      const glowMesh = new THREE.Mesh(glowGeo, glowMat)
      glowMesh.position.y = 2.5 * size
      
      pinGroup.add(headMesh)
      pinGroup.add(glowMesh)
      
      // Add label if provided
      if (options.label) {
        // Implement sprite or HTML label if needed, skipped for pure Three JS mesh simplicity unless required
      }
      
      redPinsGroupRef.current.add(pinGroup)
      customMarkersRef.current.set(id, pinGroup)
    },
    removeMarker: (idOrCountry: string) => {
      if (customMarkersRef.current.has(idOrCountry) && redPinsGroupRef.current) {
        const marker = customMarkersRef.current.get(idOrCountry)!
        redPinsGroupRef.current.remove(marker)
        customMarkersRef.current.delete(idOrCountry)
      }
    },
    resetRotation: () => {
      if (!globeGroupRef.current) return
      isAutoRotatingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      
      const currentY = globeGroupRef.current.rotation.y
      const currentX = globeGroupRef.current.rotation.x
      
      animRef.current = {
        isAnimating: true,
        startTime: performance.now(),
        duration: 1000,
        startRotY: currentY,
        startRotX: currentX,
        targetRotY: 0,
        targetRotX: 0,
      }
      
      inactivityTimerRef.current = setTimeout(() => {
        isAutoRotatingRef.current = true
      }, 2000)
    }
  }))

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 900
    const height = container.clientHeight || 580

    // 1. Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 240
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Starfield
    const starsGeo = new THREE.BufferGeometry()
    const starCount = 350
    const starPositions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 600
      starPositions[i + 1] = (Math.random() - 0.5) * 600
      starPositions[i + 2] = -150 - Math.random() * 200
    }
    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    const starsMat = new THREE.PointsMaterial({ color: 0x8899ac, size: 1.4, transparent: true, opacity: 0.5 })
    scene.add(new THREE.Points(starsGeo, starsMat))

    // 3. Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.9))
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6)
    keyLight.position.set(200, 150, 300)
    scene.add(keyLight)

    // 4. Globe Base
    const globeGroup = new THREE.Group()
    globeGroup.rotation.order = "YXZ"
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    const radius = 64
    const sphereMat = new THREE.MeshStandardMaterial({ color: 0x1c2128, roughness: 0.8, metalness: 0.1 })
    globeGroup.add(new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 64), sphereMat))

    new THREE.TextureLoader().load("https://unpkg.com/three-globe@2.31.0/example/img/earth-dark.jpg", (tex) => {
      sphereMat.map = tex
      sphereMat.color = new THREE.Color(0xffffff)
      sphereMat.needsUpdate = true
    })

    const wireframeMat = new THREE.LineBasicMaterial({ color: 0x3a4250, transparent: true, opacity: 0.2 })
    globeGroup.add(new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.SphereGeometry(radius * 1.002, 28, 28)), wireframeMat))

    // 5. Default Static Pins (from Framer exact screenshot)
    const redPinsGroup = new THREE.Group()
    globeGroup.add(redPinsGroup)
    redPinsGroupRef.current = redPinsGroup

    locations.forEach((loc) => {
      const pos = latLngToVector3(loc.latitude, loc.longitude, radius)
      const pinGroup = new THREE.Group()
      pinGroup.position.copy(pos)
      pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize())
      
      const headMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
      const headMesh = new THREE.Mesh(new THREE.SphereGeometry(2.4, 16, 16), headMat)
      headMesh.position.y = 2.5
      
      // Add userData for Raycaster
      headMesh.userData = { 
        isMarker: true, 
        country: { name: loc.name, iso2: loc.code, iso3: loc.code, latitude: loc.latitude, longitude: loc.longitude },
        originalColor: 0xff3b30
      }

      const glowMat = new THREE.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.4 })
      const glowMesh = new THREE.Mesh(new THREE.SphereGeometry(3.8, 16, 16), glowMat)
      glowMesh.position.y = 2.5
      glowMesh.name = "glow"

      pinGroup.add(headMesh)
      pinGroup.add(glowMesh)
      redPinsGroup.add(pinGroup)
    })

    // 6. Interactions (Drag & Hover)
    const domEl = renderer.domElement

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true
      prevPointerRef.current = { x: e.clientX, y: e.clientY }
      velocityRef.current = { x: 0, y: 0 }
      isAutoRotatingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    }

    const onPointerMove = (e: PointerEvent) => {
      // Raycasting for Hover
      const rect = domEl.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const intersects = raycasterRef.current.intersectObjects(redPinsGroup.children, true)
      
      const hit = intersects.find(i => i.object.userData?.isMarker)
      
      if (hit && hit.object instanceof THREE.Mesh) {
        domEl.style.cursor = "pointer"
        const country = hit.object.userData.country as GlobeSelection
        
        // Handle enter
        if (hoveredMeshRef.current !== hit.object) {
          if (hoveredMeshRef.current && hoveredMeshRef.current instanceof THREE.Mesh) {
             hoveredMeshRef.current.material.color.setHex(hoveredMeshRef.current.userData.originalColor || 0xff3b30)
             const glow = hoveredMeshRef.current.parent?.children.find(c => c.name === "glow")
             if (glow) glow.scale.set(1, 1, 1)
          }
          
          hoveredMeshRef.current = hit.object
          // Increase brightness/outline
          hit.object.material.color.setHex(0xffffff)
          const glow = hit.object.parent?.children.find(c => c.name === "glow")
          if (glow) glow.scale.set(1.4, 1.4, 1.4)
          
          setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY - 40,
            text: country.name,
            subtext: country.iso2 || country.iso3
          })
          
          if (onCountryHover) onCountryHover(country)
        } else {
          // Update tooltip position
          setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY - 40 }))
        }
      } else {
        domEl.style.cursor = "grab"
        if (hoveredMeshRef.current && hoveredMeshRef.current instanceof THREE.Mesh) {
          hoveredMeshRef.current.material.color.setHex(hoveredMeshRef.current.userData.originalColor || 0xff3b30)
          const glow = hoveredMeshRef.current.parent?.children.find(c => c.name === "glow")
          if (glow) glow.scale.set(1, 1, 1)
          hoveredMeshRef.current = null
          setTooltip(prev => ({ ...prev, visible: false }))
          if (onCountryHover) onCountryHover(null)
        }
      }

      // Dragging
      if (isDraggingRef.current && globeGroupRef.current) {
        domEl.style.cursor = "grabbing"
        const deltaX = e.clientX - prevPointerRef.current.x
        const deltaY = e.clientY - prevPointerRef.current.y
        velocityRef.current = { x: deltaX * 0.005, y: deltaY * 0.005 }
        globeGroupRef.current.rotation.y += velocityRef.current.x
        globeGroupRef.current.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroupRef.current.rotation.x + velocityRef.current.y))
        prevPointerRef.current = { x: e.clientX, y: e.clientY }
      }
    }

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false
      domEl.style.cursor = "grab"
      
      // Click detection
      if (Math.abs(velocityRef.current.x) < 0.001 && Math.abs(velocityRef.current.y) < 0.001) {
        if (hoveredMeshRef.current) {
          const country = hoveredMeshRef.current.userData.country as GlobeSelection
          if (onCountryClick) onCountryClick(country)
        }
      }

      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = setTimeout(() => { isAutoRotatingRef.current = true }, 8000)
    }

    domEl.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    // 7. Render Loop
    let animationFrameId: number
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const anim = animRef.current
      if (anim.isAnimating) {
        const elapsed = time - anim.startTime
        const progress = Math.min(1, elapsed / anim.duration)
        const easeT = easeInOutCubic(progress)
        globeGroup.rotation.y = anim.startRotY + (anim.targetRotY - anim.startRotY) * easeT
        globeGroup.rotation.x = anim.startRotX + (anim.targetRotX - anim.startRotX) * easeT
        if (progress >= 1) anim.isAnimating = false
      } else if (!isDraggingRef.current && Math.hypot(velocityRef.current.x, velocityRef.current.y) > 0.0001) {
        globeGroup.rotation.y += velocityRef.current.x
        globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x + velocityRef.current.y))
        velocityRef.current.x *= 0.92
        velocityRef.current.y *= 0.92
      } else if (isAutoRotatingRef.current && !isDraggingRef.current) {
        globeGroup.rotation.y += 0.002
        globeGroup.rotation.x += (0 - globeGroup.rotation.x) * 0.04
      }

      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(animate)

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
  }, [locations, onCountryHover, onCountryClick])

  // UI Handlers for Side Panel
  const handleSidePanelFocus = (idx: number, loc: TacticalLocation) => {
    setActiveSidePanelIdx(idx)
    setHoveredLocation(loc)
    
    // Trigger smooth rotation to this location
    if (globeGroupRef.current) {
      const lat = loc.latitude
      const lng = loc.longitude
      const targetY_raw = (180 - lng) * (Math.PI / 180)
      const targetX_raw = Math.max(-0.85, Math.min(0.85, lat * (Math.PI / 180)))
      const currentY = globeGroupRef.current.rotation.y
      const currentX = globeGroupRef.current.rotation.x

      isAutoRotatingRef.current = false
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)

      animRef.current = {
        isAnimating: true,
        startTime: performance.now(),
        duration: 1200,
        startRotY: currentY,
        startRotX: currentX,
        targetRotY: currentY + shortestAngleDiff(currentY, targetY_raw),
        targetRotX: targetX_raw,
      }
      
      inactivityTimerRef.current = setTimeout(() => { isAutoRotatingRef.current = true }, 8000)
    }
  }

  const handleSidePanelLeave = () => {
    setActiveSidePanelIdx(null)
    setHoveredLocation(null)
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current)
    inactivityTimerRef.current = setTimeout(() => { isAutoRotatingRef.current = true }, 2000)
  }

  // Derived display for hover/focus state
  const isCustomSelection = hoveredLocation && !('installs' in hoveredLocation)
  const displayLoc = hoveredLocation as TacticalLocation

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#0A0C10] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.8)] font-mono transition-all">
      {/* ── BROWSER CHROME TOPBAR ──────────────────────────────────────────── */}
      <div className="h-10 bg-[#0E1116] border-b border-white/[0.06] px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="size-2.5 rounded-full bg-[#FF5F57]" />
          <div className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="h-6 bg-white/[0.07] border border-white/[0.05] rounded-md px-3.5 flex items-center justify-center gap-1.5 text-[11px] text-[#888888]">
            <span className="text-[10px] opacity-60">🔒</span>
            <span className="text-white/70 font-medium">{browserUrl}</span>
          </div>
        </div>
        <div className="w-12 shrink-0" />
      </div>

      {/* ── CANVAS CONTAINER ────────────────────────────────── */}
      <div className="relative h-[520px] sm:h-[580px] w-full overflow-hidden bg-[#050608]">
        <div ref={mountRef} className="absolute inset-0 z-0 flex items-center justify-center outline-none" />

        {/* Dynamic Tooltip */}
        {tooltip.visible && (
          <div 
            className="absolute z-50 px-3 py-1.5 bg-[#1C2128]/95 border border-white/10 rounded-md shadow-xl backdrop-blur-md pointer-events-none transform -translate-x-1/2 -translate-y-full transition-opacity duration-150"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div className="text-white text-xs font-bold font-sans">{tooltip.text}</div>
            <div className="text-[#9CA3AF] text-[10px] uppercase tracking-wider">{tooltip.subtext}</div>
          </div>
        )}

        {/* ── LEFT GLASS PANEL (Metrics) ──────── */}
        <div className="absolute top-6 left-6 z-10 w-[260px] sm:w-[280px] p-5 rounded-2xl bg-[#0F1318]/85 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-white space-y-4 pointer-events-none">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none font-sans flex items-baseline gap-2">
              <span>255</span>
              <span className="text-xl sm:text-2xl font-bold text-white/90">Events</span>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[11px] text-[#9CA3AF] font-sans">{realTimeData.dateRangeStr}</span>
              <span className="text-[10px] font-bold text-[#34D399] bg-[#34D399]/15 border border-[#34D399]/30 px-2 py-0.5 rounded font-mono">
                {growthChange}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-end gap-1 h-20 px-1">
              {realTimeData.barData.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                  <div className="w-full rounded-sm bg-[#60A5FA] transition-all duration-300 group-hover:bg-[#FF3B30] group-hover:scale-y-110 origin-bottom" style={{ height: `${bar.height}%` }} />
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#9CA3AF] mt-1.5 px-1 font-mono">
              <span>{realTimeData.startDateStr}</span>
              <span>{realTimeData.midDateStr}</span>
              <span className="text-[#34D399] font-bold">{realTimeData.endDateStr}</span>
            </div>
          </div>

          {hoveredLocation && (
            <div className="pt-3 border-t border-white/10 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-white font-sans">
                <span>
                  {isCustomSelection 
                    ? (hoveredLocation as GlobeSelection).name 
                    : `${displayLoc.flag || ''} ${displayLoc.city}, ${displayLoc.name}`}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#FF3B30] bg-[#FF3B30]/15 px-1.5 py-0.5 rounded border border-[#FF3B30]/30">
                  FOCUS
                </span>
              </div>
              
              {!isCustomSelection && (
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-white/5 p-1.5 rounded">
                    <div className="text-[#9CA3AF] text-[9px]">Installs</div>
                    <div className="font-bold text-white">{displayLoc.installs}</div>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded">
                    <div className="text-[#9CA3AF] text-[9px]">CTR / CVR</div>
                    <div className="font-bold text-[#FF3B30]">{displayLoc.ctr} / {displayLoc.cvr}</div>
                  </div>
                </div>
              )}
              {isCustomSelection && (
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-white/5 p-1.5 rounded">
                    <div className="text-[#9CA3AF] text-[9px]">LATITUDE</div>
                    <div className="font-bold text-white">{hoveredLocation.latitude.toFixed(4)}</div>
                  </div>
                  <div className="bg-white/5 p-1.5 rounded">
                    <div className="text-[#9CA3AF] text-[9px]">LONGITUDE</div>
                    <div className="font-bold text-[#FF3B30]">{hoveredLocation.longitude.toFixed(4)}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT GLASS PANEL (Locations List) ─────────────────────────────── */}
        {locations.length > 0 && (
          <div className="absolute top-6 right-6 z-10 w-[220px] sm:w-[240px] p-4 rounded-2xl bg-[#0F1318]/80 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-white space-y-3">
            <div className="text-[10px] font-bold tracking-widest text-[#9CA3AF] uppercase">
              LOCATIONS
            </div>
            <div className="space-y-1 divide-y divide-white/[0.06]">
              {locations.map((loc, idx) => {
                const isActive = activeSidePanelIdx === idx
                const isInactive = activeSidePanelIdx !== null && !isActive

                return (
                  <div
                    key={loc.id}
                    onMouseEnter={() => handleSidePanelFocus(idx, loc)}
                    onMouseLeave={handleSidePanelLeave}
                    style={{ opacity: isInactive ? 0.6 : 1 }}
                    className={`pt-2.5 first:pt-0 pb-2 px-2 rounded-lg cursor-pointer transition-all flex items-center gap-2.5 ${
                      isActive ? "bg-white/15 text-white shadow-md border-l-2 border-l-[#FF3B30]" : "hover:bg-white/5 text-[#E2E8F0]"
                    }`}
                  >
                    <div className={`size-2 rounded-full shrink-0 transition-all ${isActive ? "bg-[#FF3B30] scale-125 shadow-[0_0_10px_#FF3B30]" : "bg-[#FF3B30]/60"}`} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold font-sans text-white leading-snug truncate flex items-center justify-between">
                        <span>{loc.city}</span>
                        <span className="text-[10px] font-mono opacity-80">{loc.flag}</span>
                      </div>
                      <div className="text-[10px] text-[#9CA3AF] font-sans truncate flex items-center justify-between mt-0.5">
                        <span>{loc.name}</span>
                        <span className="font-mono text-[#34D399] font-bold">{loc.cvr} CVR</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

TacticalGlobe3D.displayName = "TacticalGlobe3D"

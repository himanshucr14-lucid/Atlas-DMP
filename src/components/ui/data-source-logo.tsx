"use client"

import React from "react"
import {
  ShieldAlert,
  Smartphone,
  Layers,
  Activity,
  Zap,
  Sliders,
  BarChart2,
  GitBranch,
  Gamepad2,
  Database,
  Globe,
  Lock,
} from "lucide-react"

interface DataSourceLogoProps {
  name: string
  category?: string
  className?: string
}

export function DataSourceLogo({ name, category, className = "size-9" }: DataSourceLogoProps) {
  const lower = name.toLowerCase()

  // 1. AppsFlyer
  if (lower.includes("appsflyer")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold ${className}`}>
        <Zap className="size-5 text-emerald-400" />
      </div>
    )
  }

  // 2. Samsung Knox
  if (lower.includes("samsung") || lower.includes("knox")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 font-semibold ${className}`}>
        <Lock className="size-5 text-blue-400" />
      </div>
    )
  }

  // 3. Adjust SDK
  if (lower.includes("adjust")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 font-semibold ${className}`}>
        <Sliders className="size-5 text-indigo-400" />
      </div>
    )
  }

  // 4. AppLovin
  if (lower.includes("applovin")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-400 font-semibold ${className}`}>
        <Layers className="size-5 text-violet-400" />
      </div>
    )
  }

  // 5. Fraud / Click Spam
  if (lower.includes("fraud") || lower.includes("spam") || lower.includes("blocked")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-400 ${className}`}>
        <ShieldAlert className="size-5 text-rose-400" />
      </div>
    )
  }

  // 6. Google / AdMob
  if (lower.includes("google") || lower.includes("admob")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 ${className}`}>
        <Globe className="size-5 text-sky-400" />
      </div>
    )
  }

  // 7. Xiaomi / HyperOS
  if (lower.includes("xiaomi") || lower.includes("hyperos")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 ${className}`}>
        <Smartphone className="size-5 text-amber-400" />
      </div>
    )
  }

  // 8. Unity Ads
  if (lower.includes("unity")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 ${className}`}>
        <Gamepad2 className="size-5 text-cyan-400" />
      </div>
    )
  }

  // 9. Branch
  if (lower.includes("branch")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-400 ${className}`}>
        <GitBranch className="size-5 text-teal-400" />
      </div>
    )
  }

  // 10. Singular
  if (lower.includes("singular")) {
    return (
      <div className={`flex items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 ${className}`}>
        <BarChart2 className="size-5 text-purple-400" />
      </div>
    )
  }

  // Fallback category matching
  return (
    <div className={`flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary ${className}`}>
      <Database className="size-5 text-primary" />
    </div>
  )
}

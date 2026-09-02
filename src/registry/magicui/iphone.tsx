import React, { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  children?: React.ReactNode
}

export function Iphone({ src, children, className, ...props }: IphoneProps) {
  return (
    <div
      className={cn("relative mx-auto select-none", className)}
      style={{
        width: 300,
        height: 620,
        // 3D perspective tilt — Apple-style product shot angle
        transform: "perspective(1200px) rotateY(-10deg) rotateX(2deg)",
        transformStyle: "preserve-3d",
        filter: "drop-shadow(-20px 24px 48px rgba(0,0,0,0.7)) drop-shadow(4px 8px 16px rgba(0,0,0,0.5))",
      }}
      {...props}
    >
      {/* Phone body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 48,
          background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #111111 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          // Side edge highlight to sell the 3D
          boxShadow: `
            inset -2px 0 0 rgba(255,255,255,0.08),
            inset 2px 0 0 rgba(255,255,255,0.04),
            inset 0 -2px 0 rgba(255,255,255,0.04)
          `,
        }}
      />

      {/* Side button rails */}
      {/* Power button — right */}
      <div style={{ position: "absolute", right: -3, top: 140, width: 4, height: 60, borderRadius: 2, background: "#2a2a2a", border: "1px solid rgba(255,255,255,0.1)" }} />
      {/* Volume up — left */}
      <div style={{ position: "absolute", left: -3, top: 130, width: 4, height: 40, borderRadius: 2, background: "#2a2a2a", border: "1px solid rgba(255,255,255,0.1)" }} />
      {/* Volume down — left */}
      <div style={{ position: "absolute", left: -3, top: 180, width: 4, height: 40, borderRadius: 2, background: "#2a2a2a", border: "1px solid rgba(255,255,255,0.1)" }} />
      {/* Mute — left */}
      <div style={{ position: "absolute", left: -3, top: 100, width: 4, height: 24, borderRadius: 2, background: "#2a2a2a", border: "1px solid rgba(255,255,255,0.1)" }} />

      {/* Screen glass — slightly inset from body */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          right: 8,
          bottom: 8,
          borderRadius: 42,
          overflow: "hidden",
          background: "#000",
          // Screen glass reflection
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Dynamic Island notch */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 110,
            height: 28,
            borderRadius: 16,
            background: "#000",
            zIndex: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a1a1a", border: "1px solid #333" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#10B981", opacity: 0.9, margin: "auto", marginTop: 3 }} />
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
        </div>

        {/* Screen content */}
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
          {src ? (
            <img src={src} alt="iPhone Display" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            children
          )}
        </div>

        {/* Screen glare overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 42,
            background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
            pointerEvents: "none",
            zIndex: 40,
          }}
        />
      </div>
    </div>
  )
}

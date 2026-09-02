"use client"

import * as React from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { RadioIcon, ShieldAlertIcon, CheckCircle2Icon, TerminalIcon, ActivityIcon } from "lucide-react"

interface TelemetryLog {
  id: string
  timestamp: string
  event: string
  siteId: string
  status: "CLEAN" | "FRAUD_BLOCKED" | "MAID_RESOLVED"
  latency: string
}

export function TelemetryStreamDrawer() {
  const [logs, setLogs] = React.useState<TelemetryLog[]>([
    { id: "LOG-9021", timestamp: "17:00:54.102", event: "OpenRTB Bid Request #8841", siteId: "SITE-FIN-9941", status: "CLEAN", latency: "14ms" },
    { id: "LOG-9020", timestamp: "17:00:53.980", event: "MAID Identity Match (GAID: 88f2...)", siteId: "SITE-FIN-8812", status: "MAID_RESOLVED", latency: "8ms" },
    { id: "LOG-9019", timestamp: "17:00:52.411", event: "Bot Click Injection Detected", siteId: "SITE-BOT-4410", status: "FRAUD_BLOCKED", latency: "3ms" },
    { id: "LOG-9018", timestamp: "17:00:51.804", event: "Interstitial Impression Fired", siteId: "SITE-FIN-7723", status: "CLEAN", latency: "22ms" },
    { id: "LOG-9017", timestamp: "17:00:50.129", event: "Sub-Publisher Abandonment Trigger", siteId: "SITE-DEV-1092", status: "FRAUD_BLOCKED", latency: "5ms" },
    { id: "LOG-9016", timestamp: "17:00:49.002", event: "Rewarded Video Postback Verified", siteId: "SITE-FIN-9941", status: "CLEAN", latency: "18ms" },
  ])

  // Simulate real-time streaming additions
  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`
      const isFraud = Math.random() < 0.2
      const isMaid = Math.random() < 0.3

      const newLog: TelemetryLog = {
        id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: timeStr,
        event: isFraud
          ? "Click Spam / Bot Signature Suppressed"
          : isMaid
          ? "MAID Graph Resolution (IDFA: e4a1...)"
          : "OpenRTB 2.5 Win Notice Processing",
        siteId: isFraud ? "SITE-BOT-4410" : "SITE-FIN-9941",
        status: isFraud ? "FRAUD_BLOCKED" : isMaid ? "MAID_RESOLVED" : "CLEAN",
        latency: `${Math.floor(4 + Math.random() * 20)}ms`,
      }

      setLogs((prev) => [newLog, ...prev.slice(0, 19)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center h-8 px-3 rounded-md bg-[#10B981] hover:bg-[#10B981]/90 text-black font-mono text-xs font-bold gap-1.5 shadow-lg shadow-[#10B981]/20 transition-colors">
        <TerminalIcon className="size-3.5" />
        LIVE LOGS
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-[#090909] border-l border-white/[0.06] text-white p-6 overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-white/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <ActivityIcon className="size-4" />
              </div>
              <SheetTitle className="text-base font-bold font-mono text-white">
                Live Telemetry Stream
              </SheetTitle>
            </div>
            <Badge variant="outline" className="border-[#10B981]/30 text-[#10B981] font-mono text-[10px]">
              OpenRTB v2.5 Node
            </Badge>
          </div>
          <p className="text-xs text-[#A0A0A0] font-mono">
            Real-time auction events, MAID resolution & anti-fraud blocks
          </p>
        </SheetHeader>

        {/* Stream List */}
        <div className="space-y-2.5 pt-4 font-mono">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-lg bg-[#111111] p-3 border border-white/[0.04] text-xs space-y-1.5 transition-all hover:bg-[#161616]"
            >
              <div className="flex items-center justify-between text-[10px] text-[#A0A0A0]">
                <span className="font-bold text-[#10B981]">{log.id}</span>
                <span>{log.timestamp}</span>
              </div>
              <p className="font-semibold text-white truncate">{log.event}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-[#A0A0A0]">{log.siteId}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#A0A0A0]">{log.latency}</span>
                  {log.status === "CLEAN" ? (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[9px] px-1.5 py-0">
                      <CheckCircle2Icon className="size-2.5 mr-1 inline" /> CLEAN
                    </Badge>
                  ) : log.status === "MAID_RESOLVED" ? (
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[9px] px-1.5 py-0">
                      <RadioIcon className="size-2.5 mr-1 inline" /> MAID
                    </Badge>
                  ) : (
                    <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-[9px] px-1.5 py-0">
                      <ShieldAlertIcon className="size-2.5 mr-1 inline" /> BLOCKED
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

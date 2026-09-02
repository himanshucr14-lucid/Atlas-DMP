"use client"

import { useState, useRef } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DataSourceLogo } from "@/components/ui/data-source-logo"
import { ChevronRightIcon, SendIcon, LoaderCircleIcon, CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const dmpPipelines = [
  { id: "appsflyer", name: "AppsFlyer SDK Sync", logo: "AppsFlyer" },
  { id: "adjust", name: "Adjust Attribution Stream", logo: "Adjust" },
  { id: "singular", name: "Singular Postbacks", logo: "Singular" },
  { id: "dv360", name: "Google DV360 DSP", logo: "Google AdMob" },
  { id: "applovin", name: "AppLovin MAX Exchange", logo: "AppLovin" },
  { id: "unity", name: "Unity Ads Network", logo: "Unity Ads" },
]

type SendState = "idle" | "sending" | "success"

export function QuickTransfer() {
  const [selectedContact, setSelectedContact] = useState(dmpPipelines[0].id)
  const [amount, setAmount] = useState("25000")
  const [sendState, setSendState] = useState<SendState>("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const selected = dmpPipelines.find((c) => c.id === selectedContact)

  const handleSend = () => {
    if (sendState !== "idle" || !amount || parseFloat(amount) <= 0) return
    setSendState("sending")

    timeoutRef.current = setTimeout(() => {
      setSendState("success")
      timeoutRef.current = setTimeout(() => {
        setSendState("idle")
      }, 2000)
    }, 1200)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          Quick Cohort Dispatch
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-auto gap-1 px-0 text-xs text-muted-foreground">
          All Data Pipelines
          <ChevronRightIcon className="size-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* DMP Pipeline Badges row */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 py-1 overflow-x-auto">
            {dmpPipelines.map((pipe) => {
              const isSelected = selectedContact === pipe.id
              return (
                <button
                  key={pipe.id}
                  onClick={() => {
                    if (sendState === "idle") setSelectedContact(pipe.id)
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-all text-xs font-medium shrink-0",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary font-semibold ring-1 ring-primary"
                      : "border-border/60 bg-muted/30 text-muted-foreground hover:bg-muted"
                  )}
                >
                  <DataSourceLogo name={pipe.logo} className="size-5" />
                  <span>{pipe.name.split(" ")[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected contact name */}
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedContact}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-muted-foreground"
          >
            Sending to{" "}
            <span className="font-medium text-foreground">
              {selected?.name}
            </span>
          </motion.p>
        </AnimatePresence>

        {/* Amount + Send */}
        <AnimatePresence mode="wait">
          {sendState === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-2 py-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              >
                <CheckCircle2Icon className="size-10 text-emerald-500" />
              </motion.div>
              <p className="text-sm font-semibold">
                {parseInt(amount || "25000").toLocaleString("en-US")} signals dispatched!
              </p>
              <p className="text-xs text-muted-foreground">
                To {selected?.name}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-3"
            >
              <div className="flex-1 space-y-1.5">
                <label className="text-xs text-muted-foreground">Volume (Signals)</label>
                <div className="relative">
                  <Input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={sendState === "sending"}
                    className="h-10 px-3 text-lg font-semibold tabular-nums font-mono"
                  />
                </div>
              </div>
              <Button
                className="h-10 gap-2 px-6"
                disabled={sendState === "sending"}
                onClick={handleSend}
              >
                {sendState === "sending" ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : (
                  <SendIcon className="size-4" />
                )}
                {sendState === "sending" ? "Dispatching..." : "Dispatch"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

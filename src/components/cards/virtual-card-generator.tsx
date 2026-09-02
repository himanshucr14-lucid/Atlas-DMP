"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { LoaderIcon, CopyIcon, CheckIcon, CpuIcon, ShieldCheckIcon, KeyIcon } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CardData } from "@/data/seed"

type Step = "idle" | "form" | "loading" | "success"

interface VirtualCardGeneratorProps {
  onCardCreated: (card: CardData) => void
}

function randomDigits(n: number): string {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("")
}

export function VirtualCardGenerator({
  onCardCreated,
}: VirtualCardGeneratorProps) {
  const [step, setStep] = useState<Step>("idle")
  const [name, setName] = useState("")
  const [limit, setLimit] = useState("")
  const [newCard, setNewCard] = useState<CardData | null>(null)
  const [copied, setCopied] = useState(false)

  const reset = useCallback(() => {
    setStep("idle")
    setName("")
    setLimit("")
    setNewCard(null)
    setCopied(false)
  }, [])

  const handleGenerate = useCallback(() => {
    if (!name.trim()) return
    setStep("loading")

    const last4 = randomDigits(4)
    const card: CardData = {
      id: `oem-${Date.now()}`,
      name: name.trim(),
      type: "hardware",
      last4,
      cardNumber: `HKNX-${randomDigits(4)}-${last4}`,
      holder: "OEM Knox Passkey Cluster",
      expiry: "AES-256 Auth",
      cvv: "0.4ms",
      network: "knox",
      frozen: false,
      dailyLimit: Number(limit) || 500000,
      monthlySpend: 218000,
      monthlyLimit: 1000000,
      color: "bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-950 border border-slate-800 text-slate-100",
    }

    setTimeout(() => {
      setNewCard(card)
      setStep("success")
      onCardCreated(card)

      setTimeout(() => {
        reset()
      }, 4000)
    }, 1200)
  }, [name, limit, onCardCreated, reset])

  const handleCopy = useCallback(() => {
    if (!newCard) return
    navigator.clipboard.writeText(newCard.cardNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [newCard])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <KeyIcon className="size-4 text-primary" />
          Provision OEM Identity Cluster
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {/* ── Idle ── */}
          {step === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <p className="text-xs text-muted-foreground font-mono">
                Provision an encrypted hardware token cluster for zero-latency device identity resolution.
              </p>
              <Button onClick={() => setStep("form")} className="w-full h-9 gap-2 text-xs font-bold font-mono">
                <CpuIcon className="size-4" />
                Provision Token Cluster
              </Button>
            </motion.div>
          )}

          {/* ── Form ── */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground font-mono">
                  Hardware Cluster Name
                </label>
                <Input
                  placeholder="e.g. Xiaomi HyperOS Cluster 02"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-mono text-xs h-9"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground font-mono">
                  Daily Processing Quota (Signals)
                </label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  className="font-mono text-xs h-9"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  className="flex-1 h-9 text-xs font-mono"
                  onClick={reset}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 h-9 text-xs font-bold font-mono"
                  disabled={!name.trim()}
                  onClick={handleGenerate}
                >
                  Provision Cluster
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── Loading ── */}
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3 py-6"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <LoaderIcon className="size-6 text-primary" />
              </motion.div>
              <span className="text-xs font-mono text-muted-foreground">
                Encrypting Hardware Passkeys...
              </span>
            </motion.div>
          )}

          {/* ── Success ── */}
          {step === "success" && newCard && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              <div className="rounded-xl border bg-muted/30 p-3 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground uppercase">Token Cluster Hash</span>
                  <span className="text-[10px] text-emerald-400 font-bold">PROVISIONED</span>
                </div>
                <p className="text-sm font-bold text-foreground tracking-wider">
                  {newCard.cardNumber}
                </p>
                <div className="flex justify-between text-[11px] text-muted-foreground border-t pt-2">
                  <span>Encryption: <strong className="text-foreground">AES-256 Auth</strong></span>
                  <span>Latency: <strong className="text-emerald-400">0.4ms</strong></span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 gap-1.5 text-xs font-mono"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy()
                }}
              >
                {copied ? (
                  <>
                    <CheckIcon className="size-3.5 text-emerald-400" />
                    Copied Token Hash!
                  </>
                ) : (
                  <>
                    <CopyIcon className="size-3.5" />
                    Copy Token Hash
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

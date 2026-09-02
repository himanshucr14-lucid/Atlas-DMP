"use client"

import { motion } from "motion/react"
import { TargetIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OpportunityScoreProps {
  score: number
  reasoning: string
  isMocked?: boolean
}

export default function OpportunityScore({ score, reasoning }: OpportunityScoreProps) {
  const radius = 56
  const strokeWidth = 9
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Campaign Readiness Index</CardTitle>
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TargetIcon className="size-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between space-y-4 py-2">
        {/* Radial SVG Gauge */}
        <div className="relative flex items-center justify-center py-2">
          <svg className="size-36 -rotate-90">
            {/* Background Track */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-muted"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Foreground Progress */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-primary"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-4xl font-extrabold tracking-tight text-foreground"
            >
              {score}
            </motion.span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
              Readiness Score
            </span>
          </div>
        </div>

        {/* Reasoning Note */}
        <div className="rounded-lg border bg-muted/30 p-2.5 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { aiInsights } from "@/data/seed"
import { cn } from "@/lib/utils"
import {
  BrainIcon,
  SparklesIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
} from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  switch (trend) {
    case "up":
      return <TrendingUpIcon className="size-3" />
    case "down":
      return <TrendingDownIcon className="size-3" />
    default:
      return <MinusIcon className="size-3" />
  }
}

import { useActiveAIAnalysis } from "@/hooks/use-active-ai-analysis"

export function AiInsights() {
  const activeData = useActiveAIAnalysis()
  const appName = activeData?.metadata?.scannedApp || "Practo: Doctor Appointment App"
  const summaryText = activeData?.campaignIntelligenceSummary || `Target app ${appName} exhibits high market readiness of 88/100. Behavioral signals confirm strong retention affinity in Tier 1 and Tier 2 geos.`

  const dynamicInsights = (activeData?.whyWeRecommendThis || []).length > 0
    ? activeData!.whyWeRecommendThis.map((item, idx) => ({
        id: `INS-${idx}`,
        text: `${item.recommendation}: ${item.points.join(" ")}`,
        percentChange: 18 + idx * 4,
        trend: "down" as "up" | "down" | "neutral",
        category: appName.split(":")[0],
      }))
    : [
        { id: "INS-1", text: `${appName}: Rewarded Video placements yield +42% higher D1 retention than standard banners.`, percentChange: 42, trend: "down" as "up" | "down" | "neutral", category: "Ad Formats" },
        { id: "INS-2", text: `${appName}: Peak user engagement occurs between 19:00 - 23:00 IST in Tier 1 metros.`, percentChange: 28, trend: "down" as "up" | "down" | "neutral", category: "Serving Hours" },
        { id: "INS-3", text: `${appName}: OpenRTB 2.5 PMP direct deals reduce early churn risk by 14%.`, percentChange: 14, trend: "down" as "up" | "down" | "neutral", category: "PMP Direct" },
      ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3"
        >
          {dynamicInsights.map((insight, i) => (
            <motion.div
              key={insight.id}
              variants={item}
              className="flex gap-3 rounded-lg border border-border/50 bg-muted/30 p-3"
            >
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {i % 2 === 0 ? (
                  <BrainIcon className="size-4 text-primary" />
                ) : (
                  <SparklesIcon className="size-4 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <p className="text-sm leading-snug">{insight.text}</p>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums",
                      insight.trend === "up" &&
                        "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      insight.trend === "down" &&
                        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      insight.trend === "neutral" &&
                        "bg-muted text-muted-foreground"
                    )}
                  >
                    <TrendIcon trend={insight.trend} />
                    {insight.percentChange > 0
                      ? `${insight.percentChange}%`
                      : "No change"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {insight.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}

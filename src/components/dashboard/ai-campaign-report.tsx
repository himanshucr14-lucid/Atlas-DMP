"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SparklesIcon, TargetIcon, ZapIcon, CheckCircle2Icon, ArrowRightIcon } from "lucide-react"
import OpportunityScore from "@/components/OpportunityScore"
import type { AIEngineResult } from "@/lib/connectors/types"

interface AICampaignReportProps {
  data: AIEngineResult | null
}

export function AICampaignReport({ data }: AICampaignReportProps) {
  if (!data) {
    return (
      <Card className="col-span-12 border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            <SparklesIcon className="size-5" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">No App Analyzed Yet</h3>
          <p className="text-xs text-muted-foreground max-w-md mt-1">
            Search for an app above (e.g. Duolingo or Tinder) to compile live Gemini campaign intelligence, opportunity score, and programmatic directives.
          </p>
        </CardContent>
      </Card>
    )
  }

  const score = data.overview.campaignReadinessScore
  const summary = data.campaignIntelligenceSummary
  const directives = data.mediaPlanningIntelligence
  const kpis = data.kpiProjections

  const directiveList = [
    { label: "Scaling Strategy", val: directives?.scalingStrategy || "Aggressive eCPM Floor Scaling" },
    { label: "Inventory Mix", val: directives?.inventoryMix || "40% SDK Rewarded + 30% Programmatic DSP" },
    { label: "Campaign Structure", val: directives?.campaignStructure || "3-Tiered Learning & Scaling Structure" },
    { label: "Audience Priority", val: directives?.audiencePriority || "High-LTV Engaged Users (Tier 1/2)" },
    { label: "Testing Strategy", val: directives?.testingStrategy || "20% Buffer for Emerging Publishers" },
    { label: "Exclusion Rules", val: directives?.exclusionStrategy || "Exclude Known Spoofed SDK Units" },
  ]

  return (
    <div className="col-span-12 grid grid-cols-12 gap-4">
      {/* Left: Opportunity Score Gauge */}
      <div className="col-span-12 lg:col-span-4">
        <OpportunityScore
          score={score}
          reasoning="Calculated based on historical category performance, fraud resistance, and regional cohort match."
          isMocked={data.metadata.isMockedData}
        />
      </div>

      {/* Right: AI Intelligence Summary & Directives */}
      <Card className="col-span-12 lg:col-span-8 flex flex-col justify-between">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <SparklesIcon className="size-4" />
              </div>
              <CardTitle className="text-base font-semibold">AI Campaign Intelligence Directives</CardTitle>
            </div>
            <Badge variant="outline" className="gap-1 border-primary/30 text-[10px] text-primary">
              <ZapIcon className="size-3" /> Live Report
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Summary Text */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5">
            <p className="text-xs text-foreground italic leading-relaxed">
              "{summary}"
            </p>
          </div>

          {/* Media Directives Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {directiveList.map((item, idx) => (
              <div key={idx} className="rounded-lg border bg-muted/40 p-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">{item.label}</p>
                <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-2">{item.val}</p>
              </div>
            ))}
          </div>

          {/* KPI Strip */}
          {kpis && (
            <div className="grid grid-cols-5 gap-2 border-t pt-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">CPM Floor</p>
                <p className="font-mono text-xs font-bold text-foreground">{kpis.estimatedCPM}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">CPC Cap</p>
                <p className="font-mono text-xs font-bold text-foreground">{kpis.estimatedCPC}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Target CPI</p>
                <p className="font-mono text-xs font-bold text-emerald-500">{kpis.estimatedCPI}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Target CPA</p>
                <p className="font-mono text-xs font-bold text-foreground">{kpis.estimatedCPA}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Est. ROAS</p>
                <p className="font-mono text-xs font-bold text-primary">{kpis.estimatedROAS}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

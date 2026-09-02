import { DataSourceLogo } from "@/components/ui/data-source-logo"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { recentTransactions } from "@/data/seed"
import {
  MoreHorizontalIcon,
  ChevronRightIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categoryColors: Record<string, string> = {
  Entertainment: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  Technology: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Income: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  "AI Tools": "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  Productivity: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
}

import { useActiveAIAnalysis } from "@/hooks/use-active-ai-analysis"

export function RecentTransactions() {
  const activeData = useActiveAIAnalysis()
  const appName = activeData?.metadata?.scannedApp || "Practo: Doctor Appointment App"
  const cleanAppName = appName.split(":")[0].trim()
  const bestEvent = activeData?.historicalCampaignIntel?.bestOptimizationEvent || "In-App Event"

  const dynamicRows = [
    { id: "SIG-9401", source: "AppsFlyer SDK Sync", event: `${cleanAppName} ${bestEvent}`, volume: "24,500 signals", date: "Just now", status: "Active", logo: "AppsFlyer" },
    { id: "SIG-9402", source: "OpenRTB MAID Matcher", event: `${cleanAppName} MAID Match`, volume: "18,900 signals", date: "2m ago", status: "Active", logo: "AppLovin" },
    { id: "SIG-9403", source: "Adjust Postback Feed", event: `${cleanAppName} Registration`, volume: "14,200 signals", date: "5m ago", status: "Active", logo: "Adjust" },
    { id: "SIG-9404", source: "Singular Telemetry", event: `${cleanAppName} Conversion`, volume: "9,800 signals", date: "12m ago", status: "Active", logo: "Singular" },
    { id: "SIG-9405", source: "Google AdMob Exchange", event: `${cleanAppName} Impression`, volume: "32,100 signals", date: "18m ago", status: "Active", logo: "Google AdMob" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold">
          Real-Time Signal Stream
        </CardTitle>
        <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
          See All
          <ChevronRightIcon className="size-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[600px] space-y-1">
            {/* Header */}
            <div className="grid grid-cols-[1fr_140px_100px_120px_32px] gap-4 border-b pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <span>Data Source / Connector</span>
              <span className="hidden sm:inline">Signal ID</span>
              <span className="text-right">Volume</span>
              <span className="hidden md:inline">Timestamp</span>
              <span />
            </div>

            {/* Rows */}
            {dynamicRows.map((tx) => (
              <div
                key={tx.id}
                className="group grid grid-cols-[1fr_140px_100px_120px_32px] items-center gap-4 rounded-lg py-2.5 transition-colors hover:bg-muted/50"
              >
                {/* Connector */}
                <div className="flex items-center gap-3">
                  <DataSourceLogo name={tx.logo} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-foreground">{tx.source}</p>
                    <Badge variant="outline" className="mt-0.5 h-5 rounded-md px-1.5 text-[10px] font-mono border-emerald-500/30 text-emerald-400">
                      {tx.event}
                    </Badge>
                  </div>
                </div>

                <span className="hidden text-xs text-muted-foreground md:inline">{tx.date}</span>

                {/* Actions */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

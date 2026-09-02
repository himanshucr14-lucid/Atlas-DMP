"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  CheckCircle2Icon,
  ShieldAlertIcon,
  FilterIcon,
  ShieldCheckIcon,
  SearchIcon,
  ArrowUpDownIcon,
  PlusIcon,
  BanIcon,
  FileCheckIcon,
  SendIcon,
  BellIcon,
  CheckIcon,
} from "lucide-react"
import { MmpReportUploader, type ExtractedSiteId } from "@/components/dashboard/mmp-report-uploader"
import type { AIEngineResult } from "@/lib/connectors/types"

interface SiteIdAuditProps {
  data?: AIEngineResult | null
}

interface SiteItem {
  siteId: string
  publisherName: string
  cvr: string
  cvrNum: number
  engagementRate: string
  fraudRate: string
  fraudNum: number
  status: "APPROVED" | "BLACKLISTED"
  reason?: string
  mmpSource?: string
}

export function SiteIdAudit({ data }: SiteIdAuditProps) {
  const appCategory = data?.metadata?.category || "Fintech & Utility"
  const catCode = appCategory.slice(0, 3).toUpperCase()

  // Initial combined items for data grid
  const initialItems: SiteItem[] = [
    { siteId: `SITE-${catCode}-9941`, publisherName: "EarnIn Financial Feed", cvr: "24.2%", cvrNum: 24.2, engagementRate: "68.4%", fraudRate: "0.2%", fraudNum: 0.2, status: "APPROVED" },
    { siteId: `SITE-${catCode}-8812`, publisherName: "CRED App Interstitial", cvr: "18.5%", cvrNum: 18.5, engagementRate: "61.2%", fraudRate: "0.5%", fraudNum: 0.5, status: "APPROVED" },
    { siteId: `SITE-${catCode}-7723`, publisherName: "Dailyhunt News Native", cvr: "14.8%", cvrNum: 14.8, engagementRate: "54.8%", fraudRate: "1.1%", fraudNum: 1.1, status: "APPROVED" },
    { siteId: `SITE-${catCode}-6611`, publisherName: "PhonePe Reward Wall", cvr: "12.9%", cvrNum: 12.9, engagementRate: "48.3%", fraudRate: "0.8%", fraudNum: 0.8, status: "APPROVED" },
    { siteId: "SITE-BOT-4410", publisherName: "Unverified Traffic Network X", cvr: "0.1%", cvrNum: 0.1, engagementRate: "0.3%", fraudRate: "98.4%", fraudNum: 98.4, status: "BLACKLISTED", reason: "Click Spam & Bot Injection" },
    { siteId: "SITE-DEV-1092", publisherName: "Sub-Publisher Network Y", cvr: "0.4%", cvrNum: 0.4, engagementRate: "1.1%", fraudRate: "84.2%", fraudNum: 84.2, status: "BLACKLISTED", reason: "Abnormally High Abandonment" },
  ]

  const [items, setItems] = React.useState<SiteItem[]>(initialItems)
  const [search, setSearch] = React.useState("")
  const [filterTab, setFilterTab] = React.useState<"ALL" | "APPROVED" | "BLACKLISTED">("ALL")
  const [sortField, setSortField] = React.useState<"cvr" | "fraud">("cvr")
  const [sortAsc, setSortAsc] = React.useState(false)
  const [recentIngestedMmp, setRecentIngestedMmp] = React.useState<string | null>(null)
  
  // Notification state
  const [isNotifying, setIsNotifying] = React.useState(false)
  const [notifySuccessMessage, setNotifySuccessMessage] = React.useState<string | null>(null)

  const handleNotifyTeam = () => {
    setIsNotifying(true)
    setTimeout(() => {
      setIsNotifying(false)
      const approvedCount = items.filter((i) => i.status === "APPROVED").length
      const blacklistedCount = items.filter((i) => i.status === "BLACKLISTED").length
      setNotifySuccessMessage(
        `Media buying team notified! Sent ${approvedCount} Whitelisted & ${blacklistedCount} Blacklisted Site ID updates to media.buying@adsidol.com`
      )
      setTimeout(() => setNotifySuccessMessage(null), 6000)
    }, 800)
  }

  // Merge newly extracted MMP Site IDs
  const handleMmpExtracted = (newSiteIds: ExtractedSiteId[], mmpFileName: string) => {
    setRecentIngestedMmp(mmpFileName)
    setItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.siteId))
      const filteredNew: SiteItem[] = newSiteIds
        .filter((item) => !existingIds.has(item.siteId))
        .map((item) => ({ ...item, engagementRate: "N/A" }))
      return [...filteredNew, ...prev]
    })
  }

  // Toggle item status between Whitelist & Blacklist
  const toggleStatus = (siteId: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.siteId === siteId) {
          const newStatus = item.status === "APPROVED" ? "BLACKLISTED" : "APPROVED"
          return {
            ...item,
            status: newStatus,
            reason: newStatus === "BLACKLISTED" ? "Manually Blacklisted by Buyer" : undefined,
          }
        }
        return item
      })
    )
  }

  // Filtered & Sorted items
  const filteredItems = items
    .filter((item) => {
      const matchSearch =
        item.siteId.toLowerCase().includes(search.toLowerCase()) ||
        item.publisherName.toLowerCase().includes(search.toLowerCase())
      const matchTab = filterTab === "ALL" || item.status === filterTab
      return matchSearch && matchTab
    })
    .sort((a, b) => {
      const valA = sortField === "cvr" ? a.cvrNum : a.fraudNum
      const valB = sortField === "cvr" ? b.cvrNum : b.fraudNum
      return sortAsc ? valA - valB : valB - valA
    })

  return (
    <div className="space-y-6 font-mono">
      {/* ── MMP Report Document Upload Section ── */}
      <MmpReportUploader onExtracted={handleMmpExtracted} />

      {/* Notification Success Alert Banner */}
      {notifySuccessMessage && (
        <div className="rounded-xl bg-[#10B981]/15 border border-[#10B981]/40 p-4 flex items-center gap-3 text-white text-xs shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#10B981] text-black shrink-0 font-bold">
            <CheckIcon className="size-4" />
          </div>
          <div>
            <p className="font-extrabold text-white text-sm">Media Buying Team Dispatched</p>
            <p className="text-[#A0A0A0] text-xs pt-0.5">{notifySuccessMessage}</p>
          </div>
        </div>
      )}

      {/* ── Main Site ID Quality Audit Data Grid ── */}
      <Card className="border border-white/[0.05] bg-[#111111] text-white">
        <CardHeader className="pb-4 border-b border-white/[0.04]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <FilterIcon className="size-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold font-mono">
                  Site ID Quality Audit Data Grid ({appCategory})
                </CardTitle>
                <p className="text-xs text-[#A0A0A0] font-mono">
                  Real-time Whitelist & Fraud Suppression Panel with Ingested MMP Signals
                </p>
              </div>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {recentIngestedMmp && (
                <Badge variant="outline" className="border-[#3B82F6]/40 text-[#3B82F6] font-mono text-[10px] py-1">
                  <FileCheckIcon className="size-3 mr-1 inline" /> Ingested: {recentIngestedMmp}
                </Badge>
              )}
              
              {/* REQUESTED BUTTON: Notify Media Buying Team */}
              <Button
                onClick={handleNotifyTeam}
                disabled={isNotifying}
                className="bg-[#10B981] hover:bg-[#10B981]/90 text-black font-mono font-bold text-xs h-9 px-3.5 gap-2 shadow-lg shadow-[#10B981]/20 transition-all"
              >
                {isNotifying ? (
                  <>
                    <span className="size-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Notifying Team...
                  </>
                ) : (
                  <>
                    <SendIcon className="size-3.5" />
                    Notify Media buying team for recent Site ID changes
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Toolbar & Filters */}
          <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between font-mono">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-[#A0A0A0]" />
              <Input
                placeholder="Search Site ID or Publisher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 bg-[#161616] border-white/10 text-xs text-white placeholder:text-[#A0A0A0] focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            {/* Filter Tabs & Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex rounded-lg bg-[#161616] p-1 border border-white/10 text-xs">
                <button
                  onClick={() => setFilterTab("ALL")}
                  className={`px-2.5 py-1 rounded-md transition-all ${filterTab === "ALL" ? "bg-[#10B981] text-black font-bold" : "text-[#A0A0A0] hover:text-white"}`}
                >
                  All ({items.length})
                </button>
                <button
                  onClick={() => setFilterTab("APPROVED")}
                  className={`px-2.5 py-1 rounded-md transition-all ${filterTab === "APPROVED" ? "bg-emerald-500/20 text-emerald-400 font-bold" : "text-[#A0A0A0] hover:text-white"}`}
                >
                  Approved Whitelist ({items.filter(i => i.status === "APPROVED").length})
                </button>
                <button
                  onClick={() => setFilterTab("BLACKLISTED")}
                  className={`px-2.5 py-1 rounded-md transition-all ${filterTab === "BLACKLISTED" ? "bg-rose-500/20 text-rose-400 font-bold" : "text-[#A0A0A0] hover:text-white"}`}
                >
                  Blacklisted Fraud ({items.filter(i => i.status === "BLACKLISTED").length})
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSortField(sortField === "cvr" ? "fraud" : "cvr")
                  setSortAsc(!sortAsc)
                }}
                className="h-9 bg-[#161616] border-white/10 text-xs text-white hover:bg-white/10"
              >
                <ArrowUpDownIcon className="size-3 mr-1" />
                Sort: {sortField.toUpperCase()}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 font-mono">
          <Table>
            <TableHeader className="bg-[#161616] border-b border-white/[0.04]">
              <TableRow className="border-b border-white/[0.04] hover:bg-transparent">
                <TableHead className="text-xs text-[#A0A0A0] font-bold">SITE ID</TableHead>
                <TableHead className="text-xs text-[#A0A0A0] font-bold">PUBLISHER NAME</TableHead>
                <TableHead className="text-xs text-[#A0A0A0] font-bold">CONVERSION CVR</TableHead>
                <TableHead className="text-xs text-[#A0A0A0] font-bold">FRAUD RISK</TableHead>
                <TableHead className="text-xs text-[#A0A0A0] font-bold">STATUS</TableHead>
                <TableHead className="text-right text-xs text-[#A0A0A0] font-bold">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-xs text-[#A0A0A0]">
                    No matching Site ID records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredItems.map((item) => (
                  <TableRow
                    key={item.siteId}
                    className="border-b border-white/[0.04] hover:bg-[#161616]/50 transition-colors"
                  >
                    <TableCell className="font-extrabold text-white text-sm">
                      {item.siteId}
                      {item.mmpSource && (
                        <span className="ml-2 text-[10px] text-[#3B82F6] bg-[#3B82F6]/10 border border-[#3B82F6]/20 px-1.5 py-0.5 rounded font-normal">
                          {item.mmpSource}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm text-[#A0A0A0] font-medium">{item.publisherName}</TableCell>
                    <TableCell className="text-sm font-black text-[#10B981]">{item.cvr}</TableCell>
                    <TableCell className="text-sm font-black">
                      <span className={item.fraudNum > 10 ? "text-rose-400" : "text-emerald-400"}>
                        {item.fraudRate}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.status === "APPROVED" ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs font-bold py-1">
                          <CheckCircle2Icon className="size-3.5 mr-1 inline" /> WHITELISTED
                        </Badge>
                      ) : (
                        <div className="space-y-0.5">
                          <Badge className="bg-rose-500/20 text-rose-400 border-rose-500/30 text-xs font-bold py-1">
                            <ShieldAlertIcon className="size-3.5 mr-1 inline" /> BLACKLISTED
                          </Badge>
                          {item.reason && (
                            <p className="text-[10px] text-rose-300/80 truncate max-w-[200px]">
                              {item.reason}
                            </p>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleStatus(item.siteId)}
                        className={`h-7 text-xs font-mono px-2.5 ${
                          item.status === "APPROVED"
                            ? "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
                            : "text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                        }`}
                      >
                        {item.status === "APPROVED" ? (
                          <>
                            <BanIcon className="size-3 mr-1" /> Blacklist
                          </>
                        ) : (
                          <>
                            <PlusIcon className="size-3 mr-1" /> Whitelist
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

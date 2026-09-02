import { Suspense } from "react"
import { DashboardCustomizer } from "@/components/dashboard/dashboard-customizer"

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A] p-6 text-white text-xs font-mono">Loading AdsIdol Intelligence Suite...</div>}>
      <DashboardCustomizer />
    </Suspense>
  )
}

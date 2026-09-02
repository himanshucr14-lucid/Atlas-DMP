"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ActivityIcon,
  ShieldCheckIcon,
  RadioIcon,
  TvIcon,
  LayersIcon,
  FolderKanbanIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Media Buyer Lead",
    email: "media.buying@adsidol.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "AdsIdol DMP",
      logo: (
        <div className="flex size-4 items-center justify-center rounded bg-[#10B981] font-mono text-[10px] font-bold text-black">
          AI
        </div>
      ),
      plan: "Enterprise Suite",
    },
    {
      name: "AdsIdol DSP Exchange",
      logo: (
        <div className="flex size-4 items-center justify-center rounded bg-[#3B82F6] font-mono text-[10px] font-bold text-white">
          DSP
        </div>
      ),
      plan: "OpenRTB Node",
    },
  ],
  navMain: [
    {
      title: "Campaign Overview",
      url: "/dashboard",
      icon: <LayoutDashboardIcon className="size-4 text-[#A0A0A0]" />,
      isActive: true,
      items: [
        {
          title: "Executive Summary",
          url: "/dashboard",
        },
        {
          title: "Vertical Benchmarks",
          url: "/accounts",
        },
      ],
    },
    {
      title: "Media Buying & Inventory",
      url: "/budgets",
      icon: <TvIcon className="size-4 text-[#A0A0A0]" />,
      items: [
        {
          title: "Ad Placement Showcases",
          url: "/budgets",
        },
        {
          title: "SSP Exchange Intelligence",
          url: "/investments",
        },
        {
          title: "MAID & OpenRTB Resolution",
          url: "/transfers",
        },
      ],
    },
    {
      title: "Anti-Fraud & Quality",
      url: "/analytics",
      icon: <ShieldCheckIcon className="size-4 text-[#A0A0A0]" />,
      items: [
        {
          title: "Site ID Quality Audit",
          url: "/analytics",
        },
        {
          title: "DSP Bidding Partners",
          url: "/crypto",
        },
        {
          title: "Telemetry & Live Logs",
          url: "/transactions",
        },
      ],
    },
  ],
  projects: [
    {
      name: "1. Audience & Intent Signals",
      url: "/dashboard?section=audience-intent",
      icon: <LayersIcon className="size-4 text-[#10B981]" />,
    },
    {
      name: "2. Hardware & Infra Matrix",
      url: "/dashboard?section=hardware-matrix",
      icon: <ActivityIcon className="size-4 text-[#3B82F6]" />,
    },
    {
      name: "3. Geo Expansion Radar",
      url: "/dashboard?section=geo-expansion",
      icon: <RadioIcon className="size-4 text-[#8B5CF6]" />,
    },
    {
      name: "4. Funnel & Touchpoint Dynamics",
      url: "/dashboard?section=funnel-velocity",
      icon: <TvIcon className="size-4 text-[#F59E0B]" />,
    },
    {
      name: "5. Creative Signal & Resonance",
      url: "/dashboard?section=creative-signals",
      icon: <ShieldCheckIcon className="size-4 text-[#EC4899]" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" className="bg-[#090909] border-r border-white/[0.04]" {...props}>
      <SidebarHeader className="border-b border-white/[0.04]">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="bg-[#090909]">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="border-t border-white/[0.04] bg-[#090909]">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

"use client";

import { useState } from "react";
import Link from "next/link";
import FleetMenu from "@/components/application/FleetMenu";
import {
  LayoutDashboard,
  LineChart,
  AlertCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

type SidebarProps = {
  logoUrl?: string;
  companyName?: string;
  customDomain?: string;
};

export default function Sidebar({
  logoUrl = "/logo.png",
  companyName = "RoboTemps OEM",
  customDomain = "",
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [hovering, setHovering] = useState(false);

  const isExpanded = hovering || !collapsed; // ← logica hover-expand

  return (
    <aside
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`
        fixed top-0 left-0 z-50 
        border-r bg-white h-screen flex flex-col transition-all duration-200
        ${isExpanded ? "w-64" : "w-20"}
      `}
    >
      {/* Logo area (sempre visibile) */}
      <div className="p-4 flex items-center gap-3 justify-center">
        <div className="w-10 h-10 relative">
          <Image
            src={logoUrl}
            alt="logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>

        {isExpanded && (
          <div>
            <div className="text-sm font-semibold">{companyName}</div>
            {customDomain && (
              <div className="text-xs text-gray-500">{customDomain}</div>
            )}
          </div>
        )}
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <SidebarItem href="/dashboard" icon={<LayoutDashboard />} expanded={isExpanded}>
          Dashboard
        </SidebarItem>

      <div className={isExpanded ? "mt-1" : ""}>
        <FleetMenu expanded={isExpanded} />
      </div>

        <SidebarItem href="/dashboard/maintenance" icon={<AlertCircle />} expanded={isExpanded}>
          Maintenance
        </SidebarItem>

        <SidebarItem href="/dashboard/analytics" icon={<LineChart />} expanded={isExpanded}>
          Analytics
        </SidebarItem>

        <SidebarItem href="/dashboard/settings" icon={<Settings />} expanded={isExpanded}>
          Settings & API
        </SidebarItem>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <SidebarItem href="/application/login" icon={<LogOut />} expanded={isExpanded}>
          Logout
        </SidebarItem>
      </div>

      {/* Manual toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white border shadow flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  children,
  expanded,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  expanded: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 text-gray-700 transition-all 
      ${expanded ? "" : "justify-center"}
    `}
    >
      <span className="w-5 h-5">{icon}</span>
      {expanded && <span className="text-sm">{children}</span>}
    </Link>
  );
}

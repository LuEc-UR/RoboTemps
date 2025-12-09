"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function FleetMenu({ expanded }: { expanded: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/dashboard/fleet", label: "Overview" },
    { href: "/dashboard/fleet/list", label: "All Solutions" },
    { href: "/dashboard/fleet/new", label: "Register Solution" },
    { href: "/dashboard/fleet/stock", label: "Stock & Warehouse" },
    { href: "/dashboard/fleet/deployments", label: "Deployments" }
  ];

  const isActive = pathname.startsWith("/dashboard/fleet");

  return (
    <div className="w-full select-none">
      {/* MAIN ENTRY */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2 p-2 rounded transition-colors
        ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-100"}`}
      >
        <Cpu className="w-6 h-6 mx-auto" />

        {/* Text only if expanded */}
        {expanded && (
          <span className="flex-1 text-left">Fleet</span>
        )}

        {/* Arrow only if expanded */}
        {expanded && (
          <span className="ml-auto">
            {open ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </span>
        )}
      </button>

      {/* SUBMENU */}
      {expanded && open && (
        <div className="mt-1 pl-8 flex flex-col gap-1">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`p-2 rounded text-sm transition-colors
              ${pathname === it.href
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}

      {/* COLLAPSED SIDEBAR — NO submenu, only icon (already handled above) */}
    </div>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard,
  Cog,
  Boxes,
  LineChart,
  Rocket,
  BrainCircuit,
  Calculator,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/solutions", icon: LayoutDashboard },
  { name: "RaaS Simulator", href: "/solutions/simulator", icon: Calculator },
  { name: "Solution Builder", href: "/solutions/builder", icon: Cog },
  { name: "Automation Library", href: "/solutions/library", icon: Boxes },
  { name: "TCO / ROI Analyzer", href: "/solutions/roi", icon: LineChart },
  { name: "Deployment & Scaling", href: "/solutions/deployment", icon: Rocket },
  { name: "AI Advisor", href: "/solutions/advisor", icon: BrainCircuit },
];

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 p-8 hidden md:block shadow-sm">
        <nav className="flex flex-col gap-2 mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* RIGHT AREA */}
      <div className="flex-1 flex flex-col">
        {/* MAIN */}
        <main className="flex-1 p-14 mt-0">{children}</main>
      </div>
    </div>
  );
}

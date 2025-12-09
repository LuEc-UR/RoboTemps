// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { MaintenanceOverview } from ".next/dev/types/app";
import LogoutButton from "@/components/ui/LogoutButton";
import { OemSettings} from ".next/dev/types/app";
import {
  LayoutDashboard,
  Cpu,
  LineChart,
  AlertCircle,
  Settings,
  LogOut,
  Circle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SolutionsResponse = {
  totalSolutions: number;
  activeSolutions: number;
  inStock: number;
  inUse: number;
  inMaintenance: number;
  // other summary fields...
  byPlant: { plantName: string; address: string; count: number }[];
};

type AnalyticsData = {
  dailyUsage: number; // ore giornaliere totali
  utilizationRate: number; // percentuale 0-100
  monthlyUsage?: number;
};

type EventsResponse = {
  warnings: number;
  criticals: number;
  recentEvents: { id: string; message: string; severity: "info"|"warning"|"critical"; ts: string }[];
};

type MaintenanceResponse = {
  upcoming: { id: string; solutionId: string; plantName: string; dueInHours: number; checklistName?: string }[];
  overdue: { id: string; solutionId: string; plantName: string; overdueHours: number }[];
};

export default async function DashboardPage() {
  // auth
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/application/login");
  }

  // 1) OEM settings (white-label)
  const oemSettings: OemSettings = await fetch("http://localhost:3000/api/oem/settings", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}));

  // 2) Summary solutions
  const solutionsRes: SolutionsResponse = await fetch("http://localhost:3000/api/solutions/summary", { cache: "no-store" })
    .then((r) => r.json())
    .catch(() => ({
      totalSolutions: 0,
      activeSolutions: 0,
      inStock: 0,
      inUse: 0,
      inMaintenance: 0,
      byPlant: [],
    }));

  // 3) Analytics
  const analyticsRes: AnalyticsData = await fetch("http://localhost:3000/api/analytics/summary", { cache: "no-store" })
    .then((r) => r.json())
    .catch(() => ({ dailyUsage: 0, utilizationRate: 0 }));

  // 4) Events (warnings / criticals)
  const eventsRes: EventsResponse = await fetch("http://localhost:3000/api/events/summary", { cache: "no-store" })
    .then((r) => r.json())
    .catch(() => ({ warnings: 0, criticals: 0, recentEvents: [] }));

  // 5) Maintenance upcoming/overdue
  const maintenanceRes: MaintenanceOverview = await fetch("http://localhost:3000/api/maintenance/overview").then(res => res.json());


  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - optional: potremo estrarre in component */}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {oemSettings.companyName ?? session.user.email}
            </h1>
            <p className="text-sm text-gray-500">OEM Control Center — Solutions Fleet Overview</p>
          </div>

          {/* Right: status, quick links */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Circle className="w-3 h-3 text-green-500 fill-green-500" />
              <span className="text-sm text-gray-600">Online</span>
            </div>

            <Link href="/dashboard/settings" className="text-sm underline">
              API & Branding
            </Link>

            <LogoutButton />
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded shadow p-4">
            <div className="text-sm font-medium text-gray-500">Active Solutions</div>
            <div className="text-2xl font-bold">{solutionsRes.activeSolutions}</div>
            <div className="text-xs text-gray-400">Total: {solutionsRes.totalSolutions}</div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="text-sm font-medium text-gray-500">In Stock</div>
            <div className="text-2xl font-bold">{solutionsRes.inStock}</div>
            <div className="text-xs text-gray-400">Ready to deploy</div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="text-sm font-medium text-gray-500">In Use</div>
            <div className="text-2xl font-bold">{solutionsRes.inUse}</div>
            <div className="text-xs text-gray-400">Under contract</div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="text-sm font-medium text-gray-500">In Maintenance</div>
            <div className="text-2xl font-bold">{solutionsRes.inMaintenance}</div>
            <div className="text-xs text-gray-400">Ordinaria / Straordinaria</div>
          </div>
        </div>

        {/* SECOND ROW: UTILIZATION + UPCOMING MAINT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Utilization</h2>
              <span className="text-sm text-gray-500">This month</span>
            </div>
            <div className="text-3xl font-bold">{analyticsRes.utilizationRate}%</div>
            <div className="text-sm text-gray-500 mt-2">{analyticsRes.dailyUsage} hrs daily average</div>

            {/* Chart placeholder - sostituire con componente grafico */}
            <div className="mt-4 h-48 rounded bg-gray-100 flex items-center justify-center text-gray-400">
              Utilization Chart (replace with chart component)
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-md font-semibold">Maintenance</h3>
              <Link href="/dashboard/maintenance" className="text-sm text-blue-600">Open</Link>
            </div>

            <div className="mt-2">
              <div className="text-sm text-gray-500">Upcoming</div>
              <div className="text-xl font-bold">{maintenanceRes.upcoming.length}</div>
            </div>

            <div className="mt-4">
              <div className="text-sm text-gray-500">Overdue</div>
              <div className="text-xl font-bold text-red-600">{maintenanceRes.overdue.length}</div>
            </div>
          </div>
        </div>

        {/* Solutions per Plant */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Solutions per Plant</h2>
            <Link href="/dashboard/fleet" className="text-sm text-blue-600">Manage fleet</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solutionsRes.byPlant.length === 0 ? (
              <div className="bg-white p-4 rounded shadow text-sm text-gray-500">No plants registered yet.</div>
            ) : (
              solutionsRes.byPlant.map((p) => (
                <div key={p.plantName} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{p.plantName}</div>
                      <div className="text-xs text-gray-500">{p.address}</div>
                    </div>
                    <div className="text-2xl font-bold">{p.count}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Events / Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent Events</h3>
              <div className="text-sm text-gray-500">{eventsRes.warnings} warnings • {eventsRes.criticals} criticals</div>
            </div>

            <div className="space-y-2 text-sm">
              {eventsRes.recentEvents.length === 0 ? (
                <div className="text-gray-500">No events</div>
              ) : (
                eventsRes.recentEvents.slice(0, 8).map((e) => (
                  <div key={e.id} className={`p-2 rounded ${e.severity === "critical" ? "bg-red-50" : e.severity === "warning" ? "bg-yellow-50" : "bg-gray-50"}`}>
                    <div className="flex justify-between">
                      <div>{e.message}</div>
                      <div className="text-xs text-gray-400">{new Date(e.ts).toLocaleString()}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Quick Actions</h3>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="/dashboard/maintenance/new" className="p-2 rounded border text-sm">Create maintenance task</Link>
              <Link href="/dashboard/fleet/new" className="p-2 rounded border text-sm">Register solution</Link>
              <Link href="/dashboard/settings/api-keys" className="p-2 rounded border text-sm">Manage API keys</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


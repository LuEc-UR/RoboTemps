"use client";

import { ReactNode } from "react";

type KpiCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string; // opzionale per KPI colorati
};

export default function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <div
      className="card-dashboard flex items-center justify-between p-4"
      style={{ backgroundColor: color || "var(--card-bg-dashboard)" }}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon && <div className="w-10 h-10 text-gray-400">{icon}</div>}
    </div>
  );
}

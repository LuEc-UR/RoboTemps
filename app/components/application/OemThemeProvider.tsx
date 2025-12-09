// app/dashboard/components/OemThemeProvider.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import type { OemSettings } from "@/types";


export default function OemThemeProvider({ children }: { children: ReactNode }) {
  const [oemSettings, setOemSettings] = useState<OemSettings | null>(null);

  useEffect(() => {
    fetch("/api/oem/settings")
      .then(res => res.json())
      .then((data: OemSettings) => setOemSettings(data));
  }, []);

  useEffect(() => {
    if (oemSettings) {
      document.documentElement.style.setProperty("--brand-primary", oemSettings.primaryColor || "#0b74ff");
      document.documentElement.style.setProperty("--brand-on-primary", "#ffffff");
      document.documentElement.setAttribute("data-theme", oemSettings.theme || "light");
    }
  }, [oemSettings]);

  return <>{children}</>;
}

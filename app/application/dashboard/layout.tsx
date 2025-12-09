import "@/globals.css";
import Sidebar from "@/components/application/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { NextAuthProvider } from "@/components/application/NextAuthProvider";
import OemThemeProvider from "@/components/application/OemThemeProvider";
/*import Topbar from "@components/application/Topbar"; */



export const metadata = {
  title: "RoboTemps Application",
  description: "Robotics-as-a-Service Platform",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const OemSettings = await fetch("http://localhost:3000/api/oem/settings", {
    cache: "no-store",
  }).then(res => res.json());

  return (
    <NextAuthProvider session={session}>
      <div className="min-h-screen flex bg-dashboard-surface">

        {/* Sidebar */}
        <Sidebar 
          logoUrl={OemSettings.logoUrl}
          companyName={OemSettings.companyName}
          customDomain={OemSettings.customDomain}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto ">
            {children}
          </div>
        </main>
      </div>
    </NextAuthProvider>
  );
}


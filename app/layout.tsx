import "./globals.css";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "RoboTemps",
  description: "Robotics-as-a-Service Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-background text-foreground min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
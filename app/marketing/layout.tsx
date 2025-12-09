import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketing - RoboTemps",
  description: 
    "Robotemps official marketing page. Discover our Robot-as-a-Service platform for OEMs and integrators.",


  openGraph: {
    title: "RoboTemps – Robot-as-a-Service Platform",
    description:
      "Automation intelligence and RaaS tools for OEMs and integrators.",
    url: "https://robo-temps.com/marketing",
    siteName: "RoboTemps",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function MarketingLayout({ children } : { children: React.ReactNode }) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Header />
      <main>{children}</main>
      <Footer />
      </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/components/Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-white/70 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Logo size={50} />

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm opacity-80">
          <Link href="/marketing/marketemps" className="hover:opacity-50 transition">Solutions</Link>
          <Link href="/marketing/consulting" className="hover:opacity-50 transition">Consulting</Link>
          <Link href="/marketing/about" className="hover:opacity-50 transition">About</Link>
          <Link href="/application/login" className="hover:opacity-50 transition">MyRoboTemps</Link>
        </nav>

        {/* CTA */}
        <Link
          href="/book"
          className="text-sm px-4 py-2 rounded-full border border-black/20 hover:bg-black hover:text-white transition"
        >
          Book a Call
        </Link>
      </div>
    </header>
  );
}

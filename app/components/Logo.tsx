"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Link href="/marketing" className="flex items-center gap-3 group cursor-pointer">
      <Image
        src="/R1.png" // assicurati che il file sia in /public
        alt="RoboTemps Logo"
        width={size}
        height={size}
        className="transition-transform group-hover:scale-105"
        priority
      />

      <span className="text-xl font-bold tracking-tight text-[#1A1D22]">
        RoboTemps
      </span>
    </Link>
  );
}


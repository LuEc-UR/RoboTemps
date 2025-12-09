"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({ href = "#", children, className }: ButtonProps) {

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(
          "px-6 py-3 rounded-xl bg-[#3A7AFE] text-white font-medium",
          "shadow-md hover:bg-[#2F6AF3] transition inline-block"
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}


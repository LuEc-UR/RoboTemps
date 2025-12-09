"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CardProps {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
  href?: string;
}

export function Card({ title, icon: Icon, children, href }: CardProps) {
  const Wrapper = href ? Link : 'div';

  return (
    <Wrapper href={href || ''} className={href ? 'no-underline' : ''}>
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
        }}
        className="p-6 bg-white rounded-2xl border border-[#E6E8EC] 
        cursor-pointer"
      >
        <div className="flex items-center gap-3 mb-3">
          {Icon && <Icon className="w-6 h-6 text-[#3A7AFE]" />}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        <div className="text-[#4F4F4F]">
	        {children}
        </div>
      </motion.div>
    </Wrapper>
  );
}


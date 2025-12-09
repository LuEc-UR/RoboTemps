"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Wand2, BarChart3, Repeat } from "lucide-react";

const items = [
  {
    title: "Standardize",
    Icon: Layers,
    desc: "Create consistent, repeatable automation modules that reduce variability and improve reliability.",
    angle: 0,
  },
  {
    title: "Simplify",
    Icon: Wand2,
    desc: "Reduce complexity to accelerate deployment and reduce operational friction.",
    angle: 90,
  },
  {
    title: "Scale",
    Icon: BarChart3,
    desc: "Expand capabilities using modular, reusable building blocks for long-term growth.",
    angle: 180,
  },
  {
    title: "Servitize",
    Icon: Repeat,
    desc: "Transform the solution into a market-ready RaaS offering with recurring revenue.",
    angle: 270,
  },
];

export default function FourSLoop() {
  return (
    <section className="relative flex flex-col items-center py-20">
      <h2 className="text-center text-4xl font-bold text-gray-900 mb-16">
        The <span className="text-blue-600">4S Framework</span>
      </h2>

      <div className="relative w-[380px] h-[380px] md:w-[480px] md:h-[480px]">

        {/* Circle + Arrows */}
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#000000ff"
            strokeWidth="1"
            strokeDasharray="0 0"
          />
        </svg>

        {/* 4 Items */}
        {items.map((item, idx) => {
          const rad = (item.angle * Math.PI) / 180;
          const left = 175 + 210 * Math.cos(rad);
          const top = 175 + 210 * Math.sin(rad);

          const [hover, setHover] = useState(false);
          const Icon = item.Icon;

          return (
            <div
              key={idx}
              className="absolute"
              style={{ left, top }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 md:w-35 md:h-35 flex flex-col items-center justify-center
                  bg-white rounded-full shadow-lg border border-gray-200 text-center"
              >
                <Icon className="w-8 h-8 text-blue-600 mb-1" />
                <span className="font-semibold text-sm text-gray-900">
                  {item.title}
                </span>
              </motion.div>

              <AnimatePresence>
                {hover && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-3 
                      w-48 bg-white border border-gray-200 shadow-xl rounded-xl text-sm p-4 z-20"
                  >
                    {item.desc}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 
                      w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

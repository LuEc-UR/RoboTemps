"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroVideo() {
  const [openDemo, setOpenDemo] = useState(false);

  return (
    <header className="relative h-screen min-h-[540px] overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto h-full flex flex-col justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl"
        >
          Soluzioni robotiche che <span className="text-blue-400">potenziano</span> la tua produzione
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-gray-100 text-lg max-w-xl"
        >
          Automazione, visione artificiale e integrazione: scopri come migliorare performance e ridurre i tempi.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex gap-4"
        >
          <a
            href="#contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-[1.03] transition-transform"
          >
            Richiedi una demo
          </a>

          <button
            onClick={() => setOpenDemo(true)}
            className="px-5 py-3 bg-white/20 backdrop-blur text-white rounded-2xl hover:bg-white/30 transition"
          >
            Guarda il video
          </button>
        </motion.div>
      </div>

      {/* DEMO Modal */}
      {openDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenDemo(false)}
          />

          <div className="relative bg-black rounded-xl max-w-4xl w-full overflow-hidden">
            <button
              onClick={() => setOpenDemo(false)}
              className="absolute right-3 top-3 text-white text-xl"
            >
              ✕
            </button>

            <video
              controls
              className="w-full"
              poster="/images/demo-poster.jpg"
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </header>
  );
}

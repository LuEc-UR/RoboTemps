"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, Rocket, Layers, Wand2, BarChart3, Repeat } from "lucide-react";
import { useState } from "react";
import FourSLoop from "@/components/ui/FourSLoop";
import Image from "next/image";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">

      {/* HERO */}
      <section className="max-w-6xl mx-auto p-5 pt-20 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl py-15 md:text-6xl font-bold tracking-tight text-gray-900"
        >
          Industrial <span className="text-blue-600">Consulting</span>
        </motion.h1>

            <motion.div
                className="text-lg text-gray-600 mt-6 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <p className="leading-relaxed mb-6"> 
                    We help you to evaluate, design, and optimize robotic automation by combining real-world case studies, technical 
                    analysis, and proven industry benchmark. Our approach focuses on delivering systems that are reliable, efficient, 
                    and aligned with your EU's production goals.
                </p>
                
                {/* THREE CARDS */}
                
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-24">
                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Users className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">NVA Analysis</h3>
                        <p className="text-gray-600">
                            We evaluate processes, flows, and production constraints to identify real opportunities.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Lightbulb className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Solution Design</h3>
                        <p className="text-gray-600">
                            Definition of layouts, cycles, technologies, and integrations for customized automation.
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Rocket className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Roadmap & Scalability</h3>
                        <p className="text-gray-600">
                            Growth plans, ROI, investments, and scalability based on concrete data.
                        </p>
                    </motion.div>
                </div>

                {/* 4S FRAMEWORKS SECTION (NEW + CLEAN + VISUAL) */}
                <div className="max-w-4xl mx-auto text-center py-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        The <span className="text-blue-600">4S Framework</span>
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our methodology to build robotic solutions that are modular, scalable,
                        and designed for long-term performance.
                    </p>
                </div>


                <motion.div
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
                    initial="hidden"
                    whileInView="visible"
                >
                    <FourSLoop />
                </motion.div>


                <p className="leading-relaxed mt-10 mb-6 text-gray-600">
                    Through the principles of the <span className="font-bold">4S Framework — Standardize, Simplify, Scale, 
                        Servitize</span> — we guide you in creating automation architectures that reduce complexity and accelerate 
                        deployment.
                </p>


                <p className="leading-relaxed text-gray-600 mb-10">
                    Once your solution is ready, we help you transform it into a scalable recurring-revenue stream
                    through <span className="font-bold"> Robotics‑as‑a‑Service (RaaS) </span> models.
                </p>


                <div className="text-center py-10">
                    <a
                        href="/contact"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-2xl shadow-md transition-all"
                    >
                        Apply the 4S Framework to Your Machines
                    </a>
                </div>
            </motion.div>        
        </section>

    </div>
  );
}

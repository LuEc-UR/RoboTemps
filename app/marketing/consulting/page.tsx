"use client";

import { motion } from "framer-motion";
import { Users, Lightbulb, Rocket, Layers, Wand2, BarChart3, Repeat } from "lucide-react";
import { useState } from "react";
import FourSLoop from "@/components/ui/FourSLoop";
import Image from "next/image";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

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
                <p className="leading-relaxed mb-6"> We help you to evaluate, design, and optimize 
                    robotic automation by combining real-world case studies, technical analysis, and proven industry benchmark. 
                    Our approach focuses on delivering systems that are reliable, efficient, and aligned with your EU's production goals.
                </p>
                
                {/* THREE CARDS */}
                
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 px-6 pb-24">
                    <motion.div
                        className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <Users className="w-10 h-10 mx-auto text-blue-600 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Needs Analysis</h3>
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

                <p className="leading-relaxed mb-6"> Through the principls of the 
                    <span className="font bold">4S Framework - Standardize, Simplify, Scale, Servitize</span>
                    we guide you in building solutions that are modular, easy to deploy for long term perfomance. 
                    Standardized architectures reduce complexity, while simplified workflows accelerate implementation.
                </p>

                <p className="leading-relaxed mb-6"> Once your solution is ready, 
                    we support you on transforming it into a marketable offering through 
                    <span className="font-bold">Robotics-as-a-Service (RaaS)</span> models, 
                    helping you scale recurring revenue and reach new customers.
                </p>
            </motion.div>
        </section>

        <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.2 },
              },
            }}
        >
            <FourSLoop />
        </motion.div>
    </div>
  );
}

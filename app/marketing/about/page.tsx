"use client";

import { motion } from "framer-motion";
import { Bot, Factory, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">

      {/* HERO */}
      <section className="max-w-6xl mx-auto p-5 pt-20 pb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl py-15 md:text-6xl font-bold tracking-tight text-gray-900"
        >
          Who is <span className="text-blue-600">RT</span> ?
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 mt-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          A platform designed to make industrial automation more accessible, intelligent, and quick to implement.
        </motion.p>
      </section>

      {/* THREE SECTIONS */}
      <div className="max-w-4xl mx-auto space-y-12 px-6 pb-24">

        <motion.div
          className="p-8 bg-white rounded-3xl border shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Bot className="w-10 h-10 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Imagine a manufacturing world where machine builders and system integrators can provide standard,
            modular robotic solutions that any company, large or small, can adopt with confidence. 
            A world where improving ergonomics, eliminating repetitive tasks, overcoming labor shortages, and
            rethinking production flows are accessible to everyone, not a privilege reserved for organizations with large budgets.
            Our mission is to democratize robotics: to make automation easy to implement, affordable, and capable of solving real
            problems for all manufacturers.
            We believe that robotics should be within reach of all companies, 
            not just the few that can traditionally afford it.

          </p>
        </motion.div>

        <motion.div
          className="p-8 bg-white rounded-3xl border shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Factory className="w-10 h-10 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Whence is RT</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            RoboTemps was born from many years of experience in robotics consulting, advanced automation, and machine design. 
            We combine industrial know-how and digital tools. We offer a comprehensive range of services, from initial concept
            to final implementation.
          </p>
        </motion.div>

        <motion.div
          className="p-8 bg-white rounded-3xl border shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <Target className="w-10 h-10 text-blue-600" />
            <h3 className="text-2xl font-semibold text-gray-900">Our Vision</h3>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Accelerate global robotics adoption by enabling OEMs to build automation that is standardized, 
            simple, scalable, and service-driven. We believe the future of industrial automation lies in solutions
            that are effortless to deploy, fast to integrate, and capable of generating predictable and sustainable ROI.
            Through the 4S Framework — Standardize, Simplify, Scale, Servitize — we envision a world where robotic solutions 
            are no longer custom one-off systems, but modular products that grow, evolve, and create recurring value for 
            both manufacturers and end users.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

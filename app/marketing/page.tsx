"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Card } from "@/marketing/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { ArrowRight, Cog, Rocket, BarChart3, ShoppingBagIcon, CpuIcon, PcCaseIcon, ScreenShareIcon, WorkflowIcon, LayersIcon, LineChartIcon } from "lucide-react";

export default function MarketingLandingPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      
      <Header />
      {/* HERO */}
      <section className="min-h-[90vh] flex items-center px-5 mf:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl"
        >
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] text-gray-900">
            Robotics-as-a-Service,
            <br />
            <span className="text-blue-600"> simplified.</span>
          </h1>

          <p className="text-xl text-gray-600 mt-8 max-w-xl">
            RoboTemps unifies servitization, automation planning and ROI models
            into a single intelligent platform — built for automation OEMs and designed
            to help End Users adopt robotics faster.
          </p>

          <div className="mt-10 flex gap-4">
            <Button href="/marketing/Advisor">Talk to an Advisor</Button>
            <Button href="/application/login">Enter the Platform</Button>
          </div>
        </motion.div>
      </section>

      {/* NEW: MARKETEMPS PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h3 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
            Browse our Solution Marketplace
          </h3>
          <p className="text-gray-600 mt-3 max-w-3xl">
            Discover robotic solutions already deployed in real factories —
            created by our certified OEM partners and validated by RoboTemps.
            Each listing includes technical specs, performance insights and lead-generation forms.
          </p>

          <Button href="/marketing/marketemps">
              Explore Marketemps <ArrowRight size={18} />
          </Button>
          
        </div>
      </section>

      {/* CONSULTING VALUE SECTION */}
      <section className="py-28 px-5 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
          }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* TEXT BLOCK */}
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
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
              Innovation & Automation Consulting
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6 text-lg">
              Before technology comes clarity. We help automation manufacturers and
              system integrators create structured, repeatable, and profitable robotic
              solutions — from ideation to pricing models and performance frameworks.
            </p>

            <p className="text-gray-600 leading-relaxed text-lg">
              Every engagement focuses on three pillars: solution standardization,
              automation feasibility, and business sustainability.
            </p>
          </motion.div>

          {/* IMAGE BLOCK */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.35 },
              },
            }}
            className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border border-gray-200"
          >
            <Image
              src="/consulting.png"
              alt="Consulting workflow"
              fill
              className="object-cover brightness-[0.95]"
            />
          </motion.div>
        </motion.div>
      </section>


      {/* PLATFORM SECTIONS */}
      <section className="py-28 px-5 md:px-10 max-w-7xl mx-auto pb-32">

        <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
          Platform Modules
        </h2>

        <div className="grid md:grid-cols-3 gap-10 transition">
          
          <Card 
            title="MarkeTemps" 
            icon={ShoppingBagIcon} 
            href="/marketing/MarkeTemps">
            Explore validated robotic solutions built by certified OEM partners.
            Compare systems, evaluate specs and request guidance.
          </Card>

          <Card 
            title="RaaS Simulator"
            icon={Cog}
            href="/marketing/Simulator">
            Designed for End Users: create automation scenarios, estimate ROI,
            calculate subscription fees, and evaluate lifecycle models.
          </Card>
          
          <Card 
            title="AI Solution Advisor"
            icon={Rocket}
            href="/marketing/AI">
            AI engine that recommends the best automation strategy.
          </Card>
        </div>
        
        <div className="py-6">
          <Card title="OEM Intelligence" icon={ScreenShareIcon} href="/application/login">
              The analytics cockpit for OEMs: fleet metrics, performance, costs,
            failures and servitization KPIs.
          </Card>
        </div>
      </section>


      {/* CONSULTING PROCESS */}
      <section className="py-28 px-5 md:px-10 bg-white border-y border-gray-200 max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
            A Structured 3-Step Method
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A repeatable blueprint that turns automation needs into deliverable,
            profitable and scalable solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-14 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-3">01 — Discovery</h3>
            <p className="text-gray-600">
              Requirements, physical constraints, automation feasibility and
              economic intent.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">02 — Design</h3>
            <p className="text-gray-600">
              Standardized solution blocks, engineering validation and performance
              prediction.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">03 — Delivery</h3>
            <p className="text-gray-600">
              Robotic simulations, servitization fees, TCO/ROI and operational KPIs.
            </p>
          </div>
        </div>
      </section>


        {/* FINAL CALL TO ACTION */}
      <section className="py-28 px-5 md:px-10 text-center max-w-7xl mx-auto">
        <motion.h2 initial={{ opacity:0, y:20}} whileInView={{ opacity:1, y:0}} />
        <h2 className="text-4xl font-semibold text-gray-900 mb-6 tracking-tight">
          Want to build better automation?
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Whether you're an OEM or a System Integrator, we can help you design
          scalable automation and RaaS-ready solutions.
        </p>

        <Button href="/marketing/advisor" className="px-8 py-4 text-lg">
          Contact Us
        </Button>
      </section>


        {/* HERO IMAGE */}
      <div className="mt-5 max-w-6xl mx-auto">
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <Image
            src="/hero-robot.webp"
            alt="robot in warehouse"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div> 
  );
}

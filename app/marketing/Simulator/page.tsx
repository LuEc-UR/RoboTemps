"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

// --- TYPES ---
type Inputs = {
  solutionCost: number; // cost of the robotic solution
  services: number; // cost of services around solution - total
  monthlyOperatorLaborCost: number; // monthly
  mbtf: number; // lifecycle solution
  usageMonths: number; 
  workShifts: number;
  desiredSavings: number;
};

// --- COMPONENT ---
export default function SimulatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    solutionCost: 150000,
    services: 10000,
    monthlyOperatorLaborCost: 2000,
    mbtf: 60,
    usageMonths: 36,
    workShifts: 0,
    desiredSavings: 60, // Percentage
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Inputs;
    const value = Number(e.target.value);
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const nf = useMemo(
    () => new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }),
    []
  );
  const derived = useMemo(() => {
    // monthly cost for all operators (per month)
    const monthlyOperatorCost = inputs.monthlyOperatorLaborCost * inputs.workShifts;
    //Product quality: errors reduced by automation impact on quality, scrap rate, PQ cost
    //Riduzione reclami e resi, miglioramento customer satisfaction --- NOT USED ---
    //Increase safety, reduce accidents, ergonomic improvements --- NOT USED ---
    //OnTime Devlivery improvements --- NOT USED ---
    //TCO
    const TCO = inputs.solutionCost + inputs.services;

    // cost actual over the selected usage period (include 1 extra month every 12 months)
    const extraMonths = Math.floor(inputs.usageMonths / 12);
    const costActual = monthlyOperatorCost * (inputs.usageMonths + extraMonths);

    // monthly savings achieved by adopting the solution (percentage of operator monthly cost)
    const monthlySavings = costActual * (inputs.desiredSavings / 100)/inputs.usageMonths;

    // months to payback the solution capex using monthly savings
    const paybackMonths = monthlySavings > 0 ? TCO / monthlySavings : Infinity;

    // ROI on CAPEX over the usage period: (total savings over period - capex) / capex
    const totalSavings = monthlySavings * inputs.usageMonths;
    const roiCapex = TCO > 0 ? ((totalSavings - TCO) / TCO) * 100 : -Infinity;

    // industrial cost per month using remaining value based on MBTF (residual-value approach)
    const remainingLife = Math.max(0, inputs.mbtf - inputs.usageMonths);
    const returnValue = inputs.solutionCost * (remainingLife / Math.max(1, inputs.mbtf));
    const q_HW = (inputs.solutionCost - returnValue) / Math.max(1, inputs.usageMonths);
    const q_Servizi = inputs.services / Math.max(1, inputs.usageMonths);
    const monthlyTCO = q_HW + q_Servizi;

    //Operational margin requirement
    const operatingMargin = 0.2; // 20%
    const minPriceWithMargin = monthlyTCO *(1 + operatingMargin);

    // Search for best RaaSFee: iterate from fee that covers margin up to customer's monthly savings
    let bestRaaSFee: number | null = null;
    let bestROI_Opex = -Infinity;
    const startFee = Math.ceil(Math.max(monthlyTCO, minPriceWithMargin, 0));
    const endFee = Math.floor(Math.max(0, monthlySavings));
    const debugIterations: { fee: number; roi: number }[] = [];

    if (endFee >= startFee) {
      for (let fee = startFee; fee <= endFee; fee++) {
        const roi = fee > 0 ? ((monthlySavings - fee) / fee) * 100 : -Infinity;
        if (debugIterations.length < 500) debugIterations.push({ fee, roi });
        if (roi > bestROI_Opex && roi > 0) {
          bestROI_Opex = roi;
          bestRaaSFee = fee;
        }
        // stop early when ROI becomes negative after finding a positive candidate
        if (bestRaaSFee !== null && roi < 0) break;
      }
    }

    // timeline: cumulative operator cost per month
    const timeline: number[] = [];
    let cum = 0;
    for (let m = 1; m <= inputs.usageMonths; m++) {
      cum += monthlyOperatorCost;
      timeline.push(cum);
      if (cum >= inputs.solutionCost) break;
    }

    const suggestedFee = monthlyOperatorCost + (inputs.services - inputs.solutionCost) / (inputs.usageMonths || 1);

    return {
      monthlyOperatorCost,
      costActual,
      monthlySavings,
      roiCapex,
      paybackMonths,
      suggestedFee,
      timeline,
      bestRaaSFee,
      bestROI_Opex,
      mbtf: inputs.mbtf,
      monthlyTCO,
      minPriceWithMargin,
      debugIterations,
    };
  }, [inputs]);

  const progressPct = Math.min(100, (derived.paybackMonths / inputs.usageMonths) * 100);

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 pb-20">
      {/* HERO */}
      <section className="max-w-6xl mx-auto pt-20 p-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4"
        >
          RaaS <span className="text-blue-600">Simulator</span>
        </motion.h1>


        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg text-gray-600 max-w-3xl"
        >
          Enter the parameters of your solution and get payback, ROI, reccomended fee,
          and an intuitive timeline of current costs.
        </motion.p>
      </section>


      {/* MAIN PANEL */}
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">


      {/* INPUTS */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Input</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Solution Cost (€)", name: "solutionCost" },
            { label: "Services (€)", name: "services" },
            { label: "Operator Labor Cost (€ / month)", name: "monthlyOperatorLaborCost" },
            { label: "Desired Savings (%)", name: "desiredSavings" },
            { label: "MTBF (Months)", name: "mbtf" },
            { label: "Effective Usage (Months)", name: "usageMonths" },
            { label: "Work Shifts (1-3)", name: "workShifts" },
          ].map((item) => (
            <label key={item.name} className="flex flex-col text-gray-900">
              {item.label}
              <input
                name={item.name}
                type="number"
                min={0}
                value={(inputs as any)[item.name]}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      </div>


      {/* RESULTS */}
      <aside className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Results</h2>


        <div className="p-5 bg-gray-50 rounded-xl border space-y-3">
          <div className="flex justify-between text-gray-700"><span>Current Cost:</span><span>{nf.format(derived.costActual)}</span></div>
          <div className="flex justify-between text-gray-700"><span>TCO (€/month):</span><span>{nf.format(derived.monthlyTCO)}</span></div>
          <div className="flex justify-between text-gray-700"><span>Payback (months):</span><span>{isFinite(derived.paybackMonths) ? derived.paybackMonths.toFixed(1) : "—"}</span></div>
          <div className="flex justify-between text-gray-700"><span>ROI (CAPEX):</span><span>{isFinite(derived.roiCapex) ? derived.roiCapex.toFixed(1) + "%" : "—"}</span></div>
        </div>


        <div className="p-6 bg-white rounded-xl shadow-sm border text-center">
          <h3 className="text-sm text-gray-600">Best RaaS Fee</h3>
          <div className="text-3xl font-bold text-blue-600 mt-3">{derived.bestRaaSFee !== null ? nf.format(derived.bestRaaSFee) : "—"}</div>
          <p className="text-xs text-gray-500 mt-2">Best ROI Opex: {isFinite(derived.bestROI_Opex) ? derived.bestROI_Opex.toFixed(1) + "%" : "—"}</p>
        </div>


      </aside>
    </div>
  </div>
);
}

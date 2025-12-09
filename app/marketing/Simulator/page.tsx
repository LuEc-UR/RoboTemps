"use client";

import React, { useMemo, useState } from "react";

type Inputs = {
  solutionCost: number;
  services: number;
  monthlyOperatorLaborCost: number; // monthly
  mbtf: number;
  usageMonths: number;
  workShifts: number;
  desiredSavings: number;
};

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
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">RaaS Simulator</h1>
          <p className="text-gray-800 mb-6">Inserisci i dati della soluzione e ottieni payback, fee proposta e una timeline semplice.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col text-gray-900">
              Solution Cost (€)
              <input name="solutionCost" type="number" min={0} value={inputs.solutionCost} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col text-gray-900">
              Services (€)
              <input name="services" type="number" min={0} value={inputs.services} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col text-gray-900">
              Operator Labor Cost (€ / month)
              <input name="monthlyOperatorLaborCost" type="number" min={0} step={0.01} value={inputs.monthlyOperatorLaborCost} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
              <label className="flex flex-col text-gray-900">
                Desired Savings (%)
                <input name="desiredSavings" type="number" min={0} max={100} step={0.1} value={inputs.desiredSavings} onChange={handleChange} className="mt-1 p-2 border rounded" />
              </label>
            <label className="flex flex-col text-gray-900">
              MTBF (Months)
              <input name="mbtf" type="number" min={0} step={1} value={inputs.mbtf} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col text-gray-900">
              Effective Usage (Months)
              <input name="usageMonths" type="number" min={1} value={inputs.usageMonths} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            <label className="flex flex-col text-gray-900">
              Work Shifts (1-3)
              <input name="workShifts" type="number" min={1} max={3} value={inputs.workShifts} onChange={handleChange} className="mt-1 p-2 border rounded" />
            </label>
            {/* capex availability removed (not used in calculations) */}
          </div>
        </div>

        <aside className="bg-gray-50 p-4 rounded-lg border md:col-span-3">
          <h2 className="text-xl font-semibold text-gray-900">Results</h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded">
              <h3 className="text-sm font-medium text-gray-700">Summary</h3>
              <dl className="mt-3 space-y-3 text-gray-800">
                <div className="flex justify-between">
                  <dt>Current Cost</dt>
                  <dd className="font-medium">{nf.format(derived.costActual)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>TCO:</dt>
                  <dd className="font-medium">{nf.format(derived.monthlyTCO)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Payback (months):</dt>
                  <dd className="font-medium">{isFinite(derived.paybackMonths) ? derived.paybackMonths.toFixed(1) : "—"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>ROI (CAPEX):</dt>
                  <dd className="font-medium">{isFinite(derived.roiCapex) ? derived.roiCapex.toFixed(1) + "%" : "—"}</dd>
                </div>
              </dl>
            </div>

            <div className="p-6 bg-white border rounded text-center">
              <h3 className="text-sm font-medium text-gray-700">Best RaaS Fee</h3>
              <div className="mt-4">
                <div className="text-3xl font-extrabold text-blue-700">{derived.bestRaaSFee !== null ? nf.format(derived.bestRaaSFee) : "—"}</div>
                <div className="text-sm text-gray-600 mt-2">Best ROI Opex: {isFinite(derived.bestROI_Opex) && derived.bestROI_Opex !== -Infinity ? derived.bestROI_Opex.toFixed(1) + "%" : "—"}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-700 mb-2">Payback vs Usage months</div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-3 bg-blue-600" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-2">
              <span>0</span>
              <span>{inputs.usageMonths} months</span>
            </div>
          </div>

          {/* Enlarged charts under payback */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded">
              <div className="text-sm text-gray-700 mb-2">Operator vs Fee (monthly) — variance highlighted</div>
              <svg viewBox="0 0 200 80" className="w-full h-36">
                {(() => {
                  const op = derived.monthlyOperatorCost;
                  const fee = derived.suggestedFee;
                  const max = Math.max(op, fee, 1);
                  const opH = (op / max) * 60;
                  const feeH = (fee / max) * 60;
                  const xOp = 60;
                  const xFee = 140;
                  const barW = 40;
                  // variance rectangle between tops
                  const diff = feeH - opH;
                  const rectY = 70 - Math.max(opH, feeH);
                  const rectH = Math.abs(diff);
                  const varianceColor = diff >= 0 ? "rgba(37,99,235,0.12)" : "rgba(220,38,38,0.12)";

                  return (
                    <g>
                      {/* bars */}
                      <rect x={xOp - barW / 2} y={70 - opH} width={barW} height={opH} fill="#94A3B8" rx="4" />
                      <rect x={xFee - barW / 2} y={70 - feeH} width={barW} height={feeH} fill="#2563EB" rx="4" />
                      {/* variance highlight */}
                      <rect x={xOp + barW / 2} y={rectY} width={xFee - xOp - barW} height={rectH} fill={varianceColor} />
                      <text x={xOp} y={76} fontSize="10" textAnchor="middle" fill="#374151">Op</text>
                      <text x={xFee} y={76} fontSize="10" textAnchor="middle" fill="#374151">Fee</text>
                      <text x={100} y={14} fontSize="10" textAnchor="middle" fill="#374151">Variance: {nf.format(Math.abs(fee - op))}</text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          {/* Debug panel: intermediate values and iterations */}
          <div className="mt-6 p-4 bg-gray-100 border rounded">
            <h3 className="text-sm font-medium text-gray-700">Debug — iterazioni ciclo</h3>
            <div className="mt-2 text-xs text-gray-600">
              <div>monthlyTCO: {nf.format(derived.monthlyTCO ?? 0)}</div>
              <div>monthlySavings: {nf.format(derived.monthlySavings)}</div>
              <div>minPriceWithMargin: {nf.format(derived.minPriceWithMargin ?? 0)}</div>
              <div>startFee: {Math.ceil(Math.max(derived.monthlyTCO ?? 0, derived.minPriceWithMargin ?? 0, 0))}</div>*/
              <div>endFee: {Math.floor(Math.max(0, derived.monthlySavings))}</div>
            </div>

            <div className="mt-3 max-h-48 overflow-auto text-xs font-mono text-gray-800">
              {(() => {
                const rows: React.ReactElement[] = [];
                const iters = derived.debugIterations ?? [];
                const limit = 200;
                for (let i = 0; i < Math.min(iters.length, limit); i++) {
                  const it = iters[i];
                  const roi = it.roi;
                  rows.push(
                    <div key={it.fee} className="flex justify-between"><div>fee={it.fee}</div><div>{roi === -Infinity ? '—' : roi.toFixed(2) + '%'} </div></div>
                  );
                }
                if (iters.length === 0) return <div className="text-gray-600">No iterations (start &gt; end or no feasible fees)</div>;
                return (
                  <>
                    <div className="text-gray-600 mb-2">Showing {rows.length}{iters.length > limit ? ` (of ${iters.length})` : ''} iterations</div>
                    {rows}
                  </>
                );
              })()}
            </div>
          </div>

            <div className="p-4 bg-white border rounded">
              <div className="text-sm text-gray-700 mb-2">Cumulative timeline</div>
              <svg viewBox="0 0 200 90" className="w-full h-40">
                {(() => {
                  const vals = derived.timeline;
                  if (vals.length === 0) return null;
                  const max = Math.max(...vals, inputs.solutionCost, 1);
                  const left = 30; // left padding for Y axis labels
                  const right = 190; // right boundary for plotting
                  const top = 10;
                  const bottom = 75;
                  // points for the polyline
                  const points = vals.map((v, i) => {
                    const x = (i / Math.max(1, vals.length - 1)) * (right - left) + left;
                    const y = bottom - (v / max) * (bottom - top);
                    return `${x},${y}`;
                  });

                  // X ticks (0, mid, end)
                  const xTicks = [0, Math.floor(vals.length / 2), vals.length - 1];
                  // Y ticks (0, mid, max)
                  const yTicks = [0, Math.round(max / 2), Math.round(max)];

                  return (
                    <g>
                      {/* axes */}
                      <line x1={left} y1={top} x2={left} y2={bottom} stroke="#CBD5E1" strokeWidth="1" />
                      <line x1={left} y1={bottom} x2={right} y2={bottom} stroke="#CBD5E1" strokeWidth="1" />

                      {/* Y ticks and labels */}
                      {yTicks.map((val, i) => {
                        const y = bottom - (val / max) * (bottom - top);
                        return (
                          <g key={i}>
                            <line x1={left - 6} y1={y} x2={left} y2={y} stroke="#94A3B8" strokeWidth="1" />
                            <text x={left - 8} y={y + 3} fontSize="8" textAnchor="end" fill="#475569">{nf.format(val)}</text>
                          </g>
                        );
                      })}

                      {/* X ticks and labels */}
                      {xTicks.map((idx, i) => {
                        const x = (idx / Math.max(1, vals.length - 1)) * (right - left) + left;
                        const label = Math.round(((idx + 1) / vals.length) * inputs.usageMonths);
                        return (
                          <g key={i}>
                            <line x1={x} y1={bottom} x2={x} y2={bottom + 6} stroke="#94A3B8" strokeWidth="1" />
                            <text x={x} y={bottom + 18} fontSize="8" textAnchor="middle" fill="#475569">{label}m</text>
                          </g>
                        );
                      })}

                      {/* polyline and points */}
                      <polyline fill="none" stroke="#0EA5E9" strokeWidth="2" points={points.join(" ")} strokeLinecap="round" strokeLinejoin="round" />
                      {vals.map((v, i) => {
                        const x = (i / Math.max(1, vals.length - 1)) * (right - left) + left;
                        const y = bottom - (v / max) * (bottom - top);
                        return <circle key={i} cx={`${x}`} cy={`${y}`} r="2" fill="#0EA5E9" />;
                      })}

                      {/* axis labels */}
                      <text x={left - 18} y={top - 2} fontSize="9" textAnchor="start" fill="#475569">Cost (€)</text>
                      <text x={(left + right) / 2} y={bottom + 34} fontSize="9" textAnchor="middle" fill="#475569">Months</text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter} from "next/navigation";
import Header from "@/components/layout/Header";

export default function AdvisorPage() {
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push("/marketing/advisor/thank-you");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center px-6 py-24">

      {/* HEADER TEXT */}
      <div className="max-w-2xl text-center mb-16">
        <h1 className="text-5xl py-15 font-bold tracking-tight text-gray-900">
          Talk to an Advisor
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Share a few details about your automation or robotics project.
          One of our specialists will analyze your scenario and contact you
          with tailored insights, feasibility considerations, and next-step guidance.
        </p>
      </div>

      {/* CONFIRMATION SCREEN */}
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-md p-10 max-w-lg w-full text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-900">
            Thank you!
          </h2>
          <p className="mt-4 text-gray-600">
            Your request has been received.  
            A RoboTemps advisor will reach out shortly.
          </p>
        </motion.div>
      ) : (
        /* FORM CARD */
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-10 max-w-2xl w-full space-y-6"
        >
          {/* CONTACT INFO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              required
              type="text"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="email"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Company name"
            />
          </div>

          {/* PROJECT INFO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What kind of project do you need help with?
            </label>
            <textarea
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 h-28 resize-none focus:ring-2 focus:ring-blue-600 focus:outline-none"
              placeholder="Describe the process, objective, or robotic application you're exploring..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Budget
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select…</option>
              <option>Under €20k</option>
              <option>€20k – €50k</option>
              <option>€50k – €150k</option>
              <option>€150k – €500k</option>
              <option>€500k+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              How urgent is your project?
            </label>
            <select
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>Select…</option>
              <option>Just exploring</option>
              <option>Starting in 1–3 months</option>
              <option>ASAP</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow-md hover:bg-blue-700 transition"
          >
            Request a Consultation
          </motion.button>
        </motion.form>
      )}
    </div>
  );
}
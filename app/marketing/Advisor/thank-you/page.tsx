"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AdvisorThankYou() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900">
          Thank you!
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Your request has been successfully submitted.  
          One of our RoboTemps innovation advisors will review your project
          and contact you within the next 24 hours.
        </p>

        <p className="mt-4 text-gray-500 text-sm">
          Meanwhile, feel free to explore our platform or learn more about our services.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl
                     font-medium hover:bg-blue-700 transition shadow-md"
        >
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
}

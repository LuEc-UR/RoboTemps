"use client";

import MarketempsFilters from "@/components/ui/filters";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";

export const products = [
  {
    id: 1,
    name: "Palletizing System A1",
    brand: "FlexRobotics",
    category: "Material Handling",
    image: "/marketplace/palletizing.jpg",
    href: "/marketing/marketemps/palletizing-a1",
  },
  {
    id: 2,
    name: "Autonomous Mobile Robot X5",
    brand: "MoveTech",
    category: "Intralogistics",
    image: "/marketplace/amr.jpg",
    href: "/marketing/marketemps/amr-x5",
  },
  {
    id: 3,
    name: "Cobot Welding Cell Pro",
    brand: "MetaForge",
    category: "Welding",
    image: "/marketplace/welding.jpg",
    href: "/marketing/marketemps/welding-pro",
  },
  {

    id: 4,
    name: "CoboPal10",
    brand: "Robopac",
    category: "palletizing",
    image: "/marketplace/robopac.jpg",
    href: "/marketing/marketemps/pallet",
  },
];

export default function MarketempsPage() {

    function handleFilterChange(filters: Record<string, string | number | boolean>) {
    console.log("Filters:", filters);
    // in futuro → filtrare realmente
  }
  return (
    <div className="min-h-screen bg-[#FAFAFA]">

      {/* HERO */}
      <section className="max-w-6xl mx-auto p-5 pt-20 pb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl py-15 md:text-6xl font-bold tracking-tight text-gray-900"
        >
          Your <span className="text-blue-600">RaaS</span> Marketplace
        </motion.h1>

        <p className="text-lg text-gray-600 mt-6 max-w-2xl">
          Discover pre-validated robotic standard solutions from leading OEMs and System Integrators.
          Browse, compare, and explore automation systems ready for deployment.
        </p>
      </section>

       <MarketempsFilters onFilterChange={handleFilterChange} />

      {/* GRID */}
      <section className="max-w-8xl mx-auto px-5 py-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ y: -4 }}
            className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
          >
            <Link href={product.href}>
              <div className="relative w-full h-56">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <p className="text-xs uppercase text-blue-600 tracking-wide">
                  {product.category}
                </p>
                <h3 className="text-xl font-semibold mt-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

                <div className="flex items-center gap-2 text-sm text-blue-600 mt-4">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

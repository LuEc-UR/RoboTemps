"use client";

import { useState } from "react";
import Sidebar from "@/components/application/Sidebar";
import { Card } from "@/marketing/card";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Package, Settings, ArrowRight } from "lucide-react";

export default function SolutionsPage() {
  const [section, setSection] = useState<"endusers" | "oem" | null>(null);

  return (
    <>
        {!section && <SolutionsSplit onSelect={setSection} />}
        {section === "endusers" && <WizardEndUsers />}
        {section === "oem" && <WizardOEM />}
    </>
  );
}

function SolutionsSplit({ onSelect }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto pt-20"
    >
      <Card 
        title="End-Users"
        icon={Settings}
        href="end.users"
      >
        <div className="flex items-center gap-4 mb-4">
          <Package className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold">End Users</h2>
        </div>
        <div className="text-gray-600 mb-6">
          Create a complete solution by selecting robots, modules, and features.
          You can define a final price or let the system suggest one.
        </div>
        <Button>
          Start Wizard <ArrowRight size={16} />
        </Button>
      </Card>

      <Card
        title="OEM"
        icon={Settings}
        href="oem"
      >
        <div className="flex items-center gap-4 mb-4">
          <Settings className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold">OEM</h2>
        </div>
        <div className="text-gray-600 mb-6">
          Configure a RaaS offer starting from your products, modules, industrial
          cost, and chosen margins.
        </div>
        <Button>
          Start Wizard <ArrowRight size={16} />
        </Button>
      </Card>
    </motion.div>
  );
}

// -------------------- END USERS WIZARD --------------------

function WizardEndUsers() {
  const [step, setStep] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [customPrice, setCustomPrice] = useState(0);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">End Users — RaaS Simulator</h1>

      {step === 1 && (
        <Card
          title="Select Products"
        >
          <div className="text-gray-600 mb-6">
            Add robots, modules, or accessories required for the solution.
          </div>

          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            Product list placeholder...
          </div>

          <Button onClick={() => setStep(2)}>
            Continue <ArrowRight size={16} />
          </Button>
        </Card>
      )}

      {step === 2 && (
        <Card 
          title="2. Set the Price</h2">
            <p className="text-gray-600 mb-6">
              You can enter a custom price or let the system calculate a suggested
              one.
            </p>

          <input
            type="number"
            value={customPrice}
            onChange={(e) => setCustomPrice(Number(e.target.value))}
            placeholder="Enter an optional custom price"
            className="w-full p-3 border rounded-xl mb-6"
          />

          <Button onClick={() => setStep(3)}>
            Continue <ArrowRight size={16} />
          </Button>
        </Card>
      )}

      {step === 3 && (
        <Card 
          title="Final Summary"
        >
          <div className="text-gray-600 mb-4">
            A fully servitized solution will be generated here.
          </div>

          <div className="h-32 bg-gray-100 rounded-xl mb-6">
            Final report placeholder...
          </div>

          <Button>Export Solution</Button>
        </Card>
      )}
    </div>
  );
}

// -------------------- OEM WIZARD --------------------

function WizardOEM() {
  const [step, setStep] = useState(1);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">OEM — RaaS Simulator</h1>

      {step === 1 && (
        <Card title="1. Load Your Products">
          <p className="text-gray-600 mb-6">
            Import robots, modules, industrial cost, and margins.
          </p>

          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            Product upload/configuration area...
          </div>

          <Button onClick={() => setStep(2)}>
            Continue <ArrowRight size={16} />
          </Button>
        </Card>
      )}

      {step === 2 && (
        <Card 
          title="2. Define the RaaS Model"
        >
          <p className="text-gray-600 mb-6">
            Set fees, contract duration, pay-per-use, and maintenance.
          </p>
        
          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            RaaS model UI placeholder...
          </div>

          <Button onClick={() => setStep(3)}>
            Continue <ArrowRight size={16} />
          </Button>
        </Card>
      )}

      {step === 3 && (
        <Card title="3. Final Report">
          <p className="text-gray-600 mb-4">
            Economic analysis and final configuration of your servitized offer.
          </p>

          <div className="h-32 bg-gray-100 rounded-xl mb-6">
            KPI and analytics placeholder...
          </div>

          <Button>Export Proposal</Button>
        </Card>
      )}
    </div>
  );
}


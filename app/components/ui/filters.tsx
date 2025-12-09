"use client";

import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

interface Filters {
    search?: string;
    application?: string;
    industry?: string;
    oem?: string;
    [key: string]: any;
}

interface Props {
    onFilterChange?: (filters: Filters) => void;
}

export default function MarketempsFilters({ onFilterChange }: Props) {
    const [search, setSearch] = useState<string>("");
    const [application, setApplication] = useState<string>("");
    const [industry, setIndustry] = useState<string>("");
    const [oem, setOem] = useState<string>("");

    function updateFilters(fields: Partial<Filters>) {
        const newFilters = {
        search,
        application,
        industry,
        oem,
        ...fields,
    };

        onFilterChange && onFilterChange(newFilters);
}

return (
    <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Filter Solutions</h2>
        </div>

        {/* SEARCH INPUT */}
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 mb-6">
            <Search className="w-5 h-5 text-gray-500 mr-3" />
            <input
                type="text"
                placeholder="Search a robotic solution..."
                className="bg-transparent outline-none w-full"
                value={search}
                onChange={(e) => {
                setSearch(e.target.value);
                updateFilters({ search: e.target.value });
                }}
            />
        </div>

        {/* GRID OF SELECTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


            {/* APPLICATION */}
            <select
                className="border border-gray-300 rounded-xl p-3"
                value={application}
                onChange={(e) => {
                setApplication(e.target.value);
                updateFilters({ application: e.target.value });
                }}
            >
                <option value="">Application</option>
                <option value="pick">Pick & Place</option>
                <option value="inspection">Inspection</option>
                <option value="packaging">Packaging</option>
                <option value="intralogistics">Intralogistics</option>
            </select>

            {/* INDUSTRY */}
            <select
                className="border border-gray-300 rounded-xl p-3"
                value={industry}
                onChange={(e) => {
                setIndustry(e.target.value);
                updateFilters({ industry: e.target.value });
                }}
            >
                <option value="">Industry</option>
                <option value="food">Food & Beverage</option>
                <option value="automotive">Automotive</option>
                <option value="logistics">Logistics</option>
                <option value="electronics">Electronics</option>
            </select>

            {/* OEM PARTNER */}
            <select
                className="border border-gray-300 rounded-xl p-3"
                value={oem}
                onChange={(e) => {
            setOem(e.target.value);
            updateFilters({ oem: e.target.value });
          }}
        >
          <option value="">OEM Partner</option>
          <option value="roboticsco">RoboticsCo</option>
          <option value="automatech">Automatech</option>
          <option value="visioncore">VisionCore</option>
        </select>

      </div>
    </div>
  );
}

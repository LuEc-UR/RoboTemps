"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Logo from "@/components/Logo"

// Dropdown definitions
const dropdowns = {
  who: [
    { href: "/whoweare/company", label: "Company" },
    { href: "/whoweare/team", label: "Our Team" },
    { href: "/whoweare/history", label: "Our History" },
  ],
  what: [
    { href: "/whatwedo/automation", label: "Automation" },
    { href: "/whatwedo/consulting", label: "Consulting" },
    { href: "/whatwedo/technology", label: "Technology" },
  ],
  vision: [
    { href: "/ourvision/future", label: "Future & Innovation" },
    { href: "/ourvision/mission", label: "Mission" },
    { href: "/ourvision/values", label: "Values" },
  ],
  career: [
    { href: "/career/jobs", label: "Jobs" },
    { href: "/career/internships", label: "Internships" },
    { href: "/career/culture", label: "Culture & Life" },
  ],
};

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openMenu = (id: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(id);
  };

  const closeMenuDelayed = (delay = 200) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), delay) as unknown as number;
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <div className="flex items-center justify-between px-10 py-6 border-b border-gray-200 bg-white relative">
      <Logo />
      {/* LEFT NAV */}
      <div className="flex items-center gap-10">
        {/* WHO WE ARE */}
        <div
          className="relative"
          onMouseEnter={() => openMenu("who")}
          onMouseLeave={() => closeMenuDelayed()}
        >
          <button className="text-gray-700 hover:text-blue-600 transition text-lg font-medium">Who we are</button>

          {open === "who" && (
            <div
              onMouseEnter={() => cancelClose()}
              onMouseLeave={() => closeMenuDelayed()}
              className="absolute left-0 mt-3 w-56 bg-white shadow-lg border border-gray-200 rounded-xl p-3 z-50"
            >
              <Link href="/whoweare/company" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Company
              </Link>
              <Link href="/whoweare/team" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Our Team
              </Link>
              <Link href="/whoweare/history" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Our History
              </Link>
            </div>
          )}
        </div>

          {/* WHAT WE DO */}
        <div className="relative" onMouseEnter={() => openMenu("what")} onMouseLeave={() => closeMenuDelayed()}>
          <button className="text-gray-700 hover:text-blue-600 transition text-lg font-medium">What we do</button>

          {open === "what" && (
            <div onMouseEnter={() => cancelClose()} onMouseLeave={() => closeMenuDelayed()} className="absolute left-0 mt-3 w-56 bg-white shadow-lg border border-gray-200 rounded-xl p-3 z-50">
              <Link href="/whatwedo/automation" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Automation
              </Link>
              <Link href="/whatwedo/consulting" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Consulting
              </Link>
              <Link href="/whatwedo/technology" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Technology
              </Link>
            </div>
          )}
        </div>

          {/* OUR VISION */}
        <div className="relative" onMouseEnter={() => openMenu("vision")} onMouseLeave={() => closeMenuDelayed()}>
          <button className="text-gray-700 hover:text-blue-600 transition text-lg font-medium">Our vision</button>

          {open === "vision" && (
            <div onMouseEnter={() => cancelClose()} onMouseLeave={() => closeMenuDelayed()} className="absolute left-0 mt-3 w-56 bg-white shadow-lg border border-gray-200 rounded-xl p-3 z-50">
              <Link href="/ourvision/future" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Future & Innovation
              </Link>
              <Link href="/ourvision/mission" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Mission
              </Link>
              <Link href="/ourvision/values" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Values
              </Link>
            </div>
          )}
        </div>

          {/* CAREER */}
        <div className="relative" onMouseEnter={() => openMenu("career")} onMouseLeave={() => closeMenuDelayed()}>
          <button className="text-gray-700 hover:text-blue-600 transition text-lg font-medium">Career</button>

          {open === "career" && (
            <div onMouseEnter={() => cancelClose()} onMouseLeave={() => closeMenuDelayed()} className="absolute left-0 mt-3 w-56 bg-white shadow-lg border border-gray-200 rounded-xl p-3 z-50">
              <Link href="/career/jobs" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Jobs
              </Link>
              <Link href="/career/internships" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Internships
              </Link>
              <Link href="/career/culture" className="block px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700">
                Culture & Life
              </Link>
            </div>
          )}
        </div>

        </div>

        {/* RIGHT AREA (email, phone, language etc.) */}
        <div className="flex items-center gap-6">
         
  	  {/* EMAIL + PHONE */}
  	  <Link
  	  	href="/contact"
          	className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
  		>
  		<div className="flex items-center gap-2">
    		   <svg
    			    xmlns="http://www.w3.org/2000/svg"
       			    className="w-5 h-5"
      		            fill="none"
        		    viewBox="0 0 24 24"
        	            stroke="currentColor"
      			  >
        	   <path
          		strokeLinecap="round"
          		strokeLinejoin="round"
          		strokeWidth={1.8}
          		d="M16 12H8m8 0l-4-4m4 4l-4 4m4-12H8a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V6a2 2 0 00-2-2z"
        		/>
      		   </svg>

      			<span className="text-base font-medium">Contact</span>
    		</div>
  	  </Link>

  	  {/* LANGUAGE SELECTOR */}
  	  <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition text-base font-medium">
    		<svg
      			xmlns="http://www.w3.org/2000/svg"
      			className="w-5 h-5"
      			fill="none"
      			viewBox="0 0 24 24"
      			stroke="currentColor"
    		>
      		 <path
        		strokeLinecap="round"
        		strokeLinejoin="round"
        		strokeWidth={1.8}
        		d="M12 3v18m9-9H3"
      		 />
    		</svg>
    		EN
  	  </button>
      
      </div>
    </div>
  );
}
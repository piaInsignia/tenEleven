"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { images } from "@/lib/image";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const insightsRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // close dropdowns on resize when >= md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setInsightsOpen(false);
        setMobileOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close when clicking outside any dropdown; also handle Escape key
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      // if click is inside services dropdown or its button, do nothing
      if (servicesRef.current && servicesRef.current.contains(target)) return;
      if (insightsRef.current && insightsRef.current.contains(target)) return;
      // else close dropdowns
      setServicesOpen(false);
      setInsightsOpen(false);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setInsightsOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // helper to close all dropdowns (useful before programmatic navigation)
  const closeAll = () => {
    setServicesOpen(false);
    setInsightsOpen(false);
    setMobileOpen(false);
  };

  return (
    <header
      ref={rootRef}
      className="fixed top-3 sm:top-8 inset-x-0 z-50 max-w-5xl mx-auto 
             bg-neutral-900 text-white pl-6 pr-3 py-2 sm:py-3 
             flex items-center justify-between rounded-full "
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2" onClick={closeAll}>
        <div className="h-4 sm:h-6 relative">
          <Image
              src={images.IMG_LOGO}
              alt="logo"
              width={160}      // besar
              height={80}
              className="object-contain w-auto h-full"
              priority
          />
        </div>

        {/* <div className="text- sm:text-2xl font-medium">
          <span className="text-white">ten</span>
          <span className="text-neutral-400">eleven</span>
        </div> */}
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 items-center">
        <Link href="/" className="hover:font-semibold hover:text-orange-500" onClick={closeAll}>
          Home
        </Link>

        {/* Our Services Dropdown */}
        <div className="relative" ref={servicesRef}>
          <button
            onClick={() => {
              setServicesOpen((s) => !s);
              setInsightsOpen(false); // close other dropdown if open
            }}
            aria-expanded={servicesOpen}
            className="flex items-center gap-1 hover:font-semibold hover:text-orange-500"
          >
            Our Services {servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {servicesOpen && (
            <div className="border-t-3 border-t-[#F05125] left-[-30%] absolute top-full mt-4 bg-white rounded-b-sm shadow-lg  min-w-[190px] z-50">
              <Link
                href="/our_service?keyword=ai"
                onClick={() => setServicesOpen(false)}
                className="block px-3 py-2 text-[#7D7D9D] text-center hover:text-[#1A1A1A] hover:font-semibold hover:bg-[#F7F7F9] rounded"
              >
                Artificial Intelligence
              </Link>
              <Link
                href="/our_service?keyword=data"
                onClick={() => setServicesOpen(false)}
                className="block px-3 py-2 text-[#7D7D9D] text-center hover:text-[#1A1A1A] hover:font-semibold hover:bg-[#F7F7F9] rounded"
              >
                Data Integration
              </Link>
              <Link
                href="/our_service?keyword=cloud"
                onClick={() => setServicesOpen(false)}
                className="block px-3 py-2 text-[#7D7D9D] text-center hover:text-[#1A1A1A] hover:font-semibold hover:bg-[#F7F7F9] rounded"
              >
                Cloud Acceleration
              </Link>
            </div>
          )}
        </div>

        {/* Insights Dropdown */}
        <div className="relative" ref={insightsRef}>
          <button
            onClick={() => {
              setInsightsOpen((s) => !s);
              setServicesOpen(false);
            }}
            aria-expanded={insightsOpen}
            className="flex items-center gap-1 hover:font-semibold hover:text-orange-500"
          >
            Insights {insightsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {insightsOpen && (
            <div className="border-t-3 border-t-[#F05125] left-[-30%] absolute top-full mt-4 bg-white rounded-b-sm shadow-lg  min-w-[150px] z-50">
              <Link
                href="/news"
                onClick={() => setInsightsOpen(false)}
                className="block px-3 py-2 text-[#7D7D9D] text-center hover:text-[#1A1A1A] hover:font-semibold hover:bg-[#F7F7F9] rounded"
              >
                News
              </Link>
              <Link
                href="/insight"
                onClick={() => setInsightsOpen(false)}
                className="block px-3 py-2 text-[#7D7D9D] text-center hover:text-[#1A1A1A] hover:font-semibold hover:bg-[#F7F7F9] rounded"
              >
                Whitepapers
              </Link>
            </div>
          )}
        </div>

        <Link href="/about" className="hover:font-semibold hover:text-orange-500" onClick={closeAll}>
          About Us
        </Link>
        <Link href="/schedule" className="hover:font-semibold hover:text-orange-500" onClick={closeAll}>
          Contact Us
        </Link>
      </nav>

      {/* CTA Desktop */}
      <Link
        href="/schedule?purpose=Specific Solution"
        className="hidden md:block ml-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm"
        onClick={closeAll}
      >
        Get In Touch
      </Link>

      {/* Mobile Burger Button */}
      <button
        className="md:hidden p-2 rounded-full bg-orange-500"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <div className="w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]">
          <Menu className="w-full h-full" />
        </div>
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0  bg-[#00000033] text-white z-[100] flex flex-col  text-[18px]">
          <div className="bg-neutral-900 px-6 py-4">
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <Image src={images.IMG_LOGO} alt="logo" width={60} height={30} className="object-contain" />
                <span className="text-lg font-semibold">
                  <span className="text-white">ten</span>
                  <span className="text-neutral-400">eleven</span>
                </span>
              </Link>
              <button
                className="p-2 rounded-full bg-orange-500"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>

              {/* Our Services Mobile Accordion */}
              <details
                className="group"
                onToggle={(e) => setServicesOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="flex items-center justify-between cursor-pointer ">
                  Our Services{" "}
                  <ChevronDown
                    className={servicesOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    size={16}
                  />
                </summary>
                <div className="flex flex-col mt-2 gap-2 text-[#B1B1B1] text-[16px]">
                  <Link href="/our_service?keyword=data" onClick={() => setMobileOpen(false)}>
                    Data Integration
                  </Link>
                  <Link href="/our_service?keyword=ai" onClick={() => setMobileOpen(false)}>
                    Artificial Intelligence
                  </Link>
                  <Link href="/our_service?keyword=cloud" onClick={() => setMobileOpen(false)}>
                    Cloud Acceleration
                  </Link>
                </div>
              </details>

              {/* Insights Mobile Accordion */}
              <details
                className="group"
                onToggle={(e) => setInsightsOpen((e.target as HTMLDetailsElement).open)}
              >
                <summary className="flex items-center justify-between cursor-pointer">
                  Insights
                  <ChevronDown
                    className={insightsOpen ? "rotate-180 transition-transform" : "transition-transform"}
                    size={16}
                  />
                </summary>
                <div className="flex flex-col mt-2 gap-2 text-[#B1B1B1] text-[16px]">
                  <Link href="/news" onClick={() => setMobileOpen(false)}>
                    News
                  </Link>
                  <Link href="/insight" onClick={() => setMobileOpen(false)}>
                    Whitepapers
                  </Link>
                </div>
              </details>

              <Link href="/about" onClick={() => setMobileOpen(false)}>
                About Us
              </Link>
              <Link href="/schedule" onClick={() => setMobileOpen(false)}>
                Contact Us
              </Link>

              <Link
                href="/schedule?purpose=Specific Solution"
                onClick={() => setMobileOpen(false)}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-center text-sm"
              >
                Get In Touch
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

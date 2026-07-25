/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { 
  Phone, 
  MapPin, 
  Navigation, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Menu, 
  X, 
  Download, 
  ChevronRight,
  Sparkles,
  Compass,
  Tag,
  Ruler
} from "lucide-react";

import LeadForm from "./components/LeadForm";
import StickyActionBar from "./components/StickyActionBar";
import MapSection from "./components/MapSection";
import USPCards from "./components/USPCards";
import PricingSection from "./components/PricingSection";
import LayoutAmenities from "./components/LayoutAmenities";
import FAQSection from "./components/FAQSection";
import SameeraLogo from "./components/SameeraLogo";
import BrochureModal from "./components/BrochureModal";

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    (window as any).triggerFormFlow = (e: any, isBrochure: boolean = false) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // Find the element that was clicked
      let clickedElement: HTMLElement | null = null;
      if (e) {
        if (e instanceof HTMLElement) {
          clickedElement = e;
        } else if (e.currentTarget) {
          clickedElement = e.currentTarget;
        } else if (e.target) {
          clickedElement = e.target;
        }
      }

      // Calculate vertical midpoint of the page
      const docHeight = document.documentElement.scrollHeight;
      const midpoint = docHeight / 2;

      let targetFormId = "lead-form-container"; // Default to footer
      let inputId = "lead-name-input-footer";

      if (clickedElement) {
        const rect = clickedElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top;
        if (absoluteY < midpoint) {
          targetFormId = "lead-form-hero";
          inputId = "lead-name-input-hero";
        }
      } else {
        if (window.scrollY < midpoint) {
          targetFormId = "lead-form-hero";
          inputId = "lead-name-input-hero";
        }
      }

      // Dispatch custom events to notify the LeadForm components of the trigger type
      if (isBrochure) {
        window.dispatchEvent(new CustomEvent("set-brochure-trigger"));
      } else {
        window.dispatchEvent(new CustomEvent("set-sitevisit-trigger"));
      }

      const formElement = document.getElementById(targetFormId);
      if (formElement) {
        // If it's already in the viewport and it's the hero form, just focus the input directly
        const formRect = formElement.getBoundingClientRect();
        const isInViewport = (
          formRect.top >= 0 &&
          formRect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );

        if (isInViewport && targetFormId === "lead-form-hero") {
          const nameInput = document.getElementById(inputId);
          if (nameInput) {
            nameInput.focus();
          }
        } else {
          formElement.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => {
            const nameInput = document.getElementById(inputId);
            if (nameInput) {
              nameInput.focus();
            }
          }, 850);
        }
      }
    };

    (window as any).triggerBrochureFlow = (e: any) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      setIsBrochureModalOpen(true);
    };

    return () => {
      window.removeEventListener("scroll", handleScroll);
      delete (window as any).triggerFormFlow;
      delete (window as any).triggerBrochureFlow;
    };
  }, []);

  const whatsappUrl = "https://wa.me/919851998519?text=Hi%20Team%20Sameera%20Urban%20Nest%2C%20I%20am%20interested%20in%20your%20project.%20Please%20share%20the%20brochure%2C%20pricing%2C%20floor%20plans%2C%20and%20site%20visit%20details.";
  const mapsUrl = "https://www.google.com/maps/place/Sameera+Urban+Nest/@12.7438797,79.9501008,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52fb005de1466d:0x2551ea38bbd2a4a8!8m2!3d12.7438797!4d79.9501008!16s%2Fg%2F11x0fz794c";
  const brochureUrl = "https://drive.google.com/file/d/1YxB3N4QX-ry3-t-mAwGTFwEBXmqTF_4n/view?usp=drive_link";

  const handleScrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof (window as any).triggerFormFlow === "function") {
      (window as any).triggerFormFlow(e, false);
    } else {
      const formElement = document.getElementById("lead-form-container");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-warm-cream selection:bg-brand-green/30 selection:text-charcoal text-charcoal overflow-x-hidden">
      
      {/* 1. NAVIGATION BAR (Sticky, shrinks on scroll) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-3 shadow-md backdrop-blur-md" 
            : "py-5 backdrop-blur-none"
        }`}
        style={{
          borderBottom: isScrolled ? "1px solid #C9A227" : "1px solid rgba(0, 0, 0, 0)",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .header-nav-link {
            transition: color 0.25s ease-in-out !important;
          }
          .header-nav-link:hover,
          .header-nav-link:active,
          .header-nav-link:focus {
            color: #C9971E !important;
          }
        ` }} />
        {/* Soft dark gradient scrim behind the nav content in initial state (fades out on scroll) */}
        <div 
          className="absolute inset-0 z-[-1] transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(7, 28, 22, 0.85) 0%, rgba(7, 28, 22, 0) 100%)",
            opacity: isScrolled ? 0 : 1
          }}
        />
        
        {/* Rich solid Signature Green background fill (fades in on scroll) */}
        <div 
          className="absolute inset-0 z-[-1] transition-opacity duration-300 pointer-events-none"
          style={{
            backgroundColor: "#1E8449",
            opacity: isScrolled ? 1 : 0
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Brand Title */}
            <div className="flex items-center gap-2 sm:gap-4 select-none">
              <a 
                href="#" 
                className="flex items-center justify-center bg-white px-2 sm:px-3.5 py-1.5 rounded-lg border border-brand-green/20 shadow-sm transition-all duration-300 hover:bg-white/95 hover:border-brand-green/30"
              >
                <img 
                  src="https://i.ibb.co/mCy5sfpR/Praedia-Logo.png" 
                  alt="Praedia Promoters Logo" 
                  referrerPolicy="no-referrer"
                  className="h-8 sm:h-10 w-auto object-contain select-none"
                />
              </a>
              <div className="h-6 sm:h-8 w-px bg-white/25 self-center" />
              <a 
                href="#" 
                className="flex items-center justify-center bg-white px-2 sm:px-3.5 py-1.5 rounded-lg border border-brand-green/20 shadow-sm transition-all duration-300 hover:bg-white/95 hover:border-brand-green/30"
              >
                <SameeraLogo className="!h-8 sm:!h-10" />
              </a>
            </div>

            {/* Desktop Menu links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#location-advantages" className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 transition-colors">
                Location
              </a>
              <a href="#key-usps" className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 transition-colors">
                Why Us
              </a>
              <a href="#pricing" className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 transition-colors">
                Pricing
              </a>
              <a href="#layout-amenities" className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 transition-colors">
                Master Plan
              </a>
              <a href="#faq" className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 transition-colors">
                FAQ
              </a>
            </nav>

            {/* Desktop CTA actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <a 
                href="tel:+919851998519"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-bright-green transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-bright-green" />
                <span>+91 98519 98519</span>
              </a>
              
              <a
                href="#lead-form-container"
                onClick={handleScrollToForm}
                className="inline-flex items-center justify-center space-x-1.5 bg-brand-green hover:bg-bright-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_12px_rgba(184,146,74,0.45)] text-white font-bold py-2 px-4 rounded text-xs transition-colors shadow"
              >
                <span>Book Site Visit</span>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white/90 hover:text-white p-1"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#1E8449] border-b border-antique-gold/30 py-4 px-6 animate-fade-in animate-duration-200">
            <div className="flex flex-col space-y-4">
              <a 
                href="#location-advantages" 
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 border-b border-white/5"
              >
                Location Advantages
              </a>
              <a 
                href="#key-usps" 
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 border-b border-white/5"
              >
                The Sameera Advantage (USPs)
              </a>
              <a 
                href="#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 border-b border-white/5"
              >
                Plot Sizes &amp; Pricing
              </a>
              <a 
                href="#layout-amenities" 
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 border-b border-white/5"
              >
                Master Layout &amp; Amenities
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="header-nav-link text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 border-b border-white/5"
              >
                FAQs
              </a>
              
              <div className="pt-2 flex flex-col space-y-3">
                <a 
                  href="tel:+919851998519"
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-bright-green"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>Call: +91 98519 98519</span>
                </a>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-bright-green"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                  <span>Connect on WhatsApp</span>
                </a>
                <a
                  href="#lead-form-container"
                  onClick={handleScrollToForm}
                  className="inline-flex items-center justify-center bg-brand-green text-white font-bold py-3 px-4 rounded text-xs transition-colors"
                >
                  <span>Book Free Site Visit</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>


      {/* 2. HERO SECTION */}
      <section id="hero-section" className="relative min-h-[90vh] lg:min-h-[100vh] flex items-center justify-center bg-forest pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        
        {/* Custom shimmer sweep style for hero launch badge */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer-sweep {
            0% { transform: translateX(-150%) skewX(-15deg); }
            50%, 100% { transform: translateX(150%) skewX(-15deg); }
          }
          .animate-shimmer-sweep {
            animation: shimmer-sweep 5s infinite ease-in-out;
          }
        ` }} />

        {/* Full-bleed real green scenery background with warm golden-hour filter */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.ibb.co/hRQZVkxL/Banner-Section-Image.png"
            alt="Beautifully developed layout plots and entrance at Sameera Urban Nest, Athur, Chengalpattu"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle warm grain/noise texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Hero Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline and Credibility hooks */}
            <div className="lg:col-span-7 text-[#141414] text-left space-y-6">
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative inline-flex items-center space-x-2 border border-[#1E8449] rounded-md px-4 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden"
                style={{ backgroundColor: '#F7F3EA' }}
              >
                {/* Shimmer overlay effect */}
                <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#1E8449]/10 to-transparent -skew-x-12 animate-shimmer-sweep pointer-events-none"></div>

                <Sparkles className="w-3.5 h-3.5 relative z-10" style={{ color: '#0F341E' }} />
                <span className="text-[10px] uppercase font-bold tracking-widest relative z-10" style={{ color: '#0F341E' }}>
                  Now Launching — Athur, Chengalpattu
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141414] leading-[1.1] tracking-tight"
              >
                <span className="text-[#141414]">Your Own Piece of</span> <span className="text-[#1E8449]">Chengalpattu's</span> <br className="hidden sm:inline" />
                <span className="text-[#141414] italic font-normal underline decoration-brand-green decoration-2 underline-offset-4">Fastest-Growing</span> <span className="text-[#141414]">Address</span>
              </motion.h1>

              {/* Thin gold divider line directly beneath main hero headline */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="h-[2.2px] w-24 bg-gradient-to-r from-antique-gold via-antique-gold/75 to-transparent my-4 origin-left"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-sm sm:text-base text-[#141414] max-w-xl leading-relaxed font-medium"
              >
                <strong>DTCP &amp; RERA Approved</strong> gated community residential plots starting from just <strong className="text-[#1E8449] font-sans font-bold text-base sm:text-lg">₹1,400 per sq.ft*</strong>. Highly elevated, immediate registration ready, and located just <strong className="text-[#1E8449] font-sans font-bold">10 minutes</strong> from Chengalpattu Railway Junction on the high appreciation GST Road corridor.
              </motion.p>

              {/* Responsive Quick Facts Container */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4"
              >
                <div className="rounded-lg p-3.5 bg-[#F7F3EA] border border-antique-gold/25 shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#1E8449] flex-shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider text-[#4A554D] block font-extrabold">Base Price</span>
                  </div>
                  <strong className="text-base sm:text-lg font-sans font-extrabold text-[#141414]">₹1,400 / Sq.Ft*</strong>
                </div>
                <div className="rounded-lg p-3.5 bg-[#F7F3EA] border border-antique-gold/25 shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between">
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <Ruler className="w-3.5 h-3.5 text-[#1E8449] flex-shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider text-[#4A554D] block font-extrabold">Plot Dimensions</span>
                  </div>
                  <strong className="text-base sm:text-lg font-sans font-extrabold text-[#141414]">600 - 2,400 Sq.Ft</strong>
                </div>
                <div className="rounded-lg p-3.5 bg-[#F7F3EA] border border-antique-gold/25 shadow-[0_10px_25px_rgba(0,0,0,0.15)] col-span-2 sm:col-span-1 flex flex-col justify-between">
                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E8449] flex-shrink-0" />
                    <span className="text-[10px] uppercase tracking-wider text-[#4A554D] block font-extrabold">RERA Registered</span>
                  </div>
                  <strong className="text-base sm:text-lg font-sans font-extrabold text-[#141414] block truncate">TN/35/Layout/1382/2025</strong>
                </div>
              </motion.div>

              {/* Action Trigger Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6"
              >
                <a
                  href="#lead-form-container"
                  onClick={handleScrollToForm}
                  className="bg-brand-green hover:bg-bright-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_12px_rgba(184,146,74,0.45)] text-white font-bold py-4 px-6 rounded-lg text-xs tracking-wider uppercase text-center transition-colors shadow-lg cursor-pointer"
                >
                  Book A Free Site Visit
                </a>

                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <a
                    href="tel:+919851998519"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 bg-brand-green hover:bg-bright-green text-white font-bold py-3.5 px-5 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(30,132,73,0.35)]"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>Call Now</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 bg-bright-green hover:bg-brand-green text-white font-bold py-3.5 px-5 rounded-lg text-xs tracking-wider uppercase transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Embedded Lead Capture Card */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="lg:col-span-5 w-full"
            >
              <LeadForm variant="hero" />
            </motion.div>

          </div>
        </div>

        {/* Small trust strip directly under the fold */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-forest-dark/95 border-t border-gold/10 py-4 hidden sm:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between text-xs text-cream/70">
              <div className="flex items-center space-x-1.5 py-1">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span><strong>DTCP-Approved</strong> Layout Drawings</span>
              </div>
              <div className="h-4 w-[1px] bg-gold/20"></div>
              <div className="flex items-center space-x-1.5 py-1">
                <Award className="w-4 h-4 text-gold" />
                <span>RERA Registered No: <strong>TN/35/Layout/1382/2025</strong></span>
              </div>
              <div className="h-4 w-[1px] bg-gold/20"></div>
              <div className="flex items-center space-x-1.5 py-1">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                <span>Gated Residential Plottings</span>
              </div>
              <div className="h-4 w-[1px] bg-gold/20"></div>
              <div className="flex items-center space-x-1.5 py-1">
                <Sparkles className="w-4 h-4 text-gold" />
                <span><strong>Hundreds of Families</strong> Trust Sameera Urban Nest</span>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* 3. STICKY MOBILE ACTION BAR (rendered inside DOM) */}
      <StickyActionBar />


      {/* 4. WHY ATHUR-CHENGALPATTU (Location Advantage) */}
      <MapSection />

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 5. WHY THIS PROJECT / KEY USPs */}
      <USPCards />

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 6. PLOT SIZES & PRICING */}
      <PricingSection />

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 7. MASTER PLAN / LAYOUT & AMENITIES */}
      <LayoutAmenities />


      {/* COMPACT SITE PROGRESS PHOTO STRIP */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-antique-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
              Development Gallery
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold mt-3" style={{ color: '#1E8449' }}>
              On-Ground Site Progress Highlights
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            
            {/* Photo 1 Card */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-warm-cream shadow-inner">
                <img 
                  src="https://i.ibb.co/JwWjLRLy/Sameera-Urban-Nest-1.png"
                  alt="Finished internal road at Sameera Urban Nest, Athur, Chengalpattu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter saturate-[0.9] contrast-[1.05] sepia-[18%] brightness-[0.96] transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft dark green gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0E3B2E]/90 via-[#0E3B2E]/40 to-transparent pointer-events-none" />
                
                {/* Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10">
                  <p className="text-[11px] sm:text-xs font-sans text-white/95 leading-snug font-medium drop-shadow-xs">
                    Finished internal road lined with palm trees.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo 2 Card */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-warm-cream shadow-inner">
                <img 
                  src="https://i.ibb.co/9kcFCMMW/Sameera-Urban-Nest-2.png"
                  alt="Layout road with security cabin and green plotted land at Sameera Urban Nest, Athur, Chengalpattu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter saturate-[0.9] contrast-[1.05] sepia-[18%] brightness-[0.96] transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft dark green gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0E3B2E]/90 via-[#0E3B2E]/40 to-transparent pointer-events-none" />
                
                {/* Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10">
                  <p className="text-[11px] sm:text-xs font-sans text-white/95 leading-snug font-medium drop-shadow-xs">
                    Layout road with security cabin &amp; green plots.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo 3 Card */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-warm-cream shadow-inner">
                <img 
                  src="https://i.ibb.co/vCGbfTFc/Sameera-Urban-Nest-3.png"
                  alt="Active on-site progress with concrete curbing and plot demarcation at Sameera Urban Nest, Athur, Chengalpattu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover filter saturate-[0.9] contrast-[1.05] sepia-[18%] brightness-[0.96] transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft dark green gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0E3B2E]/90 via-[#0E3B2E]/40 to-transparent pointer-events-none" />
                
                {/* Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10">
                  <p className="text-[11px] sm:text-xs font-sans text-white/95 leading-snug font-medium drop-shadow-xs">
                    Active on-site progress with concrete curbing.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo 4 Card */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-md hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 group">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-warm-cream shadow-inner">
                <img 
                  src="https://i.ibb.co/7dkwD8LX/Sameera-Urban-Nest-4.png"
                  alt="Branded entrance totem welcome pillar at Sameera Urban Nest, Athur, Chengalpattu"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="absolute w-[160%] h-[160%] max-w-none object-cover -left-[30%] -top-[30%] filter saturate-[0.9] contrast-[1.05] sepia-[18%] brightness-[0.96] transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Soft dark green gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0E3B2E]/90 via-[#0E3B2E]/40 to-transparent pointer-events-none" />
                
                {/* Overlay Caption */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 z-10">
                  <p className="text-[11px] sm:text-xs font-sans text-white/95 leading-snug font-medium drop-shadow-xs">
                    Signature welcome totem signage.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>


      {/* 8. ABOUT PRAEDIA PROMOTERS */}
      <section id="about-promoters" className="py-16 sm:py-20 bg-[linear-gradient(135deg,#135C3A_0%,#0E472C_100%)] text-white scroll-mt-16 relative overflow-hidden">
        
        {/* Background vector decoration */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#D49B28]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Praedia Promoters Logo Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="p-2.5 sm:p-3 bg-white/10 rounded-2xl border border-[#D49B28]/30 shadow-2xl backdrop-blur-xs w-full max-w-sm mx-auto lg:max-w-none">
                <div className="relative rounded-xl overflow-hidden bg-white border border-[#D49B28]/20 shadow-inner w-full h-[380px] flex items-center justify-center p-8 group">
                  <img 
                    src="https://i.ibb.co/mCy5sfpR/Praedia-Logo.png"
                    alt="Praedia Promoters Private Limited Logo"
                    referrerPolicy="no-referrer"
                    className="w-[65%] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="text-xs text-cream/70 mt-3 text-center tracking-wide font-medium">
                Marketed by Praedia Promoters Private Limited
              </p>
            </div>

            {/* Legacy Description & stats */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="inline-block text-xs uppercase tracking-widest text-[#D49B28] font-bold bg-white/10 px-4 py-1.5 rounded-full border border-[#D49B28]/35 backdrop-blur-xs">
                Our Legacy of Trust
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Marketed by Praedia Promoters Private Limited
              </h2>
              
              <div className="w-20 h-0.5 bg-[#D49B28] my-4 rounded-full"></div>

              <p className="text-sm sm:text-base text-cream/90 leading-relaxed">
                At Praedia Promoters Private Limited, we believe in providing legal absolute safety and clear-cut structural execution across Tamil Nadu's fastest growing residential corridors. We partner exclusively with tested land-promoters and developers of repute to bring premium gated communities to Chennai's salaried professionals. By adhering strictly to the highest principles of statutory compliance, transparent price listings, and DTCP-RERA authority standards, we ensure your family’s investment is safe, appreciating, and ready for immediate construction.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-4">
                {/* Stat Tile 1 */}
                <div className="relative p-5 bg-gradient-to-b from-white/12 to-white/5 border border-[#1E8B57]/40 hover:border-[#D49B28]/60 rounded-xl shadow-md overflow-hidden backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <strong className="text-2xl sm:text-3xl font-serif text-[#D49B28] block tracking-widest drop-shadow-xs">100%</strong>
                  <span className="text-[10px] text-cream/75 uppercase tracking-wider mt-1.5 block font-semibold">RERA Clear Titles</span>
                </div>

                {/* Stat Tile 2 */}
                <div className="relative p-5 bg-gradient-to-b from-white/12 to-white/5 border border-[#1E8B57]/40 hover:border-[#D49B28]/60 rounded-xl shadow-md overflow-hidden backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <strong className="text-2xl sm:text-3xl font-serif text-[#D49B28] block tracking-wider drop-shadow-xs">Decades</strong>
                  <span className="text-[10px] text-cream/75 uppercase tracking-wider mt-1.5 block font-semibold">Property Legacy</span>
                </div>

                {/* Stat Tile 3 */}
                <div className="relative p-5 bg-gradient-to-b from-white/12 to-white/5 border border-[#1E8B57]/40 hover:border-[#D49B28]/60 rounded-xl shadow-md overflow-hidden backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 col-span-2 sm:col-span-1">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <strong className="text-2xl sm:text-3xl font-serif text-[#D49B28] block tracking-wider drop-shadow-xs">Hundreds</strong>
                  <span className="text-[10px] text-cream/75 uppercase tracking-wider mt-1.5 block font-semibold">Satisfied Owners</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 9. TESTIMONIALS (Google Reviews) */}
      <section id="testimonials" className="py-16 sm:py-20 bg-[#EFEEEA] scroll-mt-16 relative overflow-hidden">
        {/* Soft radial background warmth */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#D49B28]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
              What People Are Saying
            </h2>
            <div className="flex items-center justify-center space-x-1.5 mt-3.5">
              <span className="bg-gradient-to-r from-[#FAF6EE] via-[#F2E8D5] to-[#FAF6EE] text-[#8E6310] px-4 py-1.5 rounded-full border border-[#D49B28]/60 shadow-[inset_0_1px_3px_rgba(212,155,40,0.15)] text-xs font-extrabold tracking-wide inline-flex items-center gap-1.5">
                5.0 ★★★★★ (6 Google Reviews)
              </span>
            </div>
            <p className="text-sm text-clay/75 mt-3 max-w-lg mx-auto">
              Verified customer feedback from our official Google Business listing for Sameera Urban Nest.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            
            {/* T1 */}
            <div className="relative bg-white p-7 sm:p-8 rounded-2xl border-t-4 border-t-[#D49B28] border-r border-b border-l border-[#D49B28]/30 shadow-[0_8px_30px_rgba(212,155,40,0.14)] hover:shadow-[0_16px_40px_rgba(212,155,40,0.25)] hover:border-[#D49B28]/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
              <div>
                <span className="text-5xl text-[#D49B28]/70 font-serif leading-none select-none block -mt-2 -ml-1 mb-1 font-bold">“</span>
                <p className="text-xs sm:text-sm text-clay/85 italic leading-relaxed">
                  Excellent connectivity. Calm place to live a happy life.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#D49B28]/20 flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FAF6EE] via-[#F2E8D5] to-[#E5D7B3] border border-[#D49B28]/50 flex items-center justify-center text-[#0E3B2E] font-extrabold text-xs uppercase shadow-xs flex-shrink-0">
                  SP
                </div>
                <div>
                  <h4 className="font-sans font-bold text-clay text-xs">Srinivasan P</h4>
                  <p className="text-[10px] text-clay/60">Google Review</p>
                </div>
              </div>
            </div>

            {/* T2 */}
            <div className="relative bg-white p-7 sm:p-8 rounded-2xl border-t-4 border-t-[#D49B28] border-r border-b border-l border-[#D49B28]/30 shadow-[0_8px_30px_rgba(212,155,40,0.14)] hover:shadow-[0_16px_40px_rgba(212,155,40,0.25)] hover:border-[#D49B28]/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
              <div>
                <span className="text-5xl text-[#D49B28]/70 font-serif leading-none select-none block -mt-2 -ml-1 mb-1 font-bold">“</span>
                <p className="text-xs sm:text-sm text-clay/85 italic leading-relaxed">
                  Beautiful natural surroundings, 20 feet deep ground water, near schools and colleges — excellent project.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#D49B28]/20 flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FAF6EE] via-[#F2E8D5] to-[#E5D7B3] border border-[#D49B28]/50 flex items-center justify-center text-[#0E3B2E] font-extrabold text-xs uppercase shadow-xs flex-shrink-0">
                  MS
                </div>
                <div>
                  <h4 className="font-sans font-bold text-clay text-xs">Mogana Siva</h4>
                  <p className="text-[10px] text-clay/60">Google Review</p>
                </div>
              </div>
            </div>

            {/* T3 */}
            <div className="relative bg-white p-7 sm:p-8 rounded-2xl border-t-4 border-t-[#D49B28] border-r border-b border-l border-[#D49B28]/30 shadow-[0_8px_30px_rgba(212,155,40,0.14)] hover:shadow-[0_16px_40px_rgba(212,155,40,0.25)] hover:border-[#D49B28]/60 transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group">
              <div>
                <span className="text-5xl text-[#D49B28]/70 font-serif leading-none select-none block -mt-2 -ml-1 mb-1 font-bold">“</span>
                <p className="text-xs sm:text-sm text-clay/85 italic leading-relaxed">
                  Best for investment, also natural surroundings.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#D49B28]/20 flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FAF6EE] via-[#F2E8D5] to-[#E5D7B3] border border-[#D49B28]/50 flex items-center justify-center text-[#0E3B2E] font-extrabold text-xs uppercase shadow-xs flex-shrink-0">
                  GT
                </div>
                <div>
                  <h4 className="font-sans font-bold text-clay text-xs">Guru Tech</h4>
                  <p className="text-[10px] text-clay/60">Google Review · Local Guide</p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <a 
              href="https://www.google.com/maps/place/Sameera+Urban+Nest/@12.7438797,79.9501008,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52fb005de1466d:0x2551ea38bbd2a4a8!8m2!3d12.7438797!4d79.9501008!16s%2Fg%2F11x0fz794c"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0E472C] hover:text-[#1E8449] bg-gradient-to-r from-[#FAF6EE] via-[#F2E8D5] to-[#FAF6EE] hover:from-[#F2E8D5] hover:to-[#E5D7B3] border border-[#D49B28]/60 py-3.5 px-7 rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              <span>Read all our reviews on Google</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
          </div>

        </div>
      </section>

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 10. FAQ SECTION */}
      <FAQSection />

      <div className="border-t border-antique-gold/20 max-w-7xl mx-auto"></div>

      {/* 11. FINAL CTA / LEAD FORM (Scroll Target) */}
      <section className="py-16 sm:py-20 bg-[linear-gradient(135deg,#135C3A_0%,#0E472C_100%)] text-white relative overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#FAF8F5_1px,transparent_1px),linear-gradient(to_bottom,#FAF8F5_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="inline-block text-xs uppercase tracking-widest text-[#D49B28] font-bold bg-white/10 px-4 py-1.5 rounded-full border border-[#D49B28]/35 backdrop-blur-xs">
                Limited Availability
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Secure Your Family’s Financial Anchor Today
              </h2>
              
              <p className="text-xs sm:text-sm text-cream/90 leading-relaxed max-w-lg">
                Phase I at Sameera Urban Nest is selling quickly. Booking a site visit is completely free, carries zero obligation, and includes a private air-conditioned cab that picks you up directly from your doorstep and drops you back safely.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/15">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D49B28] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider">Free AC Cab Transit Included</h4>
                    <p className="text-[11px] text-cream/70">Door-to-door pick-up and drop-off anywhere in Chennai.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D49B28] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider">On-site Surveyor Support</h4>
                    <p className="text-[11px] text-cream/70">Compare plot dimension blueprint drawings directly on the soil.</p>
                  </div>
                </div>
              </div>

              {/* Direct Quick Dial */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <a 
                  href="tel:+919851998519" 
                  className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Phone className="w-4 h-4 text-[#D49B28]" />
                  <span>Call Executive: +91 98519 98519</span>
                </a>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-6 w-full text-clay">
              <LeadForm variant="footer" />
            </div>

          </div>
        </div>
      </section>


      {/* 12. FOOTER */}
      <footer className="bg-[linear-gradient(135deg,#135C3A_0%,#0E472C_100%)] text-white pt-8 pb-8 sm:pt-10 sm:pb-10 border-t border-[#D49B28]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Links & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 mb-6 sm:mb-8">
            
            {/* Logo Brand Info */}
            <div className="md:col-span-5 space-y-3.5 text-left">
              <div className="inline-flex items-center gap-2 sm:gap-4 select-none">
                <div className="inline-flex items-center justify-center bg-white px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-[#D49B28]/25 shadow-sm">
                  <img 
                    src="https://i.ibb.co/mCy5sfpR/Praedia-Logo.png" 
                    alt="Praedia Promoters Logo" 
                    referrerPolicy="no-referrer"
                    className="h-8 sm:h-10 w-auto object-contain select-none"
                  />
                </div>
                <div className="h-6 sm:h-8 w-px bg-white/20 self-center" />
                <div className="inline-flex items-center justify-center bg-white px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-[#D49B28]/25 shadow-sm">
                  <SameeraLogo className="!h-8 sm:!h-10" />
                </div>
              </div>

              <p className="text-xs text-cream/80 max-w-sm leading-relaxed">
                Premium DTCP &amp; RERA approved gated residential plotted development located at Athur, Chengalpattu, South Chennai, Tamil Nadu. Marketed exclusively by Praedia Promoters Private Limited.
              </p>

              <div className="text-xs text-cream/60 space-y-1 pt-2 border-t border-white/10 leading-snug">
                <p><strong className="text-cream/80 font-semibold">Office Address:</strong> Praedia Promoters Private Limited, F-193, 1st St, Block F, Annanagar East, Chennai, Greater Chennai, Tamil Nadu 600102</p>
                <p><strong className="text-cream/80 font-semibold">Developer:</strong> Sameeraa Foundations Private Limited, Chennai.</p>
              </div>
            </div>

            {/* Quick Actions column */}
            <div className="md:col-span-4 space-y-3.5 text-left">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#D49B28]">
                Direct Touch Channels
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a 
                    href="tel:+919851998519"
                    className="footer-direct-link inline-flex items-center space-x-2.5 text-xs text-cream/90 hover:text-[#D49B28] active:text-[#D49B28] focus:text-[#D49B28] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#D49B28]" />
                    <span>Call Sales: +91 98519 98519 (Click to Call)</span>
                  </a>
                </li>
                <li>
                  <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-direct-link inline-flex items-center space-x-2.5 text-xs text-cream/90 hover:text-[#D49B28] active:text-[#D49B28] focus:text-[#D49B28] transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#D49B28] fill-current" />
                    <span>WhatsApp: +91 98519 98519 (Click to Chat)</span>
                  </a>
                </li>
                <li>
                  <a 
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-direct-link inline-flex items-center space-x-2.5 text-xs text-cream/90 hover:text-[#D49B28] active:text-[#D49B28] focus:text-[#D49B28] transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#D49B28]" />
                    <span>Site Location: Athur, Chengalpattu (Google Maps)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick CTAs */}
            <div className="md:col-span-3 space-y-3.5 text-left">
              <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#D49B28]">
                Layout Resources
              </h4>
              <div className="flex flex-col space-y-2.5">
                <a 
                  href="#lead-form-container"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof (window as any).triggerBrochureFlow === "function") {
                      (window as any).triggerBrochureFlow(e);
                    }
                  }}
                  className="inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green text-white text-xs font-bold py-3 px-4 rounded-xl border border-[#D49B28]/30 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Download className="w-3.5 h-3.5 text-white" />
                  <span>Download Booklet</span>
                </a>
                
                <a 
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green text-white text-xs font-bold py-3 px-4 rounded-xl border border-[#D49B28]/30 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-white" />
                  <span>Get Driving Route</span>
                </a>
              </div>
            </div>

          </div>

          {/* CRITICAL RERA PROMOTE RELATIONSHIP LEGAL NOTE - EXACT WORDING MANDATE */}
          <div className="border-t border-[#D49B28]/40 pt-6 mt-6 sm:pt-8 sm:mt-8 text-center md:text-left relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#F0D264]/50 to-transparent pointer-events-none" />
            <p className="text-[10px] sm:text-[11px] text-cream/85 font-normal leading-relaxed max-w-4xl italic tracking-wide mb-4">
              "Marketed by Praedia Promoters Private Limited. Developed by Sameeraa Foundations Private Limited. RERA Regn. No: TN/35/Layout/1382/2025. Visit rera.tn.gov.in for project details. Prices, plot sizes, and availability are indicative and subject to change without prior notice."
            </p>
            
            {/* Copyright block */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] text-cream/45 gap-3 font-medium">
              <p>© {new Date().getFullYear()} Praedia Promoters Private Limited. All Rights Reserved.</p>
              <div className="flex space-x-4">
                <span className="hover:text-bright-green transition-colors cursor-pointer">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-bright-green transition-colors cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />

    </div>
  );
}

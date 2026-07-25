import React, { useState, useEffect } from "react";
import { PROJECT_AMENITIES } from "../data";
import LucideIcon from "./LucideIcon";
import { Download, Eye, ZoomIn, FileText, Check } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    src: "https://i.ibb.co/JwWjLRLy/Sameera-Urban-Nest-1.png",
    alt: "Finished internal road at Sameera Urban Nest, Athur, Chengalpattu",
    caption: "Finished internal road lined with palm trees."
  },
  {
    src: "https://i.ibb.co/9kcFCMMW/Sameera-Urban-Nest-2.png",
    alt: "Layout road with security cabin and green plotted land at Sameera Urban Nest, Athur, Chengalpattu",
    caption: "Layout road with security cabin & green plots."
  },
  {
    src: "https://i.ibb.co/vCGbfTFc/Sameera-Urban-Nest-3.png",
    alt: "Active on-site construction showing curb-stoning, numbered plot pegs, and concrete works at Sameera Urban Nest, Athur, Chengalpattu",
    caption: "Active on-site progress with concrete curbing."
  }
];

export default function LayoutAmenities() {
  const [showBlueprintZoom, setShowBlueprintZoom] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const brochureUrl = "https://drive.google.com/file/d/1YxB3N4QX-ry3-t-mAwGTFwEBXmqTF_4n/view?usp=drive_link";

  return (
    <div id="layout-amenities" className="scroll-mt-16">
      {/* 1. MASTER PLAN & STANDARD INFRASTRUCTURE (White Background) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="w-full mb-12 space-y-6">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
                Development Layout
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
                Master Plan &amp; Standard Infrastructure Elements
              </h2>
              <p className="text-charcoal/80 mt-4 leading-relaxed text-base">
                Sameera Urban Nest is fully plotted with clear boundaries, heavy-duty asphalt roads, concrete storm-water canals, and streetlights—all engineered to premium municipal development standards.
              </p>
            </div>
            
            {/* Credibility & Action Strip */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold text-brand-green pt-2">
              <span className="bg-[#FAF8F5] text-[#0E3B2E] px-4 py-2.5 rounded-full border border-[#D49B28]/35 shadow-xs flex items-center gap-1.5">
                DTCP Lay-out Approved
              </span>
              <span className="bg-[#FAF8F5] text-[#0E3B2E] px-4 py-2.5 rounded-full border border-[#D49B28]/35 shadow-xs flex items-center gap-1.5">
                RERA No: TN/35/Layout/1382/2025
              </span>
              <a
                href="#lead-form-container"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof (window as any).triggerBrochureFlow === "function") {
                    (window as any).triggerBrochureFlow(e);
                  }
                }}
                className="inline-flex items-center justify-center space-x-3 bg-brand-green hover:bg-bright-green text-white font-bold py-3 px-6 sm:py-3.5 sm:px-7 rounded-xl transition-all duration-200 ease-out text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-[#D49B28]/30"
              >
                <Download className="w-5 h-5" />
                <span>Download Master Brochure (PDF)</span>
              </a>
            </div>
          </div>

          {/* Master Plan Blueprint Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Visual Left Side: Auto-rotating Photo Carousel */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Photo Carousel Container with soft framed photo border & shadow */}
              <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-xl">
                <div 
                  className="relative overflow-hidden rounded-xl aspect-[16/10] bg-warm-cream group cursor-pointer shadow-inner"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onTouchStart={() => setIsHovered(true)}
                  onTouchEnd={() => setIsHovered(false)}
                >
                  {CAROUSEL_IMAGES.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover filter saturate-[0.85] contrast-[1.05] sepia-[15%] brightness-[0.95]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Caption & Navigation Dots */}
              <div className="flex flex-col items-center space-y-2 pt-2">
                {/* Navigation dots */}
                <div className="flex items-center space-x-2">
                  {CAROUSEL_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentIndex 
                          ? "bg-brand-green w-6" 
                          : "bg-brand-green/25 hover:bg-brand-green/50 w-2.5"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Caption updating as the slide changes */}
                <p className="text-xs font-sans font-semibold text-charcoal/80 text-center italic min-h-[16px] leading-relaxed px-4">
                  {CAROUSEL_IMAGES[currentIndex].caption}
                </p>
              </div>

            </div>

            {/* Right Side Description */}
            <div className="lg:col-span-5 lg:space-y-10 space-y-5 lg:pt-0">
              <h3 className="text-3xl font-serif font-bold leading-tight" style={{ color: '#1E8449' }}>
                A Highly Engineered, Gated Enclave Layout
              </h3>
              
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Every plot at Sameera Urban Nest is precisely demarcated with physical milestones and accessible from standard tar-top service roads. Underground channels carry municipal rainwater runoff efficiently to regional discharge basins, protecting the entire property from surface flooding.
              </p>

              <ul className="lg:space-y-4 space-y-3">
                <li className="flex items-start space-x-3 text-sm text-charcoal">
                  <div className="w-4 h-4 rounded-full bg-[#1E8449] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span>Flexible plotted sizes from 600 sq.ft to 2,400 sq.ft</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-charcoal">
                  <div className="w-4 h-4 rounded-full bg-[#1E8449] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span>7.2m to 10m wide heavy-duty internal roads</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-charcoal">
                  <div className="w-4 h-4 rounded-full bg-[#1E8449] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span>Individual ready-to-draw electrical connections (EB)</span>
                </li>
                <li className="flex items-start space-x-3 text-sm text-charcoal">
                  <div className="w-4 h-4 rounded-full bg-[#1E8449] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </div>
                  <span>Sweet ground water table verified across all layout zones</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ELITE INFRASTRUCTURE FEATURES (Warm Cream Background) */}
      <section className="py-16 sm:py-20 bg-warm-cream border-t border-brand-green/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-serif font-bold text-center mb-12" style={{ color: '#1E8449' }}>
            Elite Infrastructure Features Built For Generations
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {PROJECT_AMENITIES.map((amenity) => (
              <div 
                key={amenity.id} 
                className="group bg-gradient-to-b from-white to-[#FAF8F5] p-5 sm:p-6 rounded-2xl border-t-2 border-t-[#D49B28] border-r border-b border-l border-[#D49B28]/25 shadow-sm hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#D49B28]/50 text-center flex flex-col items-center justify-start"
              >
                <div className="w-12 h-12 bg-[#D49B28]/12 rounded-full flex items-center justify-center mb-3 border border-[#D49B28]/30 group-hover:bg-[#D49B28]/22 group-hover:border-[#D49B28]/60 transition-all duration-200 shadow-xs flex-shrink-0">
                  <LucideIcon name={amenity.iconName} className="text-[#B88014]" size={22} />
                </div>
                <h4 className="font-sans font-bold text-charcoal text-sm mb-1 leading-snug">{amenity.name}</h4>
                <p className="text-[11px] text-charcoal/75 leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE ZOOM BLUEPRINT MODAL */}
      {showBlueprintZoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-10 animate-fade-in animate-duration-200">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-brand-green rounded-xl overflow-hidden p-6 shadow-2xl">
            <button 
              onClick={() => setShowBlueprintZoom(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors cursor-pointer"
            >
              <LucideIcon name="X" size={20} />
            </button>
            
            <div className="text-center text-white mb-6">
              <h3 className="text-2xl font-serif text-bright-green font-bold">Sameera Urban Nest - Layout Draft Plan</h3>
              <p className="text-xs text-cream/70 mt-1">Scale Drawing - DTCP Layout Registration Ref: TN/35/Layout/1382/2025</p>
            </div>

            <div className="bg-slate-950 border border-brand-green/20 rounded-lg p-6 sm:p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
              {/* Virtual Scale Vector Blueprint */}
              <div className="w-full max-w-2xl bg-slate-900/50 rounded-lg border border-brand-green/20 p-6 flex flex-col items-center">
                <span className="text-[10px] tracking-wider text-bright-green uppercase mb-4">ENGINEERING SCALE DRAWING VIEW</span>
                
                {/* Dynamic Plot Matrix with Roads */}
                <div className="grid grid-cols-4 gap-4 w-full text-xs font-mono text-bright-green/80">
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 01</p>
                    <p className="text-[10px] text-white/50 mt-1">1200 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 02</p>
                    <p className="text-[10px] text-white/50 mt-1">1200 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 03</p>
                    <p className="text-[10px] text-white/50 mt-1">1500 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 04</p>
                    <p className="text-[10px] text-white/50 mt-1">2400 Sq.Ft</p>
                  </div>
                  
                  <div className="col-span-4 py-3 bg-deep-green border-y border-brand-green/40 text-center font-sans font-bold text-[10px] tracking-widest text-white">
                    ⚓ MAIN INTERNAL TAR-TOP DRIVEWAY (40 FEET ROAD) ⚓
                  </div>

                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 05</p>
                    <p className="text-[10px] text-white/50 mt-1">600 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 06</p>
                    <p className="text-[10px] text-white/50 mt-1">800 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 07</p>
                    <p className="text-[10px] text-white/50 mt-1">1000 Sq.Ft</p>
                  </div>
                  <div className="border border-brand-green/30 p-4 bg-slate-950/50 rounded text-center">
                    <p className="font-bold">PLOT 08</p>
                    <p className="text-[10px] text-white/50 mt-1">1000 Sq.Ft</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-cream/50 mt-6 max-w-lg leading-relaxed">
                This diagram is simulated for review of the approved layout structure. The finalized surveyor-approved drawing is included in the master booklet.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs text-bright-green font-semibold">Ready for review? Download full legal package</span>
              <a
                href="#lead-form-container"
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof (window as any).triggerBrochureFlow === "function") {
                    (window as any).triggerBrochureFlow(e);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green text-white font-bold py-2.5 px-5 rounded-lg transition-colors text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Brochure Bundle</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

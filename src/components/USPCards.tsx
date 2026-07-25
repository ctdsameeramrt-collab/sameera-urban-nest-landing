import React from "react";
import { PROJECT_USPS } from "../data";
import LucideIcon from "./LucideIcon";
import { ShieldCheck } from "lucide-react";

export default function USPCards() {
  return (
    <section id="key-usps" className="py-16 sm:py-20 bg-warm-cream scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
            The Sameera Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
            Why Discerning Chennai Families Trust Sameera Urban Nest
          </h2>
          <p className="text-charcoal/80 mt-4 leading-relaxed max-w-2xl">
            A real estate asset is only as valuable as its legal safety and infrastructure. We don’t compromise. We build gated communities designed to appreciate across generations.
          </p>
        </div>

        {/* USP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PROJECT_USPS.map((usp, index) => {
            const isFirst = index === 0; // "Uncompromising Legal Safety"
            const isGreenTheme = index % 2 === 0;
            const themeColor = isGreenTheme ? "#1E8449" : "#B88014";
            const themeBorderClass = isGreenTheme ? "border-t-[#1E8449]" : "border-t-[#D49B28]";

            return (
              <div 
                key={usp.id}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white transition-all duration-300 ease-out hover:-translate-y-1.5 overflow-hidden ${
                  isFirst
                    ? "border-t-4 border-t-[#1E8449] border-r border-b border-l border-[#1E8449]/35 lg:scale-[1.03] shadow-[0_8px_30px_rgba(30,132,73,0.15)] hover:shadow-[0_16px_40px_rgba(30,132,73,0.22)] z-10"
                    : `border-t-4 ${themeBorderClass} border-r border-b border-l border-[#D49B28]/25 shadow-md hover:shadow-xl`
                }`}
              >
                {/* Subtle accent glow line below top border */}
                <div 
                  className={`absolute top-0 inset-x-0 h-1 pointer-events-none opacity-60 ${
                    isGreenTheme 
                      ? "bg-gradient-to-r from-transparent via-[#1E8449]/40 to-transparent" 
                      : "bg-gradient-to-r from-transparent via-[#D49B28]/50 to-transparent"
                  }`} 
                />

                <div>
                  {/* Colored gradient circular badge background */}
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-sm border ${
                      isGreenTheme
                        ? "bg-gradient-to-br from-[#1E8449] via-[#166A3A] to-[#0E3B2E] border-[#1E8449]/30"
                        : "bg-gradient-to-br from-[#D49B28] via-[#C9971E] to-[#B88014] border-[#F0D264]/40"
                    }`}
                  >
                    <LucideIcon name={usp.iconName} className="text-white" size={22} />
                  </div>

                  {/* Small heading label (Subtitle) with matching accent color */}
                  <span 
                    className="text-[10px] uppercase font-bold tracking-wider block"
                    style={{ color: themeColor }}
                  >
                    {usp.subtitle}
                  </span>

                  {/* Heading */}
                  <h3 className="text-xl font-serif font-bold mt-2 mb-4 leading-tight text-[#0E3B2E]">
                    {usp.title}
                  </h3>

                  {/* Body description text */}
                  <p className="text-sm leading-relaxed text-charcoal/80">
                    {usp.description}
                  </p>
                </div>

                {/* Bottom line with extra top spacing */}
                <div className="mt-10 pt-4 border-t border-[#D49B28]/20 flex items-center justify-between">
                  <span 
                    className="text-[10px] uppercase tracking-wider font-bold"
                    style={{ color: themeColor }}
                  >
                    Fully Verified Asset
                  </span>
                  <span className="text-xs font-serif italic text-charcoal/40 font-medium select-none">
                    0{index + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small trust banner under USP cards */}
        <div className="mt-16 bg-[#FFF9E6] border-[1.5px] border-[#A9C9AF] rounded-2xl p-6 sm:p-8 pl-8 sm:pl-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.05)] transition-all duration-300 relative overflow-hidden">
          {/* Green left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#1B5E3C]" />

          {/* Subtle background decorative watermark icon */}
          <ShieldCheck className="absolute -right-5 -bottom-6 w-36 h-36 text-[#D49B28]/15 pointer-events-none transform -rotate-12 select-none" />

          <div className="text-center md:text-left relative z-10">
            <h4 className="text-xl font-serif font-bold text-[#0E3B2E]">Need verification on title clearings?</h4>
            <p className="text-xs text-charcoal/80 mt-1 max-w-xl font-medium">
              We carry 30+ years of legal parent document trails and DTCP drawings. Every document is open for immediate scrutiny with your legal advisors.
            </p>
          </div>
          <a
            href="#lead-form-container"
            onClick={(e) => {
              e.preventDefault();
              if (typeof (window as any).triggerFormFlow === "function") {
                (window as any).triggerFormFlow(e, false);
              } else {
                const element = document.getElementById("lead-form-container");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }
            }}
            className="group inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#0E472C] hover:text-[#1E8449] border-b-2 border-[#D49B28]/80 hover:border-[#D49B28] pb-0.5 transition-all duration-200 relative z-10 flex-shrink-0"
          >
            <span>Request Legal Documents Copy</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

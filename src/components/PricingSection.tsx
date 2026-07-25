import React from "react";
import { PRICING_PLANS } from "../data";
import { BadgePercent, Check, Info } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function PricingSection() {
  const whatsappUrl = "https://wa.me/919851998519?text=Hi%20Team%20Sameera%20Urban%20Nest%2C%20I%20am%20interested%20in%20your%20project.%20Please%20share%20the%20brochure%2C%20pricing%2C%20floor%20plans%2C%20and%20site%20visit%20details.";

  return (
    <section id="pricing" className="py-16 sm:py-20 bg-[#EFEEEA] border-y border-brand-green/10 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
            Investment &amp; Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
            Transparent Pricing Built for Long-Term Value
          </h2>
          <p className="text-sm text-charcoal/80 mt-3 leading-relaxed">
            Acquire fully-developed gated land assets starting from <strong className="text-[#B88014] font-bold">₹1,400 per sq.ft*</strong>. Pick a sizing that matches your family’s budget or multi-generational layout plans.
          </p>
        </div>

        {/* Pricing Comparison Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-white rounded-2xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1.5 ${
                plan.id === "family" 
                  ? "border-2 border-[#D49B28] md:scale-[1.03] shadow-[0_8px_30px_rgba(212,155,40,0.18)] hover:shadow-[0_12px_40px_rgba(212,155,40,0.28)] relative overflow-hidden z-10" 
                  : "border border-[#D49B28]/30 shadow-md hover:shadow-xl"
              }`}
            >
              {plan.id === "family" && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D49B28] via-[#C9971E] to-[#B88014] text-white text-[10px] uppercase tracking-wider font-extrabold py-1 px-4 rounded-bl-xl border-b border-l border-[#F0D264]/50 shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <span className="text-xs font-bold text-[#1E8449] uppercase tracking-wider block mb-1">
                  {plan.sizeRange} Range
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0E3B2E] leading-tight mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                  {plan.bestFor}
                </p>

                {/* Main Price Announcement Panel */}
                <div className="bg-[linear-gradient(135deg,#FEFCE8_0%,#FEF08A_50%,#FFF9E6_100%)] p-4 sm:p-5 rounded-xl border border-[#D49B28]/50 shadow-xs mb-6">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-charcoal/70">
                    Est. Plot Value Starts From
                  </div>
                  <div className="text-2xl sm:text-3xl font-sans font-bold text-[#B88014] tabular-nums tracking-tight whitespace-nowrap mt-1">
                    {plan.priceStart}
                  </div>
                  <div className="text-[10px] text-muted-sage italic mt-1 font-sans">
                    *Tied to plot dimension base rate
                  </div>
                </div>

                {/* Sizing Details */}
                <div className="space-y-3.5 mb-8">
                  {plan.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#1E8449] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                      <span className="text-xs text-charcoal/85 leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  plan.id === "family"
                    ? "bg-brand-green hover:bg-bright-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_16px_rgba(212,155,40,0.45)] text-white focus:text-white active:text-white shadow-md"
                    : "bg-gradient-to-b from-white to-[#FAF6EE] text-[#0E472C] border border-[#D49B28]/45 shadow-xs hover:from-[#FAF6EE] hover:to-[#F2E8D5] hover:text-[#0E472C] hover:border-[#D49B28]/80 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#D49B28]/50 focus:from-[#FAF6EE] focus:to-[#F2E8D5] focus:text-[#0E472C] active:from-[#F2E8D5] active:to-[#E5D7B3] active:text-[#0E472C] active:border-[#D49B28]"
                }`}
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>Enquire Sizing</span>
              </a>
            </div>
          ))}
        </div>

        {/* Big Conversion Banner Directly Below Strip */}
        <div className="mt-12 max-w-3xl mx-auto text-center bg-[linear-gradient(135deg,#135C3A_0%,#0E472C_100%)] p-8 rounded-2xl border border-[#D49B28]/35 shadow-xl text-white">
          <BadgePercent className="w-10 h-10 text-[#D49B28] mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Want to review the complete block-by-block Price Sheet?
          </h3>
          <p className="text-xs text-cream/80 max-w-lg mx-auto mb-6 leading-relaxed">
            Get the full plot layout drawing, price list, registration breakdown, and active bank loan interest rates sent straight to your mobile.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#D49B28] via-[#C9971E] to-[#B88014] hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 text-sm shadow-[0_4px_16px_rgba(212,155,40,0.3)] hover:shadow-[0_6px_22px_rgba(212,155,40,0.45)] cursor-pointer hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-5 h-5 fill-current" />
            <span>Get the Full Price List on WhatsApp</span>
          </a>

          <p className="text-[10px] text-cream/60 mt-4 flex items-center justify-center space-x-1">
            <Info className="w-3 h-3 text-[#D49B28]" />
            <span>Low friction, instant response. No form filling required.</span>
          </p>
        </div>

        {/* Footnote disclaimer */}
        <p className="text-[10px] text-center text-charcoal/60 italic mt-8 max-w-2xl mx-auto leading-relaxed">
          *Indicative pricing is based on a base cost of ₹1,400 per sq.ft. Individual plot values vary depending on orientation, corner premiums, and registered sizing. Standard statutory RERA fees and registration duties are calculated separately at closing.
        </p>

      </div>
    </section>
  );
}


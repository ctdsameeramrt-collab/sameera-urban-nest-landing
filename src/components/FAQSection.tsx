import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first one

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]">
            Clear Clarifications
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
            Frequently Answered Questions
          </h2>
          <p className="text-sm text-charcoal/75 mt-2">
            Clear, transparent details on registration, development status, and legal ownership.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id}
                className={`bg-[#FAF8F5] rounded-2xl border transition-all duration-200 overflow-hidden shadow-md hover:shadow-lg ${
                  isOpen 
                    ? "border-[#D49B28]/50 ring-1 ring-[#D49B28]/30" 
                    : "border-[#D49B28]/25 hover:border-[#D49B28]/40"
                }`}
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleIndex(index)}
                  className={`w-full text-left p-5 sm:p-6 flex items-start justify-between space-x-4 cursor-pointer focus:outline-none transition-colors duration-200 ${
                    isOpen ? "bg-[#FAF6EE]" : "hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-start space-x-3.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#D49B28]/15 border border-[#D49B28]/30 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      <HelpCircle className="w-4 h-4 text-[#B88014]" />
                    </div>
                    <span className="font-sans font-bold text-charcoal text-sm sm:text-base leading-snug pt-1">
                      {faq.question}
                    </span>
                  </div>
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#D49B28]/15 border border-[#D49B28]/30 flex items-center justify-center text-[#B88014] mt-0.5 transition-transform duration-200 ease-out ${
                    isOpen ? "rotate-180 bg-[#D49B28]/25" : "rotate-0"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Answer Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 border-t border-[#D49B28]/20" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="p-5 sm:p-6 text-xs sm:text-sm text-charcoal/80 leading-relaxed bg-white/80">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Strip */}
        <div className="mt-14 text-center p-8 sm:p-10 bg-[#FFF9E6] rounded-2xl border-[1.5px] border-[#A9C9AF] shadow-[0_2px_8px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.05)] max-w-2xl mx-auto relative overflow-hidden">
          {/* Green left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#1B5E3C]" />
          <p className="text-xs sm:text-sm text-charcoal/85 font-semibold leading-relaxed">
            Have a different regulatory or structural question? Speak directly with our lead planner.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <a 
              href="tel:+919851998519" 
              className="inline-flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0E472C] via-[#135C3A] to-[#0E472C] hover:brightness-110 py-3.5 px-6 rounded-xl border border-[#0E3B2E] shadow-[0_4px_14px_rgba(14,59,46,0.25)] hover:shadow-[0_6px_20px_rgba(14,59,46,0.38)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call +91 98519 98519</span>
            </a>
            <a 
              href="https://wa.me/919851998519?text=Hi%20Team%20Sameera%20Urban%20Nest%2C%20I%20have%20some%20questions%20regarding%20the%20RERA%20clearance%20documents.%20Please%20connect%20me%20with%20a%20legal%20specialist."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#0E472C] via-[#135C3A] to-[#0E472C] hover:brightness-110 py-3.5 px-6 rounded-xl border border-[#0E3B2E] shadow-[0_4px_14px_rgba(14,59,46,0.25)] hover:shadow-[0_6px_20px_rgba(14,59,46,0.38)] transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


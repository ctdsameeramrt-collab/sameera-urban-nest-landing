import React, { useState, useEffect } from "react";
import { Phone, Calendar } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export default function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show action bar after scrolling down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const whatsappUrl = "https://wa.me/919851998519?text=Hi%20Team%20Sameera%20Urban%20Nest%2C%20I%20am%20interested%20in%20your%20project.%20Please%20share%20the%20brochure%2C%20pricing%2C%20floor%20plans%2C%20and%20site%20visit%20details.";

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof (window as any).triggerFormFlow === "function") {
      (window as any).triggerFormFlow(e, false);
    } else {
      const element = document.getElementById("lead-form-container");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-brand-green/20 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-all duration-300 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="grid grid-cols-3 divide-x divide-brand-green/15 text-center h-14">
        
        {/* Click-to-Call */}
        <a 
          href="tel:+919851998519"
          className="flex flex-col items-center justify-center space-y-1 bg-brand-green hover:bg-bright-green text-white transition-colors font-sans"
        >
          <Phone className="w-4 h-4 text-white" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Call Now</span>
        </a>

        {/* Click-to-WhatsApp */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center space-y-1 bg-bright-green hover:bg-brand-green text-white transition-colors font-sans"
        >
          <WhatsAppIcon className="w-4 h-4 text-white" />
          <span className="text-[10px] uppercase font-bold tracking-wider">WhatsApp</span>
        </a>

        {/* Scroll-to-Form */}
        <a 
          href="#lead-form-container"
          onClick={scrollToForm}
          className="flex flex-col items-center justify-center space-y-1 bg-brand-green hover:bg-bright-green text-white transition-colors font-sans"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-[10px] uppercase font-bold tracking-wider text-white">Book Visit</span>
        </a>

      </div>
    </div>
  );
}

import React from "react";
import { MapPin, Navigation, Clock, School, HeartPulse, Train } from "lucide-react";

export default function MapSection() {
  const connectivityHighlights = [
    {
      label: "Chengalpattu Junction",
      time: "~10 Mins",
      detail: "Major express rail connectivity connecting south Tamil Nadu & Chennai Central.",
      icon: Train,
    },
    {
      label: "Mahindra World City",
      time: "~10 Mins",
      detail: "Massive IT & Industrial SEZ housing Infosys, BMW, Renault, and 100+ global giants.",
      icon: Clock,
    },
    {
      label: "GST Road Corridor",
      time: "~5 Mins",
      detail: "Direct connectivity to South Chennai's key commercial high-growth expressway.",
      icon: Navigation,
    },
    {
      label: "Parandur Airport (Upcoming)",
      time: "~45 Mins",
      detail: "Seamless connectivity to the massive second airport corridor of Chennai.",
      icon: Navigation,
    },
    {
      label: "Kanchipuram Highway",
      time: "~5 Mins",
      detail: "Easy bypass connection linking Kanchipuram, Oragadam, and industrial hubs.",
      icon: MapPin,
    },
  ];

  const nearbyHubs = [
    {
      category: "Education Hub",
      items: ["Reputed CBSE & Matriculation Schools", "Chengalpattu Medical College", "Vidya Mandir School Est. nearby"],
      icon: School,
    },
    {
      category: "Healthcare Infrastructure",
      items: ["Chengalpattu Government General Hospital", "JS Hospital", "Established multi-specialty clinics"],
      icon: HeartPulse,
    },
  ];

  return (
    <section id="location-advantages" className="py-16 sm:py-20 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span 
            className="inline-block text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full border border-[#D49B28]/60 text-[#8E6310] bg-[#FAF6EE] shadow-[inset_0_1px_3px_rgba(212,155,40,0.12)]"
          >
            Strategic Address
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mt-4 leading-[1.25] tracking-tight" style={{ color: '#1E8449' }}>
            Connect Instantly to Chennai’s Fastest Growing Industrial-IT Hub
          </h2>
          <p className="text-charcoal/80 mt-4 leading-relaxed max-w-2xl text-base">
            Located in Athur, Chengalpattu, Sameera Urban Nest is positioned directly inside the high-appreciation residential belt of GST Road, offering high rental yields and secure land ownership.
          </p>
        </div>

        {/* Dynamic Multi-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left: Connectivity Chips (Asymmetrical Layout) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif font-bold text-brand-green">
              Travel Distances &amp; Key Corridors
            </h3>
            
            <div className="space-y-4">
              {connectivityHighlights.map((chip, idx) => {
                const Icon = chip.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex items-start p-4 bg-[#FAF8F5] rounded-xl border border-[#D49B28]/25 hover:border-[#D49B28]/60 shadow-sm hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 bg-[#D49B28]/12 rounded-full flex items-center justify-center mr-4 border border-[#D49B28]/30 flex-shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 text-[#B88014]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-sans font-semibold text-charcoal text-sm">{chip.label}</h4>
                        <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded ml-2 flex-shrink-0 border border-brand-green/15">
                          {chip.time}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">{chip.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-5">
            
            {/* Subtle rounded-corner frame and soft shadow around Google Map embed */}
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl border border-[#D49B28]/30 shadow-xl">
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-warm-cream shadow-inner">
                {/* Actual Google Maps Embed Code centered on Sameera Urban Nest */}
                <iframe
                  title="Sameera Urban Nest, Athur, Chengalpattu Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.5326957967727!2d79.9501008!3d12.743879699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52fb005de1466d%3A0x2551ea38bbd2a4a8!2sSameera%20Urban%20Nest!5e0!3m2!1sen!2sin!4v1783881500540!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>

            {/* Map Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#FAF8F5] rounded-xl border border-[#D49B28]/25 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#D49B28]/15 flex items-center justify-center border border-[#D49B28]/30 flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#B88014]" />
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-charcoal text-sm">
                    <a
                      href="https://www.google.com/maps/place/Sameera+Urban+Nest/@12.7438797,79.9501008,17z/data=!3m1!4b1!4m6!3m5!1s0x3a52fb005de1466d:0x2551ea38bbd2a4a8!8m2!3d12.7438797!4d79.9501008!16s%2Fg%2F11x0fz794c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-brand-green transition-colors"
                    >
                      Sameera Urban Nest
                    </a>
                  </h4>
                  <p className="text-xs text-charcoal/60">Athur, Chengalpattu, South Chennai, Tamil Nadu</p>
                </div>
              </div>
              
              <a
                href="https://maps.app.goo.gl/nYnd9q4MREhCzSVh9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green text-white text-xs font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Get Driving Directions</span>
              </a>
            </div>

            {/* Educational/Healthcare Hubs Mini-Sections */}
            <div className="bg-[#FAF8F5] p-5 sm:p-6 rounded-xl border border-[#D49B28]/30 shadow-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D49B28]/20">
                {nearbyHubs.map((hub, idx) => {
                  const Icon = hub.icon;
                  return (
                    <div key={idx} className={`space-y-3 ${idx > 0 ? 'pt-5 sm:pt-0 sm:pl-6' : ''}`}>
                      <div className="flex items-center space-x-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#D49B28]/15 border border-[#D49B28]/30 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-[#B88014]" />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-wider font-sans text-brand-green">{hub.category}</h4>
                      </div>
                      <ul className="space-y-2">
                        {hub.items.map((item, key) => (
                          <li key={key} className="text-xs text-charcoal/80 pl-3 border-l-2 border-[#D49B28]/40 leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

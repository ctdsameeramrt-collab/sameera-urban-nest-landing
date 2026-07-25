import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Download, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setPhone("");
      setEmail("");
      setSubmitted(false);
      setError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Outside click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const validatePhone = (num: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(num);
  };

  const validateEmail = (emailStr: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailStr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/\s+/g, "").replace(/^\+91/, "");
    if (!validatePhone(cleanPhone)) {
      setError("Please enter a valid 10-digit mobile number (e.g., 9876543210).");
      return;
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim(),
      preferredVisitDate: "",
      preferredTime: "",
      source: "Brochure Request",
      formLocation: "Brochure Popup",
      pageUrl: window.location.href,
    };

    // Send the POST request in the background
    fetch("https://script.google.com/macros/s/AKfycbxbqnG1fo8l25jA3DY8ScO96S-vOI7pYOS27o1NtLkI458mRAmfZsFp_tuYt2gbC8zrEQ/exec", {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          console.warn("Google Sheet submission returned non-ok status:", response.status);
        } else {
          console.log("Google Sheet submission successful.");
        }
      })
      .catch((err) => {
        console.error("Google Sheets Submission Error:", err);
      });

    // Save to local storage for consistency
    try {
      const newLead = {
        id: "lead_" + Date.now(),
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        preferredDate: "",
        preferredTime: "",
        whatsappOptIn: true,
        timestamp: new Date().toISOString(),
        leadSource: "Brochure Request",
      };
      const existingLeadsRaw = localStorage.getItem("sameera_leads");
      const existingLeads = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      localStorage.setItem("sameera_leads", JSON.stringify([newLead, ...existingLeads]));
    } catch (err) {
      console.error("Error updating local storage:", err);
    }

    // Immediately show success state (do not block on network completion)
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const brochureLink = "https://drive.google.com/file/d/1YxB3N4QX-ry3-t-mAwGTFwEBXmqTF_4n/view?usp=drive_link";
  const whatsappLink = "https://wa.me/919851998519?text=Hi%2C%20I%20just%20requested%20the%20Sameera%20Urban%20Nest%20brochure%20from%20your%20website.%20Please%20send%20me%20the%20full%20PDF%20and%20pricing%20details.";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-[#071C16]/85 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 cursor-pointer"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-antique-gold/30 p-6 sm:p-8 pt-8 overflow-hidden text-left cursor-default"
          >
            {/* Premium Antique Gold top-edge accent strip */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-antique-gold via-antique-gold/85 to-antique-gold shadow-sm"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute right-4 top-4 text-charcoal/40 hover:text-charcoal transition-colors p-1 rounded-full hover:bg-charcoal/5 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-antique-gold font-bold bg-antique-gold/10 border border-antique-gold/30 px-2.5 py-1 rounded-full shadow-sm">
                    Brochure Request
                  </span>
                  <h3 className="text-2xl font-serif text-brand-green font-bold mt-2.5 !text-[#241C15]">
                    Download Brochure
                  </h3>
                  <p className="text-xs text-charcoal/70 mt-1">
                    Enter your details to get the brochure instantly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-warm-cream/30 text-charcoal text-sm outline-none transition-all placeholder:text-charcoal/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/50 text-sm font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98519 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-14 pr-4 py-3 rounded-lg border border-charcoal/20 focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-warm-cream/30 text-charcoal text-sm outline-none transition-all placeholder:text-charcoal/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
                      Email Address <span className="text-charcoal/40 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rajesh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-warm-cream/30 text-charcoal text-sm outline-none transition-all placeholder:text-charcoal/40"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-600 font-medium bg-red-50 border border-red-100 p-3 rounded-lg">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_12px_rgba(184,146,74,0.45)] text-white font-semibold py-3.5 px-6 rounded-lg transition-colors text-sm shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <span>Get My Brochure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-4 flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-6 border border-brand-green/30 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-brand-green" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#241C15] mb-2">
                  Thanks, {name}!
                </h3>
                <p className="text-[#241C15]/80 text-sm max-w-sm mb-6 leading-relaxed">
                  Your brochure is ready. Click below to download it instantly or view on WhatsApp.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
                  <a
                    href={brochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-brand-green hover:bg-bright-green hover:shadow-[0_0_12px_rgba(30,132,73,0.35)] text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm shadow-md text-center cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Now</span>
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] hover:shadow-[0_0_12px_rgba(37,211,102,0.35)] text-white font-semibold py-3 px-4 rounded-lg transition-all text-sm shadow-md text-center cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>Get it on WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-[#241C15]/60 max-w-xs leading-relaxed">
                  A relationship manager will also reach out shortly to help with any questions.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

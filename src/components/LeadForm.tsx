import React, { useState, useEffect } from "react";
import { LeadSubmission } from "../types";
import { Phone, Calendar, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import CustomDatePicker from "./CustomDatePicker";
import CustomTimePicker from "./CustomTimePicker";

interface LeadFormProps {
  onSuccess?: (lead: LeadSubmission) => void;
  variant?: "hero" | "footer";
}

export default function LeadForm({ onSuccess, variant = "hero" }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [leadSource, setLeadSource] = useState("Book Site Visit");

  useEffect(() => {
    const handleBrochureTrigger = () => {
      setLeadSource("Brochure Request");
    };
    const handleSiteVisitTrigger = () => {
      setLeadSource("Book Site Visit");
    };

    window.addEventListener("set-brochure-trigger", handleBrochureTrigger);
    window.addEventListener("set-sitevisit-trigger", handleSiteVisitTrigger);
    return () => {
      window.removeEventListener("set-brochure-trigger", handleBrochureTrigger);
      window.removeEventListener("set-sitevisit-trigger", handleSiteVisitTrigger);
    };
  }, []);

  const validatePhone = (num: string) => {
    // Standard Indian 10-digit phone validation starting with 6-9
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

    // Clean phone input (remove spaces, country codes if any)
    let cleanPhone = phone.replace(/\s+/g, "").replace(/^\+91/, "");
    if (!validatePhone(cleanPhone)) {
      setError("Please enter a valid 10-digit mobile number (e.g., 9876543210).");
      return;
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    if (!preferredDate) {
      setError("Please select a preferred visit date.");
      return;
    }

    if (!preferredTime) {
      setError("Please select a preferred time.");
      return;
    }

    setIsSubmitting(true);

    // Prepare non-blocking payload for Google Sheets Apps Script Web App
    const payload = {
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim(),
      preferredVisitDate: preferredDate || "",
      preferredTime: preferredTime || "",
      source: leadSource === "Brochure Request" ? "Brochure Request" : "Site Visit Request",
      formLocation: variant === "hero" ? "Hero Form" : "Footer Form",
      pageUrl: window.location.href
    };

    // Post to Google Apps Script Web App in the background silently
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

    // Simulate submission to server/analytics for user feedback
    setTimeout(() => {
      const newLead: LeadSubmission = {
        id: "lead_" + Date.now(),
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        preferredDate: preferredDate || "Flexible",
        preferredTime: preferredTime || "Flexible",
        whatsappOptIn: true,
        timestamp: new Date().toISOString(),
        leadSource,
      };

      // Store in LocalStorage for client-review dashboard
      const existingLeadsRaw = localStorage.getItem("sameera_leads");
      const existingLeads: LeadSubmission[] = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      localStorage.setItem("sameera_leads", JSON.stringify([newLead, ...existingLeads]));

      // TRIGGER PIXEL & GOOGLE ADS PLACEHOLDERS
      triggerMockAnalytics(newLead);

      setIsSubmitting(false);
      setSubmitted(true);

      if (onSuccess) {
        onSuccess(newLead);
      }
    }, 1200);
  };

  const triggerMockAnalytics = (lead: LeadSubmission) => {
    console.log("%c--- MARKETING PIXELS TRIGGERED ---", "color: #C5A880; font-weight: bold;");
    
    // Meta Pixel / Facebook Pixel Lead Event
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead", {
        content_name: "Sameera Urban Nest Lead",
        value: 1400,
        currency: "INR"
      });
      console.log("Meta Pixel: fbq('track', 'Lead') fired successfully!");
    } else {
      console.log("Meta Pixel (Mock): fbq('track', 'Lead') triggered [Placeholder ID: fb-pixel-1382]");
    }

    // Google Ads Conversion Tag
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-1122334455/abc123XYZ",
        value: 1400.0,
        currency: "INR"
      });
      console.log("Google Ads: gtag('event', 'conversion') fired successfully!");
    } else {
      console.log("Google Ads (Mock): gtag('event', 'conversion') triggered [Placeholder ID: AW-1122334455]");
    }

    console.log("Lead Collected: ", lead);
    console.log("----------------------------------");
  };

  // Pre-filled WhatsApp link
  const whatsappUrl = `https://wa.me/919851998519?text=Hi%20Team%20Sameera%20Urban%20Nest%2C%20I%20have%20submitted%20the%20site%20visit%20request.%20My%20name%20is%20${encodeURIComponent(name || "Client")}%20and%20phone%20is%20${encodeURIComponent(phone)}.%20Please%20confirm%20my%20details%20and%20share%20the%20pricing%20schedule.`;

  if (submitted) {
    return (
      <div className="bg-[#FAF8F5] border-2 border-antique-gold/30 rounded-xl p-8 text-center shadow-xl flex flex-col items-center justify-center min-h-[350px] animate-fade-in animate-duration-300">
        <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-6 border border-brand-green/30">
          <CheckCircle2 className="w-10 h-10 text-brand-green" />
        </div>
        <h3 className="text-2xl font-serif font-bold !text-[#241C15] mb-2">Thank You, {name}!</h3>
        <p className="!text-[#241C15]/80 text-sm max-w-sm mb-6 leading-relaxed">
          Your site visit request has been logged. Our senior relationship manager will call you shortly on <strong className="!text-[#241C15] font-bold">+{phone}</strong> to confirm your complimentary AC transit and date details.
        </p>

        <div className="w-full bg-[#F6F1E8] rounded-lg p-4 border border-antique-gold/20 mb-6 text-left">
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#C9A227] mt-2"></span>
            <p className="text-xs !text-[#241C15]/80">
              <strong className="!text-[#241C15] font-bold">Site Visit Date:</strong> {preferredDate || "Flexible / To be confirmed on call"}
            </p>
          </div>
          <div className="flex items-start space-x-3 mt-2">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#C9A227] mt-2"></span>
            <p className="text-xs !text-[#241C15]/80">
              <strong className="!text-[#241C15] font-bold">Complimentary Transit:</strong> Included (Home pick-up & drop-off)
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col space-y-3.5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-bright-green hover:bg-brand-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_12px_rgba(184,146,74,0.45)] text-white font-medium py-3 px-6 rounded-lg w-full transition-colors text-sm shadow-md"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>Connect Instantly on WhatsApp</span>
          </a>

          <a
            href="tel:+919851998519"
            className="inline-flex items-center justify-center space-x-2 bg-[#171717] hover:bg-bright-green hover:ring-1 hover:ring-antique-gold hover:shadow-[0_0_12px_rgba(184,146,74,0.45)] text-white font-semibold py-3 px-6 rounded-lg w-full transition-colors text-sm shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now: +91 98519 98519</span>
          </a>
        </div>
        <p className="text-[11px] !text-[#241C15]/60 mt-3 font-medium">
          Prefer to talk now? Reach us directly at +91 98519 98519.
        </p>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden bg-champagne-white rounded-xl shadow-xl border border-antique-gold/30 p-6 sm:p-8 pt-8 sm:pt-10 ${
        variant === "footer" ? "max-w-lg mx-auto" : "w-full"
      }`}
      id={variant === "footer" ? "lead-form-container" : "lead-form-hero"}
    >
      {/* Premium Antique Gold top-edge accent strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C9971E] via-[#C9A227] to-[#9C7714] shadow-sm"></div>

      <div className="mb-6">
        <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-antique-gold font-bold bg-antique-gold/10 border border-antique-gold/30 px-2.5 py-1 rounded-full shadow-sm">
          Secure Plot Booking
        </span>
        <h3 className="text-2xl font-serif text-brand-green font-bold mt-2.5">
          Schedule A Free Site Visit
        </h3>
        <p className="text-xs text-charcoal/70 mt-1">
          Includes free luxury AC cab pick-up & drop-off across Chennai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="leadSource" value={leadSource} />
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id={variant === "footer" ? "lead-name-input-footer" : "lead-name-input-hero"}
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
            id={variant === "footer" ? "lead-email-input-footer" : "lead-email-input-hero"}
            type="email"
            placeholder="e.g. rajesh@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-charcoal/20 focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-warm-cream/30 text-charcoal text-sm outline-none transition-all placeholder:text-charcoal/40"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
              Preferred Visit Date <span className="text-red-500">*</span>
            </label>
            <CustomDatePicker
              id={variant === "footer" ? "lead-date-picker-footer" : "lead-date-picker-hero"}
              value={preferredDate}
              onChange={setPreferredDate}
              required
              error={!!error && (error.toLowerCase().includes("date") || error.toLowerCase().includes("visit date"))}
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal/80 mb-1">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <CustomTimePicker
              id={variant === "footer" ? "lead-time-picker-footer" : "lead-time-picker-hero"}
              value={preferredTime}
              onChange={setPreferredTime}
              required
              error={!!error && error.toLowerCase().includes("time")}
            />
          </div>
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
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Book My Free Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

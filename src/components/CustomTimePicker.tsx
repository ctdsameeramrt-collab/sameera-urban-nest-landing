import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Clock, Check } from "lucide-react";

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  id?: string;
  error?: boolean;
}

export default function CustomTimePicker({
  value,
  onChange,
  required = false,
  placeholder = "Choose time...",
  id,
  error = false,
}: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, alignUp: false });

  // Split value into hour, minute, period (AM/PM)
  // Format: "HH:MM AM/PM" (e.g. "09:30 AM")
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  // Sync state with incoming value
  useEffect(() => {
    if (value) {
      const match = value.match(/^(\d{2}):(\d{2})\s(AM|PM)$/);
      if (match) {
        setHour(match[1]);
        setMinute(match[2]);
        setPeriod(match[3]);
      }
    }
  }, [value, isOpen]);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverHeight = 310; // Approximate height of the time picker popover
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    let top = rect.bottom + window.scrollY;
    let alignUp = false;
    
    if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
      top = rect.top + window.scrollY - popoverHeight - 4;
      alignUp = true;
    } else {
      top = rect.bottom + window.scrollY + 4;
    }
    
    let left = rect.left + window.scrollX;
    // Align horizontally, preventing overflows
    const popoverWidth = 300;
    if (left + popoverWidth > window.innerWidth) {
      left = window.innerWidth - popoverWidth - 16;
    }
    if (left < 16) left = 16;

    setCoords({
      top,
      left,
      width: rect.width,
      alignUp,
    });
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, { passive: true });
      // Recalculate slightly after open to account for dynamic layouts/rendering
      const timer = setTimeout(updatePosition, 30);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current && 
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const hours = Array.from({ length: 12 }, (_, i) => {
    const h = i + 1;
    return h < 10 ? `0${h}` : `${h}`;
  });

  const minutes = Array.from({ length: 12 }, (_, i) => {
    const m = i * 5;
    return m < 10 ? `0${m}` : `${m}`;
  });

  const periods = ["AM", "PM"];

  const handleSelect = (newHour: string, newMinute: string, newPeriod: string) => {
    const formatted = `${newHour}:${newMinute} ${newPeriod}`;
    onChange(formatted);
  };

  const handleHourClick = (h: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHour(h);
    handleSelect(h, minute, period);
  };

  const handleMinuteClick = (m: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMinute(m);
    handleSelect(hour, m, period);
  };

  const handlePeriodClick = (p: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPeriod(p);
    handleSelect(hour, minute, p);
    // Auto close after selecting AM/PM as it's typically the final step
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleDone = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelect(hour, minute, period);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-lg border text-left text-sm outline-none transition-all flex items-center justify-between ${
          isOpen
            ? "border-brand-green ring-1 ring-brand-green bg-warm-cream/20"
            : error
            ? "border-red-500 bg-red-50/10"
            : "border-charcoal/20 hover:border-charcoal/40 bg-warm-cream/30"
        } ${value ? "text-charcoal font-medium" : "text-charcoal/40"}`}
      >
        <span>{value || placeholder}</span>
        <Clock className="text-charcoal/40 w-4 h-4" />
      </button>

      {/* Hidden input for form submission & required validation */}
      <input
        type="hidden"
        name="preferredTime"
        required={required}
        value={value}
        readOnly
      />

      {/* Popover Card rendered via React Portal so it is never clipped by parents */}
      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="absolute z-[9999] w-[280px] sm:w-[300px] bg-white border border-charcoal/10 rounded-xl shadow-2xl p-3 animate-fade-in origin-top"
          style={{
            position: "absolute",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
          }}
        >
          {/* Active selection preview */}
          <div className="text-center py-2 mb-2 bg-[#1E8449]/5 rounded-lg border border-[#1E8449]/10">
            <span className="text-xs text-charcoal/60 uppercase tracking-wider block font-bold mb-0.5">Selected Time</span>
            <span className="font-mono text-lg font-bold text-[#1E8449]">{hour}:{minute} {period}</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center">
            {/* Hours Column */}
            <div>
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest block mb-1">Hour</span>
              <div className="max-h-40 overflow-y-auto border border-charcoal/5 rounded-lg py-1 flex flex-col space-y-0.5 scrollbar-thin">
                {hours.map((h) => {
                  const active = h === hour;
                  return (
                    <button
                      key={`h-${h}`}
                      type="button"
                      onClick={(e) => handleHourClick(h, e)}
                      className={`py-1.5 text-xs font-mono font-medium rounded-md mx-1 transition-all cursor-pointer ${
                        active
                          ? "bg-[#1E8449] text-white font-bold"
                          : "text-charcoal hover:bg-[#1E8449]/10"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest block mb-1">Min</span>
              <div className="max-h-40 overflow-y-auto border border-charcoal/5 rounded-lg py-1 flex flex-col space-y-0.5 scrollbar-thin">
                {minutes.map((m) => {
                  const active = m === minute;
                  return (
                    <button
                      key={`m-${m}`}
                      type="button"
                      onClick={(e) => handleMinuteClick(m, e)}
                      className={`py-1.5 text-xs font-mono font-medium rounded-md mx-1 transition-all cursor-pointer ${
                        active
                          ? "bg-[#1E8449] text-white font-bold"
                          : "text-charcoal hover:bg-[#1E8449]/10"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AM/PM Column */}
            <div>
              <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest block mb-1">AM/PM</span>
              <div className="max-h-40 overflow-y-auto border border-charcoal/5 rounded-lg py-1 flex flex-col space-y-0.5 scrollbar-thin">
                {periods.map((p) => {
                  const active = p === period;
                  return (
                    <button
                      key={`p-${p}`}
                      type="button"
                      onClick={(e) => handlePeriodClick(p, e)}
                      className={`py-1.5 text-xs font-mono font-medium rounded-md mx-1 transition-all cursor-pointer ${
                        active
                          ? "bg-[#1E8449] text-white font-bold"
                          : "text-charcoal hover:bg-[#1E8449]/10"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Confirm Done Action */}
          <div className="border-t border-charcoal/5 mt-3 pt-2.5 flex justify-end">
            <button
              type="button"
              onClick={handleDone}
              className="w-full py-2 bg-[#1E8449] hover:bg-[#1E8449]/90 active:scale-95 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center space-x-1 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Confirm Time</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

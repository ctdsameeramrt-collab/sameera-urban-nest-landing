import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  id?: string;
  error?: boolean;
}

export default function CustomDatePicker({
  value,
  onChange,
  required = false,
  placeholder = "Choose date...",
  id,
  error = false,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return new Date();
  });

  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, alignUp: false });

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverHeight = 350; // Approximate height of the date picker
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
    const popoverWidth = 310;
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Get number of days in the current view month
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Get first day of the month (0 = Sunday, 1 = Monday...)
  const firstDay = new Date(year, month, 1).getDay();
  // Adjust firstDay to match Monday-start weekday headers
  const paddingDays = firstDay === 0 ? 6 : firstDay - 1;

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (day: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const selected = new Date(year, month, day);
    if (selected < today) return; // Prevent selecting past dates

    // Format: DD MMM YYYY (e.g. 15 Jul 2026)
    const formatted = formatDate(selected);
    onChange(formatted);
    setIsOpen(false);
  };

  const handleToday = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(formatDate(today));
    setViewDate(new Date());
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  const formatDate = (date: Date): string => {
    const d = date.getDate();
    const m = months[date.getMonth()].substring(0, 3);
    const y = date.getFullYear();
    return `${d < 10 ? "0" + d : d} ${m} ${y}`;
  };

  const isSelected = (day: number): boolean => {
    if (!value) return false;
    const parsedValue = new Date(value);
    if (isNaN(parsedValue.getTime())) return false;
    return (
      parsedValue.getDate() === day &&
      parsedValue.getMonth() === month &&
      parsedValue.getFullYear() === year
    );
  };

  const isPastDate = (day: number): boolean => {
    const currentDayDate = new Date(year, month, day);
    return currentDayDate < today;
  };

  // Render month days grid
  const renderDays = () => {
    const days = [];
    // Render blank cells for weekday padding
    for (let i = 0; i < paddingDays; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
    }

    // Render calendar date numbers
    for (let day = 1; day <= totalDays; day++) {
      const past = isPastDate(day);
      const active = isSelected(day);

      days.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={past}
          onClick={(e) => handleDateSelect(day, e)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-medium transition-all ${
            past
              ? "text-charcoal/20 cursor-not-allowed hover:bg-transparent"
              : active
              ? "bg-[#1E8449] text-white shadow-sm font-semibold scale-105"
              : "text-charcoal hover:bg-brand-green/10 active:bg-brand-green/20 cursor-pointer"
          }`}
          style={{ minWidth: "40px", minHeight: "40px" }}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button (Styled exactly like standard input) */}
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
        <CalendarIcon className="text-charcoal/40 w-4 h-4" />
      </button>

      {/* Hidden input for form submission & required validation */}
      <input
        type="hidden"
        name="preferredVisitDate"
        required={required}
        value={value}
        readOnly
      />

      {/* Popover Card rendered via React Portal so it is never clipped by parents */}
      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="absolute z-[9999] w-[310px] bg-white border border-charcoal/10 rounded-xl shadow-2xl p-4 animate-fade-in origin-top"
          style={{
            position: "absolute",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full hover:bg-charcoal/5 text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h4 className="font-serif font-bold text-sm text-charcoal">
              {months[month]} {year}
            </h4>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-full hover:bg-charcoal/5 text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {weekdays.map((wd) => (
              <span key={wd} className="text-[10px] font-bold text-charcoal/40 uppercase tracking-wider">
                {wd}
              </span>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center mb-3">
            {renderDays()}
          </div>

          {/* Bottom actions */}
          <div className="border-t border-charcoal/5 pt-3 flex items-center justify-between text-xs px-1">
            <button
              type="button"
              onClick={handleClear}
              className="text-[#1E8449] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="text-[#1E8449] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
            >
              Today
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

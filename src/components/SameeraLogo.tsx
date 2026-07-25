import React from "react";

interface SameeraLogoProps {
  className?: string;
}

export default function SameeraLogo({ className = "" }: SameeraLogoProps) {
  return (
    <img 
      src="https://i.ibb.co/fK2W3gZ/Sameera-Urban-Nest-Logo.jpg"
      alt="Sameera Urban Nest Logo"
      className={`h-10 sm:h-11 w-auto object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}

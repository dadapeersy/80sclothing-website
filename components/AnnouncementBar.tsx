"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-black text-white text-xs font-medium py-2 px-4 flex justify-between items-center z-50 relative">
      <div className="w-4"></div> {/* Spacer for centering */}
      <div className="text-center flex-1 tracking-wider">
        FREE SHIPPING ON ORDERS ABOVE ₹999
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="w-4 h-4 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}

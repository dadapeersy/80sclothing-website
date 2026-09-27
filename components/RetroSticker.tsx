"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface RetroStickerProps {
  src: string;
  rotation: number;
  align: "left" | "right";
  yOffsetEnd?: number;
}

export default function RetroSticker({ src, rotation, align, yOffsetEnd = 80 }: RetroStickerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // If reduced motion, y is just 0
  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : yOffsetEnd]);

  return (
    <div ref={ref} className="relative w-full h-0 pointer-events-none z-20">
      <motion.div
        style={{ y }}
        className={`absolute hidden md:block w-48 lg:w-72 h-48 lg:h-72 pointer-events-none drop-shadow-2xl ${
          align === "left" ? "left-[5%] lg:left-[10%]" : "right-[5%] lg:right-[10%]"
        } -translate-y-full`}
        initial={{ rotate: rotation }}
      >
        <Image 
          src={src} 
          alt="" 
          aria-hidden="true" 
          fill 
          sizes="(max-width: 1024px) 192px, 288px"
          className="object-contain" 
        />
      </motion.div>
    </div>
  );
}

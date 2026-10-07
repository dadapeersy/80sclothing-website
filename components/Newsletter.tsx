"use client";

import { useState } from "react";
import { ArrowRight, Tag, Scissors } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const { isDiscountUnlocked, setIsDiscountUnlocked, discountPercentage } = useShop();

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const isTorn = isDiscountUnlocked;

  const handleTicketMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Convert mouse position to -1 → 1
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;

    // Subtle 3D rotation
    setRotation({
      x: -normalizedY * 6,
      y: normalizedX * 8,
    });
  };

  const handleTicketLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      setEmail("");

      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section className="pt-4 pb-8 md:pt-12 md:pb-24 border-t-[3px] border-double border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* =========================
            3D TICKET
        ========================== */}
        <div
          className="w-full max-w-[1000px] mx-auto mb-6 md:mb-10 px-0 md:px-6 lg:px-8"
          style={{
            perspective: "1400px",
          }}
        >
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseMove={handleTicketMove}
            onMouseLeave={handleTicketLeave}
            className="relative w-full cursor-pointer"
            style={{
              transformStyle: "preserve-3d",
              transform: `
                rotateX(${rotation.x}deg)
                rotateY(${rotation.y}deg)
                scale(${isHovering ? 1.015 : 1})
              `,
              transition: isHovering
                ? "transform 80ms linear"
                : "transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              filter: isHovering
                ? "drop-shadow(0 35px 35px rgba(0,0,0,0.28))"
                : "drop-shadow(0 20px 22px rgba(0,0,0,0.18))",
            }}
          >
            {/* Floating shadow underneath */}
            <div
              className="absolute inset-x-[8%] -bottom-5 h-10 rounded-full bg-black/20 blur-2xl"
              style={{
                transform: "translateZ(-40px)",
                opacity: isHovering ? 0.45 : 0.3,
                transition: "opacity 300ms ease",
              }}
            />

            {/* Ticket Content */}
            <div
              className="relative w-full flex items-center justify-center overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {!isTorn ? (
                <>
                  <Image
                    src="/ticket_section.png"
                    alt="80's Jacket Collection Ticket"
                    width={1600}
                    height={600}
                    className="w-full h-auto object-contain select-none"
                    priority
                    draggable={false}
                  />

                  {/* Swipe Zone Over the Dotted Line (approx 75% from left) */}
                  <motion.div
                    className="absolute top-0 bottom-0 left-[65%] right-[15%] z-30 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
                    onPan={(e, info) => {
                      if (Math.abs(info.offset.y) > 40 || Math.abs(info.offset.x) > 40) {
                        setIsDiscountUnlocked(true);
                        setIsHovering(false);
                        setRotation({ x: 0, y: 0 });
                      }
                    }}
                  />

                  {/* Subtle glossy highlight */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                    style={{
                      opacity: isHovering ? 0.18 : 0,
                      background:
                        "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.8) 45%, transparent 65%)",
                      transform: "translateZ(20px)",
                    }}
                  />
                </>
              ) : (
                <div className="relative w-full flex flex-row items-center justify-center gap-1 md:gap-2 py-4">
                  {/* Left Half */}
                  <motion.div
                    initial={{ x: 0, y: 0, rotate: 0 }}
                    animate={{ x: -2, y: 2, rotate: -2 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="relative w-[70%]"
                  >
                    <Image
                      src="/ticket_1st_half.png"
                      alt="Ticket Left Half"
                      width={1120}
                      height={600}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </motion.div>
                  
                  {/* Right Half */}
                  <motion.div
                    initial={{ x: 0, y: 0, rotate: 0 }}
                    animate={{ x: 2, y: -2, rotate: 3 }}
                    transition={{ type: "spring", damping: 12, stiffness: 90 }}
                    className="relative w-[28%]"
                  >
                    <Image
                      src="/ticket_2nd_half.png"
                      alt="Ticket Right Half"
                      width={448}
                      height={600}
                      className="w-full h-auto object-contain"
                      priority
                    />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            DESCRIPTION
        ========================== */}
        <p className="text-sm md:text-base font-bold text-[var(--muted)] mb-8 max-w-md mx-auto uppercase tracking-widest border-b-2 border-dotted border-[var(--border)] pb-4 inline-block">
          SUBSCRIBE TO THE CATALOG HOTLINE FOR EXCLUSIVE MAIL-ORDER DROPS.
        </p>

        {/* =========================
            EMAIL FORM
        ========================== */}
        <form
          onSubmit={handleSubmit}
          className="relative w-full max-w-md mx-auto flex items-stretch halftone-border catalog-border bg-white"
        >
          <div className="flex items-center pl-4 text-[var(--muted)] border-r-2 border-[var(--border)]">
            <Tag size={16} />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL..."
            className="flex-1 bg-transparent py-4 px-4 text-sm font-bold uppercase focus:outline-none placeholder:text-[var(--muted)] text-[var(--ink)]"
            required
            disabled={status === "loading" || status === "success"}
          />

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 bg-[var(--ink)] text-[var(--background)] hover:bg-[var(--neon-pink)] transition-colors disabled:opacity-50 flex items-center justify-center border-l-2 border-[var(--border)]"
            aria-label="Subscribe"
          >
            <ArrowRight size={20} strokeWidth={3} />
          </button>
        </form>

        {status === "success" && (
          <p className="mt-6 text-xs font-bold text-[var(--neon-pink)] uppercase tracking-widest bg-[var(--background)] p-2 catalog-border inline-block">
            Thank you! You are on the mailing list.
          </p>
        )}
      </div>
    </section>
  );
}
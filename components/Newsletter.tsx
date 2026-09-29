"use client";

import { useState } from "react";
import { ArrowRight, Tag } from "lucide-react";
import Image from "next/image";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    <section className="py-16 md:py-24 border-t-[3px] border-double border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">

        {/* =========================
            3D TICKET
        ========================== */}
        <div
          className="w-full max-w-[1400px] mx-auto mb-10"
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

            {/* Ticket */}
            <div
              className="relative overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src="/ticket_section.png"
                alt="80's Jacket Collection Ticket"
                width={1600}
                height={600}
                className="w-full h-auto object-contain select-none"
                priority
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
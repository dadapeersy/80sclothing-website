import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/product-data";


export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Link href="/" className="block mb-4 md:mb-5 opacity-80 hover:opacity-100 transition-opacity">
              <Image src="/torocavallo_logo.png" alt={siteConfig.name} width={130} height={35} className="object-contain" priority />
            </Link>
            <p className="text-muted text-sm max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Shop section removed as requested */}

          {/* Help */}
          <div className="col-span-1">
            <h4 className="font-semibold tracking-wide mb-6 text-sm">HELP</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="/#info" className="hover:text-[var(--neon-pink)] transition-colors">Product Info</Link></li>
              <li><Link href="/#showcase" className="hover:text-[var(--neon-pink)] transition-colors">Showcase Gallery</Link></li>
              <li><Link href="/#faq" className="hover:text-[var(--neon-pink)] transition-colors">FAQ</Link></li>
              <li><Link href="/#reviews" className="hover:text-[var(--neon-pink)] transition-colors">Customer Reviews</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="font-semibold tracking-wide mb-6 text-sm">LEGAL</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li><Link href="/privacy-policy" className="hover:text-[var(--neon-pink)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--neon-pink)] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-[var(--neon-pink)] transition-colors">Sales Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[var(--neon-pink)] transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-muted">
          <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}

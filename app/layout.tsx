import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/product-data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import StoreLayoutWrapper from "@/components/StoreLayoutWrapper";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Streetwear`,
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col relative bg-gray-50/30">
        <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
      </body>
    </html>
  );
}

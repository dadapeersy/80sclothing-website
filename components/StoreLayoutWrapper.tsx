'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { ShopProvider } from '@/context/ShopContext';

export default function StoreLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  // If it's a dashboard route, render just the children without the store layout
  if (isDashboard) {
    return <main className="flex-1 h-full">{children}</main>;
  }

  // Otherwise, render the full store layout
  return (
    <ShopProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </ShopProvider>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-10">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8 uppercase">Shipping Policy</h1>
        
        <div className="text-muted text-sm sm:text-base">
          <p className="font-medium text-black mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">1. Processing Time</h2>
          <p className="mb-6 text-justify leading-relaxed">
            All orders are processed within 1 to 2 business days (excluding weekends and public holidays) after receiving your order confirmation email. You will receive an additional notification when your order has officially shipped and is on its way to you.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">2. Domestic Shipping Rates and Estimates</h2>
          <p className="mb-6 text-justify leading-relaxed">
            We offer simple flat-rate shipping for all orders to ensure transparency. Shipping is completely free for all orders over ₹999. Standard delivery generally takes 3 to 5 business days depending on your specific location and local courier routes.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">3. International Shipping</h2>
          <p className="mb-6 text-justify leading-relaxed">
            At this current time, we solely focus on providing the best experience domestically and only ship within our borders. We do not offer international shipping options.
          </p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">4. Tracking Your Order</h2>
          <p className="mb-6 text-justify leading-relaxed">
            When your order has shipped, you will receive an email notification from us which will include a unique tracking number you can use to monitor its status. Please allow up to 48 hours for the tracking information to become fully active and available in the courier's system.
          </p>
        </div>
      </div>
    </div>
  );
}

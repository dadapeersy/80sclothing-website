import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tighter mb-8">SHIPPING POLICY</h1>
        <div className="prose prose-sm sm:prose-base text-muted prose-headings:text-black prose-a:text-black">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Processing Time</h2>
          <p>
            All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
          </p>

          <h2>2. Domestic Shipping Rates and Estimates</h2>
          <p>
            We offer simple flat-rate shipping for all orders. Shipping is free for orders over ₹999.
            Standard delivery generally takes 3-5 business days.
          </p>

          <h2>3. International Shipping</h2>
          <p>
            At this time, we only ship domestically. We do not offer international shipping.
          </p>
          
          <h2>4. How do I check the status of my order?</h2>
          <p>
            When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.
          </p>
        </div>
      </div>
    </div>
  );
}

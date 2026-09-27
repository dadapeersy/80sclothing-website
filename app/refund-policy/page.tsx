import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SalesPolicy() {
  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-10">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8 uppercase">Sales Policy</h1>
        
        <div className="text-muted text-sm sm:text-base">
          <p className="font-medium text-black mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">1. All Sales Are Final</h2>
          <p className="mb-6 text-justify leading-relaxed">
            We take immense pride in the quality and craftsmanship of our products. Due to the limited nature and high demand of our collections, all sales are strictly considered final. We do not offer refunds, replacements, or exchanges for any items once an order has been successfully placed and processed through our system.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">2. Sizing and Fit Verification</h2>
          <p className="mb-6 text-justify leading-relaxed">
            We strongly advise that you review the size chart and detailed product descriptions carefully before completing your checkout. If you are unsure about your size, fit, or have any specific questions regarding the garment's construction, we encourage you to contact our support team prior to making a purchase. 
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">3. Damaged or Defective Items</h2>
          <p className="mb-6 text-justify leading-relaxed">
            Every single piece is rigorously inspected by our quality control team before it is packaged and shipped. In the rare event that your item arrives damaged or defective, we make a strict exception to our final sale policy. You must contact us within 48 hours of delivery, providing clear photographs of the defect alongside your order details. Once verified by our team, we will take immediate action to make it right.
          </p>
        </div>
      </div>
    </div>
  );
}

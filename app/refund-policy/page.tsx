import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tighter mb-8">REFUND POLICY</h1>
        <div className="prose prose-sm sm:prose-base text-muted prose-headings:text-black prose-a:text-black">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Returns</h2>
          <p>
            We have a 14-day return policy, which means you have 14 days after receiving your item to request a return.
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
          </p>

          <h2>2. Refunds</h2>
          <p>
            We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>

          <h2>3. Exchanges</h2>
          <p>
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
        </div>
      </div>
    </div>
  );
}

import { siteConfig } from "@/lib/product-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-10">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8 uppercase">Privacy Policy</h1>
        
        <div className="text-muted text-sm sm:text-base">
          <p className="font-medium text-black mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">1. Introduction</h2>
          <p className="mb-6 text-justify leading-relaxed">
            Welcome to {siteConfig.name}. We deeply respect your privacy and are entirely committed to protecting your personal data. This privacy policy will inform you as to how we carefully look after your personal data when you visit our website, ensuring your information remains secure.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4 text-justify leading-relaxed">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-justify leading-relaxed">
            <li><strong className="text-black">Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong className="text-black">Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
            <li><strong className="text-black">Financial Data</strong> includes bank account and payment card details (processed securely via our trusted payment providers).</li>
            <li><strong className="text-black">Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
          </ul>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">3. How We Use Your Personal Data</h2>
          <p className="mb-4 text-justify leading-relaxed">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the strictly defined following circumstances:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-justify leading-relaxed">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you regarding your purchase.</li>
            <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal obligation or regulatory requirement.</li>
          </ul>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">4. Data Security</h2>
          <p className="mb-6 text-justify leading-relaxed">
            We have put in place appropriate and robust security measures to prevent your personal data from being accidentally lost, used, accessed in an unauthorised way, altered, or disclosed. We limit access to your data strictly to employees who have a business need to know.
          </p>
        </div>
      </div>
    </div>
  );
}

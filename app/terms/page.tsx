import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tighter mb-8">TERMS & CONDITIONS</h1>
        <div className="prose prose-sm sm:prose-base text-muted prose-headings:text-black prose-a:text-black">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Terms</h2>
          <p>
            By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials on our Website for personal, non-commercial transitory viewing only.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            All the materials on our Website are provided "as is". We make no warranties, may it be expressed or implied, therefore negates all other warranties.
          </p>
          
          <h2>4. Limitations</h2>
          <p>
            We or our suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on our Website.
          </p>
        </div>
      </div>
    </div>
  );
}

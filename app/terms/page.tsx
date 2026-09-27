import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted hover:text-black transition-colors mb-10">
          <ArrowLeft size={16} className="mr-2" />
          Back to Store
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-8 uppercase">Terms & Conditions</h1>
        
        <div className="text-muted text-sm sm:text-base">
          <p className="font-medium text-black mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">1. Terms</h2>
          <p className="mb-6 text-justify leading-relaxed">
            By accessing this Website, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are fully responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">2. Use License</h2>
          <p className="mb-6 text-justify leading-relaxed">
            Permission is granted to temporarily download one copy of the materials on our Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.
          </p>

          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">3. Disclaimer</h2>
          <p className="mb-6 text-justify leading-relaxed">
            All the materials on our Website are provided strictly "as is". We make no warranties, may it be expressed or implied, and therefore negate all other warranties. Furthermore, we do not make any representations concerning the accuracy or reliability of the use of the materials on our Website.
          </p>
          
          <h2 className="text-xl font-bold text-black tracking-tight mt-10 mb-4">4. Limitations</h2>
          <p className="mb-6 text-justify leading-relaxed">
            We or our suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on our Website, even if we or an authorized representative of this Website has been notified, orally or written, of the possibility of such damage.
          </p>
        </div>
      </div>
    </div>
  );
}

import HeroProduct from "@/components/HeroProduct";
import ProductInfo from "@/components/ProductInfo";
import ProductFeatures from "@/components/ProductFeatures";
import SizeGuide from "@/components/SizeGuide";
import ShippingReturns from "@/components/ShippingReturns";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroProduct />
      <ProductInfo />
      <ProductFeatures />
      <SizeGuide />
      <ShippingReturns />
      <Reviews />
      <Newsletter />
    </div>
  );
}

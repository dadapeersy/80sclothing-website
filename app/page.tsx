import HeroProduct from "@/components/HeroProduct";
import ProductInfo from "@/components/ProductInfo";
import ProductFeatures from "@/components/ProductFeatures";
import ProductShowcase from "@/components/ProductShowcase";
import ShippingReturns from "@/components/ShippingReturns";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import RetroSticker from "@/components/RetroSticker";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dynamicProduct: any = null;
  let connectionError = false;
  
  try {
    // Fetch the latest product from the backend API
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch");
    const products = await res.json();
    const dbProduct = products.length > 0 ? products[0] : null;
    
    if (dbProduct) {
      let currentPrice = dbProduct.price;
      let originalPrice = undefined;
      
      if (dbProduct.discountPercentage && dbProduct.discountPercentage > 0) {
        currentPrice = dbProduct.price * (1 - (dbProduct.discountPercentage / 100));
        originalPrice = dbProduct.price;
      }
      
      dynamicProduct = {
        id: dbProduct._id.toString(),
        name: dbProduct.title,
        description: dbProduct.description,
        price: currentPrice,
        originalPrice: originalPrice,
        images: dbProduct.imageUrls.map((url: string) => ({ src: url, alt: dbProduct.title })),
        sizes: dbProduct.sizes && dbProduct.sizes.length > 0 ? dbProduct.sizes : [],
        stock: dbProduct.stock || 0,
      };
    }
  } catch (error) {
    console.error("Failed to fetch product from database:", error);
    connectionError = true;
  }

  return (
    <div className="flex flex-col w-full">
      {dynamicProduct ? (
        <HeroProduct product={dynamicProduct} />
      ) : (
        <div className="py-32 text-center flex flex-col items-center justify-center bg-gray-50 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-2">Welcome to your Store</h2>
          <p className="text-muted-foreground">Add your first product in the Admin Dashboard to see it here.</p>
        </div>
      )}
      <ProductInfo />
      <RetroSticker src="/casseette.png" rotation={-6} align="left" yOffsetEnd={60} />
      <ProductFeatures />
      {dynamicProduct && <ProductShowcase product={dynamicProduct} />}
      <RetroSticker src="/radio.png" rotation={-4} align="left" yOffsetEnd={75} />
      <ShippingReturns />
      <RetroSticker src="/camera.png" rotation={8} align="right" yOffsetEnd={50} />
      <Reviews />
      <Newsletter />
    </div>
  );
}

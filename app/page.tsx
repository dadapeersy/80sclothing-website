import HeroProduct from "@/components/HeroProduct";
import ProductInfo from "@/components/ProductInfo";
import ProductFeatures from "@/components/ProductFeatures";
import ProductShowcase from "@/components/ProductShowcase";
import ShippingReturns from "@/components/ShippingReturns";
import Reviews from "@/components/Reviews";
import Newsletter from "@/components/Newsletter";
import connectToDatabase from "@/lib/mongoose";
import { Product } from "@/lib/models";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let dynamicProduct = null;
  let connectionError = false;
  
  try {
    await connectToDatabase();
    
    // Fetch the latest product from the database
    const dbProduct = await Product.findOne().sort({ createdAt: -1 });
    
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
      <ProductFeatures />
      {dynamicProduct && <ProductShowcase product={dynamicProduct} />}
      <ShippingReturns />
      <Reviews />
      <Newsletter />
    </div>
  );
}

import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import HomeProducts from "@/components/home/HomeProducts";
import ProductSkeleton from "@/components/product/ProductSkeleton";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <div className="mx-4 mt-8">
            <ProductSkeleton count={9} />
          </div>
        }
      >
        <HomeProducts />
      </Suspense>
    </div>
  );
}
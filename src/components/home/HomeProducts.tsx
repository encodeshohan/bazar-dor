import ProductCard from "../product/ProductCard";
import { Product } from "@/types";

const HomeProducts = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
    );
    const data = res.ok ? await res.json() : [];
    const products: Product[] = Array.isArray(data) ? data : [];

    if (products.length === 0) {
        return (
            <div className="mx-4 mt-8 rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                পণ্যের তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
            </div>
        );
    }

    const risers = products
        .filter((p) => p.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const fallers = products
        .filter((p) => p.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <div className="mx-4 mt-8 space-y-10 pb-10">
            <section>
                <h2 className="border-b-2 border-green-700 pb-1 text-xl font-bold">
                    আজ দাম বেড়েছে <span className="text-red-600">▲</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    গতকালের তুলনায় আজ সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {risers.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="border-b-2 border-green-700 pb-1 text-xl font-bold">
                    আজ দাম কমেছে <span className="text-green-700">▼</span>
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    গতকালের তুলনায় আজ সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {fallers.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <section id="সব-পণ্য">
                <h2 className="border-b-2 border-green-700 pb-1 text-xl font-bold">
                    সব পণ্য
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                    বাংলাদেশের বাজারভিত্তিক সকল নিত্যপ্রয়োজনীয় পণ্যের পূর্ণাঙ্গ তালিকা
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeProducts;
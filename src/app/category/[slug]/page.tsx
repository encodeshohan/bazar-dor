import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryProducts from "@/components/product/CategoryProducts";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { Product } from "@/types";

const API = "https://openapi.programming-hero.com/api/bazardor";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const CategoryContent = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${API}/categories`),
        fetch(`${API}/products`),
    ]);

    if (!categoriesRes.ok || !productsRes.ok) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
            </div>
        );
    }

    const categories: Category[] = await categoriesRes.json();
    const allProducts: Product[] = await productsRes.json();

    const category = categories.find((c) => c.slug === slug);
    if (!category) {
        notFound();
    }

    const products = allProducts.filter((p) => p.category === slug);

    return (
        <>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">
                    {category.icon} {category.nameBn}
                </h1>
                <p className="text-sm text-gray-500">
                    {category.nameBn} ক্যাটাগরির সব পণ্যের আজকের দাম
                </p>
            </div>

            {products.length === 0 ? (
                <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center">
                    <div className="text-5xl">📭</div>
                    <p className="text-gray-500">এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।</p>
                    <Link
                        href="/"
                        className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            ) : (
                <CategoryProducts products={products} />
            )}
        </>
    );
};

const CategoryPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    return (
        <div className="mx-4 mt-6 space-y-6 pb-10">
            <Suspense fallback={<ProductSkeleton count={6} />}>
                <CategoryContent params={params} />
            </Suspense>
        </div>
    );
};

export default CategoryPage;
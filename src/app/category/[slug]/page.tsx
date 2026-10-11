import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CategoryProducts from "@/components/CategoryProducts";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Product } from "@/types";
import { toBengaliNumber } from "@/lib/utils";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const API = "https://openapi.programming-hero.com/api/bazardor";

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
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-3xl">
                    {category.icon}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{category.nameBn}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        মোট {toBengaliNumber(products.length)} প্রকার {category.nameBn}-এর দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            {products.length === 0 ? (
                <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-10 text-center">
                    <div className="text-4xl">🧺</div>
                    <h2 className="text-lg font-bold text-gray-900">
                        এই ক্যাটাগরিতে কোনো পণ্য নেই
                    </h2>
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
        <div className="mx-4 mt-6 space-y-4 pb-10">
            <Suspense
                fallback={
                    <>
                        <div className="h-24 animate-pulse rounded-2xl border border-gray-200 bg-white" />
                        <ProductSkeleton count={6} />
                    </>
                }
            >
                <CategoryContent params={params} />
            </Suspense>
        </div>
    );
};

export default CategoryPage;
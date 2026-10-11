import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Card } from "@heroui/react";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";

const API = "https://openapi.programming-hero.com/api/bazardor";

const ProductContent = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;

    const res = await fetch(`${API}/products`);
    if (!res.ok) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                তথ্য লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।
            </div>
        );
    }

    const products: Product[] = await res.json();
    const product = products.find((p) => p.slug === slug);
    if (!product) {
        notFound();
    }

    const { markets, change } = product;
    const hasMarkets = markets.length > 0;

    const min = hasMarkets ? Math.min(...markets.map((m) => m.min)) : product.today;
    const max = hasMarkets ? Math.max(...markets.map((m) => m.max)) : product.today;
    const avg = hasMarkets
        ? Math.round(
            markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length,
        )
        : product.today;

    const minMarket = markets.find((m) => m.min === min)?.market;
    const maxMarket = markets.find((m) => m.max === max)?.market;

    const changeText =
        change.dir === "up"
            ? `গতকালের তুলনায় দাম ${toBengaliNumber(change.pct)}% বেড়েছে।`
            : change.dir === "down"
                ? `গতকালের তুলনায় দাম ${toBengaliNumber(change.pct)}% কমেছে।`
                : "গতকালের তুলনায় দাম অপরিবর্তিত আছে।";

    return (
        <>
            <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-green-700">
                    হোম
                </Link>
                <span>/</span>
                <Link href={`/category/${product.category}`} className="hover:text-green-700">
                    {product.categoryNameBn}
                </Link>
                <span>/</span>
                <span className="font-semibold text-gray-900">{product.nameBn}</span>
            </nav>

            <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 text-5xl">
                        {product.image || product.categoryIcon}
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={`/category/${product.category}`}
                                className="rounded-full border border-green-200 bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-800"
                            >
                                {product.categoryIcon} {product.categoryNameBn}
                            </Link>
                            <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-600">
                                একক: {formatUnit(product.unit)}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {product.nameBn}
                        </h1>
                        <p className="text-sm text-gray-500">
                            আজ {toBengaliNumber(markets.length)}টি বাজারের দর এখানে দেখানো হয়েছে।{" "}
                            {changeText}
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-5 md:text-right">
                    <p className="text-xs text-gray-500">আজকের দর</p>
                    <p className="text-3xl font-bold text-green-700">
                        {toBengaliNumber(product.today)} টাকা
                    </p>
                    <p className="text-xs text-gray-500">{formatUnit(product.unit)}</p>
                </div>
            </div>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <Card.Content>
                            <p className="text-xs font-semibold text-gray-500">সর্বনিম্ন দাম</p>
                            <p className="text-2xl font-bold text-green-700">
                                {toBengaliNumber(min)} টাকা
                            </p>
                            {minMarket && (
                                <p className="mt-1 text-xs text-gray-500">বাজার: {minMarket}</p>
                            )}
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <p className="text-xs font-semibold text-gray-500">গড় দাম</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {toBengaliNumber(avg)} টাকা
                            </p>
                            <p className="mt-1 text-xs text-gray-500">সব বাজারের গড়</p>
                        </Card.Content>
                    </Card>
                    <Card>
                        <Card.Content>
                            <p className="text-xs font-semibold text-gray-500">সর্বোচ্চ দাম</p>
                            <p className="text-2xl font-bold text-amber-600">
                                {toBengaliNumber(max)} টাকা
                            </p>
                            {maxMarket && (
                                <p className="mt-1 text-xs text-gray-500">বাজার: {maxMarket}</p>
                            )}
                        </Card.Content>
                    </Card>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

                {hasMarkets ? (
                    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                        <table className="w-full min-w-120 text-left text-sm">
                            <thead className="bg-gray-50 text-xs text-gray-600">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">বাজারের নাম</th>
                                    <th className="px-5 py-3 font-semibold">বিভাগ</th>
                                    <th className="px-5 py-3 text-right font-semibold">সর্বনিম্ন</th>
                                    <th className="px-5 py-3 text-right font-semibold">সর্বোচ্চ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {markets.map((m) => (
                                    <tr key={`${m.division}-${m.market}`} className="hover:bg-gray-50">
                                        <td className="px-5 py-3 font-medium text-gray-900">{m.market}</td>
                                        <td className="px-5 py-3 text-gray-600">{m.division}</td>
                                        <td className="px-5 py-3 text-right text-green-700">
                                            {toBengaliNumber(m.min)} টাকা
                                        </td>
                                        <td className="px-5 py-3 text-right text-amber-600">
                                            {toBengaliNumber(m.max)} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </div>
                )}
            </section>
        </>
    );
};

const ProductPage = ({ params }: { params: Promise<{ slug: string }> }) => {
    return (
        <div className="mx-4 mt-6 space-y-6 pb-10">
            <Suspense
                fallback={
                    <>
                        <div className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white" />
                        <div className="h-28 animate-pulse rounded-2xl border border-gray-200 bg-white" />
                        <div className="h-72 animate-pulse rounded-2xl border border-gray-200 bg-white" />
                    </>
                }
            >
                <ProductContent params={params} />
            </Suspense>
        </div>
    );
};

export default ProductPage;
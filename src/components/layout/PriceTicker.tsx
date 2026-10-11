import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";

const PriceTicker = async () => {
    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products",
    );
    const data = res.ok ? await res.json() : [];
    const products: Product[] = Array.isArray(data) ? data : [];

    if (products.length === 0) return null;

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl">
                <MarqueeText className="py-1 text-sm" direction="right" duration={10}>
                    {products.map((p) => (
                        <Link
                            key={p.slug}
                            href={`/product/${p.slug}`}
                            className="flex items-center gap-1.5 px-5 hover:underline"
                        >
                            <span>{p.image || p.categoryIcon}</span>
                            <span className="font-semibold text-gray-900">{p.nameBn}</span>
                            <span className="text-gray-800">{toBengaliNumber(p.today)} টাকা</span>
                            <span className="text-gray-500">{formatUnit(p.unit)}</span>
                            {p.change.dir === "down" && (
                                <span className="font-bold text-green-700">
                                    ▼ {toBengaliNumber(p.change.pct)}%
                                </span>
                            )}
                            {p.change.dir === "up" && (
                                <span className="font-bold text-red-600">
                                    ▲ {toBengaliNumber(p.change.pct)}%
                                </span>
                            )}
                            {p.change.dir === "flat" && (
                                <span className="font-bold text-gray-500">—</span>
                            )}
                        </Link>
                    ))}
                </MarqueeText>
            </div>
        </div>
    );
};

export default PriceTicker;
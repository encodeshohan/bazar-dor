"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { Product, SortOption } from "@/types";
import { sortProducts, toBengaliNumber } from "@/lib/utils";

const CategoryProducts = ({ products }: { products: Product[] }) => {
    const [sort, setSort] = useState<SortOption>("default");
    const sorted = sortProducts(products, sort);

    return (
        <div className="space-y-4">
            <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3 sm:flex-row">
                <p className="text-sm text-gray-500">
                    মোট{" "}
                    <span className="font-bold text-gray-800">
                        {toBengaliNumber(products.length)}টি
                    </span>{" "}
                    পণ্য পাওয়া গেছে
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">সাজান:</span>
                    <SortDropdown value={sort} onChange={setSort} />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
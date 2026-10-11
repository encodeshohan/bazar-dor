import Link from "next/link";
import { Card } from "@heroui/react";
import { Product } from "@/types";
import { formatUnit, toBengaliNumber } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
    const { dir, pct } = product.change;

    const badgeClass =
        dir === "up"
            ? "border-red-200 bg-red-50 text-red-600"
            : dir === "down"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-gray-200 bg-gray-100 text-gray-500";

    const badgeText =
        dir === "up"
            ? `▲ ${toBengaliNumber(pct)}%`
            : dir === "down"
                ? `▼ ${toBengaliNumber(pct)}%`
                : "— ০%";

    return (
        <Link href={`/product/${product.slug}`} className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
                <Card.Header>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl">{product.image || product.categoryIcon}</span>
                        <div>
                            <Card.Title>{product.nameBn}</Card.Title>
                            <Card.Description>{formatUnit(product.unit)}</Card.Description>
                        </div>
                    </div>
                </Card.Header>

                <Card.Content>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs text-gray-500">আজকের দাম</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {toBengaliNumber(product.today)} টাকা
                            </p>
                        </div>
                        <span className={`rounded-md border px-2 py-0.5 text-xs font-bold ${badgeClass}`}>
                            {badgeText}
                        </span>
                    </div>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default ProductCard;
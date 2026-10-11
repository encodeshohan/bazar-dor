const ProductSkeleton = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
                >
                    <div className="flex gap-3">
                        <div className="size-12 rounded-xl bg-gray-200" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-gray-200" />
                            <div className="h-3 w-1/2 rounded bg-gray-200" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-between">
                        <div className="h-6 w-24 rounded bg-gray-200" />
                        <div className="h-6 w-14 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;
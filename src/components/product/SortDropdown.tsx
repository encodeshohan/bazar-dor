"use client";

import { SortOption } from "@/types";

const SortDropdown = ({
    value,
    onChange,
}: {
    value: SortOption;
    onChange: (value: SortOption) => void;
}) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                aria-label="সাজান"
                className="appearance-none rounded-xl border border-gray-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-gray-800 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
            >
                <option value="default">ডিফল্ট</option>
                <option value="price-asc">দাম: কম থেকে বেশি</option>
                <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default SortDropdown;
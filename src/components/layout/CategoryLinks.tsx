"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const CategoryLinks = ({ categories }: { categories: Category[] }) => {
    const pathname = usePathname();

    const linkClass = (active: boolean) =>
        `flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active
            ? "border-green-700 bg-green-700 text-white"
            : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-700"
        }`;

    return (
        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
            <Link href="/" className={linkClass(pathname === "/")}>
                হোম
            </Link>

            {categories.map((c) => (
                <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className={linkClass(pathname === `/category/${c.slug}`)}
                >
                    <span>{c.icon}</span>
                    <span>{c.nameBn}</span>
                </Link>
            ))}
        </nav>
    );
};

export default CategoryLinks;
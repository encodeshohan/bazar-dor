import Link from "next/link";
import { Suspense } from "react";
import HeaderDate from "./HeaderDate";
import NavLinks from "./NavLinks";
import UserInfo from "../auth/UserInfo";
import Image from "next/image";

const NavSkeleton = () => (
    <div className="mx-auto flex max-w-7xl gap-2 overflow-hidden px-4 pb-3">
        {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-gray-200" />
        ))}
    </div>
);

const Header = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/assets/logo-icon.png"
                        width={44}
                        height={44}
                        alt="বাজার দর লোগো"
                        className="size-11 rounded-2xl bg-green-700 p-1.5"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold leading-tight text-green-700 sm:text-2xl">
                            বাজার দর
                        </span>
                        <Suspense
                            fallback={<span className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-200" />}
                        >
                            <HeaderDate />
                        </Suspense>
                    </div>
                </Link>

                <UserInfo />
            </div>

            <Suspense fallback={<NavSkeleton />}>
                <NavLinks />
            </Suspense>
        </header>
    );
};

export default Header;
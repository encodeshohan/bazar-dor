import Image from "next/image";
import HeaderDate from "../layout/HeaderDate";
import { Suspense } from "react";

const Hero = () => {
    return (
        <section className="mx-4 mt-6 grid items-center gap-6 rounded-2xl border border-green-100 bg-green-50 p-6 md:grid-cols-2 md:p-10">
            {/* Left side: Text and button */}
            <div className="space-y-4">
                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                    <Suspense
                        fallback={
                            <span className="mt-1 h-4 w-40 animate-pulse rounded bg-gray-200" />
                        }
                    >
                        <HeaderDate />
                    </Suspense>
                </span>

                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                    আজকের বাজারের দাম এক নজরে
                </h1>

                <p className="text-gray-600">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
                    বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং
                    দামের পরিবর্তন এক জায়গায়।
                </p>

                <a
                    href="#সব-পণ্য"
                    className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    সব পণ্য দেখুন
                </a>
            </div>

            {/* Right side: Image */}
            <div className="flex justify-center md:justify-end">
                <Image
                    src="/assets/bazar-hero.png"
                    alt="বাজারের পণ্যের ঝুড়ি"
                    width={315}
                    height={263}
                    className="h-auto max-w-full object-contain"
                    priority
                />
            </div>
        </section>
    );
};

export default Hero;
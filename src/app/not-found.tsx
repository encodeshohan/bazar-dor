import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <div className="text-5xl">🔍</div>
                <p className="text-sm font-semibold text-green-700">
                    ৪০৪ - পেজটি পাওয়া যায়নি
                </p>
                <h1 className="text-2xl font-bold text-gray-900">ভুল ঠিকানায় এসেছেন!</h1>
                <p className="text-sm text-gray-500">
                    আপনি যে পেজ বা পণ্যটি খুঁজছেন তা নেই অথবা সরানো হয়েছে।
                </p>
                <Link
                    href="/"
                    className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
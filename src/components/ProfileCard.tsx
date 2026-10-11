"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const ProfileCard = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    if (isPending) {
        return (
            <div className="mx-4 mt-10 h-72 animate-pulse rounded-2xl border border-gray-200 bg-white sm:mx-auto sm:max-w-md" />
        );
    }

    if (!user) {
        return (
            <div className="mx-4 mt-10 space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center sm:mx-auto sm:max-w-md">
                <p className="text-gray-500">প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন।</p>
                <Link
                    href="/signin?callbackUrl=/profile"
                    className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-8">
                <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-800">
                    {user.name?.trim().charAt(0).toUpperCase() || "U"}
                </div>

                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <Link
                    href="/profile/update"
                    className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    প্রোফাইল আপডেট করুন
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
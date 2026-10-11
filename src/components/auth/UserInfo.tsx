"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            return;
        }

        toast.success("সফলভাবে সাইন আউট হয়েছে!");
        router.push("/");
        router.refresh();
    };

    if (isPending) {
        return <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200" />;
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/signin"
                    className="rounded-lg px-3 py-2 font-medium text-gray-700 transition-colors hover:text-green-700"
                >
                    সাইন ইন
                </Link>
                <Link
                    href="/signup"
                    className="rounded-lg bg-green-700 px-3 py-2 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3">
            <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-700"
            >
                <span className="flex size-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                    {user.name?.trim().charAt(0).toUpperCase() || "U"}
                </span>
                <span className="hidden max-w-32 truncate sm:inline">{user.name}</span>
            </Link>

            <Button variant="secondary" onPress={handleSignOut} className="text-sm">
                সাইন আউট
            </Button>
        </div>
    );
};

export default UserInfo;
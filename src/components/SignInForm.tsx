"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { getSafeCallbackUrl } from "@/lib/utils";
import SocialButtons from "./SocialButtons";

const SignInForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchParams.get("callbackUrl")) {
            toast.error("বিস্তারিত দেখতে অনুগ্রহ করে আগে সাইন ইন করুন।", {
                id: "auth-required",
            });
        }
    }, [searchParams]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        setIsLoading(true);
        const { error } = await authClient.signIn.email({ email, password });
        setIsLoading(false);

        if (error) {
            toast.error("সাইন ইন করা যায়নি। ইমেইল ও পাসওয়ার্ড ঠিক আছে কিনা দেখুন।");
            return;
        }

        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push(callbackUrl);
        router.refresh();
    };



    return (
        <div className="mx-4 mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
                    <p className="text-sm text-gray-500">
                        সব বিস্তারিত দাম দেখতে আপনার অ্যাকাউন্টে সাইন ইন করুন।
                    </p>
                </div>

                <Form onSubmit={onSubmit} className="space-y-4">
                    <TextField isRequired name="email" type="email">
                        <Label>ইমেইল</Label>
                        <Input placeholder="you@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="password" type="password">
                        <Label>পাসওয়ার্ড</Label>
                        <Input placeholder="আপনার পাসওয়ার্ড" />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className="w-full bg-green-700 text-white hover:bg-green-800"
                    >
                        {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
                    </Button>
                </Form>

                <p className="text-center text-xs text-gray-400">অথবা</p>

                <SocialButtons callbackURL={callbackUrl} />

                <p className="text-center text-sm text-gray-500">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link href="/signup" className="font-semibold text-green-700 hover:underline">
                        সাইন আপ করুন
                    </Link>
                </p>
                <p className="text-center text-sm">
                    <Link href="/" className="text-gray-500 hover:text-green-700">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInForm;
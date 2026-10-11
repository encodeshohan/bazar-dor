"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import SocialButtons from "../SocialButtons";

const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name")).trim();
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));
        const confirmPassword = String(formData.get("confirmPassword"));

        if (password !== confirmPassword) {
            toast.error("পাসওয়ার্ড দুটি মিলছে না।");
            return;
        }

        setIsLoading(true);
        const { error } = await authClient.signUp.email({ name, email, password });
        setIsLoading(false);

        if (error) {
            toast.error(
                `অ্যাকাউন্ট তৈরি করা যায়নি${error.message ? `: ${error.message}` : "।"}`,
            );
            return;
        }

        toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
        router.push("/signin");
    };

    return (
        <div className="mx-4 mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
                    <p className="text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <Form onSubmit={onSubmit} className="space-y-4">
                    <TextField isRequired name="name">
                        <Label>নাম</Label>
                        <Input placeholder="আপনার নাম" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="email" type="email">
                        <Label>ইমেইল</Label>
                        <Input placeholder="you@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) =>
                            value.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।" : null
                        }
                    >
                        <Label>পাসওয়ার্ড</Label>
                        <Input placeholder="কমপক্ষে ৮ অক্ষর" />
                        <FieldError />
                    </TextField>

                    <TextField isRequired name="confirmPassword" type="password">
                        <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                        <Input placeholder="পাসওয়ার্ড আবার লিখুন" />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className="w-full bg-green-700 text-white hover:bg-green-800"
                    >
                        {isLoading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
                    </Button>
                </Form>

                <p className="text-center text-xs text-gray-400">অথবা</p>

                <SocialButtons />

                <p className="text-center text-sm text-gray-500">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link href="/signin" className="font-semibold text-green-700 hover:underline">
                        সাইন ইন করুন
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

export default SignUpForm;
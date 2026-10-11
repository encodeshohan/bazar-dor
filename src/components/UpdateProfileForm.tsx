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

const UpdateProfileForm = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = String(formData.get("name")).trim();

        if (!name) {
            toast.error("নাম খালি রাখা যাবে না।");
            return;
        }

        if (name === user?.name) {
            toast("নামে কোনো পরিবর্তন নেই।");
            return;
        }

        setIsLoading(true);
        const { error } = await authClient.updateUser({ name });
        setIsLoading(false);

        if (error) {
            toast.error(
                `তথ্য আপডেট করা যায়নি${error.message ? `: ${error.message}` : "।"}`,
            );
            return;
        }

        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="mx-4 mt-10 h-72 animate-pulse rounded-2xl border border-gray-200 bg-white sm:mx-auto sm:max-w-md" />
        );
    }

    if (!user) {
        return (
            <div className="mx-4 mt-10 space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-center sm:mx-auto sm:max-w-md">
                <p className="text-gray-500">তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন।</p>
                <Link
                    href="/signin?callbackUrl=/profile/update"
                    className="inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-800"
                >
                    সাইন ইন করুন
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                <div className="space-y-1 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">প্রোফাইল আপডেট</h1>
                    <p className="text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
                </div>

                <Form onSubmit={onSubmit} className="space-y-4">
                    <TextField isRequired name="name" defaultValue={user.name}>
                        <Label>নাম</Label>
                        <Input placeholder="আপনার নাম" />
                        <FieldError />
                    </TextField>

                    <TextField isReadOnly name="email" defaultValue={user.email}>
                        <Label>ইমেইল</Label>
                        <Input />
                    </TextField>

                    <Button
                        type="submit"
                        isDisabled={isLoading}
                        className="w-full bg-green-700 text-white hover:bg-green-800"
                    >
                        {isLoading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
                    </Button>
                </Form>

                <p className="text-center text-sm">
                    <Link href="/profile" className="text-gray-500 hover:text-green-700">
                        ← প্রোফাইলে ফিরে যান
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UpdateProfileForm;
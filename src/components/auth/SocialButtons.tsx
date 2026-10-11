"use client";

import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SocialButtons = ({ callbackURL = "/" }: { callbackURL?: string }) => {
    const handleSocialSignIn = async (provider: "google" | "github") => {
        const { error } = await authClient.signIn.social({ provider, callbackURL });

        if (error) {
            toast.error("সোশ্যাল সাইন ইন করা যায়নি। পরে আবার চেষ্টা করুন।");
        }
    };

    return (
        <div className="space-y-3">
            <Button
                variant="secondary"
                className="w-full"
                onPress={() => handleSocialSignIn("google")}
            >
                Google দিয়ে চালিয়ে যান
            </Button>
            <Button
                variant="secondary"
                className="w-full"
                onPress={() => handleSocialSignIn("github")}
            >
                GitHub দিয়ে চালিয়ে যান
            </Button>
        </div>
    );
};

export default SocialButtons;
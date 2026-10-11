import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

const SignInPage = () => {
    return (
        <Suspense
            fallback={
                <div className="mx-4 mt-10 h-96 animate-pulse rounded-2xl border border-gray-200 bg-white sm:mx-auto sm:max-w-md" />
            }
        >
            <SignInForm />
        </Suspense>
    );
};

export default SignInPage;
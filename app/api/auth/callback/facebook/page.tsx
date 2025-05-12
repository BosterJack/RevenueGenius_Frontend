"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { CallbackLayout, LoadingFallback } from "@/components/callbackUI";

function FacebookCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { facebookCallback, facebookCallbackError, facebookCallbackSuccess } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            facebookCallback({ code });
        }
    }, [searchParams, facebookCallback]);

    useEffect(() => {
        if (facebookCallbackSuccess) {
            router.push("/dashboard");
        }
    }, [facebookCallbackSuccess, router]);

    useEffect(() => {
        if (facebookCallbackError) {
            console.error("Facebook callback error:", facebookCallbackError);
        }
    }, [facebookCallbackError]);

    return (
        <CallbackLayout message="Authentification Facebook en cours..." />
    );
}

export default function FacebookCallback() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <FacebookCallbackContent />
        </Suspense>
    );
}

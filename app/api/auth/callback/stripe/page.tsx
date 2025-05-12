"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { CallbackLayout, LoadingFallback } from "@/components/callbackUI";

function StripeCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { stripeCallback, stripeCallbackError, stripeCallbackSuccess } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            stripeCallback({ code });
        }
    }, [searchParams, stripeCallback]);

    useEffect(() => {
        if (stripeCallbackSuccess) {
            router.push("/dashboard");
        }
    }, [stripeCallbackSuccess, router]);

    useEffect(() => {
        if (stripeCallbackError) {
            console.error("Stripe callback error:", stripeCallbackError);
        }
    }, [stripeCallbackError]);

    return (
        <CallbackLayout message="Connexion Stripe en cours..." />
    );
}

export default function StripeCallback() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <StripeCallbackContent />
        </Suspense>
    );
}

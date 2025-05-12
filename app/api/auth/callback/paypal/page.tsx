"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { CallbackLayout, LoadingFallback } from "@/components/callbackUI";

function PaypalCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { paypalCallback, paypalCallbackError, paypalCallbackSuccess } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
        if (code) {
            paypalCallback({ code });
        }
    }, [searchParams, paypalCallback]);

    useEffect(() => {
        if (paypalCallbackSuccess) {
            router.push("/dashboard");
        }
    }, [paypalCallbackSuccess, router]);

    useEffect(() => {
        if (paypalCallbackError) {
            console.error("PayPal callback error:", paypalCallbackError);
        }
    }, [paypalCallbackError]);

    return (
        <CallbackLayout message="Connexion PayPal en cours..." />
    );
}

export default function PaypalCallback() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <PaypalCallbackContent />
        </Suspense>
    );
}

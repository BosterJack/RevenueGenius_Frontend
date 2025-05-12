



// "use client";

// import { useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// function GoogleCallbackContent() {
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // Fonction pour échanger le code contre access_token et id_token
//     const exchangeCodeForTokens = async (code: string) => {
//         const params = new URLSearchParams({
//             code,
//             client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ,
//             client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ,
//             redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CALLBACK_URL ,
//             grant_type: "authorization_code",
//         });

//         const response = await fetch("https://oauth2.googleapis.com/token", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: params.toString(),
//         });

//         if (!response.ok) {
//             throw new Error(`Failed to exchange code: ${response.status}`);
//         }

//         return await response.json(); // { access_token, id_token, refresh_token, expires_in, ... }
//     };

//     useEffect(() => {
//         const handleAuthCallback = async () => {
//             const code = searchParams.get("code");

//             if (code) {
//                 try {
//                     // 1. Echanger le code contre les tokens auprès de Google
//                     const googleTokens = await exchangeCodeForTokens(code);

//                     // 2. Envoyer access_token, id_token et code à ton API
//                     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/social/google/`, {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({
//                             code: code,
//                             access_token: googleTokens.access_token,
//                             id_token: googleTokens.id_token,
//                         }),
//                     });

//                     if (!response.ok) {
//                         throw new Error(`Server responded with ${response.status}`);
//                     }

//                     const tokens = await response.json();
//                     console.log(tokens, 'tokens');

//                     // 3. Stocker les tokens
//                     localStorage.setItem("accessToken", tokens.accessToken);
//                     localStorage.setItem("refreshToken", tokens.refreshToken);

//                     if (tokens.user) {
//                         localStorage.setItem("user", JSON.stringify(tokens.user));
//                     }

//                     // 4. Rediriger
//                     window.location.href = "/dashboard";
//                 } catch (error) {
//                     console.error("Error during authentication:", error);
//                     // router.push('/');
//                 }
//             }
//         };

//         handleAuthCallback();
//     }, [router, searchParams]);

//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
//                 <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-900 rounded-full opacity-5 translate-x-1/2"></div>
//                 <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-900 rounded-full opacity-5 -translate-y-1/3"></div>
//             </div>

//             <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
//                 <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                 <p className="text-white">Processing authentication...</p>
//             </div>
//         </div>
//     );
// }

// function LoadingFallback() {
//     return (
//         <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
//             <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
//                 <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
//                 <p className="text-white">Initializing...</p>
//             </div>
//         </div>
//     );
// }

// export default function GoogleCallback() {
//     return (
//         <Suspense fallback={<LoadingFallback />}>
//             <GoogleCallbackContent />
//         </Suspense>
//     );
// }

























"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";


function GoogleCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { googleCallback, googleCallbackError, googleCallbackSuccess } = useAuth();

    useEffect(() => {
        const code = searchParams.get("code");
         const state = searchParams.get("state") ?? null;
        if (code) {
            googleCallback({ code, state });
        }
    }, [searchParams, googleCallback]);

    useEffect(() => {
        if (googleCallbackSuccess) {
            router.push("/dashboard");
        }
    }, [googleCallbackSuccess, router]);

    useEffect(() => {
        if (googleCallbackError) {
            console.error("Google callback error:", googleCallbackError);
           
        }
    }, [googleCallbackError]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-900 rounded-full opacity-5 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-900 rounded-full opacity-5 -translate-y-1/3"></div>
            </div>

            <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white">Authentification en cours...</p>
            </div>
        </div>
    );
}

function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
            <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white">Initialisation...</p>
            </div>
        </div>
    );
}

export default function GoogleCallback() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <GoogleCallbackContent />
        </Suspense>
    );
}

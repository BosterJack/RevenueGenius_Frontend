// components/CallbackUI.tsx

export function CallbackLayout({ message }: { message: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-purple-900 rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-900 rounded-full opacity-5 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-900 rounded-full opacity-5 -translate-y-1/3"></div>
            </div>

            <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white">{message}</p>
            </div>
        </div>
    );
}

export function LoadingFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 font-[Inter]">
            <div className="glass-effect w-full max-w-md p-8 rounded-2xl shadow-2xl text-center">
                <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-white">Initialisation...</p>
            </div>
        </div>
    );
}

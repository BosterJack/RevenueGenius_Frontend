// "use client"
// import type React from "react"
// import { Sidebar } from "@/components/sidebar"
// import { TopNav } from "@/components/top-nav"
// import { AuthGuard } from "@/components/auth/auth-guard"
// import NextTopLoader from "nextjs-toploader";
// import { useEffect } from "react";
// import { useBusiness } from "@/hooks/useBusiness";
// import { useRouter } from "next/navigation";
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { isLoadingBusinesses, businesses } = useBusiness();
// const router = useRouter();

// useEffect(() => {
//   if (!isLoadingBusinesses && Array.isArray(businesses) && businesses.length === 0) {
//     const timeout = setTimeout(() => {
//       router.push('/dashboard/no-business');
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }
// }, [isLoadingBusinesses, businesses, router]);

//   return (
//     //<AuthGuard>
//       <div className="h-full relative">
//         <NextTopLoader
//             zIndex={1000}
//             height={5}
//             color="#B91C1C"
//             showSpinner={true}
//           />
//         <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white">
//           <Sidebar />
//         </div>
//         <main className="md:pl-72">
//           <TopNav />
//           <div className="p-8">{children}</div>
//         </main>
//       </div>
//     //</AuthGuard>
//   )
// }

"use client";
import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { AuthGuard } from "@/components/auth/auth-guard";
import NextTopLoader from "nextjs-toploader";
import { useEffect } from "react";
import { useBusiness } from "@/hooks/useBusiness";
import { useRouter } from "next/navigation";
import { BusinessGuard } from "@/components/business/business-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative">
      <NextTopLoader
        zIndex={1000}
        height={5}
        color="#B91C1C"
        showSpinner={true}
      />
       <BusinessGuard>
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[20] bg-white">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <TopNav />
        <div className="p-8">
         {children}
        </div>
      </main>
      </BusinessGuard>

    </div>
  );
}

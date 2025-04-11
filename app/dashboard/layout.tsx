
"use client";
import { BusinessGuard } from "@/components/business/business-guard";
import { PlanGuard } from "@/components/plans/plans-guard";
import { Sidebar } from "@/components/sidebar";
import { TopNav } from "@/components/top-nav";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
import type React from "react";

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
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[20] bg-white">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <TopNav />
        <PlanGuard>
          <BusinessGuard>
            <div className="p-8">{children}</div>
          </BusinessGuard>
        </PlanGuard>
      </main>
       <Toaster />
    </div>
  );
}

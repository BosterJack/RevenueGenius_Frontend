import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNav } from "@/components/top-nav"
import { AuthGuard } from "@/components/auth/auth-guard"
import NextTopLoader from "nextjs-toploader";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //<AuthGuard>
      <div className="h-full relative">
        <NextTopLoader
            zIndex={1000}
            height={5}
            color="#B91C1C"
            showSpinner={true}
          />
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-white">
          <Sidebar />
        </div>
        <main className="md:pl-72">
          <TopNav />
          <div className="p-8">{children}</div>
        </main>
      </div>
    //</AuthGuard>
  )
}


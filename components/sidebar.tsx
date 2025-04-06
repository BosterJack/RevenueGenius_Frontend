"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LineChart,
  Users,
  FileText,
  Target,
  Calculator,
  Settings,
  Home,
  Menu,
  X,
  DollarSign,
  UserCog2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
const {user}=useAuth()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: " Forecasting",
      icon: LineChart,
      href: "/dashboard/forecasting",
      active: pathname === "/dashboard/forecasting",
    },
    {
      label: "Lead Tracking",
      icon: Users,
      href: "/dashboard/leads",
      active: pathname === "/dashboard/leads",
    },
    {
      label: "Content ROI Analysis",
      icon: BarChart3,
      href: "/dashboard/content",
      active: pathname === "/dashboard/content",
    },
    {
      label: "Goals and Milestones",
      icon: Target,
      href: "/dashboard/goals",
      active: pathname === "/dashboard/goals",
    },
    {
      label: "Break even",
      icon: Calculator,
      href: "/dashboard/break-even",
      active: pathname === "/dashboard/break-even",
    },
    {
      label: "Revenue",
      icon: FileText,
      href: "/dashboard/revenue",
      active: pathname === "/dashboard/revenue",
    },
    {
      label: "Subscription",
      icon: DollarSign,
      href: "/dashboard/subscription",
      active: pathname === "/dashboard/subscription",
    },
    {
      label: "Users management",
      icon: UserCog2Icon,
      href: "/dashboard/users-management",
      active: pathname === "/dashboard/users-management",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 flex w-72 flex-col bg-white border-r shadow-sm transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">Jerry Genie</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start space-y-2 px-4 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-brand-blue",
                  route.active
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-gray-500"
                )}
              >
                <route.icon
                  className={cn(
                    "h-4 w-4",
                    route.active ? "text-brand-blue" : "text-gray-500"
                  )}
                />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg bg-brand-blue/10 p-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-brand-blue h-10 w-10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Subscription
                </p>
                <p className="font-medium">Pro Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

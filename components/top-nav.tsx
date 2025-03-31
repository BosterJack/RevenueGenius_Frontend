"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

export function TopNav() {
  const { user, notifications } = useAuth();
  const userData = {
    username: user?.username,
    email: user?.email,
    last_name: user?.last_name,
    first_name: user?.first_name,
  };
  notifications && console.log(notifications, "notifications");
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-[200px] lg:w-[300px] pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                {Array.isArray(notifications) && notifications?.length > 0 &&
                  notifications.map((notification, index) => (
                    <DropdownMenuItem key={index} className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">
                          Nouvel objectif atteint
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Vous avez atteint 80% de votre objectif de revenus
                          mensuel.
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Il y a 2 heures
                        </p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {Array.isArray(notifications) && notifications?.length === 0 &&
                  <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm bg-gray-50 p-2 rounded-lg font-medium">
                          No notifications
                        </p>
                      </div>
                    </DropdownMenuItem>
                  }
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="Avatar" />
                  <AvatarFallback className="font-bold uppercase">
                    {userData?.username?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Profil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings?tab=business">Enterprise</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings?tab=subscription">
                  Abonnement
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start p-0"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

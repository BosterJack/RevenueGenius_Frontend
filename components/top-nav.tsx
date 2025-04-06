"use client"

import { AlertTriangle, ArrowLeft, Bell, Check, Eye, Info, MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutButton } from "@/components/auth/logout-button"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import StatusToast from "./toast-status"
import { use, useEffect, useState } from "react"
import NotificationDetail from "./notification/notification-detail"
import { Notification } from "@/types/notifications"
import { BusinessDropdown } from "./business/business-dropdown"
import { useBusiness } from "@/hooks/useBusiness"
import { useRouter } from "next/navigation"
import { set } from "date-fns"

// import NotificationDetail from "./notification-detail"

export function TopNav() {
  const {
    user,
    notifications,
    markAllNotifReadStatus,
    markAllNotifReadStatusError,
    markAllNotifReadStatusSuccess,
    markOneNotificationAsRead,
    markOneNotificationAsReadError,
    markOneNotificationAsReadSuccess,
    isMarkAllNotifReadStatus,
    isMarkOneNotificationAsRead,
  } = useAuth()
  const {businesses,isLoadingBusinesses}=useBusiness()
const router = useRouter()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)

  const userData = {
    username: user?.username,
    email: user?.email,
    last_name: user?.last_name,
    first_name: user?.first_name,
  }
 
  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "A few seconds ago"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <Check className="h-4 w-4 text-green-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  function markAllAsRead() {
    markAllNotifReadStatus({ notifData: { is_read: true } })
  }

  function markOneAsRead(notificationId: string) {
    markOneNotificationAsRead({ id: notificationId, data: { is_read: true } })
  }
const handleLogout = () => {
  localStorage.removeItem("ACCESS_TOKEN")
 
  router.push("/signin")
}
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div><BusinessDropdown/></div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {Array.isArray(notifications) && notifications.some((n) => !n.is_read) && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className={cn(
                "w-[350px]",
                isMarkAllNotifReadStatus && "bg-blue-50 opacity-50",
                isMarkOneNotificationAsRead && "bg-blue-50 opacity-50",
              )}
            >
              {selectedNotification ? (
                <div>
                  <div className="flex items-center p-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-8 w-8 mr-2"
                      onClick={() => setSelectedNotification(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="font-medium">Notification Details</span>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-3">
                    <NotificationDetail
                      notification={selectedNotification}
                      formatRelativeTime={formatRelativeTime}
                      getCategoryIcon={getCategoryIcon}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                      <p>Notifications</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-xs h-7 px-2 py-1" asChild>
                          <Link href="/dashboard/notifications">View All</Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs h-7 px-2 py-1 text-muted-foreground"
                        >
                          Mark all as read
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] space-y-2 overflow-auto">
                    {Array.isArray(notifications) && notifications?.length > 0 ? (
                      notifications.map((notification, index) => (
                        <DropdownMenuItem
                          key={index}
                          
                          className={cn("cursor-pointer border-b pb-4", !notification.is_read && "bg-blue-50")}
                        >
                          <div onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedNotification(notification)
                                  }} className="flex items-start gap-2 w-full">
                            <div className="mt-1">{getCategoryIcon(notification.category)}</div>
                            <div className="flex flex-col space-y-1 flex-1">
                             <div className="justify-between flex items-center gap-1 pb-2">
                               <p className={cn("text-sm font-medium", !notification.is_read && "font-semibold")}>
                                {notification.title}
                              </p>
                               <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2 py-0 ml-auto flex items-center gap-1"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedNotification(notification)
                                  }}
                                >
                                  View <Eye className="h-3 w-3 ml-1" />
                                </Button>
                             </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                              <div className="flex justify-between py-1 items-center gap-1">
                                <p className="text-xs text-muted-foreground">
                                  {formatRelativeTime(notification.created_at)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification?.is_read ? "Read" : "Unread"}
                                </p>
                              </div>

                              <div className="flex justify-between items-center">
                                {!notification?.is_read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs h-6 px-2 py-0 text-muted-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      markOneAsRead(notification.id)
                                    }}
                                  >
                                    Mark as read
                                  </Button>
                                )}
                               
                              </div>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem className="cursor-pointer">
                        <div className="flex flex-col space-y-1 w-full">
                          <p className="text-sm bg-gray-50 p-2 rounded-lg font-medium text-center">No notifications</p>
                        </div>
                      </DropdownMenuItem>
                    )}
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="Avatar" />
                  <AvatarFallback className="font-bold uppercase">{userData?.username?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Profile</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem asChild>
                <Link href="/dashboard/settings?tab=business">Business</Link>
              </DropdownMenuItem> */}
              <DropdownMenuItem asChild>
                <Link href="/dashboard/subscription">Subscription</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogoutButton variant="ghost" size="sm" className="w-full justify-start p-0" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <StatusToast
        status={
          isMarkAllNotifReadStatus || isMarkOneNotificationAsRead
            ? "pending"
            : markAllNotifReadStatusError || markOneNotificationAsReadError
              ? "error"
              : markAllNotifReadStatusSuccess || markOneNotificationAsReadSuccess
                ? "success"
                : "idle"
        }
      />
    </div>
  )
}


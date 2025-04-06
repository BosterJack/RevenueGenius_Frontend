"use client"

import { useAuth } from "@/hooks/use-auth"
import { useState, useEffect } from "react"

import { AlertTriangle, ArrowLeft, Check, Eye, Info, MessageSquare, Search, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Notification } from "@/types/notifications"
import NotificationDetail from "@/components/notification/notification-detail"

export default function NotificationsPage() {
  const { notifications, markOneNotificationAsRead } = useAuth()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [readFilter, setReadFilter] = useState<string>("all")
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all")
  const [groupBy, setGroupBy] = useState<string>("none")

  useEffect(() => {
    if (Array.isArray(notifications)) {
      let filtered = [...notifications]

      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(
          (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      // Apply category filter
      if (categoryFilter !== "all") {
        filtered = filtered.filter((n) => n.category === categoryFilter)
      }

      // Apply read status filter
      if (readFilter !== "all") {
        const isRead = readFilter === "read"
        filtered = filtered.filter((n) => n.is_read === isRead)
      }

      // Apply urgency filter
      if (urgencyFilter !== "all") {
        const isUrgent = urgencyFilter === "urgent"
        filtered = filtered.filter((n) => n.is_urgent === isUrgent)
      }

      setFilteredNotifications(filtered)
    }
  }, [notifications, searchQuery, categoryFilter, readFilter, urgencyFilter])

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "A few seconds ago"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

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

  const markAsRead = (notificationId: string) => {
    markOneNotificationAsRead({ id: notificationId, data: { is_read: true } })
  }

  const clearFilters = () => {
    setSearchQuery("")
    setCategoryFilter("all")
    setReadFilter("all")
    setUrgencyFilter("all")
    setGroupBy("none")
  }

  // Group notifications based on selected grouping
  const getGroupedNotifications = () => {
    if (groupBy === "none") {
      return { "All Notifications": filteredNotifications }
    }

    if (groupBy === "category") {
      return filteredNotifications.reduce(
        (groups, notification) => {
          const category = notification.category_display || notification.category
          if (!groups[category]) {
            groups[category] = []
          }
          groups[category].push(notification)
          return groups
        },
        {} as Record<string, Notification[]>,
      )
    }

    if (groupBy === "date") {
      return filteredNotifications.reduce(
        (groups, notification) => {
          const date = new Date(notification.created_at).toLocaleDateString()
          if (!groups[date]) {
            groups[date] = []
          }
          groups[date].push(notification)
          return groups
        },
        {} as Record<string, Notification[]>,
      )
    }

    if (groupBy === "read_status") {
      return filteredNotifications.reduce(
        (groups, notification) => {
          const status = notification.is_read ? "Read" : "Unread"
          if (!groups[status]) {
            groups[status] = []
          }
          groups[status].push(notification)
          return groups
        },
        {} as Record<string, Notification[]>,
      )
    }

    return { "All Notifications": filteredNotifications }
  }

  const groupedNotifications = getGroupedNotifications()

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>

        {Object.values(groupedNotifications).flat().length > 0 && (
          <div className="text-sm text-muted-foreground">
            {Object.values(groupedNotifications).flat().length} notification
            {Object.values(groupedNotifications).flat().length !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {selectedNotification ? (
        <div>
          <Button variant="outline" onClick={() => setSelectedNotification(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to notifications
          </Button>
          <Card>
            <CardContent className="pt-6">
              <NotificationDetail
                notification={selectedNotification}
                formatRelativeTime={formatRelativeTime}
                getCategoryIcon={getCategoryIcon}
                showFullWidth={true}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="message">Message</SelectItem>
                </SelectContent>
              </Select>

              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Read Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Group By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Grouping</SelectItem>
                  <SelectItem value="category">By Category</SelectItem>
                  <SelectItem value="date">By Date</SelectItem>
                  <SelectItem value="read_status">By Read Status</SelectItem>
                </SelectContent>
              </Select>

              {(searchQuery ||
                categoryFilter !== "all" ||
                readFilter !== "all" ||
                urgencyFilter !== "all" ||
                groupBy !== "none") && (
                <Button variant="ghost" size="icon" onClick={clearFilters} className="h-10 w-10">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {Object.keys(groupedNotifications).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(groupedNotifications).map(([group, notifications]) => (
                <div key={group}>
                  {Object.keys(groupedNotifications).length > 1 && (
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg font-semibold">{group}</h2>
                      <Badge variant="outline">{notifications.length}</Badge>
                    </div>
                  )}

                  <div className="space-y-3">
                    {notifications.map((notification, index) => (
                      <Card key={index} className={`${!notification.is_read ? "border-l-4 border-l-blue-500" : ""}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-1.5 rounded-full bg-muted mt-1">
                              {getCategoryIcon(notification.category)}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className={`text-base ${!notification.is_read ? "font-semibold" : "font-medium"}`}>
                                  {notification.title}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                                  {formatRelativeTime(notification.created_at)}
                                  {notification.is_urgent && (
                                    <Badge variant="destructive" className="ml-1">
                                      Urgent
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>

                              <div className="flex justify-between items-center mt-3">
                                <div className="flex items-center gap-2">
                                  {!notification.is_read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 text-xs"
                                      onClick={() => markAsRead(notification.id)}
                                    >
                                      Mark as read
                                    </Button>
                                  )}
                                  <Badge variant="outline">
                                    {notification.category_display || notification.category}
                                  </Badge>
                                </div>

                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 gap-1"
                                  onClick={() => setSelectedNotification(notification)}
                                >
                                  View <Eye className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Bell className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No notifications found</h2>
              <p className="text-muted-foreground">
                {searchQuery || categoryFilter !== "all" || readFilter !== "all" || urgencyFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "You don't have any notifications yet."}
              </p>
              {(searchQuery || categoryFilter !== "all" || readFilter !== "all" || urgencyFilter !== "all") && (
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}


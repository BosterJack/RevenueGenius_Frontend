import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { Notification } from "@/types/notifications"

interface NotificationDetailProps {
  notification: Notification
  formatRelativeTime: (dateString: string) => string
  getCategoryIcon: (category: string) => React.ReactNode
  showFullWidth?: boolean
}

export default function NotificationDetail({
  notification,
  formatRelativeTime,
  getCategoryIcon,
  showFullWidth = false,
}: NotificationDetailProps) {
  return (
    <div className={`${showFullWidth ? "max-w-2xl mx-auto" : ""}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-full bg-muted">{getCategoryIcon(notification.category)}</div>
        <div>
          <Badge
          //@ts-ignore
            variant={
              notification.category === "warning"
                ? "destructive"
                : notification.category === "success"
                  ? "success"
                  : notification.category === "info"
                    ? "secondary"
                    : "outline"
            }
          >
            {notification.category_display || notification.category}
          </Badge>
          {notification.is_urgent && (
            <Badge variant="destructive" className="ml-2">
              Urgent
            </Badge>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">{notification.title}</h3>

      <div className="text-sm mb-4 whitespace-pre-wrap">{notification.message}</div>

      <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
        <span>{formatRelativeTime(notification.created_at)}</span>
        <span>{new Date(notification.created_at).toLocaleString()}</span>
      </div>

      {/* {notification.action_url && (
        <Button asChild className="w-full mt-2">
          <Link href={notification.action_url} className="flex items-center justify-center">
            Take Action <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )} */}
    </div>
  )
}


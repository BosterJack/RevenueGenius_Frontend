export type NotificationCategory = "lead" | "forecast" | "content" | "milestone" | "system"

export interface Notification {
  id: string
  title: string
  message: string
  category: string
  category_display: string
  action_url: string | null
  created_at: string
  is_read: boolean
  is_urgent: boolean
}


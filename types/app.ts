import type { User, Business, Subscription } from "./auth"
import type { Notification } from "./notifications"

export interface AppState {
  user: User | null
  business: Business | null
  subscription: Subscription | null
  notifications: {
    unread: number
    items: Notification[]
  }
  isLoading: boolean
  error: string | null
}


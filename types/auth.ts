export interface User {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  address: string | null
  phone: string | null
  profile_image: string | null
  stripe_customer_id: string | null
}

export interface Business {
  id: string
  owner: string // User ID
  name: string
  industry: string
  size: string
  created_at: string
  updated_at: string
}

export type SubscriptionPlan = "basic" | "pro" | "lifetime"
export type BillingPeriod = "monthly" | "annually"

export interface Subscription {
  id: string
  user: string // User ID
  plan: SubscriptionPlan
  is_active: boolean
  started_at: string
  expires_at: string | null
  billing_period: BillingPeriod
  is_pro: boolean // Calculé côté serveur
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user_plan: SubscriptionPlan | null
  is_pro: boolean
}


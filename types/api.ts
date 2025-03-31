export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ErrorResponse {
  error: string
  detail?: string
  upgrade_url?: string
}

export interface AuthResponse {
  access: string
  refresh: string
  user_plan: string | null
  is_pro: boolean
}


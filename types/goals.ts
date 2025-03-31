export type GoalType = "revenue" | "leads" | "conversion" | "customers" | "other"

export interface Goal {
  id: string
  business: string // Business ID
  name: string
  type: GoalType
  type_display: string
  target_value: number
  start_date: string
  target_date: string
  description: string | null
  is_completed: boolean
  current_value: number // Calculé côté serveur
  progress_percentage: number // Calculé côté serveur
  created_at: string
  updated_at: string
}

export interface GoalWithMilestones extends Goal {
  milestones: Milestone[]
}

export interface Milestone {
  id: string
  goal: string // Goal ID
  name: string
  target_value: number
  target_date: string
  is_completed: boolean
  created_at: string
  updated_at: string
}


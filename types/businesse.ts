export interface Business {
  id: string
  owner: string // User ID
  name: string
  industry: string
  size: string
  created_at: string
  updated_at: string
}

export interface BusinessFormValues {
  name: string
  industry: string
  size: string
}


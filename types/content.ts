export type ContentType = "blog" | "email" | "webinar" | "video" | "social" | "other"

export interface Content {
  id: string
  business: string // Business ID
  title: string
  type: ContentType
  type_display: string
  publish_date: string
  url: string | null
  cost: number
  roi: number // Calculé côté serveur
  created_at: string
  updated_at: string
}

export interface ContentWithRelations extends Content {
  performance: ContentPerformance | null
  conversions: ContentConversion[]
}

export interface ContentPerformance {
  id: string
  content: string // Content ID
  visits: number
  leads: number
  conversions: number
  created_at: string
  updated_at: string
}

export interface ContentConversion {
  id: string
  content: string // Content ID
  date: string
  quantity: number
  revenue: number
  created_at: string
  updated_at: string
}

export interface ContentTypePerformance {
  name: string
  visits: number
  leads: number
  conversions: number
  roi: number
}

export interface MonthlyContentTrend {
  month: string
  visits: number
  leads: number
  conversions: number
  roi: number
}

export interface ContentDetailedPerformance {
  id: string
  title: string
  type: ContentType
  publishDate: string
  visits: number
  leads: number
  conversions: number
  revenue: number
  cost: number
  roi: number
  lead_rate: number
  conversion_rate: number
}

export interface ContentInsight {
  type: string
  title: string
  description: string
}

export interface Performance {
  visits: number
  leads: number
  conversions: number
}

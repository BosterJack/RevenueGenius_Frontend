export type LeadStatus = "cold" | "warm" | "hot"
export type LeadSource = "blog" | "social" | "webinar" | "ads" | "referral" | "other"
export type InteractionType = "email" | "call" | "meeting" | "other"

export interface Lead {
  id: string
  business: string // Business ID
  name: string
  email: string
  phone: string | null
  source: LeadSource
  source_display: string
  status: LeadStatus
  status_display: string
  value: number | null
  date_added: string
  last_contact: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface LeadWithRelations extends Lead {
  interactions: LeadInteraction[]
  conversion: LeadConversion | null
}

export interface LeadInteraction {
  id: string
  lead: string // Lead ID
  date: string
  type: InteractionType
  type_display: string
  notes: string | null
  created_at: string
  updated_at: string
}

export interface LeadConversion {
  id: string
  lead: string // Lead ID
  conversion_date: string
  revenue: number
  product: string | null
  created_at: string
  updated_at: string
}

export interface LeadMetrics {
  total_leads: number
  conversion_rate: number
  avg_lead_value: number
  avg_response_time: number
}

export interface SourceValue {
  name: string
  value: number
}

export interface LeadTrend {
  name: string
  leads: number
  conversions: number
}

export interface LeadAnalytics {
  metrics: LeadMetrics
  sources: SourceValue[]
  trends: LeadTrend[]
}

export interface LeadInsight {
  type: string
  title: string
  description: string
  action?: string
  action_url?: string
}

export interface LTVCACData {
  current: {
    ltv: number
    cac: number
    ratio: number
  }
  monthly_trend: Array<{
    month: string
    ltv: number
    cac: number
    ratio: number
  }>
  recommendations: Array<{
    title: string
    description: string
  }>
}

export interface LeadSegmentationData {
  engagement_segments: {
    highly_engaged: number
    moderately_engaged: number
    not_engaged: number
  }
  value_segments: {
    high_value: number
    medium_value: number
    low_value: number
    unknown_value: number
  }
  purchase_timing: {
    ready_to_buy: number
    evaluating: number
    early_stage: number
  }
  priority_segments: Array<{
    name: string
    count: number
    description: string
    leads: Array<{
      id: string
      name: string
      email: string
      value?: number
      last_contact?: string
    }>
  }>
}


export interface RevenueData {
  id: string
  business: string // Business ID
  date: string
  amount: number
  source: string | null
  category: string | null
  created_at: string
  updated_at: string
}

export type ForecastScenario = "pessimistic" | "realistic" | "optimistic"

export interface ForecastData {
  id: string
  date: string
  amount: number
}

export interface Forecast {
  id: string
  business: string // Business ID
  created_at: string
  updated_at: string
  start_date: string
  end_date: string
  scenario: ForecastScenario
  scenario_display: string
  data_points: ForecastData[]
}


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

export interface BreakEvenAnalysis {
  id: string
  business: string // Business ID
  created_at: string
  updated_at: string
  fixed_costs: number
  avg_revenue_per_user: number
  variable_cost_per_user: number
  customers_needed: number
  monthly_revenue_needed: number
  profit_margin: number
  time_to_breakeven: number
}

export interface ConfidenceInterval {
  date: string
  lower: number
  upper: number
}

export interface AdvancedForecast extends Forecast {
  confidence_intervals: ConfidenceInterval[]
}

export interface WhatIfScenario {
  scenario_name: string
  base_forecast: Array<{ date: string; amount: number }>
  modified_forecast: Array<{ date: string; amount: number }>
  summary: {
    base_total: number
    modified_total: number
    difference: number
    percentage_change: number
  }
}


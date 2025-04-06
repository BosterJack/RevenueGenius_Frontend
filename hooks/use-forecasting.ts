"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { forecastService, revenueService } from "@/lib/api"

export function useForecasting() {
  const queryClient = useQueryClient()

  // Récupérer les prévisions
  const { data: forecasts, isLoading: isLoadingForecasts } = useQuery({
    queryKey: ["forecasts"],
    queryFn: () => forecastService.getForecasts(),
  })

  // Récupérer les données de revenus
  const { data: revenueData, isLoading: isLoadingRevenueData } = useQuery({
    queryKey: ["revenueData"],
    queryFn: () => {
      const today = new Date()
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(today.getMonth() - 6)
//@ts-ignore
      return revenueService.getRevenueData(sixMonthsAgo.toISOString().split("T")[0], today.toISOString().split("T")[0])
    },
  })

  // Mutation pour générer une prévision
  const generateForecastMutation = useMutation({
    mutationFn: ({ months, scenario }: { months: number; scenario: string }) =>
      forecastService.generateForecast(months, scenario),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] })
    },
  })

  // Mutation pour créer une prévision avancée
  const createAdvancedForecastMutation = useMutation({
    mutationFn: (forecastData: any) => forecastService.createAdvancedForecast(forecastData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] })
    },
  })

  // Mutation pour calculer le seuil de rentabilité
  const calculateBreakEvenMutation = useMutation({
    mutationFn: (breakEvenData: any) => forecastService.calculateBreakEven(breakEvenData),
  })

  // Mutation pour créer un scénario "what if"
  const createWhatIfScenarioMutation = useMutation({
    mutationFn: (scenarioData: any) => forecastService.createWhatIfScenario(scenarioData),
  })

  // Mutation pour ajouter des données de revenus
  const addRevenueDataMutation = useMutation({
    mutationFn: (revenueData: any) => revenueService.addRevenueData(revenueData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenueData"] })
      queryClient.invalidateQueries({ queryKey: ["forecasts"] })
    },
  })


  // Mutation pour mettre à jour un objectif
    const updateForecatsMutation = useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<any> }) => forecastService.updateForecast(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forecasts"] })
        queryClient.invalidateQueries({ queryKey: ["revenueData"] })
      },
    })


 // Mutation pour supprimer un seuil de rentabilité
  const deleteForecastMutation = useMutation({
    mutationFn: (id: string) => forecastService.deleteForecast(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forecasts"] })
    },
  })
  // Fonction pour exporter les prévisions au format CSV
  const exportForecasts = () => {
    if (!forecasts?.results) return

    const headers = ["Date", "Montant", "Scénario"]
    const csvRows = [
      headers.join(","),
      ...forecasts.results.flatMap((forecast: any) =>
        forecast.data_points.map((point: any) => [point.date, point.amount, forecast.scenario_display].join(",")),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "forecasts.csv")
    link.click()
  }

  return {
    forecasts,
    revenueData,
    isLoadingForecasts,
    isLoadingRevenueData,
    deleteForecast: deleteForecastMutation.mutate,
    isDeletingForecast: deleteForecastMutation.isPending,
    generateForecast: generateForecastMutation.mutate,
    isGeneratingForecast: generateForecastMutation.isPending,
    isGeneratingForecastSuccess: generateForecastMutation.isSuccess,
    isGeneratingForecastError: generateForecastMutation.isError,
    createAdvancedForecast: createAdvancedForecastMutation.mutate,
    isCreatingAdvancedForecast: createAdvancedForecastMutation.isPending,
    calculateBreakEven: calculateBreakEvenMutation.mutate,
    isCalculatingBreakEven: calculateBreakEvenMutation.isPending,
    breakEvenResult: calculateBreakEvenMutation.data,
    createWhatIfScenario: createWhatIfScenarioMutation.mutate,
    isCreatingWhatIfScenario: createWhatIfScenarioMutation.isPending,
    whatIfScenarioResult: createWhatIfScenarioMutation.data,
    addRevenueData: addRevenueDataMutation.mutate,
    isAddingRevenueData: addRevenueDataMutation.isPending,
    exportForecasts,
    updateForecats: updateForecatsMutation.mutate,
    isUpdatingForecats: updateForecatsMutation.isPending
  }
}


"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { revenueService } from "@/lib/api"

export function useRevenue() {
  const queryClient = useQueryClient()

  // Récupérer toutes les données de revenu
  const { data: revenueData, isLoading: isLoadingRevenue } = useQuery({
    queryKey: ["revenueData"],
    queryFn: () => revenueService.getRevenueData(),
  })

  // Créer une nouvelle entrée de revenu
  const createRevenueMutation = useMutation({
    mutationFn: (data: any) => revenueService.addRevenueData(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenueData"] })
    },
  })

  // Mettre à jour une entrée de revenu
  const updateRevenueMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      revenueService.updateRevenue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenueData"] })
    },
  })

  // Supprimer une entrée de revenu
  const deleteRevenueMutation = useMutation({
    mutationFn: (id: string) => revenueService.deleteRevenue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["revenueData"] })
    },
  })

  return {
    revenueData,
    isLoadingRevenue,

    createRevenue: createRevenueMutation.mutate,
    isCreatingRevenue: createRevenueMutation.isPending,
    isCreateRevenueSuccess: createRevenueMutation.isSuccess,

    updateRevenue: updateRevenueMutation.mutate,
    isUpdatingRevenue: updateRevenueMutation.isPending,
    isUpdateRevenueSuccess: updateRevenueMutation.isSuccess,

    deleteRevenue: deleteRevenueMutation.mutate,
    isDeletingRevenue: deleteRevenueMutation.isPending,
  }
}

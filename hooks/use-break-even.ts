"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { breakEvenService } from "@/lib/api"

export function useBreakEven() {
  const queryClient = useQueryClient()
const { data: breakEven, isLoading: isLoadingbreakEven } = useQuery({
    queryKey: ["breakEven"],
    queryFn: () => breakEvenService.getBreakEven(),
  })
  // Mutation pour calculer le seuil de rentabilité
  const calculateBreakEvenMutation = useMutation({
    mutationFn: (breakEvenData: any) => breakEvenService.calculateBreakEven(breakEvenData),
  })

  // Mutation pour ajouter un seuil de rentabilité
  const addBreakEvenMutation = useMutation({
    mutationFn: (breakEvenData: any) => breakEvenService.addBreakEven(breakEvenData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["breakEven"] })
    },
  })

  // Mutation pour supprimer un seuil de rentabilité
  const deleteBreakEvenMutation = useMutation({
    mutationFn: (id: string) => breakEvenService.deleteBreakEven(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["breakEven"] })
    },
  })

  // Mutation pour mettre à jour un seuil de rentabilité
  const updateBreakEvenMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => breakEvenService.updateBreakEven(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["breakEven"] })
    },
  })

  return {
    breakEven,
    isLoading: isLoadingbreakEven,
    calculateBreakEven: calculateBreakEvenMutation.mutate,
    isCalculating: calculateBreakEvenMutation.isPending,

    addBreakEven: addBreakEvenMutation.mutate,
    isAdding: addBreakEvenMutation.isPending,

    deleteBreakEven: deleteBreakEvenMutation.mutate,
    isDeleting: deleteBreakEvenMutation.isPending,

    updateBreakEven: updateBreakEvenMutation.mutate,
    isUpdating: updateBreakEvenMutation.isPending,
  }
}

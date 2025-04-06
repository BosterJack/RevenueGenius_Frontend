"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { planService } from "@/lib/api"

export function usePlans() {
  const queryClient = useQueryClient()

  // Récupérer tous les plans
  const { data: plans, isLoading: isLoadingPlans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => planService.getPlanData(),
  })

  // Mutation pour créer un plan
  const createPlanMutation = useMutation({
    mutationFn: (planData: any) => planService.addPlanData(planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] })
    },
  })

  // Mutation pour mettre à jour un plan
  const updatePlanMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => planService.updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] })
    },
  })

  // Mutation pour supprimer un plan
  const deletePlanMutation = useMutation({
    mutationFn: (id: string) => planService.deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] })
    },
  })

  return {
    plans,
    isLoadingPlans,

    createPlan: createPlanMutation.mutate,
    isCreatingPlan: createPlanMutation.isPending,
    isCreatingPlanSuccess: createPlanMutation.isSuccess,

    updatePlan: updatePlanMutation.mutate,
    isUpdatingPlan: updatePlanMutation.isPending,
    isUpdatePlanSuccess: updatePlanMutation.isSuccess,

    deletePlan: deletePlanMutation.mutate,
    isDeletingPlan: deletePlanMutation.isPending,
  }
}

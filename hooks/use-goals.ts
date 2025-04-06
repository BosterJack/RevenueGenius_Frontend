"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { goalService } from "@/lib/api"
import type { Goal, } from "@/types/goals"
import { GoalFormValues, MilestoneFormValues } from "@/lib/validations/goals"

export function useGoals() {
  const queryClient = useQueryClient()

  // Récupérer tous les objectifs
  const { data: goals, isLoading: isLoadingGoals } = useQuery({
    queryKey: ["goals"],
    queryFn: () => goalService.getGoals(),
  })

  // Récupérer les objectifs actifs
  const { data: activeGoals, isLoading: isLoadingActiveGoals } = useQuery({
    queryKey: ["activeGoals"],
    queryFn: () => goalService.getActiveGoals(),
  })

  // Mutation pour créer un objectif
  const createGoalMutation = useMutation({
    mutationFn: (goalData: GoalFormValues) => goalService.createGoal(goalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    },
  })

  // Mutation pour mettre à jour un objectif
  const updateGoalMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Goal> }) => goalService.updateGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    },
  })
 // Mutation pour supprimer du contenu
  const deleteGoalMutation = useMutation({
    mutationFn: (id: string) => goalService.deleteGoal(id),
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    },
  })

  // Mutation pour marquer un objectif comme complété
  const markGoalCompletedMutation = useMutation({
    mutationFn: (id: string) => goalService.markGoalCompleted(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    },
  })

  // Mutation pour créer un jalon
  const createMilestoneMutation = useMutation({
    mutationFn: ({ goalId, data }: { goalId: string; data: MilestoneFormValues }) =>
      goalService.createMilestone(goalId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    },
  })

  // Mutation pour mettre à jour un jalon
  const updateMilestoneMutation = useMutation({
    mutationFn: ({
      goalId,
      milestoneId,
      data,
    }: { goalId: string; milestoneId: string; data: Partial<MilestoneFormValues> }) =>
      goalService.updateMilestone(goalId, milestoneId, data),
    onSuccess: (variables) => {
      const { goalId } = variables;
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
      queryClient.invalidateQueries({ queryKey: ["goalMilestone", goalId] })
      
    },
  })

  // Mutation pour marquer un jalon comme complété
  const markMilestoneCompletedMutation = useMutation({
    mutationFn: ({ goalId, milestoneId }: { goalId: string; milestoneId: string }) =>
      goalService.markMilestoneCompleted(goalId, milestoneId),
    onSuccess: (variables) => {
      const { goalId } = variables;
      queryClient.invalidateQueries({ queryKey: ["goals"] })
      queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
       queryClient.invalidateQueries({ queryKey: ["goalMilestone", goalId] })
    },
  })
const deleteMilestoneGoalMutation = useMutation({
  mutationFn: ({ goalId, milestoneId }: { goalId: string; milestoneId: string }) => goalService.deleteGoalMilestone(goalId, milestoneId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["goals"] })
    queryClient.invalidateQueries({ queryKey: ["activeGoals"] })
    queryClient.invalidateQueries({ queryKey: ["leadAnalytics"] })
  },
})
 const useGoalMilestones = (goalId: string | undefined) => {
  return useQuery({
    queryKey: ["goalMilestone", goalId],
    queryFn: () => goalService.getGoalMilestone(goalId!),
    enabled: !!goalId,
  })
}
  // Fonction pour exporter les objectifs au format CSV
  const exportGoals = () => {
    if (!goals?.results) return

    const headers = [
      "Nom",
      "Type",
      "Valeur cible",
      "Valeur actuelle",
      "Progression",
      "Date de début",
      "Date cible",
      "Complété",
    ]
    const csvRows = [
      headers.join(","),
      ...goals.results.map((goal: Goal) =>
        [
          goal.name,
          goal.type_display,
          goal.target_value,
          goal.current_value,
          `${goal.progress_percentage}%`,
          goal.start_date,
          goal.target_date,
          goal.is_completed ? "Oui" : "Non",
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "goals.csv")
    link.click()
  }

  return {
    goals,
    activeGoals,
    isLoadingGoals,
    isLoadingActiveGoals,
    createGoal: createGoalMutation.mutate,
    isCreatingGoal: createGoalMutation.isPending,
    isCreationGoalSuccess: createGoalMutation.isSuccess,
    updateGoal: updateGoalMutation.mutate,
    isUpdatingGoal: updateGoalMutation.isPending,
    isUpdatingGoalSuccess: updateGoalMutation.isSuccess,
    markGoalCompleted: markGoalCompletedMutation.mutate,
    isMarkingGoalCompleted: markGoalCompletedMutation.isPending,
    createMilestone: createMilestoneMutation.mutate,
    isCreatingMilestone: createMilestoneMutation.isPending,
    updateMilestone: updateMilestoneMutation.mutate,
    isUpdatingMilestone: updateMilestoneMutation.isPending,
    markMilestoneCompleted: markMilestoneCompletedMutation.mutate,
    isMarkingMilestoneCompleted: markMilestoneCompletedMutation.isPending,
    exportGoals,
     deleteGoal: deleteGoalMutation.mutate,
     isCreationMilestoneSuccess:createMilestoneMutation.isSuccess, isUpdatingMilestoneSuccess:updateMilestoneMutation.isSuccess,
     deleteMilestoneGoal: deleteMilestoneGoalMutation.mutate,
     isDeletingMilestoneGoal: deleteMilestoneGoalMutation.isPending,
      goalMilestone: useGoalMilestones,
  }
}


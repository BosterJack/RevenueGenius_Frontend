"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { paymentMethodService } from "@/lib/api"

export function usePaymentMethods() {
  const queryClient = useQueryClient()

  // Récupérer toutes les méthodes de paiement
  const { data: paymentMethods, isLoading: isLoadingPaymentMethods } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: () => paymentMethodService.getPaymentMethods(),
  })

  // Créer une méthode de paiement
  const createPaymentMethodMutation = useMutation({
    mutationFn: (paymentData: any) => paymentMethodService.createPaymentMethod(paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] })
    },
  })

  // Mettre à jour une méthode de paiement
  const updatePaymentMethodMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      paymentMethodService.updatePaymentMethod(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] })
    },
  })

  // Supprimer une méthode de paiement
  const deletePaymentMethodMutation = useMutation({
    mutationFn: (id: string) => paymentMethodService.deletePaymentMethod(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] })
    },
  })

  return {
    paymentMethods,
    isLoadingPaymentMethods,

    createPaymentMethod: createPaymentMethodMutation.mutate,
    isCreatingPaymentMethod: createPaymentMethodMutation.isPending,
    isCreateSuccess: createPaymentMethodMutation.isSuccess,

    updatePaymentMethod: updatePaymentMethodMutation.mutate,
    isUpdatingPaymentMethod: updatePaymentMethodMutation.isPending,
    isUpdateSuccess: updatePaymentMethodMutation.isSuccess,

    deletePaymentMethod: deletePaymentMethodMutation.mutate,
    isDeletingPaymentMethod: deletePaymentMethodMutation.isPending,
    isDeleteSuccess: deletePaymentMethodMutation.isSuccess,
  }
}

"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { subscriptionService } from "@/lib/api"

export function useSubscriptions() {
  const queryClient = useQueryClient()

  // Récupérer toutes les subscriptions
  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => subscriptionService.getSubscriptions(),
  })

  // Créer une subscription
  const createSubscriptionMutation = useMutation({
    mutationFn: (subscriptionData: any) =>
      subscriptionService.createSubscription(subscriptionData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  // Mettre à jour une subscription
  const updateSubscriptionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      subscriptionService.updateSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  // Supprimer une subscription
  const deleteSubscriptionMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  // Annuler une subscription
  const cancelSubscriptionMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.cancelSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] })
    },
  })

  // Créer un payment intent
  const createPaymentIntentMutation = useMutation({
    mutationFn: (paymentData: any) => subscriptionService.createPaymentIntent(paymentData),
  })

  // Confirmer un paiement
  const confirmPaymentMutation = useMutation({
    mutationFn: (paymentData: any) => subscriptionService.confirmPayment(paymentData),
  })

  return {
    subscriptions,
    isLoadingSubscriptions,

    createSubscription: createSubscriptionMutation.mutate,
    isCreatingSubscription: createSubscriptionMutation.isPending,
    isCreateSuccess: createSubscriptionMutation.isSuccess,

    updateSubscription: updateSubscriptionMutation.mutate,
    isUpdatingSubscription: updateSubscriptionMutation.isPending,
    isUpdateSuccess: updateSubscriptionMutation.isSuccess,

    deleteSubscription: deleteSubscriptionMutation.mutate,
    isDeletingSubscription: deleteSubscriptionMutation.isPending,
    isDeleteSuccess: deleteSubscriptionMutation.isSuccess,

    cancelSubscription: cancelSubscriptionMutation.mutate,
    isCancellingSubscription: cancelSubscriptionMutation.isPending,
    isCancelSuccess: cancelSubscriptionMutation.isSuccess,

    createPaymentIntent: createPaymentIntentMutation.mutate,
    isCreatingPaymentIntent: createPaymentIntentMutation.isPending,

    confirmPayment: confirmPaymentMutation.mutate,
    isConfirmingPayment: confirmPaymentMutation.isPending,
  }
}

"use client"

import { useQuery } from "@tanstack/react-query"
import { subscriptionService } from "@/lib/api"

export function useSubscriptions() {
  // Récupérer toutes les souscriptions
  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: () => subscriptionService.getSubscriptions(),
  })

  return {
    subscriptions,
    isLoadingSubscriptions,
  }
}

"use client"

import { businessService } from "@/lib/api"
import { Business } from "@/types/businesse"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useState } from "react"

export function useBusiness() {
  const queryClient = useQueryClient()
  const [activeBusiness, setActiveBusiness] = useState<Business | null>(null)

  // Get all businesses
  const { data: businesses, isLoading: isLoadingBusinesses } = useQuery({
    queryKey: ["businesses"],
    queryFn: () => businessService.getBusinesses(),
  })

  // Mutation to create a business
  const createBusinessMutation = useMutation({
    mutationFn: (businessData: Partial<Business>) => businessService.createBusiness(businessData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
    },
  })

  // Mutation to update a business
  const updateBusinessMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Business> }) => businessService.updateBusiness(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
    },
  })

  // Mutation to delete a business
  const deleteBusinessMutation = useMutation({
    mutationFn: (id: string) => businessService.deleteBusiness(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
    },
  })

  // Mutation to set active business
  const setActiveBusinessMutation = useMutation({
    mutationFn: (id: string) => businessService.setActiveBusinesses(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] })
      // Find the business in the list and set it as active
      const business = businesses?.results.find((b) => b.id === id)
      if (business) {
        setActiveBusiness(business)
      }
    },
  })

  // Export businesses to CSV
  const exportBusinesses = () => {
    if (!businesses?.results) return

    const headers = ["Name", "Industry", "Size", "Created At", "Updated At"]
    const csvRows = [
      headers.join(","),
      ...businesses.results.map((business: Business) =>
        [business.name, business.industry, business.size, business.created_at, business.updated_at].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "businesses.csv")
    link.click()
  }

  return {
    businesses,
    activeBusiness,
    isLoadingBusinesses,
    createBusiness: createBusinessMutation.mutate,
    isCreatingBusiness: createBusinessMutation.isPending,
    isCreatingBusinessSuccess: createBusinessMutation.isSuccess,
    updateBusiness: updateBusinessMutation.mutate,
    isUpdatingBusiness: updateBusinessMutation.isPending,
    updatingBusinessSuccess: updateBusinessMutation.isSuccess,
    deleteBusiness: deleteBusinessMutation.mutate,
    isDeletingBusiness: deleteBusinessMutation.isPending,
    setActiveBusiness: setActiveBusinessMutation.mutate,
    isSettingActiveBusiness: setActiveBusinessMutation.isPending,
    exportBusinesses,
  }
}


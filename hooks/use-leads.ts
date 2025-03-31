"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { leadService } from "@/lib/api"
import type { Lead, } from "@/types/leads"
import { LeadFormValues } from "@/lib/validations/leads"

export function useLeads() {
  const queryClient = useQueryClient()

  // Récupérer tous les leads
  const { data: leads, isLoading: isLoadingLeads } = useQuery({
    queryKey: ["leads"],
    queryFn: () => leadService.getLeads(),
  })

  // Récupérer les analytics des leads
  const { data: leadAnalytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["leadAnalytics"],
    queryFn: () => leadService.getLeadAnalytics(),
  })

  // Récupérer les insights des leads
  const { data: leadInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ["leadInsights"],
    queryFn: () => leadService.getLeadInsights(),
  })

  // Mutation pour créer un lead
  const createLeadMutation = useMutation({
    mutationFn: (leadData: LeadFormValues) => leadService.createLead(leadData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
      queryClient.invalidateQueries({ queryKey: ["leadAnalytics"] })
    },
  })

  // Mutation pour mettre à jour un lead
  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) => leadService.updateLead(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
      queryClient.invalidateQueries({ queryKey: ["leadAnalytics"] })
    },
  })

  // Mutation pour supprimer un lead
  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => leadService.deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
      queryClient.invalidateQueries({ queryKey: ["leadAnalytics"] })
    },
  })

  // Mutation pour ajouter une interaction à un lead
  const addLeadInteractionMutation = useMutation({
    mutationFn: ({ leadId, data }: { leadId: string; data: any }) => leadService.addLeadInteraction(leadId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] })
    },
  })

  // Fonction pour exporter les leads au format CSV
  const exportLeads = () => {
    if (!leads?.results) return

    const headers = ["Nom", "Email", "Téléphone", "Source", "Statut", "Valeur", "Date d'ajout", "Dernier contact"]
    const csvRows = [
      headers.join(","),
      ...leads.results.map((lead: Lead) =>
        [
          lead.name,
          lead.email,
          lead.phone || "",
          lead.source_display,
          lead.status_display,
          lead.value || "",
          lead.date_added,
          lead.last_contact || "",
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "leads.csv")
    link.click()
  }

  return {
    leads,
    leadAnalytics,
    leadInsights,
    isLoadingLeads,
    isLoadingAnalytics,
    isLoadingInsights,
    createLead: createLeadMutation.mutate,
    isCreatingLead: createLeadMutation.isPending,
    isCreatingLeadSuccess: createLeadMutation.isSuccess,
    updateLead: updateLeadMutation.mutate,
    isUpdatingLead: updateLeadMutation.isPending,
    updatingLeadSuccess: updateLeadMutation.isSuccess,
    deleteLead: deleteLeadMutation.mutate,
    isDeletingLead: deleteLeadMutation.isPending,
    addLeadInteraction: addLeadInteractionMutation.mutate,
    isAddingLeadInteraction: addLeadInteractionMutation.isPending,
    exportLeads,
  }
}


"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { contentService } from "@/lib/api"
import type { Content, } from "@/types/content"
import { ContentFormValues, ContentPerformanceFormValues } from "@/lib/validations/content"

export function useContent() {
  const queryClient = useQueryClient()

  // Récupérer tout le contenu
  const { data: content, isLoading: isLoadingContent } = useQuery({
    queryKey: ["content"],
    queryFn: () => contentService.getContent(),
  })

  // Récupérer le ROI par type de contenu
  const { data: roiByType, isLoading: isLoadingRoi } = useQuery({
    queryKey: ["contentRoi"],
    queryFn: () => contentService.getROIByType(),
  })

  // Récupérer les tendances mensuelles
  const { data: monthlyTrends, isLoading: isLoadingTrends } = useQuery({
    queryKey: ["contentTrends"],
    queryFn: () => contentService.getMonthlyTrends(),
  })

  // Récupérer les insights du contenu
  const { data: contentInsights, isLoading: isLoadingInsights } = useQuery({
    queryKey: ["contentInsights"],
    queryFn: () => contentService.getContentInsights(),
  })

  // Mutation pour créer du contenu
  const createContentMutation = useMutation({
    mutationFn: (contentData: ContentFormValues) => contentService.createContent(contentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
      queryClient.invalidateQueries({ queryKey: ["contentRoi"] })
      queryClient.invalidateQueries({ queryKey: ["contentTrends"] })
    },
  })

  // Mutation pour mettre à jour du contenu
  const updateContentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Content> }) => contentService.updateContent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
      queryClient.invalidateQueries({ queryKey: ["contentRoi"] })
      queryClient.invalidateQueries({ queryKey: ["contentTrends"] })
    },
  })

  // Mutation pour supprimer du contenu
  const deleteContentMutation = useMutation({
    mutationFn: (id: string) => contentService.deleteContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
      queryClient.invalidateQueries({ queryKey: ["contentRoi"] })
      queryClient.invalidateQueries({ queryKey: ["contentTrends"] })
    },
  })

  // Mutation pour mettre à jour les performances du contenu
  const updateContentPerformanceMutation = useMutation({
    mutationFn: ({ contentId, data }: { contentId: string; data: ContentPerformanceFormValues }) =>
      contentService.updateContentPerformance(contentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content"] })
      queryClient.invalidateQueries({ queryKey: ["contentRoi"] })
    },
  })

  // Fonction pour exporter le contenu au format CSV
  const exportContent = () => {
    if (!content?.results) return

    const headers = ["Titre", "Type", "Date de publication", "Visites", "Leads", "Conversions", "ROI", "Coût"]
    const csvRows = [
      headers.join(","),
      ...content.results.map((item: Content & { performance?: any }) =>
        [
          item.title,
          item.type_display,
          item.publish_date,
          item.performance?.visits || 0,
          item.performance?.leads || 0,
          item.performance?.conversions || 0,
          item.roi || 0,
          item.cost,
        ].join(","),
      ),
    ]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", "content.csv")
    link.click()
  }

  return {
    content,
    roiByType,
    monthlyTrends,
    contentInsights,
    isLoadingContent,
    isLoadingRoi,
    isLoadingTrends,
    isLoadingInsights,
    createContent: createContentMutation.mutate,
    isCreatingContent: createContentMutation.isPending,
    isCreatingContentSuccess: createContentMutation.isSuccess,
    updateContent: updateContentMutation.mutate,
    isUpdatingContent: updateContentMutation.isPending,
    isUpdatingContentSuccess: updateContentMutation.isSuccess,
    deleteContent: deleteContentMutation.mutate,
    isDeletingContent: deleteContentMutation.isPending,
    updateContentPerformance: updateContentPerformanceMutation.mutate,
    isUpdatingContentPerformance: updateContentPerformanceMutation.isPending,
    exportContent,
  }
}


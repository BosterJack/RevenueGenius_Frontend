"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { contentPerformanceSchema } from "@/lib/validations/content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useContent } from "@/hooks/use-content"
import type { Content } from "@/types/content"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ContentPerformanceDialogProps {
  isOpen: boolean
  onClose: () => void
  content: Content
}

export function ContentPerformanceDialog({ isOpen, onClose, content }: ContentPerformanceDialogProps) {
  const { updateContentPerformance, isUpdatingContentPerformance } = useContent()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(contentPerformanceSchema),
    defaultValues: content.performance
      ? {
          visits: content.performance.visits,
          leads: content.performance.leads,
          conversions: content.performance.conversions,
        }
      : {
          visits: 0,
          leads: 0,
          conversions: 0,
        },
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await updateContentPerformance({ contentId: content.id, data })
      onClose()
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Mettre à jour les performances</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="visits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visites</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nombre de visites"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leads"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leads</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nombre de leads"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="conversions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversions</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nombre de conversions"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting || isUpdatingContentPerformance}>
                {isSubmitting ? "Enregistrement..." : "Mettre à jour"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


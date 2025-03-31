"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForecasting } from "@/hooks/use-forecasting"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import StatusToast from "../toast-status"

interface ForecastFormDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ForecastFormDialog({ isOpen, onClose }: ForecastFormDialogProps) {
  const { generateForecast, isGeneratingForecast,isGeneratingForecastSuccess } = useForecasting()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    defaultValues: {
      months: 12,
      scenario: "realistic",
    },
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await generateForecast({ months: data.months, scenario: data.scenario })
      onClose()
      form.reset()
    } catch (error) {
      console.error("Error generating forecast:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  

  return (
    <>
    
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Forecast</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="months"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of months</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Number of months"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 12)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scenario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a scenario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pessimistic">Pessimistic</SelectItem>
                      <SelectItem value="realistic">Realistic</SelectItem>
                      <SelectItem value="optimistic">Optimistic</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || isGeneratingForecast}>
                {isGeneratingForecast ? "Generating..." : "Generate"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
     <StatusToast status={isGeneratingForecast ? "pending" : false ? "error" : isGeneratingForecastSuccess ? "success" : "idle"} />
    </>
  )
}

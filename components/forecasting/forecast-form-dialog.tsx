// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useForecasting } from "@/hooks/use-forecasting"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// import StatusToast from "../toast-status"

// interface ForecastFormDialogProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function ForecastFormDialog({ isOpen, onClose }: ForecastFormDialogProps) {
//   const { generateForecast, isGeneratingForecast,isGeneratingForecastSuccess } = useForecasting()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm({
//     defaultValues: {
//       months: 12,
//       scenario: "realistic",
//     },
//   })

//   const onSubmit = async (data: any) => {
//     setIsSubmitting(true)
//     try {
//       await generateForecast({ months: data.months, scenario: data.scenario })
//       onClose()
//       form.reset()
//     } catch (error) {
//       console.error("Error generating forecast:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

  

//   return (
//     <>
    
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px]">
//         <DialogHeader>
//           <DialogTitle>New Forecast</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="months"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Number of months</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder="Number of months"
//                       {...field}
//                       onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 12)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="scenario"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Scenario</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a scenario" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="pessimistic">Pessimistic</SelectItem>
//                       <SelectItem value="realistic">Realistic</SelectItem>
//                       <SelectItem value="optimistic">Optimistic</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSubmitting || isGeneratingForecast}>
//                 {isGeneratingForecast ? "Generating..." : "Generate"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//      <StatusToast status={isGeneratingForecast ? "pending" : false ? "error" : isGeneratingForecastSuccess ? "success" : "idle"} />
//     </>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import StatusToast from "../toast-status"
import { format } from "date-fns"
import { useForecasting } from "@/hooks/use-forecasting"

interface ForecastFormDialogProps {
  isOpen: boolean
  onClose: () => void
  forecastData?: {
    id?: string
    start_date: string
    end_date: string
    scenario: "pessimistic" | "realistic" | "optimistic",
    
  }
  ,typeId?: string
}

export function ForecastFormDialog({ isOpen, onClose, forecastData,typeId }: ForecastFormDialogProps) {
  const { generateForecast,  isGeneratingForecast, isGeneratingForecastSuccess,createWhatIfScenario,createAdvancedForecast,updateForecats,isUpdatingForecats,isCreatingWhatIfScenario,isCreatingAdvancedForecast } = useForecasting()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const today = format(new Date(), "yyyy-MM-dd")

  const form = useForm({
    defaultValues: {
      start_date: today,
      end_date: today,
      scenario: "realistic",
    },
  })

  // Pré-remplir le formulaire si forecastData est fourni (mode update)
  useEffect(() => {
    if (forecastData) {
      form.reset({
        start_date: forecastData.start_date,
        end_date: forecastData.end_date,
        scenario: forecastData.scenario,
      })
    }
  }, [forecastData, form])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)

    if (new Date(data.start_date) > new Date(data.end_date)) {
      alert("Start date must be before or equal to end date.")
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        start_date: data.start_date,
        end_date: data.end_date,
        scenario: data.scenario,
      }

      if (forecastData?.id) {
        await updateForecats({id:forecastData.id,data:payload})
      } else {
        if (typeId === "whatif") {
          await createWhatIfScenario(payload as any)
          
        }else if (typeId === "advanced") {
          await createAdvancedForecast(payload as any)
        }else{

        await generateForecast(payload as any)
        }
      }

      onClose()
      form.reset()
    } catch (error) {
      console.error("Forecast error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }
console.log(forecastData,"forecastData00")

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{forecastData ? "Update Forecast" : "New Forecast "+typeId}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                <Button type="submit" disabled={isGeneratingForecast || isUpdatingForecats || isCreatingWhatIfScenario || isCreatingAdvancedForecast }>
                  {isGeneratingForecast || isUpdatingForecats || isCreatingWhatIfScenario || isCreatingAdvancedForecast
                    ? "Saving..."
                    : forecastData
                    ? "Update Forecast"
                    : "Save Forecast"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <StatusToast
        status={
          isGeneratingForecast
            ? "pending"
            : isGeneratingForecastSuccess
            ? "success"
            : "idle"
        }
      />
    </>
  )
}

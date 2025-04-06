// "use client"

// import { useEffect, useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle
// } from "@/components/ui/dialog"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from "@/components/ui/form"

// import {
//   PerformanceFormValues,
//   performanceSchema
// } from "@/lib/validations/content"

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { useContent } from "@/hooks/use-content"

// interface AddPerformanceDialogProps {
//   contentId: string
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   initialData?: PerformanceFormValues
//   isEdit?: boolean,
  
// }

// export function AddPerformanceDialog({
//   contentId,
//   open,
//   onOpenChange,
//   initialData,
//   isEdit = false
// }: AddPerformanceDialogProps) {
//   const { toast } = useToast()
//   const { createContentPerformance, updateContentPerformance } = useContent()

//   const form = useForm<PerformanceFormValues>({
//     resolver: zodResolver(performanceSchema),
//     defaultValues: initialData || {
//       visits: 0,
//       leads: 0,
//       conversions: 0
//     }
//   })
// console.log(initialData,"initialData")
//   // Reset form when initialData or dialog state changes
//   useEffect(() => {
//     if (initialData) {
//       form.reset(initialData)
//     }
//   }, [initialData, open, form])

//   const handleSubmit = async (values: PerformanceFormValues) => {
//     try {
//       if (isEdit) {
//         await updateContentPerformance({
//           contentId,
//           data: values,
//           performanceId: initialData?.id??""
//         })

//         toast({
//           title: "Updated",
//           description: "Performance data updated successfully.",
//           variant: "default"
//         })
//       } else {
//         await createContentPerformance({
//           contentId,
//           contentData: values
//         })

//         toast({
//           title: "Success",
//           description: "Performance data saved successfully.",
//           variant: "default"
//         })
//       }

//       form.reset()
//       onOpenChange(false)
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to save performance data.",
//         variant: "destructive"
//       })
//       console.error(error)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>
//             {isEdit ? "Edit Performance Data" : "Add Performance Data"}
//           </DialogTitle>
//           <DialogDescription>
//             {isEdit
//               ? "Update the performance metrics for this content."
//               : "Add performance metrics to a content item."}
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
//             <FormField
//               control={form.control}
//               name="visits"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Visits</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="leads"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Leads</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="conversions"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Conversions</FormLabel>
//                   <FormControl>
//                     <Input type="number" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end gap-2 pt-2">
//               <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit">
//                 {isEdit ? "Update Performance" : "Add Performance"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { type PerformanceFormValues, performanceSchema } from "@/lib/validations/content"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useContent } from "@/hooks/use-content"

interface AddPerformanceDialogProps {
  contentId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: PerformanceFormValues
  isEdit?: boolean
}

export function AddPerformanceDialog({
  contentId,
  open,
  onOpenChange,
  initialData,
  isEdit = false,
}: AddPerformanceDialogProps) {
  const { toast } = useToast()
  const { createContentPerformance, updateContentPerformance, deleteContentPerformance,isDeletingContentPerformance } = useContent()
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<PerformanceFormValues>({
    resolver: zodResolver(performanceSchema),
    defaultValues: {
      visits: 0,
      leads: 0,
      conversions: 0,
      ...initialData,
    },
  })

  // Reset form when initialData or dialog state changes
  useEffect(() => {
    if (open) {
      form.reset({
        visits: 0,
        leads: 0,
        conversions: 0,
        ...initialData,
      })
    }
  }, [initialData, open, form])

  const handleSubmit = async (values: PerformanceFormValues) => {
    try {
        //@ts-ignore
      if (isEdit && initialData?.id) {
        await updateContentPerformance({
          contentId,
          data: values,
          //@ts-ignore
          performanceId: initialData.id,
        })

        toast({
          title: "Updated",
          description: "Performance data updated successfully.",
          variant: "default",
        })
      } else {
        await createContentPerformance({
          contentId,
          contentData: values,
        })

        toast({
          title: "Success",
          description: "Performance data saved successfully.",
          variant: "default",
        })
      }

      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save performance data.",
        variant: "destructive",
      })
      console.error(error)
    }
  }

  const handleDelete = async () => {
    //@ts-ignore
    if (!initialData?.id) return

    setIsDeleting(true)
    try {
      await deleteContentPerformance({
        id:contentId,
        //@ts-ignore
        performanceId: initialData.id,
      })

      toast({
        title: "Deleted",
        description: "Performance data deleted successfully.",
        variant: "default",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete performance data.",
        variant: "destructive",
      })
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Performance Data" : "Add Performance Data"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the performance metrics for this content." : "Add performance metrics to a content item."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="visits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visits</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                    <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between gap-2 pt-2">
              {isEdit && (
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              )}
              <div className="flex gap-2 ml-auto">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}


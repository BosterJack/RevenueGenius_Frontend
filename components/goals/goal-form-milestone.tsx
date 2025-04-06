"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { goalSchema, milestoneSchema } from "@/lib/validations/goals"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGoals } from "@/hooks/use-goals"
import type { Goal } from "@/types/goals"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import StatusToast from "../toast-status"
import { useSelected } from "@/app/provider"

interface GoalFormDialogProps {
  isOpen: boolean
  onClose: () => void
  goal?: Goal
  goal_pk?:string
}

export function GoalFormMilestoneDialog({ isOpen, onClose, goal,goal_pk }: GoalFormDialogProps) {
  const { createMilestone, updateMilestone, isCreatingMilestone, isUpdatingMilestone, isCreationMilestoneSuccess, isUpdatingMilestoneSuccess } = useGoals()
  const [isSubmitting, setIsSubmitting] = useState(false)
const {setIsGoalSuccess}=useSelected()
  const form = useForm({
    resolver: zodResolver(milestoneSchema),
    defaultValues: goal
      ? {
          name: goal.name,
         
          target_value: goal.target_value,
         
          target_date: goal.target_date,
         
        }
      : {
          name: "",
        
          target_value: 0,
          start_date: new Date().toISOString().split("T")[0],
          target_date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0],
          description: "",
        },
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (goal) {
        await updateMilestone({ goalId: goal_pk??'', milestoneId: goal.id, data },{
          onSuccess: () => {
            setIsGoalSuccess(true)
          },
        })
      } else {
        await createMilestone({goalId: goal_pk??'', data},{
          onSuccess: () => {
            setIsGoalSuccess(true)
          },
        })
      }
      onClose()
      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{goal ? "Edit Goal" : "Add a New Goal"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Goal name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
             
              <FormField
                control={form.control}
                name="target_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Target value"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4">
                
                <FormField
                  control={form.control}
                  name="target_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Date</FormLabel>
                      <FormControl>
                        <Input className="w-full" type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isCreatingMilestone || isUpdatingMilestone}>
                  {isCreatingMilestone ? "Saving..." : goal ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <StatusToast 
        status={
          isCreatingMilestone || isUpdatingMilestone ? "pending" 
          : false ? "error" 
          : isCreationMilestoneSuccess || isUpdatingMilestoneSuccess ? "success" 
          : "idle"
        } 
      />
    </>
  )
}

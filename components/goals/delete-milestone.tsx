"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGoals } from "@/hooks/use-goals"
import { useSelected } from "@/app/provider"
import StatusToast from "../toast-status"

interface DeleteMilestoneDialogProps {
  isOpen: boolean
  onClose: () => void
  milestone: any
  goalId: string
}

export function DeleteMilestoneDialog({ isOpen, onClose, milestone, goalId }: DeleteMilestoneDialogProps) {
  const { deleteMilestoneGoal,isDeletingMilestoneGoal } = useGoals()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setIsGoalSuccess } = useSelected()

  const handleDelete = async () => {
    setIsSubmitting(true)
    try {
      await deleteMilestoneGoal(
        { goalId, milestoneId: milestone.id },
        {
          onSuccess: () => {
            setIsGoalSuccess(true)
          },
        },
      )
      onClose()
    } catch (error) {
      console.error("Error deleting milestone:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Milestone</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the milestone "{milestone?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting || isDeletingMilestoneGoal}>
              {isDeletingMilestoneGoal ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* <StatusToast
        status={isDeletingMilestoneGoal ? "pending" : false ? "error" : isDeletingMilestoneGoalSuccess ? "success" : "idle"}
      /> */}
    </>
  )
}


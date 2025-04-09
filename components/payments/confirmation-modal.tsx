"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreditCard, ShieldCheck } from "lucide-react"

interface Plan {
  id: number
  name: string
  slug: string
  description: string
  price: string
  billing_cycle: string
  billing_cycle_display: string
  is_active: boolean
  features: {
    features: any[]
  }
  sort_order: number
}

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  plan: Plan
  formatPrice: (price: string, cycle: string) => string
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, plan, formatPrice }: ConfirmationModalProps) {
  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Your Payment</DialogTitle>
          <DialogDescription className="text-center">You are about to complete your purchase</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-medium">Plan</span>
            <span className="font-medium">{plan.name}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span>Billing cycle</span>
            <span>{plan.billing_cycle_display}</span>
          </div>

          <div className="flex items-center justify-between border-b pb-2">
            <span>Amount</span>
            <span className="font-bold">{formatPrice(plan.price, plan.billing_cycle)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <ShieldCheck className="h-4 w-4 mr-2" />
            <span>Your payment is secure and encrypted</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 mr-2" />
            <span>You will be charged immediately</span>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose} className="sm:w-auto w-full">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="sm:w-auto w-full">
            Confirm Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

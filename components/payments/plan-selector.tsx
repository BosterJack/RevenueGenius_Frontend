"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

interface Feature {
  name: string
  included: boolean
  description: string
}

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
    features: Feature[]
  }
  sort_order: number
}

interface PlanSelectorProps {
  plans: Plan[]
  selectedPlan: Plan
  onSelectPlan: (plan: Plan) => void
}

export default function PlanSelector({ plans, selectedPlan, onSelectPlan }: PlanSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Format price for display
  const formatPrice = (price: string, cycle: string) => {
    if (cycle === "one_time") {
      return `${price}€`
    }
    return `${price}€/${cycle === "monthly" ? "mo" : "yr"}`
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Selected Plan</h3>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              Change Plan
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {Array.isArray(plans) && plans.map((plan) => (
              <DropdownMenuItem
                key={plan.id}
                className="flex items-center justify-between"
                onClick={() => {
                  onSelectPlan(plan)
                  setIsOpen(false)
                }}
              >
                <div className="flex flex-col">
                  <span>{plan.name}</span>
                  <span className="text-xs text-gray-500">{formatPrice(plan.price, plan.billing_cycle)}</span>
                </div>
                {plan && plan.id === selectedPlan?.id && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedPlan && (<Card className="border-2 border-green-100">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-teal-50 dark:from-rose-900 dark:to-teal-900 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>{selectedPlan?.name || "Loading..."}</CardTitle>
            <Badge variant="secondary">{selectedPlan?.billing_cycle_display}</Badge>
          </div>
          <CardDescription>{selectedPlan.description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold mb-2">{formatPrice(selectedPlan.price, selectedPlan.billing_cycle)}</div>

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {selectedPlan && selectedPlan.features.features
                .filter((feature) => feature.included)
                .slice(0, 3)
                .map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              {selectedPlan && selectedPlan.features.features.filter((f) => f.included).length > 3 && (
                <li className="text-xs text-gray-500 pl-6">
                  +{selectedPlan.features.features.filter((f) => f.included).length - 3} more features
                </li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>)}
    </div>
  )
}

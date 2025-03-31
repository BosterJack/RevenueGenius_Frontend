"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(5000)
  const [avgRevenuePerUser, setAvgRevenuePerUser] = useState(200)
  const [variableCostPerUser, setVariableCostPerUser] = useState(50)

  // Calculations
  const contributionMargin = avgRevenuePerUser - variableCostPerUser
  const customersNeeded = Math.ceil(fixedCosts / contributionMargin)
  const monthlyRevenueNeeded = customersNeeded * avgRevenuePerUser
  const profitMargin = ((avgRevenuePerUser - variableCostPerUser) / avgRevenuePerUser) * 100

  // Assume you currently have 15 customers
  const currentCustomers = 15
  const progress = Math.min((currentCustomers / customersNeeded) * 100, 100)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fixed-costs">Monthly Fixed Costs (€)</Label>
          <Input
            id="fixed-costs"
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avg-revenue">Average Revenue per Customer (€)</Label>
          <Input
            id="avg-revenue"
            type="number"
            value={avgRevenuePerUser}
            onChange={(e) => setAvgRevenuePerUser(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="variable-cost">Variable Cost per Customer (€)</Label>
          <Input
            id="variable-cost"
            type="number"
            value={variableCostPerUser}
            onChange={(e) => setVariableCostPerUser(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Customers Needed: {customersNeeded}</span>
            <span className="text-sm font-medium">
              {currentCustomers} / {customersNeeded}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-brand-blue/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Required Monthly Revenue</div>
            <div className="text-2xl font-bold">€{monthlyRevenueNeeded}</div>
          </div>
          <div className="p-3 bg-brand-blue/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Profit Margin</div>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ProfitMarginCalculator() {
  // State for financial data
  const [financialData, setFinancialData] = useState({
    revenue: 10000,
    costOfGoodsSold: 4000,
    operatingExpenses: 3000,
    taxes: 600,
  })

  // Calculations
  const grossProfit = financialData.revenue - financialData.costOfGoodsSold
  const grossProfitMargin = (grossProfit / financialData.revenue) * 100

  const operatingProfit = grossProfit - financialData.operatingExpenses
  const operatingProfitMargin = (operatingProfit / financialData.revenue) * 100

  const netProfit = operatingProfit - financialData.taxes
  const netProfitMargin = (netProfit / financialData.revenue) * 100

  // Event handler for financial data
  const handleFinancialDataChange = (key: string, value: string) => {
    setFinancialData({
      ...financialData,
      [key]: Number(value) || 0,
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Inputs</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revenue">Total Revenue (€)</Label>
              <Input
                id="revenue"
                type="number"
                value={financialData.revenue}
                onChange={(e) => handleFinancialDataChange("revenue", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costOfGoodsSold">Cost of Goods Sold (€)</Label>
              <Input
                id="costOfGoodsSold"
                type="number"
                value={financialData.costOfGoodsSold}
                onChange={(e) => handleFinancialDataChange("costOfGoodsSold", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingExpenses">Operating Expenses (€)</Label>
              <Input
                id="operatingExpenses"
                type="number"
                value={financialData.operatingExpenses}
                onChange={(e) => handleFinancialDataChange("operatingExpenses", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxes">Taxes (€)</Label>
              <Input
                id="taxes"
                type="number"
                value={financialData.taxes}
                onChange={(e) => handleFinancialDataChange("taxes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Results</h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Gross Margin</h4>
                    <p className="text-sm text-muted-foreground">Revenue - Cost of Goods Sold</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{grossProfitMargin.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">€{grossProfit}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Operating Margin</h4>
                    <p className="text-sm text-muted-foreground">Gross Margin - Operating Expenses</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{operatingProfitMargin.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">€{operatingProfit}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Net Margin</h4>
                    <p className="text-sm text-muted-foreground">Operating Margin - Taxes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{netProfitMargin.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">€{netProfit}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="p-4 bg-brand-blue/5 rounded-lg">
        <h3 className="font-medium mb-2">Interpretation</h3>
        <p className="text-sm text-muted-foreground">
          {netProfitMargin > 20
            ? "Your net margin is excellent! You are well above the average for your industry."
            : netProfitMargin > 10
              ? "Your net margin is good. You are in the upper range for your industry."
              : netProfitMargin > 5
                ? "Your net margin is acceptable, but there is room for improvement."
                : "Your net margin is low. Consider reducing your costs or increasing your prices."}
        </p>
      </div>
    </div>
  )
}

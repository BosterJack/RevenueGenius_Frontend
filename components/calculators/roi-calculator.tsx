"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function ROICalculator() {
  // State for investment data
  const [investmentData, setInvestmentData] = useState({
    initialInvestment: 5000,
    revenue: 8000,
    costs: 2000,
    period: 3, // in months
  })

  // Calculations
  const profit = investmentData.revenue - investmentData.costs
  const roi = (profit / investmentData.initialInvestment) * 100
  const annualizedROI =
    investmentData.period > 0 ? (profit / investmentData.initialInvestment) * (12 / investmentData.period) * 100 : 0

  // Event handler for investment data
  const handleInvestmentDataChange = (key: string, value: string) => {
    setInvestmentData({
      ...investmentData,
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
              <Label htmlFor="initialInvestment">Initial Investment (€)</Label>
              <Input
                id="initialInvestment"
                type="number"
                value={investmentData.initialInvestment}
                onChange={(e) => handleInvestmentDataChange("initialInvestment", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Generated Revenue (€)</Label>
              <Input
                id="revenue"
                type="number"
                value={investmentData.revenue}
                onChange={(e) => handleInvestmentDataChange("revenue", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costs">Associated Costs (€)</Label>
              <Input
                id="costs"
                type="number"
                value={investmentData.costs}
                onChange={(e) => handleInvestmentDataChange("costs", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period (months)</Label>
              <Input
                id="period"
                type="number"
                value={investmentData.period}
                onChange={(e) => handleInvestmentDataChange("period", e.target.value)}
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
                    <h4 className="font-medium">Profit</h4>
                    <p className="text-sm text-muted-foreground">Revenue - Costs</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">€{profit}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">ROI</h4>
                    <p className="text-sm text-muted-foreground">For a period of {investmentData.period} months</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{roi.toFixed(1)}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Annualized ROI</h4>
                    <p className="text-sm text-muted-foreground">Projection for 12 months</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{annualizedROI.toFixed(1)}%</div>
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
          {roi > 100
            ? `Your ROI of ${roi.toFixed(1)}% is excellent! Your investment has more than doubled.`
            : roi > 50
              ? `Your ROI of ${roi.toFixed(1)}% is very good. Your investment has generated a significant return.`
              : roi > 20
                ? `Your ROI of ${roi.toFixed(1)}% is good. Your investment is profitable.`
                : roi > 0
                  ? `Your ROI of ${roi.toFixed(1)}% is positive but modest. Consider optimizing your strategy.`
                  : `Your ROI of ${roi.toFixed(1)}% is negative. This investment is not profitable in its current form.`}
        </p>
      </div>
    </div>
  )
}

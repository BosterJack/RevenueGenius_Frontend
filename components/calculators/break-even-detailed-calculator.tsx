"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function BreakEvenDetailedCalculator() {
  // State for fixed costs
  const [fixedCosts, setFixedCosts] = useState({
    rent: 1000,
    salaries: 3000,
    software: 500,
    insurance: 200,
    other: 300,
  })

  // State for product/service data
  const [productData, setProductData] = useState({
    price: 200,
    variableCost: 50,
    currentCustomers: 15,
  })

  // Calculations
  const totalFixedCosts = Object.values(fixedCosts).reduce((sum, cost) => sum + cost, 0)
  const contributionMargin = productData.price - productData.variableCost
  const contributionMarginRatio = contributionMargin / productData.price
  const customersNeeded = Math.ceil(totalFixedCosts / contributionMargin)
  const monthlyRevenueNeeded = customersNeeded * productData.price
  const progress = Math.min((productData.currentCustomers / customersNeeded) * 100, 100)
  const timeToBreakeven =
    customersNeeded > productData.currentCustomers
      ? Math.ceil((customersNeeded - productData.currentCustomers) / 5) // Assuming 5 new customers per month
      : 0

  // Event handlers for fixed costs
  const handleFixedCostChange = (key: string, value: string) => {
    setFixedCosts({
      ...fixedCosts,
      [key]: Number(value) || 0,
    })
  }

  // Event handlers for product data
  const handleProductDataChange = (key: string, value: string) => {
    setProductData({
      ...productData,
      [key]: Number(value) || 0,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inputs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          {/* <TabsTrigger value="chart">Chart</TabsTrigger> */}
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Monthly Fixed Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Rent</Label>
                <Input
                  id="rent"
                  type="number"
                  value={fixedCosts.rent}
                  onChange={(e) => handleFixedCostChange("rent", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaries">Salaries</Label>
                <Input
                  id="salaries"
                  type="number"
                  value={fixedCosts.salaries}
                  onChange={(e) => handleFixedCostChange("salaries", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="software">Software and Subscriptions</Label>
                <Input
                  id="software"
                  type="number"
                  value={fixedCosts.software}
                  onChange={(e) => handleFixedCostChange("software", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={fixedCosts.insurance}
                  onChange={(e) => handleFixedCostChange("insurance", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other">Other Fixed Costs</Label>
                <Input
                  id="other"
                  type="number"
                  value={fixedCosts.other}
                  onChange={(e) => handleFixedCostChange("other", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Product/Service Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Average Price per Customer (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={productData.price}
                  onChange={(e) => handleProductDataChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variableCost">Variable Cost per Customer (€)</Label>
                <Input
                  id="variableCost"
                  type="number"
                  value={productData.variableCost}
                  onChange={(e) => handleProductDataChange("variableCost", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentCustomers">Current Number of Customers</Label>
                <Input
                  id="currentCustomers"
                  type="number"
                  value={productData.currentCustomers}
                  onChange={(e) => handleProductDataChange("currentCustomers", e.target.value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Monthly Fixed Costs:</span>
                    <span className="font-bold">€{totalFixedCosts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contribution Margin per Customer:</span>
                    <span className="font-bold">€{contributionMargin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contribution Margin Ratio:</span>
                    <span className="font-bold">{(contributionMarginRatio * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Break-even Point</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Customers Needed:</span>
                    <span className="font-bold">{customersNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Revenue Needed:</span>
                    <span className="font-bold">€{monthlyRevenueNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time to Reach Break-even:</span>
                    <span className="font-bold">{timeToBreakeven} months</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Progress to Break-even</h3>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Current Customers: {productData.currentCustomers}</span>
                <span className="text-sm font-medium">
                  {productData.currentCustomers} / {customersNeeded}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {progress < 100
                  ? `You need ${customersNeeded - productData.currentCustomers} more customers to reach your break-even point.`
                  : "Congratulations! You have reached your break-even point."}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="chart">
          <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">The break-even chart will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LTVCalculator() {
  // State for customer data
  const [customerData, setCustomerData] = useState({
    averageOrderValue: 200,
    purchaseFrequency: 4, // per year
    customerLifespan: 3, // in years
    grossMargin: 70, // as percentage
    discountRate: 10, // as percentage
  })

  // Calculations
  const annualRevenue = customerData.averageOrderValue * customerData.purchaseFrequency
  const lifetimeRevenue = annualRevenue * customerData.customerLifespan
  const lifetimeGrossProfit = lifetimeRevenue * (customerData.grossMargin / 100)

  // Calculating LTV with discount
  let discountedLTV = 0
  for (let year = 1; year <= customerData.customerLifespan; year++) {
    const yearlyProfit = annualRevenue * (customerData.grossMargin / 100)
    const discountFactor = 1 / Math.pow(1 + customerData.discountRate / 100, year)
    discountedLTV += yearlyProfit * discountFactor
  }

  // Event handler for customer data
  const handleCustomerDataChange = (key: string, value: string) => {
    setCustomerData({
      ...customerData,
      [key]: Number(value) || 0,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Calculation</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Calculation</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Inputs</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="averageOrderValue">Average Order Value (€)</Label>
                  <Input
                    id="averageOrderValue"
                    type="number"
                    value={customerData.averageOrderValue}
                    onChange={(e) => handleCustomerDataChange("averageOrderValue", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseFrequency">Purchase Frequency (per year)</Label>
                  <Input
                    id="purchaseFrequency"
                    type="number"
                    value={customerData.purchaseFrequency}
                    onChange={(e) => handleCustomerDataChange("purchaseFrequency", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerLifespan">Customer Lifespan (years)</Label>
                  <Input
                    id="customerLifespan"
                    type="number"
                    value={customerData.customerLifespan}
                    onChange={(e) => handleCustomerDataChange("customerLifespan", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grossMargin">Gross Margin (%)</Label>
                  <Input
                    id="grossMargin"
                    type="number"
                    value={customerData.grossMargin}
                    onChange={(e) => handleCustomerDataChange("grossMargin", e.target.value)}
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
                        <h4 className="font-medium">Annual Revenue per Customer</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">€{annualRevenue}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Lifetime Revenue</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">€{lifetimeRevenue}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Customer Lifetime Value (LTV)</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">€{lifetimeGrossProfit.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Advanced Inputs</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="discountRate">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    value={customerData.discountRate}
                    onChange={(e) => handleCustomerDataChange("discountRate", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The discount rate accounts for the time value of money.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Advanced Results</h3>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Discounted LTV</h4>
                        <p className="text-sm text-muted-foreground">
                          Accounts for the time value of money
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">€{discountedLTV.toFixed(2)}</div>
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
              The discounted LTV (€{discountedLTV.toFixed(2)}) is more accurate than the simple LTV (€{lifetimeGrossProfit.toFixed(2)}) because it takes into account the fact that money received in the future is less valuable than money received today. This value should be compared with your CAC (Customer Acquisition Cost).
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CACCalculator() {
  // State for marketing expenses
  const [marketingExpenses, setMarketingExpenses] = useState({
    advertising: 2000,
    contentCreation: 1000,
    socialMedia: 500,
    email: 300,
    events: 1200,
    other: 500,
  })

  // State for sales expenses
  const [salesExpenses, setSalesExpenses] = useState({
    salaries: 4000,
    commissions: 1500,
    tools: 800,
    training: 500,
    other: 300,
  })

  // State for customer data
  const [customerData, setCustomerData] = useState({
    newCustomers: 20,
    period: 1, // in months
  })

  // Calculations
  const totalMarketingExpenses = Object.values(marketingExpenses).reduce((sum, expense) => sum + expense, 0)
  const totalSalesExpenses = Object.values(salesExpenses).reduce((sum, expense) => sum + expense, 0)
  const totalExpenses = totalMarketingExpenses + totalSalesExpenses
  const cac = customerData.newCustomers > 0 ? totalExpenses / customerData.newCustomers : 0

  // CAC by channel
  const marketingCAC = customerData.newCustomers > 0 ? totalMarketingExpenses / customerData.newCustomers : 0
  const salesCAC = customerData.newCustomers > 0 ? totalSalesExpenses / customerData.newCustomers : 0

  // Event handlers
  const handleMarketingExpenseChange = (key: string, value: string) => {
    setMarketingExpenses({
      ...marketingExpenses,
      [key]: Number(value) || 0,
    })
  }

  const handleSalesExpenseChange = (key: string, value: string) => {
    setSalesExpenses({
      ...salesExpenses,
      [key]: Number(value) || 0,
    })
  }

  const handleCustomerDataChange = (key: string, value: string) => {
    setCustomerData({
      ...customerData,
      [key]: Number(value) || 0,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Marketing Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="advertising">Advertising</Label>
                <Input
                  id="advertising"
                  type="number"
                  value={marketingExpenses.advertising}
                  onChange={(e) => handleMarketingExpenseChange("advertising", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentCreation">Content Creation</Label>
                <Input
                  id="contentCreation"
                  type="number"
                  value={marketingExpenses.contentCreation}
                  onChange={(e) => handleMarketingExpenseChange("contentCreation", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="socialMedia">Social Media</Label>
                <Input
                  id="socialMedia"
                  type="number"
                  value={marketingExpenses.socialMedia}
                  onChange={(e) => handleMarketingExpenseChange("socialMedia", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Marketing</Label>
                <Input
                  id="email"
                  type="number"
                  value={marketingExpenses.email}
                  onChange={(e) => handleMarketingExpenseChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="events">Events</Label>
                <Input
                  id="events"
                  type="number"
                  value={marketingExpenses.events}
                  onChange={(e) => handleMarketingExpenseChange("events", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketingOther">Other Marketing Expenses</Label>
                <Input
                  id="marketingOther"
                  type="number"
                  value={marketingExpenses.other}
                  onChange={(e) => handleMarketingExpenseChange("other", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Sales Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaries">Sales Team Salaries</Label>
                <Input
                  id="salaries"
                  type="number"
                  value={salesExpenses.salaries}
                  onChange={(e) => handleSalesExpenseChange("salaries", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissions">Commissions</Label>
                <Input
                  id="commissions"
                  type="number"
                  value={salesExpenses.commissions}
                  onChange={(e) => handleSalesExpenseChange("commissions", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tools">Tools and Software</Label>
                <Input
                  id="tools"
                  type="number"
                  value={salesExpenses.tools}
                  onChange={(e) => handleSalesExpenseChange("tools", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="training">Training</Label>
                <Input
                  id="training"
                  type="number"
                  value={salesExpenses.training}
                  onChange={(e) => handleSalesExpenseChange("training", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salesOther">Other Sales Expenses</Label>
                <Input
                  id="salesOther"
                  type="number"
                  value={salesExpenses.other}
                  onChange={(e) => handleSalesExpenseChange("other", e.target.value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newCustomers">Number of New Customers</Label>
                <Input
                  id="newCustomers"
                  type="number"
                  value={customerData.newCustomers}
                  onChange={(e) => handleCustomerDataChange("newCustomers", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period (months)</Label>
                <Input
                  id="period"
                  type="number"
                  value={customerData.period}
                  onChange={(e) => handleCustomerDataChange("period", e.target.value)}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Expense Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Marketing Expenses:</span>
                    <span className="font-bold">€{totalMarketingExpenses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Sales Expenses:</span>
                    <span className="font-bold">€{totalSalesExpenses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Expenses:</span>
                    <span className="font-bold">€{totalExpenses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Customer Acquisition Cost</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Marketing CAC:</span>
                    <span className="font-bold">€{marketingCAC.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales CAC:</span>
                    <span className="font-bold">€{salesCAC.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total CAC:</span>
                    <span className="font-bold">€{cac.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 bg-brand-blue/5 rounded-lg">
            <h3 className="font-medium mb-2">Interpretation</h3>
            <p className="text-sm text-muted-foreground">
              {cac > 0
                ? `Your customer acquisition cost is €${cac.toFixed(2)}. For your business to be profitable, the customer lifetime value (LTV) should be at least 3 times this amount.`
                : "Please enter the number of new customers to calculate your CAC."}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

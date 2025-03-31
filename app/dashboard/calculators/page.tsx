import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreakEvenDetailedCalculator } from "@/components/calculators/break-even-detailed-calculator"
import { ProfitMarginCalculator } from "@/components/calculators/profit-margin-calculator"
import { LTVCalculator } from "@/components/calculators/ltv-calculator"
import { CACCalculator } from "@/components/calculators/cac-calculator"
import { ROICalculator } from "@/components/calculators/roi-calculator"

export default function CalculatorsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financial Calculators</h1>
      </div>

      <Tabs defaultValue="break-even" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="break-even">Break-Even Point</TabsTrigger>
          <TabsTrigger value="profit-margin">Profit Margin</TabsTrigger>
          <TabsTrigger value="ltv">LTV</TabsTrigger>
          <TabsTrigger value="cac">CAC</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
        </TabsList>

        <TabsContent value="break-even">
          <Card>
            <CardHeader>
              <CardTitle>Break-Even Point Calculator</CardTitle>
              <CardDescription>
                Calculate the number of customers and revenue needed to reach your break-even point
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BreakEvenDetailedCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit-margin">
          <Card>
            <CardHeader>
              <CardTitle>Profit Margin Calculator</CardTitle>
              <CardDescription>Calculate your gross and net profit margins</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfitMarginCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ltv">
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value (LTV) Calculator</CardTitle>
              <CardDescription>Calculate the lifetime value of your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <LTVCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cac">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition Cost (CAC) Calculator</CardTitle>
              <CardDescription>Calculate how much it costs to acquire a new customer</CardDescription>
            </CardHeader>
            <CardContent>
              <CACCalculator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi">
          <Card>
            <CardHeader>
              <CardTitle>Return on Investment (ROI) Calculator</CardTitle>
              <CardDescription>Calculate the ROI of your marketing and sales investments</CardDescription>
            </CardHeader>
            <CardContent>
              <ROICalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

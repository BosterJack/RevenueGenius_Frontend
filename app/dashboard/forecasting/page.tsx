"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ForecastControls } from "@/components/forecasting/forecast-controls"
import { RevenueProjectionChart } from "@/components/forecasting/revenue-projection-chart"
import { DistributionPieChart } from "@/components/forecasting/distribution-pie-chart"
import { BreakEvenCalculator } from "@/components/forecasting/break-even-calculator"
import { ProjectedMetricsPanel } from "@/components/forecasting/projected-metrics-panel"
import { ForecastFormDialog } from "@/components/forecasting/forecast-form-dialog"
import { useForecasting } from "@/hooks/use-forecasting"

export default function ForecastingPage() {
  const [isForecastDialogOpen, setIsForecastDialogOpen] = useState(false)
  const { exportForecasts, forecasts, revenueData } = useForecasting()
  revenueData && console.log(revenueData, 'revenueData')
  const [distributionBy, setDistributionBy] = useState<"source" | "category">("source")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Revenue Forecasting</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" onClick={exportForecasts}>
            Export
          </Button> */}
          <Button onClick={() => setIsForecastDialogOpen(true)}>New Forecast</Button>
        </div>
      </div>

      <Tabs defaultValue="realistic" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="pessimistic">Pessimistic</TabsTrigger>
            <TabsTrigger value="realistic">Realistic</TabsTrigger>
            <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="realistic" className="space-y-4">
          {/* <Card>
            <CardHeader>
              <CardTitle>Forecast Controls</CardTitle>
              <CardDescription>Adjust parameters to refine your forecasts</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastControls />
            </CardContent>
          </Card> */}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Projection</CardTitle>
                <CardDescription>Forecast for the next 12 months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueProjectionChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>By revenue source</CardDescription>
              </CardHeader>
              <CardContent>
                <DistributionPieChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Break-Even Calculator</CardTitle>
                <CardDescription>Estimate when you'll reach your break-even point</CardDescription>
              </CardHeader>
              <CardContent>
                <BreakEvenCalculator />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Projected Metrics</CardTitle>
                <CardDescription>Projected key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectedMetricsPanel />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <ForecastFormDialog isOpen={isForecastDialogOpen} onClose={() => setIsForecastDialogOpen(false)} />
    </div>
  )
}
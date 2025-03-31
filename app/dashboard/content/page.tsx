"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ContentROIBarChart } from "@/components/content/content-roi-bar-chart"
import { ContentPerformanceTrendsChart } from "@/components/content/content-performance-trends-chart"
import { ContentFilterTabs } from "@/components/content/content-filter-tabs"
import { ContentROIInsightsPanel } from "@/components/content/content-roi-insights-panel"
import { ContentFormDialog } from "@/components/content/content-form-dialog"
import { useContent } from "@/hooks/use-content"

export default function ContentPage() {
  const [isContentFormOpen, setIsContentFormOpen] = useState(false)
  const { exportContent } = useContent()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Content ROI Analysis</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" onClick={exportContent}>
            Export
          </Button> */}
          <Button onClick={() => setIsContentFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Content
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>ROI by Content Type</CardTitle>
            <CardDescription>ROI comparison by content type</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ContentROIBarChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Key metric evolution over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ContentPerformanceTrendsChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>Detailed analysis of each content item</CardDescription>
        </CardHeader>
        <CardContent>
          <ContentFilterTabs />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content ROI Insights</CardTitle>
          <CardDescription>Analysis and recommendations to optimize your content strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <ContentROIInsightsPanel />
        </CardContent>
      </Card>

      <ContentFormDialog isOpen={isContentFormOpen} onClose={() => setIsContentFormOpen(false)} />
    </div>
  )
}

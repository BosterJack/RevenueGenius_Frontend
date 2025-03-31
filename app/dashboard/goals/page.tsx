"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { GoalSettingForm } from "@/components/goals/goal-setting-form"
import { MilestonesTimeline } from "@/components/goals/milestones-timeline"
import { ProgressCircles } from "@/components/goals/progress-circles"
import { GoalProjectionChart } from "@/components/goals/goal-projection-chart"
import { GoalNotificationsSettings } from "@/components/goals/goal-notifications-settings"
import { GoalFormDialog } from "@/components/goals/goal-form-dialog"
import { useGoals } from "@/hooks/use-goals"
import { GoalsTable } from "@/components/goals/goals-performances-table"

export default function GoalsPage() {
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false)
  const { exportGoals } = useGoals()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Goals and Milestones</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" onClick={exportGoals}>
            Export
          </Button> */}
          <Button onClick={() => setIsGoalFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Goal
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <Card className="">
          <CardHeader>
            <CardTitle>Set a Goal</CardTitle>
            <CardDescription>Create a new goal with milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalsTable />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Goal Progress</CardTitle>
            <CardDescription>Overview of your current goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressCircles />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Milestone Timeline</CardTitle>
          <CardDescription>Visualize your milestones on a timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <MilestonesTimeline />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Goal Projection</CardTitle>
            <CardDescription>Forecast of reaching your goals</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <GoalProjectionChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 hidden">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Notification settings for your goals</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalNotificationsSettings />
          </CardContent>
        </Card>
      </div>

      <GoalFormDialog isOpen={isGoalFormOpen} onClose={() => setIsGoalFormOpen(false)} />
    </div>
  )
}

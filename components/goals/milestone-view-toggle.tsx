"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { List, BarChart2 } from "lucide-react"
import { MilestonesTimeline } from "./milestones-timeline"
import { MilestonesTable } from "./milestone-table"


export function MilestoneViewToggle() {
  const [view, setView] = useState<"timeline" | "table">("timeline")

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="inline-flex rounded-md border">
          <Button
            variant={view === "timeline" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("timeline")}
            className="rounded-r-none"
          >
            <List className="h-4 w-4 mr-2" />
            Timeline
          </Button>
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setView("table")}
            className="rounded-l-none"
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Table
          </Button>
        </div>
      </div>

      {view === "timeline" ? <MilestonesTimeline /> : <MilestonesTable />}
    </div>
  )
}


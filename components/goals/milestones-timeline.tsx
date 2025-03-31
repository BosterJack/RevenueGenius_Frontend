"use client"

import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSelected } from "@/app/provider";
import { useEffect, useState } from "react";

export function MilestonesTimeline() {
  const { selected } = useSelected();
  //@ts-ignore
  const [milestones, setMilestones] = useState(selected?.milestones || []);

  useEffect(() => {
    //@ts-ignore
    setMilestones(selected?.milestones || []);
  }, [selected]);

  milestones && console.log(milestones, "milestones");

  // Sort milestones by target date
  const sortedMilestones = [...(milestones || [])].sort(
    (a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime()
  );

  return (
    <div className="relative">
      <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      <div className="space-y-8">
        {Array.isArray(sortedMilestones) && sortedMilestones?.length>0 &&
          sortedMilestones.map((milestone) => {
            const isLate = !milestone.isCompleted && new Date(milestone.target_date) < new Date();
            const isPending = !milestone.isCompleted && new Date(milestone.target_date) >= new Date();

            return (
              <div key={milestone.id} className="relative flex items-start">
                <div className="absolute left-9 top-5 h-full w-0.5 bg-gray-200"></div>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-gray-200 z-10">
                  {milestone.isCompleted ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  ) : isLate ? (
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  ) : (
                    <Clock className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div className="ml-4 bg-white p-4 rounded-lg border shadow-sm w-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{milestone.name}</h3>
                      <p className="text-sm text-muted-foreground">Goal: {
                      //@ts-ignore
                      selected?.name || "Goal not specified"}</p>
                    </div>
                    <Badge className={milestone?.is_completed ? "bg-green-500" : isLate ? "bg-amber-500" : "bg-blue-500"}>
                      {milestone?.is_completed ? "Completed" : isLate ? "Overdue" : "Upcoming"}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Target Value: </span>
                      <span className="font-medium">{milestone?.target_value}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target Date: </span>
                      <span className="font-medium">{new Date(milestone?.target_date).toLocaleDateString()}</span>
                    </div>
                    {milestone?.is_completed && (
                      <div>
                        <span className="text-muted-foreground">Completed on: </span>
                        <span className="font-medium">{new Date(milestone?.completed_date!).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {sortedMilestones.length === 0 && <p className="text-muted-foreground p-4 rounded-lg bg-gray-100 text-sm">No milestones for this goal.</p>}
      </div>
    </div>
  );
}

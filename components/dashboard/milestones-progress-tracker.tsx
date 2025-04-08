import { useGoals } from "@/hooks/use-goals"
import { CheckCircle2, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export function MilestonesProgressTracker() {
  const { goals } = useGoals()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.isArray(goals) && goals.map((milestone) => {
        const isCompleted = milestone.is_completed
        const formattedDate = milestone.target_date
          ? format(new Date(milestone.target_date), "dd MMM yyyy")
          : "Another date"

        const progressColor =
          milestone.progress_percentage >= 100
            ? "bg-green-500"
            : milestone.progress_percentage >= 70
            ? "bg-yellow-400"
            : "bg-red-400"

        return (
          <div
            key={milestone.id}
            className="bg-white dark:bg-muted rounded-xl border p-4 shadow hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <CheckCircle2 className="text-green-500 h-4 w-4" />
                ) : (
                  <Clock className="text-yellow-500 h-4 w-4" />
                )}
                <h3 className="font-semibold text-sm">{milestone.name}</h3>
              </div>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  isCompleted
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                )}
              >
                {isCompleted ? "✓ Success" : "⏳ Pending"}
              </span>
            </div>

            <div className="text-xs text-muted-foreground mb-2">
              Current value : {milestone.current_value} - Target value : {milestone.target_value}
            </div>

            {/* Capsule progress */}
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className={cn("absolute left-0 top-0 h-full", progressColor)}
                style={{ width: `${milestone.progress_percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Progress: {milestone.progress_percentage}%</span>
              <span>Deadline: {formattedDate}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

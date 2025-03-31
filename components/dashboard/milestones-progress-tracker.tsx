import { Progress } from "@/components/ui/progress"
import { useGoals } from "@/hooks/use-goals"
import { CheckCircle2, Clock } from "lucide-react"

export function MilestonesProgressTracker() {
    const {goals}=  useGoals()
  const milestones = [
    {
      id: 1,
      name: "Atteindre 10 000€ de revenus mensuels",
      progress: 80,
      target: "10 000€",
      current: "8 000€",
      dueDate: "30 juin 2023",
      completed: false,
    },
    {
      id: 2,
      name: "Acquérir 100 nouveaux leads",
      progress: 65,
      target: "100",
      current: "65",
      dueDate: "15 juillet 2023",
      completed: false,
    },
    {
      id: 3,
      name: "Lancer 5 nouveaux contenus",
      progress: 100,
      target: "5",
      current: "5",
      dueDate: "1 juin 2023",
      completed: true,
    },
  ]

  return (
    <div className="space-y-6">
      {Array.isArray(goals) && goals.map((milestone) => (
        <div key={milestone.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {milestone.is_completed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <Clock className="h-5 w-5 text-amber-500" />
              )}
              <span className="font-medium">{milestone.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {milestone.current_value} / {milestone.target_value}
            </div>
          </div>
          <Progress value={milestone.progress_percentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress: {milestone.progress_percentage}%</span>
            <span>Deadline: {milestone?.target_date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}


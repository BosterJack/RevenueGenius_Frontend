"use client"
import { SelectedProvider, useSelected } from "@/app/provider"
import { Badge } from "@/components/ui/badge"
import { useGoals } from "@/hooks/use-goals"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { useContext } from "react"

export function ProgressCircles() {
  const {goals}=  useGoals()
 const { selected,setSelected } = useSelected(); 

 
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "at-risk":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "on-track":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: boolean) => {
    switch (status) {
      case true:
        return "Completed"
      case false:
        return "In Progress"
      
      default:
        return "In Progress"
    }
  }

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-green-500"
      
      case false:
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.isArray(goals) && goals.map((goal) => (
        <div onClick={() => setSelected(goal)}  key={goal.id} className={`flex flex-col cursor-pointer items-center p-4 border rounded-lg 
        
        ${//@ts-ignore
        selected?.id === goal.id ? "bg-red-50 border border-dashed" : ""}`}>
          <div className="relative w-36 h-36 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className={`${
                  goal.is_completed 
                    ? "text-green-500"
                    : goal.status === "at-risk"
                      ? "text-amber-500"
                      : "text-blue-500"
                }`}
                strokeWidth="1"
                strokeDasharray={`${goal.progress * 2.51} 251.2`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{goal?.progress_percentage.toFixed(0)}%</span>
              <Badge className={getStatusColor(goal?.is_completed)}>{getStatusText(goal?.is_completed)}</Badge>
            </div>
          </div>
          <h3 className="text-lg font-medium text-center mb-2">{goal.name}</h3>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Badge variant="outline">{goal?.type_display}</Badge>
            <span>•</span>
            <span>
              {goal?.current_value} / {goal?.target_value}
            </span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Deadline: {new Date(goal.target_date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )
}


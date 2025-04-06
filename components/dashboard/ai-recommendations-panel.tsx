import { Button } from "@/components/ui/button"
import { useContent } from "@/hooks/use-content";
import { Lightbulb, TrendingUp, Users } from "lucide-react"

export function AIRecommendationsPanel() {
  const { contentInsights } = useContent();
  return (
    <div className="space-y-4">
      {Array.isArray(contentInsights) &&
        contentInsights.map((insight, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-start w-full gap-4 p-4 rounded-lg border bg-brand-blue/5">
        <div className="bg-brand-blue rounded-full p-2 text-white">
          <Lightbulb className="h-5 w-5" />
        </div>
              <div className="space-y-1">
                <h3 className="font-medium">{insight?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {insight?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
     
    </div>
  )
}
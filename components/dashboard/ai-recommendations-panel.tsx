import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Users } from "lucide-react"

export function AIRecommendationsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 rounded-lg border bg-brand-blue/5">
        <div className="bg-brand-blue rounded-full p-2 text-white">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Optimize your content strategy</h3>
          <p className="text-sm text-muted-foreground">
            Your webinars generate the best ROI. Consider increasing their frequency from 1 to 2 per month to
            maximize your revenue.
          </p>
          <Button variant="link" className="p-0 h-auto text-brand-blue">
            View detailed analysis
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-4 p-4 rounded-lg border bg-brand-blue/5">
        <div className="bg-brand-blue rounded-full p-2 text-white">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Positive revenue trend</h3>
          <p className="text-sm text-muted-foreground">
            Your revenue has increased by 15% this month. Keep up the momentum by leveraging your top-performing revenue sources.
          </p>
          <Button variant="link" className="p-0 h-auto text-brand-blue">
            Explore forecasts
          </Button>
        </div>
      </div>
      <div className="flex items-start gap-4 p-4 rounded-lg border bg-brand-blue/5">
        <div className="bg-brand-blue rounded-full p-2 text-white">
          <Users className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Improved conversion rate</h3>
          <p className="text-sm text-muted-foreground">
            Your lead conversion rate has increased by 5%. Focus on "hot" leads to maximize conversions.
          </p>
          <Button variant="link" className="p-0 h-auto text-brand-blue">
            View priority leads
          </Button>
        </div>
      </div>
    </div>
  )
}
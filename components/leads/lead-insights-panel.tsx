import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Users, Target } from "lucide-react"
import { useLeads } from "@/hooks/use-leads";
import Link from "next/link";

export function LeadInsightsPanel() {
   const { leadInsights } = useLeads();
      leadInsights && console.log(leadInsights);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(leadInsights) && leadInsights.map((insight, index) => (
          <Card key={index} className="border-0 shadow-none bg-brand-blue/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="bg-brand-blue rounded-full p-2 text-white">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">{insight?.title}</h3>
                <p className="text-sm text-muted-foreground">
                 {insight?.description}
                </p>
                <Link href={insight?.actionUrl||""} target="_blank" className="p-0 h-auto text-brand-blue">
                  {insight?.action}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        ))}

       
      </div>
    </div>
  )
}


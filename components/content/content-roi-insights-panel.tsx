import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, BarChart2, Target } from "lucide-react";
import { useContent } from "@/hooks/use-content";

export function ContentROIInsightsPanel() {
  const { contentInsights } = useContent();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(contentInsights) &&
          contentInsights.map((insight, index) => (
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

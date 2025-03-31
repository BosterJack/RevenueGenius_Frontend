import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function ProjectedMetricsPanel() {
  const metrics = [
    {
      name: "Average Monthly Revenue",
      current: "€6,500",
      projected: "€8,551",
      change: "+31.5%",
      trend: "up",
    },
    {
      name: "Number of Customers",
      current: "32",
      projected: "42",
      change: "+31.3%",
      trend: "up",
    },
    {
      name: "Customer Lifetime Value (LTV)",
      current: "€2,400",
      projected: "€2,850",
      change: "+18.8%",
      trend: "up",
    },
    {
      name: "Customer Acquisition Cost (CAC)",
      current: "€450",
      projected: "€420",
      change: "-6.7%",
      trend: "down",
    },
    {
      name: "LTV/CAC Ratio",
      current: "5.3",
      projected: "6.8",
      change: "+28.3%",
      trend: "up",
    },
    {
      name: "Profit Margin",
      current: "25%",
      projected: "32%",
      change: "+7pts",
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.name} className="border-0 shadow-none bg-brand-blue/5">
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">{metric.name}</div>
            <div className="flex items-center justify-between mt-1">
              <div>
                <div className="text-sm text-muted-foreground">Current</div>
                <div className="text-lg font-semibold">{metric.current}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Projected</div>
                <div className="text-lg font-semibold">{metric.projected}</div>
              </div>
            </div>
            <div className="flex items-center mt-2">
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeads } from "@/hooks/use-leads";
import { Users, UserPlus, UserCheck, Clock } from "lucide-react";

export function LeadMetricsCards() {
  const { leadAnalytics } = useLeads();
  const { total_leads, conversion_rate, avg_lead_value, avg_response_time } =
    leadAnalytics?.metrics || {}
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{total_leads}</div>
          <p className="text-xs text-muted-foreground">A steady growth in lead generation.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversion_rate} %</div>
           <p className="text-xs text-muted-foreground">An improving trend in customer engagement.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Value</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_lead_value}</div>
          <p className="text-xs text-muted-foreground">A promising increase in lead quality.</p>

        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Response Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avg_response_time} h</div>
         <p className="text-xs text-muted-foreground">Efficiency is improving, keeping leads engaged.</p>
        </CardContent>
      </Card>
    </div>
  );
}

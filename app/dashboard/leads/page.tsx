// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { PlusCircle } from "lucide-react"
// import { LeadMetricsCards } from "@/components/leads/lead-metrics-cards"
// import { LeadAcquisitionChart } from "@/components/leads/lead-acquisition-chart"
// import { LeadSourcePieChart } from "@/components/leads/lead-source-pie-chart"
// import { LeadStatusTabs } from "@/components/leads/lead-status-tabs"
// import { LeadInsightsPanel } from "@/components/leads/lead-insights-panel"
// import { LeadFormDialog } from "@/components/leads/lead-form-dialog"
// import { useLeads } from "@/hooks/use-leads"

// export default function LeadsPage() {
//   const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
//   const { exportLeads } = useLeads()

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Suivi des Leads</h1>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={exportLeads}>
//             Exporter
//           </Button>
//           <Button onClick={() => setIsLeadFormOpen(true)}>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             Nouveau lead
//           </Button>
//         </div>
//       </div>

//       <LeadMetricsCards />

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Acquisition de leads</CardTitle>
//             <CardDescription>Tendance d'acquisition sur les 6 derniers mois</CardDescription>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <LeadAcquisitionChart />
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Sources de leads</CardTitle>
//             <CardDescription>Répartition par canal d'acquisition</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <LeadSourcePieChart />
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Gestion des leads</CardTitle>
//           <CardDescription>Suivez et gérez vos prospects jusqu'à la conversion</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LeadStatusTabs />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Insights sur les leads</CardTitle>
//           <CardDescription>Analyses et recommandations pour optimiser vos conversions</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LeadInsightsPanel />
//         </CardContent>
//       </Card>

//       <LeadFormDialog isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { LeadMetricsCards } from "@/components/leads/lead-metrics-cards"
import { LeadAcquisitionChart } from "@/components/leads/lead-acquisition-chart"
import { LeadSourcePieChart } from "@/components/leads/lead-source-pie-chart"
import { LeadStatusTabs } from "@/components/leads/lead-status-tabs"
import { LeadInsightsPanel } from "@/components/leads/lead-insights-panel"
import { LeadFormDialog } from "@/components/leads/lead-form-dialog"
import { useLeads } from "@/hooks/use-leads"

export default function LeadsPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const { exportLeads } = useLeads()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Lead Tracking</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" onClick={exportLeads}>
            Export
          </Button> */}
          <Button onClick={() => setIsLeadFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <LeadMetricsCards />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Lead Acquisition</CardTitle>
            <CardDescription>Acquisition trend over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <LeadAcquisitionChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
            <CardDescription>Distribution by acquisition channel</CardDescription>
          </CardHeader>
          <CardContent>
            <LeadSourcePieChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
          <CardDescription>Track and manage your prospects until conversion</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadStatusTabs />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Insights</CardTitle>
          <CardDescription>Analytics and recommendations to optimize conversions</CardDescription>
        </CardHeader>
        <CardContent>
          <LeadInsightsPanel />
        </CardContent>
      </Card>

      <LeadFormDialog isOpen={isLeadFormOpen} onClose={() => setIsLeadFormOpen(false)} />
    </div>
  )
}

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

// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";
// import { LeadMetricsCards } from "@/components/leads/lead-metrics-cards";
// import { LeadAcquisitionChart } from "@/components/leads/lead-acquisition-chart";
// import { LeadSourcePieChart } from "@/components/leads/lead-source-pie-chart";
// import { LeadStatusTabs } from "@/components/leads/lead-status-tabs";
// import { LeadInsightsPanel } from "@/components/leads/lead-insights-panel";
// import { LeadFormDialog } from "@/components/leads/lead-form-dialog";
// import { useLeads } from "@/hooks/use-leads";
// import LtvCacAnalysis from "@/components/leads/leads-ltv";
// import LeadSegmentation from "@/components/leads/lead-segmentation";
// import LeadInteractions from "@/components/leads/lead-interraction";

// export default function LeadsPage() {
//   const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
//   const { exportLeads } = useLeads();

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Lead Tracking</h1>
//         <div className="flex items-center gap-2">
//           {/* <Button variant="outline" onClick={exportLeads}>
//             Export
//           </Button> */}
//           <Button onClick={() => setIsLeadFormOpen(true)}>
//             <PlusCircle className="mr-2 h-4 w-4" />
//             New Lead
//           </Button>
//         </div>
//       </div>

//       <LeadMetricsCards />

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="col-span-4">
//           <CardHeader>
//             <CardTitle>Lead Acquisition</CardTitle>
//             <CardDescription>
//               Acquisition trend over the last 6 months
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <LeadAcquisitionChart />
//           </CardContent>
//         </Card>
//         <Card className="col-span-3">
//           <CardHeader>
//             <CardTitle>Lead Sources</CardTitle>
//             <CardDescription>
//               Distribution by acquisition channel
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <LeadSourcePieChart />
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Lead Management</CardTitle>
//           <CardDescription>
//             Track and manage your prospects until conversion
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LeadStatusTabs />
//         </CardContent>
//       </Card>
     

//        <Card>
//         <CardHeader>
//           <CardTitle> Lead Segmentation</CardTitle>
//           <CardDescription>
//             Analyze customer acquisition costs and lifetime value to optimize
//             marketing strategy and improve ROI.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LeadSegmentation />
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle> Lead Interactions</CardTitle>
//           <CardDescription>
//             Gain insights into customer behavior and preferences to enhance
//             targeting and increase conversion rates.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           < LeadInteractions />
//         </CardContent>
//       </Card>
     
//       <Card>
//         <CardHeader>
//           <CardTitle>LTV/CAC Analysis</CardTitle>
//           <CardDescription>
//             Analyze your customer acquisition costs and lifetime value to
//             optimize your marketing strategy and improve your return on
//             investment.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LtvCacAnalysis />
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <CardTitle>Lead Insights</CardTitle>
//           <CardDescription>
//             Analytics and recommendations to optimize conversions
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <LeadInsightsPanel />
//         </CardContent>
//       </Card>

//       <LeadFormDialog
//         isOpen={isLeadFormOpen}
//         onClose={() => setIsLeadFormOpen(false)}
//       />
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { LeadMetricsCards } from "@/components/leads/lead-metrics-cards";
import { LeadAcquisitionChart } from "@/components/leads/lead-acquisition-chart";
import { LeadSourcePieChart } from "@/components/leads/lead-source-pie-chart";
import { LeadStatusTabs } from "@/components/leads/lead-status-tabs";
import { LeadInsightsPanel } from "@/components/leads/lead-insights-panel";
import { LeadFormDialog } from "@/components/leads/lead-form-dialog";
import { useLeads } from "@/hooks/use-leads";
import LtvCacAnalysis from "@/components/leads/leads-ltv";
import LeadSegmentation from "@/components/leads/lead-segmentation";
import LeadInteractions from "@/components/leads/lead-interraction";

export default function LeadsPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const { exportLeads } = useLeads();

  // State for tracking active tab
  const [activeTab, setActiveTab] = useState("acquisition");

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

      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("acquisition")}
          className={`py-2 px-4 ${activeTab === "acquisition" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Acquisition and Source
        </button>
        {/* <button
          onClick={() => setActiveTab("sources")}
          className={`py-2 px-4 ${activeTab === "sources" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Sources
        </button> */}
        <button
          onClick={() => setActiveTab("management")}
          className={`py-2 px-4 ${activeTab === "management" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Management
        </button>
        <button
          onClick={() => setActiveTab("segmentation")}
          className={`py-2 px-4 ${activeTab === "segmentation" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Segmentation
        </button>
        <button
          onClick={() => setActiveTab("interactions")}
          className={`py-2 px-4 ${activeTab === "interactions" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Interactions
        </button>
        <button
          onClick={() => setActiveTab("ltv-cac")}
          className={`py-2 px-4 ${activeTab === "ltv-cac" ? "border-b-2 border-blue-500" : ""}`}
        >
          LTV/CAC Analysis
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`py-2 px-4 ${activeTab === "insights" ? "border-b-2 border-blue-500" : ""}`}
        >
          Lead Insights
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "acquisition" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Lead Acquisition</CardTitle>
              <CardDescription>
                Acquisition trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LeadAcquisitionChart />
            </CardContent>
          </Card>
           <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>
                Distribution by acquisition channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadSourcePieChart />
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>
                Distribution by acquisition channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadSourcePieChart />
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "management" && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Management</CardTitle>
            <CardDescription>
              Track and manage your prospects until conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadStatusTabs />
          </CardContent>
        </Card>
      )}

      {activeTab === "segmentation" && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Segmentation</CardTitle>
            <CardDescription>
              Analyze customer acquisition costs and lifetime value to optimize
              marketing strategy and improve ROI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadSegmentation />
          </CardContent>
        </Card>
      )}

      {activeTab === "interactions" && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Interactions</CardTitle>
            <CardDescription>
              Gain insights into customer behavior and preferences to enhance
              targeting and increase conversion rates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadInteractions />
          </CardContent>
        </Card>
      )}

      {activeTab === "ltv-cac" && (
        <Card>
          <CardHeader>
            <CardTitle>LTV/CAC Analysis</CardTitle>
            <CardDescription>
              Analyze your customer acquisition costs and lifetime value to
              optimize your marketing strategy and improve your return on
              investment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LtvCacAnalysis />
          </CardContent>
        </Card>
      )}

      {activeTab === "insights" && (
        <Card>
          <CardHeader>
            <CardTitle>Lead Insights</CardTitle>
            <CardDescription>
              Analytics and recommendations to optimize conversions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadInsightsPanel />
          </CardContent>
        </Card>
      )}

      <LeadFormDialog
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
      />
    </div>
  );
}

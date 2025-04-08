// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { ArrowUpRight, TrendingUp, Users, FileText, Target, AlertCircle } from "lucide-react"
// import { RevenueChart } from "@/components/dashboard/revenue-chart"
// import { LeadConversionChart } from "@/components/dashboard/lead-conversion-chart"
// import { ContentROIChart } from "@/components/dashboard/content-roi-chart"
// import { AIRecommendationsPanel } from "@/components/dashboard/ai-recommendations-panel"
// import { MilestonesProgressTracker } from "@/components/dashboard/milestones-progress-tracker"
// import { ForecastFormDialog } from "@/components/forecasting/forecast-form-dialog"
// import { useForecasting } from "@/hooks/use-forecasting"
// import { useLeads } from "@/hooks/use-leads"
// import { useContent } from "@/hooks/use-content"
// import { useGoals } from "@/hooks/use-goals"

// export default function DashboardPage() {
//   const [isForecastDialogOpen, setIsForecastDialogOpen] = useState(false)
//   const { exportForecasts ,revenueData} = useForecasting()
// const {leads}=useLeads()
// const {content}=useContent()
// const {goals}=useGoals()

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
//         <div className="flex items-center gap-2">
//           {/* <Button variant="outline" onClick={exportForecasts}>
//             Exporter
//           </Button> */}
//           <Button onClick={() => setIsForecastDialogOpen(true)}>
//             Nouvelle prévision
//             <ArrowUpRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="day" className="space-y-4">
//         {/* <div className="flex items-center justify-between">
//           <TabsList>
//             <TabsTrigger value="day">Jour</TabsTrigger>
//             <TabsTrigger value="week">Semaine</TabsTrigger>
//             <TabsTrigger value="month">Mois</TabsTrigger>
//             <TabsTrigger value="year">Année</TabsTrigger>
//           </TabsList>
//         </div> */}

//         <TabsContent value="day" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Revenus</CardTitle>
//                 <TrendingUp className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{revenueData?.length||0}</div>
//                 <p className="text-xs text-muted-foreground">enregistree a nos jours</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Leads</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{leads?.length||0}</div>
//                 <p className="text-xs text-muted-foreground">enregistree a nos jours</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Contenu</CardTitle>
//                 <FileText className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{content?.length||0}</div>
//                 <p className="text-xs text-muted-foreground">enregistree a nos jours</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Objectifs</CardTitle>
//                 <Target className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{goals?.length||0}</div>
//                 <p className="text-xs text-muted-foreground">enregistree a nos jours</p>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Revenus</CardTitle>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <RevenueChart />
//               </CardContent>
//             </Card>
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Conversion des leads</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <LeadConversionChart />
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>ROI du contenu</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ContentROIChart />
//               </CardContent>
//             </Card>
//             <Card className="col-span-4">
//               <CardHeader className="flex flex-row items-center">
//                 <div>
//                   <CardTitle>Recommandations IA</CardTitle>
//                   <CardDescription>Insights générés par Jerry Genie</CardDescription>
//                 </div>
//                 <div className="ml-auto flex items-center gap-2">
//                   <AlertCircle className="h-4 w-4 text-brand-blue" />
//                   <span className="text-xs text-muted-foreground">Mis à jour il y a 2h</span>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <AIRecommendationsPanel />
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Progression des jalons</CardTitle>
//               <CardDescription>Suivi de vos objectifs et jalons</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <MilestonesProgressTracker />
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <ForecastFormDialog isOpen={isForecastDialogOpen} onClose={() => setIsForecastDialogOpen(false)} />
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, Users, FileText, Target, AlertCircle } from "lucide-react"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { LeadConversionChart } from "@/components/dashboard/lead-conversion-chart"
import { ContentROIChart } from "@/components/dashboard/content-roi-chart"
import { AIRecommendationsPanel } from "@/components/dashboard/ai-recommendations-panel"
import { MilestonesProgressTracker } from "@/components/dashboard/milestones-progress-tracker"
import { ForecastFormDialog } from "@/components/forecasting/forecast-form-dialog"
import { useForecasting } from "@/hooks/use-forecasting"
import { useLeads } from "@/hooks/use-leads"
import { useContent } from "@/hooks/use-content"
import { useGoals } from "@/hooks/use-goals"

export default function DashboardPage() {
  const [isForecastDialogOpen, setIsForecastDialogOpen] = useState(false)
  const { exportForecasts, revenueData } = useForecasting()
  const { leads } = useLeads()
  const { content } = useContent()
  const { goals } = useGoals()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" onClick={exportForecasts}>
            Export
          </Button> */}
          
        </div>
      </div>

      <Tabs defaultValue="day" className="space-y-4">
        {/* <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </div> */}

        <TabsContent value="day" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueData?.length || 0}</div>
                <p className="text-xs text-muted-foreground">recorded to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads?.length || 0}</div>
                <p className="text-xs text-muted-foreground">recorded to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{content?.length || 0}</div>
                <p className="text-xs text-muted-foreground">recorded to date</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goals?.length || 0}</div>
                <p className="text-xs text-muted-foreground">recorded to date</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Lead Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <LeadConversionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Content ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <ContentROIChart />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Insights generated by Jerry Genie</CardDescription>
                </div>
                {/* <div className="ml-auto flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-brand-blue" />
                  <span className="text-xs text-muted-foreground">Updated 2h ago</span>
                </div> */}
              </CardHeader>
              <CardContent>
                <AIRecommendationsPanel />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Goals Progress</CardTitle>
              <CardDescription>Track your goals progress</CardDescription>
            </CardHeader>
            <CardContent>
              <MilestonesProgressTracker />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ForecastFormDialog isOpen={isForecastDialogOpen} onClose={() => setIsForecastDialogOpen(false)} />
    </div>
  )
}
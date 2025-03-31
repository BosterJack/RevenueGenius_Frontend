"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeadManagementTable } from "./lead-management-table"

export function LeadStatusTabs() {
  return (
    <Tabs defaultValue="all" className="space-y-4">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="cold">Cold</TabsTrigger>
        <TabsTrigger value="warm">Warm</TabsTrigger>
        <TabsTrigger value="hot">Hot</TabsTrigger>
       
      </TabsList>
      <TabsContent value="all">
        <LeadManagementTable />
      </TabsContent>
      <TabsContent value="cold">
        <LeadManagementTable filter="cold" />
      </TabsContent>
      <TabsContent value="warm">
        <LeadManagementTable filter="warm" />
      </TabsContent>
      <TabsContent value="hot">
        <LeadManagementTable filter="hot" />
      </TabsContent>
      <TabsContent value="converted">
        <LeadManagementTable filter="converted" />
      </TabsContent>
    </Tabs>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLeads } from "@/hooks/use-leads"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data
const leadSegmentationData = {
  engagement_segments: {
    highly_engaged: 0,
    moderately_engaged: 20,
    not_engaged: 33,
  },
  value_segments: {
    high_value: 30,
    medium_value: 14,
    low_value: 9,
    unknown_value: 0,
  },
  purchase_timing: {
    ready_to_buy: 19,
    evaluating: 13,
    early_stage: 21,
  },
  priority_segments: [
    {
      name: "High-Value Engaged Leads",
      count: 1,
      description: "High-value leads with recent engagement",
      leads: [
        {
          id: "0a55044c-6e32-4474-8e77-083d4a425098",
          name: "Lead 8",
          email: "lead8@example.com",
          value: 896,
        },
      ],
    },
    {
      name: "Neglected Warm Leads",
      count: 5,
      description: "Warm leads without recent contact",
      leads: [
        {
          id: "1a55db82-563d-4be2-b668-2ff6167bb931",
          name: "Lead 100 test done!!",
          email: "lead10@example.com",
          last_contact: "2025-03-23",
        },
        {
          id: "fa0a77ff-5c58-4669-a9dd-253c66fdb704",
          name: "Lead 38",
          email: "lead38@example.com",
          last_contact: "2025-03-25",
        },
        {
          id: "076b786f-d9b1-4152-8f8d-80bb4f712bb1",
          name: "Lead 40",
          email: "lead40@example.com",
          last_contact: "2025-03-25",
        },
        {
          id: "24a02d8f-d144-49c2-b6b2-2be8735c6a1d",
          name: "Lead 42",
          email: "lead42@example.com",
          last_contact: "2025-03-25",
        },
        {
          id: "1545320c-7e14-4bca-8950-e8ac1eabafb2",
          name: "Lead 44",
          email: "lead44@example.com",
          last_contact: "2025-03-28",
        },
      ],
    },
  ],
}

// Format data for charts

export default function LeadSegmentation() {
  const {leadsSegmentation : leadSegmentationData}=useLeads()
  

  const engagementData = [
  { name: "Highly Engaged", value: leadSegmentationData && leadSegmentationData?.engagement_segments.highly_engaged },
  { name: "Moderately Engaged", value: leadSegmentationData && leadSegmentationData?.engagement_segments.moderately_engaged },
  { name: "Not Engaged", value: leadSegmentationData && leadSegmentationData?.engagement_segments.not_engaged },
]

const valueData = [
  { name: "High Value", value: leadSegmentationData && leadSegmentationData?.value_segments.high_value },
  { name: "Medium Value", value:leadSegmentationData && leadSegmentationData?.value_segments.medium_value },
  { name: "Low Value", value:leadSegmentationData && leadSegmentationData?.value_segments.low_value },
  { name: "Unknown Value", value:leadSegmentationData && leadSegmentationData?.value_segments.unknown_value },
]

const timingData = [
  { name: "Ready to Buy", value:leadSegmentationData && leadSegmentationData?.purchase_timing.ready_to_buy },
  { name: "Evaluating", value:leadSegmentationData && leadSegmentationData?.purchase_timing.evaluating },
  { name: "Early Stage", value:leadSegmentationData && leadSegmentationData?.purchase_timing.early_stage },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold"></h2> */}

      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="value">Value</TabsTrigger>
          <TabsTrigger value="timing">Purchase Timing</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Lead Engagement Segments</CardTitle>
              <CardDescription>Segmentation of leads based on their engagement level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {Array.isArray(engagementData) && engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} leads`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value">
          <Card>
            <CardHeader>
              <CardTitle>Lead Value Segments</CardTitle>
              <CardDescription>Segmentation of leads based on their potential value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={valueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {valueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} leads`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timing">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Timing Segments</CardTitle>
              <CardDescription>Segmentation of leads based on their purchase readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timingData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {timingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} leads`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Priority Lead Segments</CardTitle>
          <CardDescription>High-priority lead segments that require attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.isArray(leadSegmentationData?.priority_segments) && leadSegmentationData?.priority_segments?.map((segment:any, index:any) => (
              <div key={index} className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{segment.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {segment.description} ({segment.count} leads)
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>{segment.leads[0].value !== undefined ? "Value" : "Last Contact"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    { Array.isArray(segment.leads) && segment.leads.map((lead:any) => (
                      <TableRow key={lead.id}>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>
                          {lead.value !== undefined ? `$${lead.value}` : formatDate(lead.last_contact)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


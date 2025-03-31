"use client"

import { useLeads } from "@/hooks/use-leads";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Blog", value: 25 },
  { name: "Social", value: 35 },
  { name: "Webinar", value: 20 },
  { name: "Ads", value: 15 },
  { name: "Referral", value: 5 },
]

const COLORS = ["#003B5C", "#0077B6", "#4A1D6E", "#E6A54C", "#6A3093"]

export function LeadSourcePieChart() {
  const { leadAnalytics } = useLeads();
      const {sources} = leadAnalytics || {};
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={sources??sources}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {
            // @ts-ignore
          Array.isArray(sources) && sources?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}%`, "Proportion"]}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Source</span>
                      <span className="font-bold text-muted-foreground">{payload[0].name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Proportion</span>
                      <span className="font-bold">{payload[0].value}%</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}


"use client"

import { useLeads } from "@/hooks/use-leads";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Jan",
    leads: 40,
    conversions: 24,
  },
  {
    name: "Feb",
    leads: 30,
    conversions: 13,
  },
  {
    name: "Mar",
    leads: 20,
    conversions: 8,
  },
  {
    name: "Apr",
    leads: 27,
    conversions: 15,
  },
  {
    name: "May",
    leads: 18,
    conversions: 12,
  },
  {
    name: "Jun",
    leads: 23,
    conversions: 17,
  },
  {
    name: "Jul",
    leads: 34,
    conversions: 22,
  },
]

export function LeadConversionChart() {
   const { leadAnalytics } = useLeads();
      const {trends} = leadAnalytics || {};
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={trends}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Week</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload?.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0]?.name}</span>
                      <span className="font-bold">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col col-span-2">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[1]?.name}</span>
                      <span className="font-bold">{payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="leads" name="Leads" fill="#003B5C" radius={[4, 4, 0, 0]} />
        <Bar dataKey="conversions" name="Conversions" fill="#E6A54C" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


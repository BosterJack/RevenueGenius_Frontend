"use client"

import { useLeads } from "@/hooks/use-leads";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    month: "Jan",
    leads: 18,
    conversions: 4,
  },
  {
    month: "Fév",
    leads: 22,
    conversions: 5,
  },
  {
    month: "Mar",
    leads: 25,
    conversions: 6,
  },
  {
    month: "Avr",
    leads: 30,
    conversions: 7,
  },
  {
    month: "Mai",
    leads: 28,
    conversions: 6,
  },
  {
    month: "Juin",
    leads: 35,
    conversions: 8,
  },
]

export function LeadAcquisitionChart() {
    const { leadAnalytics } = useLeads();
    const {trends} = leadAnalytics || {};
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={trends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Week</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Leads</span>
                      
                      <span className="font-bold">{
                        // @ts-ignore
                      payload[0].leads}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Conversions</span>
                      <span className="font-bold">{
                           // @ts-ignore
                      payload[1].conversion}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="leads"
          name="Leads"
          stroke="#003B5C"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#003B5C", opacity: 0.8 },
          }}
        />
        <Line
          type="monotone"
          dataKey="conversions"
          name="Conversions"
          stroke="#E6A54C"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#E6A54C", opacity: 0.8 },
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}


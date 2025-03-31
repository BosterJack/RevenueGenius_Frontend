"use client"

import { useContent } from "@/hooks/use-content";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  {
    month: "Jan",
    visits: 1500,
    leads: 45,
    conversions: 12,
  },
  {
    month: "Fév",
    visits: 1800,
    leads: 54,
    conversions: 15,
  },
  {
    month: "Mar",
    visits: 2200,
    leads: 66,
    conversions: 18,
  },
  {
    month: "Avr",
    visits: 2500,
    leads: 75,
    conversions: 22,
  },
  {
    month: "Mai",
    visits: 2800,
    leads: 84,
    conversions: 25,
  },
  {
    month: "Juin",
    visits: 3200,
    leads: 96,
    conversions: 30,
  },
]

export function ContentPerformanceTrendsChart() {
     const { monthlyTrends } = useContent();
        
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={monthlyTrends||[]}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Months</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Visits</span>
                      <span className="font-bold">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Leads</span>
                      <span className="font-bold">{payload[1].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Conversions</span>
                      <span className="font-bold">{payload[2].value}</span>
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
          dataKey="visits"
          name="Visits"
          stroke="#003B5C"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#003B5C", opacity: 0.8 },
          }}
        />
        <Line
          type="monotone"
          dataKey="leads"
          name="Leads"
          stroke="#4A1D6E"
          strokeWidth={2}
          activeDot={{
            r: 6,
            style: { fill: "#4A1D6E", opacity: 0.8 },
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


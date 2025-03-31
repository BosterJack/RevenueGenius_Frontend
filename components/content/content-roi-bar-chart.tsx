"use client"

import { useContent } from "@/hooks/use-content";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  {
    type: "Blog",
    roi: 120,
    visits: 2500,
    leads: 75,
  },
  {
    type: "Email",
    roi: 180,
    visits: 1800,
    leads: 90,
  },
  {
    type: "Webinar",
    roi: 250,
    visits: 1200,
    leads: 120,
  },
  {
    type: "Video",
    roi: 150,
    visits: 3000,
    leads: 85,
  },
  {
    type: "Social",
    roi: 90,
    visits: 4500,
    leads: 60,
  },
]

export function ContentROIBarChart() {
    const { roiByType } = useContent();
      
     
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={roiByType || []}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Type</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload?.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">ROI</span>
                      <span className="font-bold">{
                        //@ts-ignore
                      payload[0]?.roi}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Visits</span>
                      <span className="font-bold">{payload[0].payload.visits}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Leads</span>
                      <span className="font-bold">{payload[0].payload.leads}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="roi" fill="#4A1D6E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}


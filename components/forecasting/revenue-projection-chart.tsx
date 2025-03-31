"use client"

import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, ComposedChart } from "recharts"

const data = [
  {
    month: "Jul 23",
    actual: 5000,
    forecast: 5000,
    lower: 5000,
    upper: 5000,
  },
  {
    month: "Aug 23",
    actual: 5200,
    forecast: 5250,
    lower: 5100,
    upper: 5400,
  },
  {
    month: "Sep 23",
    actual: 5500,
    forecast: 5512,
    lower: 5300,
    upper: 5700,
  },
  {
    month: "Oct 23",
    actual: 5800,
    forecast: 5788,
    lower: 5500,
    upper: 6000,
  },
  {
    month: "Nov 23",
    actual: 6100,
    forecast: 6077,
    lower: 5800,
    upper: 6300,
  },
  {
    month: "Dec 23",
    actual: 6500,
    forecast: 6381,
    lower: 6100,
    upper: 6700,
  },
  {
    month: "Jan 24",
    forecast: 6700,
    lower: 6300,
    upper: 7100,
  },
  {
    month: "Feb 24",
    forecast: 7035,
    lower: 6600,
    upper: 7500,
  },
  {
    month: "Mar 24",
    forecast: 7387,
    lower: 6900,
    upper: 7900,
  },
  {
    month: "Apr 24",
    forecast: 7756,
    lower: 7200,
    upper: 8300,
  },
  {
    month: "May 24",
    forecast: 8144,
    lower: 7500,
    upper: 8700,
  },
  {
    month: "Jun 24",
    forecast: 8551,
    lower: 7800,
    upper: 9200,
  },
]

export function RevenueProjectionChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                    </div>
                    {payload[0].payload.actual && (
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Actual</span>
                        <span className="font-bold">€{payload[0].payload.actual}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Forecast</span>
                      <span className="font-bold">€{payload[0].payload.forecast}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Range</span>
                      <span className="font-bold">
                        €{payload[0].payload.lower} - €{payload[0].payload.upper}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="upper"
          stroke="transparent"
          fill="#003B5C"
          fillOpacity={0.1}
          name="Upper Range"
        />
        <Area
          type="monotone"
          dataKey="lower"
          stroke="transparent"
          fill="#003B5C"
          fillOpacity={0.1}
          name="Lower Range"
        />
        <Line
          type="monotone"
          dataKey="actual"
          name="Actual Revenue"
          stroke="#E6A54C"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke="#003B5C"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

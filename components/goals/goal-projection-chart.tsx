"use client"

import { useGoals } from "@/hooks/use-goals";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts"

const data = [
  {
    month: "Jan",
    actual: 3000,
    projected: 3000,
    target: 3000,
  },
  {
    month: "Fév",
    actual: 4000,
    projected: 4000,
    target: 4000,
  },
  {
    month: "Mar",
    actual: 5000,
    projected: 5000,
    target: 5000,
  },
  {
    month: "Avr",
    actual: 6000,
    projected: 6000,
    target: 6000,
  },
  {
    month: "Mai",
    actual: 7000,
    projected: 7000,
    target: 7000,
  },
  {
    month: "Juin",
    actual: 8000,
    projected: 8000,
    target: 7500,
  },
  {
    month: "Juil",
    projected: 8500,
    target: 8000,
  },
  {
    month: "Août",
    projected: 9000,
    target: 8500,
  },
  {
    month: "Sept",
    projected: 9500,
    target: 9000,
  },
  {
    month: "Oct",
    projected: 10000,
    target: 10000,
  },
]

export function GoalProjectionChart() {
  const {goals}=useGoals()
  const data = Array.isArray(goals) && goals.map(milestone => ({
  month: new Date(milestone.start_date).toLocaleString("fr-FR", { month: "short" }),
  actual: milestone.current_value || undefined,
  projected: milestone.progress_percentage ? (milestone.target_value * milestone.progress_percentage) / 100 : undefined,
  target: milestone.target_value,
}));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <
        // @ts-ignore
        LineChart data={data}>
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
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Mois</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                    </div>
                    {payload[0].payload.actual !== undefined && (
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Réel</span>
                        <span className="font-bold">€{payload[0].payload.actual}</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Projection</span>
                      <span className="font-bold">€{payload[0].payload.projected}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Objectif</span>
                      <span className="font-bold">€{payload[0].payload.target}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <ReferenceLine y={10000} stroke="#E6A54C" strokeDasharray="3 3" label="Objectif final" />
        <Line
          type="monotone"
          dataKey="actual"
          name="Réel"
          stroke="#003B5C"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="projected"
          name="Projection"
          stroke="#4A1D6E"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="target"
          name="Objectif"
          stroke="#E6A54C"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}


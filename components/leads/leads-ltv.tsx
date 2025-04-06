"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLeads } from "@/hooks/use-leads"

// Sample data
const ltvCacData = {
  current: {
    ltv: 6450,
    cac: 314.7,
    ratio: 20.5,
  },
  monthly_trend: [
    {
      month: "Nov",
      ltv: 0,
      cac: 0,
      ratio: 0,
    },
    {
      month: "Dec",
      ltv: 0,
      cac: 0,
      ratio: 0,
    },
    {
      month: "Jan",
      ltv: 2160,
      cac: 1615,
      ratio: 1.34,
    },
    {
      month: "Feb",
      ltv: 0,
      cac: 0,
      ratio: 0,
    },
    {
      month: "Mar",
      ltv: 6760,
      cac: 105,
      ratio: 64.38,
    },
    {
      month: "Apr",
      ltv: 6486,
      cac: 6,
      ratio: 1081,
    },
  ],
  recommendations: [
    {
      title: "LTV:CAC Ratio Status",
      description:
        "Your LTV:CAC ratio is excellent. Consider investing more in growth as you have room to increase acquisition spending while maintaining profitability.",
    },
  ],
}

export default function LtvCacAnalysis() {
  const {leadsLTV:ltvCacData}=useLeads()
  // Filter out months with zero values for better visualization
  //@ts-ignore
  const chartData =ltvCacData &&  ltvCacData.monthly_trend.filter((item) => item.ltv > 0 || item.cac > 0)

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold">LTV/CAC Analysis</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Lifetime Value (LTV)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ltvCacData && ltvCacData?.current?.ltv.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customer Acquisition Cost (CAC)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${ltvCacData && ltvCacData?.current?.cac.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">LTV:CAC Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ltvCacData && ltvCacData?.current.ratio.toFixed(2)}:1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LTV/CAC Trend</CardTitle>
          <CardDescription>Monthly trend of LTV and CAC values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, ""]} />
                <Line
                  type="monotone"
                  dataKey="ltv"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  name="LTV"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="cac"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  name="CAC"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>LTV:CAC Ratio Trend</CardTitle>
          <CardDescription>Monthly trend of LTV:CAC ratio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(2)}:1`, "LTV:CAC Ratio"]} />
                <Line
                  type="monotone"
                  dataKey="ratio"
                  stroke="#22c55e"
                  strokeWidth={2}
                  name="Ratio"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Insights based on your LTV:CAC analysis</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {
          //@ts-ignore
          ltvCacData && ltvCacData?.recommendations?.map((recommendation, index) => (
            <Alert key={index}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{recommendation.title}</AlertTitle>
              <AlertDescription>{recommendation.description}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


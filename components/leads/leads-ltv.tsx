"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLeads } from "@/hooks/use-leads";

export default function LtvCacAnalysis() {
  const { leadsLTV: ltvCacData } = useLeads();
  // Filter out months with zero values for better visualization
  //@ts-ignore
  const chartData =
    ltvCacData &&
    // @ts-ignore
    ltvCacData.monthly_trend.filter((item) => item.ltv > 0 || item.cac > 0);

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold">LTV/CAC Analysis</h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Lifetime Value (LTV)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${ltvCacData && ltvCacData?.current?.ltv.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Customer Acquisition Cost (CAC)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${ltvCacData && ltvCacData?.current?.cac.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">LTV:CAC Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ltvCacData && ltvCacData?.current.ratio.toFixed(2)}:1
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>LTV/CAC Trend</CardTitle>
          <CardDescription>Monthly trend of LTV and CAC values</CardDescription>
          <p className="text-sm text-gray-400 my-4 italic">
            This chart shows the monthly trend of *Customer Lifetime Value
            (LTV)* and *Customer Acquisition Cost (CAC)*. When LTV is
            consistently higher than CAC, it indicates healthy profitability. If
            CAC approaches or exceeds LTV, it suggests that acquiring customers
            is becoming too costly compared to the revenue they generate.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {/* <LineChart data={chartData}>
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
              </LineChart> */}
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                />
                <Legend />
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
          <p className="text-sm text-gray-400 my-4 italic">
            This chart illustrates the monthly trend of the *LTV:CAC ratio*. A
            ratio above **3:1** is typically considered excellent. A ratio close
            to **1:1** means the cost of acquiring a customer is nearly equal to
            their lifetime value, which is unsustainable over time.
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `${value.toFixed(2)}:1`,
                    "LTV:CAC Ratio",
                  ]}
                />
                <Legend />
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
          <CardDescription>
            Insights based on your LTV:CAC analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {
            //@ts-ignore
            ltvCacData && 
           
            //@ts-ignore
              ltvCacData?.recommendations?.map((recommendation, index) => (
                <Alert key={index}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{recommendation.title}</AlertTitle>
                  <AlertDescription>
                    {recommendation.description}
                  </AlertDescription>
                </Alert>
              ))
          }
        </CardContent>
      </Card>
    </div>
  );
}

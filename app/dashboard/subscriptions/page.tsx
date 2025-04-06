"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const subscriptionsData = [
  {
    id: 1,
    user: 2,
    plan: 2,
    plan_details: {
      id: 2,
      name: "Pro Plan",
      slug: "pro",
      description: "Plan professionnel avec toutes les fonctionnalités",
      price: "39.00",
      billing_cycle: "monthly",
      is_active: true,
      features: {},
      sort_order: 2,
      billing_cycle_display: "Monthly",
    },
    is_active: true,
    started_at: "2025-04-01T23:21:06.960370Z",
    expires_at: "2026-04-01T23:21:06.959564Z",
    billing_period: "monthly",
    stripe_subscription_id: null,
    canceled_at: null,
    is_pro: true,
    status: "active",
  },
]

export default function SubscriptionsView() {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate metrics
  const activeSubscriptions = subscriptionsData.filter((sub) => sub.is_active).length
  const totalRevenue = subscriptionsData.reduce((sum, sub) => {
    const price = Number.parseFloat(sub.plan_details.price)
    return sum + price
  }, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Subscriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSubscriptions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Annual Projected Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue * 12).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>View all active subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Started</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptionsData.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>{subscription.user}</TableCell>
                  <TableCell>{subscription.plan_details.name}</TableCell>
                  <TableCell>${subscription.plan_details.price}</TableCell>
                  <TableCell>{subscription.plan_details.billing_cycle_display}</TableCell>
                  <TableCell>{formatDate(subscription.started_at)}</TableCell>
                  <TableCell>{formatDate(subscription.expires_at)}</TableCell>
                  <TableCell>
                    <Badge variant={subscription.is_active ? "default" : "outline"}>{subscription.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


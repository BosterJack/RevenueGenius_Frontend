"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { CalendarIcon, Plus, Pencil } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Sample data - fixed to ensure valid JSON
const revenueData = [
  {
    id: "fe307a63-9015-4bf7-9cf3-92ca4298318a",
    business: "16626224-1fac-4b8f-83f8-112264ace533",
    date: "2024-04-01",
    amount: "3022.52",
    source: "Subscription",
    category: null,
  },
  {
    id: "0d6b32e6-a828-44b8-a9a9-ce68a77bb1eb",
    business: "16626224-1fac-4b8f-83f8-112264ace533",
    date: "2024-04-08",
    amount: "2877.17",
    source: "Subscription",
    category: null,
  },
  {
    id: "73840fcf-a8b1-4a76-a862-6ad81305b563",
    business: "16626224-1fac-4b8f-83f8-112264ace533",
    date: "2024-04-15",
    amount: "2793.78",
    source: "Services",
    category: null,
  },
  {
    id: "7cdea359-cf30-4953-b158-6e52ef71708b",
    business: "16626224-1fac-4b8f-83f8-112264ace533",
    date: "2024-04-22",
    amount: "3162.44",
    source: "Subscription",
    category: null,
  },
]

// Format data for chart
const chartData = revenueData.map((item) => ({
  date: format(new Date(item.date), "MMM dd"),
  amount: Number.parseFloat(item.amount),
}))

// Form schema
const revenueFormSchema = z.object({
  date: z.date({
    required_error: "Date is required",
  }),
  amount: z.string().min(1, "Amount is required"),
  source: z.string().min(1, "Source is required"),
  category: z.string().optional(),
})

type RevenueFormValues = z.infer<typeof revenueFormSchema>

export default function RevenueTracking() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRevenue, setSelectedRevenue] = useState<any>(null)

  const addForm = useForm<RevenueFormValues>({
    resolver: zodResolver(revenueFormSchema),
    defaultValues: {
      date: new Date(),
      amount: "",
      source: "",
      category: "",
    },
  })

  const editForm = useForm<RevenueFormValues>({
    resolver: zodResolver(revenueFormSchema),
    defaultValues: {
      date: new Date(),
      amount: "",
      source: "",
      category: "",
    },
  })

  function onAddSubmit(data: RevenueFormValues) {
    console.log("Add revenue data:", data)
    setIsAddDialogOpen(false)
    addForm.reset()
  }

  function onEditSubmit(data: RevenueFormValues) {
    console.log("Edit revenue data:", data)
    setIsEditDialogOpen(false)
  }

  function handleEditRevenue(revenue: any) {
    setSelectedRevenue(revenue)
    editForm.reset({
      date: new Date(revenue.date),
      amount: revenue.amount,
      source: revenue.source,
      category: revenue.category || "",
    })
    setIsEditDialogOpen(true)
  }

  function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  // Calculate metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + Number.parseFloat(item.amount), 0)
  const averageRevenue = totalRevenue / revenueData.length

  // Group by source
  const revenueBySource = revenueData.reduce((acc: Record<string, number>, item) => {
    const source = item.source
    if (!acc[source]) {
      acc[source] = 0
    }
    acc[source] += Number.parseFloat(item.amount)
    return acc
  }, {})

  // Find top source
  let topSource = ""
  let topAmount = 0
  Object.entries(revenueBySource).forEach(([source, amount]) => {
    if (amount > topAmount) {
      topSource = source
      topAmount = amount
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Revenue Tracking</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Revenue
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Revenue Entry</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select revenue source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Subscription">Subscription</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                          <SelectItem value="Products">Products</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Revenue
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Top Revenue Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topSource}</div>
            <p className="text-xs text-muted-foreground">${topAmount.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
          <CardDescription>Revenue trends for the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Bar dataKey="amount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Entries</CardTitle>
          <CardDescription>All recorded revenue transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueData.map((revenue) => (
                <TableRow key={revenue.id}>
                  <TableCell>{formatDate(revenue.date)}</TableCell>
                  <TableCell>${revenue.amount}</TableCell>
                  <TableCell>{revenue.source}</TableCell>
                  <TableCell>{revenue.category || "-"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditRevenue(revenue)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Revenue Entry</DialogTitle>
          </DialogHeader>
          {selectedRevenue && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <FormField
                  control={editForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select revenue source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Subscription">Subscription</SelectItem>
                          <SelectItem value="Services">Services</SelectItem>
                          <SelectItem value="Products">Products</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Category" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Update Revenue
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


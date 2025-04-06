// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { ForecastControls } from "@/components/forecasting/forecast-controls"
// import { RevenueProjectionChart } from "@/components/forecasting/revenue-projection-chart"
// import { DistributionPieChart } from "@/components/forecasting/distribution-pie-chart"
// import { BreakEvenCalculator } from "@/components/forecasting/break-even-calculator"
// import { ProjectedMetricsPanel } from "@/components/forecasting/projected-metrics-panel"
// import { ForecastFormDialog } from "@/components/forecasting/forecast-form-dialog"
// import { useForecasting } from "@/hooks/use-forecasting"

// export default function ForecastingPage() {
//   const [isForecastDialogOpen, setIsForecastDialogOpen] = useState(false)
//   const { exportForecasts, forecasts, revenueData } = useForecasting()
//   revenueData && console.log(revenueData, 'revenueData')
//   const [distributionBy, setDistributionBy] = useState<"source" | "category">("source")

//   return (
//     <div className="flex flex-col gap-5">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold tracking-tight">Revenue Forecasting</h1>
//         <div className="flex items-center gap-2">
//           {/* <Button variant="outline" onClick={exportForecasts}>
//             Export
//           </Button> */}
//           <Button onClick={() => setIsForecastDialogOpen(true)}>New Forecast</Button>
//         </div>
//       </div>

//       <Tabs defaultValue="realistic" className="space-y-4">
//         <div className="flex items-center justify-between">
//           <TabsList>
//             <TabsTrigger value="pessimistic">Pessimistic</TabsTrigger>
//             <TabsTrigger value="realistic">Realistic</TabsTrigger>
//             <TabsTrigger value="optimistic">Optimistic</TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="realistic" className="space-y-4">
//           {/* <Card>
//             <CardHeader>
//               <CardTitle>Forecast Controls</CardTitle>
//               <CardDescription>Adjust parameters to refine your forecasts</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ForecastControls />
//             </CardContent>
//           </Card> */}

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Revenue Projection</CardTitle>
//                 <CardDescription>Forecast for the next 12 months</CardDescription>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <RevenueProjectionChart />
//               </CardContent>
//             </Card>
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Revenue Distribution</CardTitle>
//                 <CardDescription>By revenue source</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <DistributionPieChart />
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Break-Even Calculator</CardTitle>
//                 <CardDescription>Estimate when you'll reach your break-even point</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <BreakEvenCalculator />
//               </CardContent>
//             </Card>
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Projected Metrics</CardTitle>
//                 <CardDescription>Projected key performance indicators</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <ProjectedMetricsPanel />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>

//       <ForecastFormDialog isOpen={isForecastDialogOpen} onClose={() => setIsForecastDialogOpen(false)} />
//     </div>
//   )
// }



"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { format, set } from "date-fns"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash,
  ArrowUpDown,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ForecastFormDialog } from "@/components/forecasting/forecast-form-dialog"
import { useForecasting } from "@/hooks/use-forecasting"
import { useAuth } from "@/hooks/use-auth"


const ITEMS_PER_PAGE = 5

function ForecastTable({ dataPoints }: { dataPoints: any[] }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(dataPoints.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentItems = Array.isArray(dataPoints) && dataPoints.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Projected Revenue</TableHead>
            <TableHead>Month-over-Month Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { Array.isArray(currentItems) && currentItems.map((point, index) => {
            const globalIndex = startIndex + index
            const currentAmount = parseFloat(point.amount)
            const previousAmount =
              globalIndex > 0 ? parseFloat(dataPoints[globalIndex - 1].amount) : currentAmount
            const change = ((currentAmount - previousAmount) / previousAmount) * 100

            return (
              <TableRow key={point.id}>
                <TableCell>{formatDate(point.date)}</TableCell>
                <TableCell>${currentAmount.toFixed(2)}</TableCell>
                <TableCell
                  className={
                    globalIndex === 0
                      ? "text-muted-foreground"
                      : change >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {globalIndex === 0 ? "—" : `${change.toFixed(2)}%`}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}


export default function ForecastView() {
  // State for selected forecast and data display
    const [isForecastDialogOpen, setIsForecastDialogOpen] = useState(false)
    const [isForecastAdvancedDialogOpen, setIsForecastAdvancedDialogOpen] = useState(false)
    const [isForecastWhatIfDialogOpen, setIsForecastWhatIfDialogOpen] = useState(false)
  const [selectedForecast, setSelectedForecast] = useState<(typeof forecastData)[0] | null>(null)
  const [isDataSheetOpen, setIsDataSheetOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
const {forecasts:forecastData,deleteForecast,isDeletingForecast} = useForecasting()
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [scenarioFilter, setScenarioFilter] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Filter and sort data
  const filteredData = Array.isArray(forecastData) ? forecastData.filter((forecast) => {
    const matchesSearch =
      searchTerm === "" ||
      forecast.scenario_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(forecast.start_date), "MMM dd, yyyy").toLowerCase().includes(searchTerm.toLowerCase()) ||
      format(new Date(forecast.end_date), "MMM dd, yyyy").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesScenario = scenarioFilter === null || forecast.scenario === scenarioFilter

    return matchesSearch && matchesScenario
  }): []

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let valueA, valueB

    switch (sortField) {
      case "scenario":
        valueA = a.scenario_display
        valueB = b.scenario_display
        break
      case "startDate":
        valueA = new Date(a.start_date).getTime()
        valueB = new Date(b.start_date).getTime()
        break
      case "endDate":
        valueA = new Date(a.end_date).getTime()
        valueB = new Date(b.end_date).getTime()
        break
      case "createdAt":
        valueA = new Date(a.created_at).getTime()
        valueB = new Date(b.created_at).getTime()
        break
      default:
        return 0
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  // Handle sort toggle
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get unique scenarios for filter
  // const scenarios = Array.from(new Set(forecastData.map((forecast) => forecast.scenario)))

  // Format data for chart if a forecast is selected
  const chartData =
  // @ts-ignore
    selectedForecast?.data_points.map((point) => ({
      date: format(new Date(point.date), "MMM yyyy"),
      amount: Number.parseFloat(point.amount),
    })) || []

  function formatDate(dateString: string) {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  function handleViewForecast(forecast: (typeof forecastData)[0]) {
    setSelectedForecast(forecast)
    setIsDataSheetOpen(true)
  }

  function handleEditForecast(forecast: (typeof forecastData)[0]) {
    setSelectedForecast(forecast)
    setIsEditDialogOpen(true)
  }

  function handleDeleteForecast(forecast: (typeof forecastData)[0]) {
    setSelectedForecast(forecast)
    setIsDeleteDialogOpen(true)
  }

  function confirmDelete() {
    deleteForecast(selectedForecast?.id)
    console.log("Deleting forecast:", selectedForecast?.id)
    setIsDeleteDialogOpen(false)
    // In a real app, you would delete the forecast here and refresh the data
  }
const {user}=useAuth()
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Revenue Forecasts</h2>
       <div className="flex gap-4 items-center justify-end">
        <Button onClick={() => setIsForecastDialogOpen(true)}>New Forecast</Button>
       <Button onClick={() => setIsForecastWhatIfDialogOpen(true)} > Forecast What-If</Button>
       {user && user?.subscription?.is_pro && <Button onClick={() => setIsForecastAdvancedDialogOpen(true)} > Forecast Advanced</Button>}

       </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Forecast List</CardTitle>
          <CardDescription>View and manage your revenue forecasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filter controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search forecasts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1) // Reset to first page on search
                  }}
                />
              </div>
              {/* <Select
                value={scenarioFilter || ""}
                onValueChange={(value) => {
                  setScenarioFilter(value === "" ? null : value)
                  setCurrentPage(1) // Reset to first page on filter change
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by scenario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Scenarios</SelectItem>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario} value={scenario}>
                      {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button
                        variant="ghost"
                        onClick={() => toggleSort("scenario")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Scenario
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => toggleSort("startDate")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Start Date
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => toggleSort("endDate")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        End Date
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Total Revenue</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => toggleSort("createdAt")}
                        className="flex items-center gap-1 p-0 h-auto font-medium"
                      >
                        Created At
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((forecast) => {
                      const totalRevenue = forecast.data_points.reduce(
                        // @ts-ignore
                        (sum, point) => sum + Number.parseFloat(point.amount),
                        0,
                      )

                      return (
                        <TableRow key={forecast.id}>
                          <TableCell>
                            <Badge variant="outline">{forecast.scenario_display}</Badge>
                          </TableCell>
                          <TableCell>{formatDate(forecast.start_date)}</TableCell>
                          <TableCell>{formatDate(forecast.end_date)}</TableCell>
                          <TableCell>${totalRevenue.toFixed(2)}</TableCell>
                          <TableCell>{format(new Date(forecast.created_at), "MMM dd, yyyy")}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <Filter className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewForecast(forecast)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEditForecast(forecast)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteForecast(forecast)}
                                  className="text-red-600"
                                >
                                  <Trash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No forecasts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
                  {sortedData.length} forecasts
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(Number.parseInt(value))
                      setCurrentPage(1) // Reset to first page when changing items per page
                    }}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder={itemsPerPage.toString()} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Sheet for viewing forecast details */}
      <Sheet open={isDataSheetOpen} onOpenChange={setIsDataSheetOpen}>
        <SheetContent className="sm:max-w-[800px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Forecast Details</SheetTitle>
            <SheetDescription>
              {selectedForecast && (
                <div className="flex flex-col gap-1">
                  <span>Scenario: {selectedForecast.scenario_display}</span>
                  <span>
                    Period: {formatDate(selectedForecast.start_date)} to {formatDate(selectedForecast.end_date)}
                  </span>
                  <span>Created: {format(new Date(selectedForecast.created_at), "MMM dd, yyyy")}</span>
                </div>
              )}
            </SheetDescription>
          </SheetHeader>

          {selectedForecast && (
            <div className="mt-6 space-y-6">
              {/* Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
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
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#0ea5e9"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Data Points Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Projections</CardTitle>
                </CardHeader>
                <CardContent>
                 <ForecastTable dataPoints={selectedForecast?.data_points||[]}/>
                </CardContent>
              </Card>

              {/* Summary Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Forecast Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Total Projected Revenue</div>
                      <div className="text-2xl font-bold">
                        $
                        {selectedForecast.data_points
                        // @ts-ignore
                          .reduce((sum, point) => sum + Number.parseFloat(point.amount), 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Average Monthly Revenue</div>
                      <div className="text-2xl font-bold">
                        $
                        {(
                          selectedForecast.data_points.reduce(
                            // @ts-ignore
                            (sum, point) => sum + Number.parseFloat(point.amount),
                            0,
                          ) / selectedForecast.data_points.length
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Growth Rate</div>
                      <div className="text-2xl font-bold">
                        {(
                          (Number.parseFloat(selectedForecast?.data_points?
                            selectedForecast?.data_points[selectedForecast.data_points.length - 1].amount:0,
                          ) /
                            Number.parseFloat(selectedForecast.data_points[0].amount) -
                            1) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDataSheetOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                  
                    handleEditForecast(selectedForecast)
                  }}
                >
                  Edit Forecast
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Dialog */}
    

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the forecast and all its data points.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={confirmDelete} disabled={isDeletingForecast} className="bg-red-600 hover:bg-red-700">
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ForecastFormDialog isOpen={isForecastDialogOpen} onClose={() => setIsForecastDialogOpen(false)} />
        <ForecastFormDialog typeId="whatif" isOpen={isForecastWhatIfDialogOpen} onClose={() => setIsForecastWhatIfDialogOpen(false)} />
          <ForecastFormDialog typeId="advanced" isOpen={isForecastAdvancedDialogOpen} onClose={() => setIsForecastAdvancedDialogOpen(false)} />
        <ForecastFormDialog
  isOpen={isEditDialogOpen}
  onClose={() => setIsEditDialogOpen(false)}
  //@ts-ignore
  forecastData={selectedForecast || { id: "", scenario: "", start_date: "", data_points: [] }}
/>
    </div>
  )
}


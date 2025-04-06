// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Calculator, Plus } from "lucide-react"
// import { useForecasting } from "@/hooks/use-forecasting"
// import { useBreakEven } from "@/hooks/use-break-even"
// import { useToast } from "@/hooks/use-toast"

// // Sample data

// // Form schema
// const breakEvenFormSchema = z.object({
//   fixed_costs: z.string().min(1, "Fixed costs are required"),
//   avg_revenue_per_user: z.string().min(1, "Average revenue per user is required"),
//   variable_cost_per_user: z.string().min(1, "Variable cost per user is required"),
// })

// type BreakEvenFormValues = z.infer<typeof breakEvenFormSchema>

// export default function BreakEvenAnalysis() {
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isCalculateDialogOpen, setIsCalculateDialogOpen] = useState(false)

//   const addForm = useForm<BreakEvenFormValues>({
//     resolver: zodResolver(breakEvenFormSchema),
//     defaultValues: {
//       fixed_costs: "",
//       avg_revenue_per_user: "",
//       variable_cost_per_user: "",
//     },
//   })

//   const calculateForm = useForm<BreakEvenFormValues>({
//     resolver: zodResolver(breakEvenFormSchema),
//     defaultValues: {
//       fixed_costs: "",
//       avg_revenue_per_user: "",
//       variable_cost_per_user: "",
//     },
//   })
// const {addBreakEven,calculateBreakEven,updateBreakEven,breakEven:breakEvenData,deleteBreakEven}=useBreakEven()

// //   const onAddSubmit = async (data: PlanFormValues) => {

// //     try {
// //       if (isEditDialogOpen) {
// //         await updatePlan({ id: selectedPlan.id, data },{
// //           onSuccess: () => {
// //             // toast({
// //             //   title: "Success",
// //             //   description: "The lead has been updated successfully!",

// //             // });
// //         }});

// //       } else {
// //         await createPlan(data,{
// //           onSuccess: () => {
// //             toast({
// //               title: "Success",
// //               description: "The lead has been saved successfully!",
// //             });
// //           }
// //         });
// //       }

// //     } catch (error) {

// //       toast({
// //         title: "Error",
// //         description:
// //           "An error occurred while saving the lead. Please try again.",
// //         variant: "destructive",
// //       });
// //     }
// //   };
// const toast= useToast()
//   function onAddSubmit(data: BreakEvenFormValues) {

//     console.log("Add break-even data:", data)
//     addBreakEven(data,{
//         onSuccess(data, variables, context) {
//             // toast
//         },
//     })
//     setIsAddDialogOpen(false)
//     addForm.reset()
//   }

//   function onCalculateSubmit(data: BreakEvenFormValues) {
//     calculateBreakEven(data)
//     console.log("Calculate break-even:", data)
//     setIsCalculateDialogOpen(false)
//     calculateForm.reset()
//   }

//   function formatDate(dateString: string) {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Break-Even Analysis</h2>
//         <div className="flex gap-2">
//           <Dialog open={isCalculateDialogOpen} onOpenChange={setIsCalculateDialogOpen}>
//             <DialogTrigger asChild>
//               <Button variant="outline">
//                 <Calculator className="mr-2 h-4 w-4" />
//                 Calculate Break-Even
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Calculate Break-Even Point</DialogTitle>
//               </DialogHeader>
//               <Form {...calculateForm}>
//                 <form onSubmit={calculateForm.handleSubmit(onCalculateSubmit)} className="space-y-4">
//                   <FormField
//                     control={calculateForm.control}
//                     name="fixed_costs"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Fixed Costs</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={calculateForm.control}
//                     name="avg_revenue_per_user"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Average Revenue Per User</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={calculateForm.control}
//                     name="variable_cost_per_user"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Variable Cost Per User</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit" className="w-full">
//                     Calculate
//                   </Button>
//                 </form>
//               </Form>
//             </DialogContent>
//           </Dialog>

//           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Break-Even
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add Break-Even Analysis</DialogTitle>
//               </DialogHeader>
//               <Form {...addForm}>
//                 <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
//                   <FormField
//                     control={addForm.control}
//                     name="fixed_costs"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Fixed Costs</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={addForm.control}
//                     name="avg_revenue_per_user"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Average Revenue Per User</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={addForm.control}
//                     name="variable_cost_per_user"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Variable Cost Per User</FormLabel>
//                         <FormControl>
//                           <Input placeholder="0.00" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button type="submit" className="w-full">
//                     Save
//                   </Button>
//                 </form>
//               </Form>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Average Fixed Costs</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$12.00</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Avg. Revenue Per User</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$100.00</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Avg. Profit Margin</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">96.5%</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Avg. Time to Break-Even</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12 months</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Break-Even Analysis History</CardTitle>
//           <CardDescription>View all your break-even calculations</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Fixed Costs</TableHead>
//                 <TableHead>Revenue/User</TableHead>
//                 <TableHead>Variable Cost/User</TableHead>
//                 <TableHead>Customers Needed</TableHead>
//                 <TableHead>Monthly Revenue</TableHead>
//                 <TableHead>Profit Margin</TableHead>
//                 <TableHead>Time to Break-Even</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Array.isArray(breakEvenData) && breakEvenData.map((item) => (
//                 <TableRow key={item.id}>
//                   <TableCell>{formatDate(item.created_at)}</TableCell>
//                   <TableCell>${item.fixed_costs}</TableCell>
//                   <TableCell>${item.avg_revenue_per_user}</TableCell>
//                   <TableCell>${item.variable_cost_per_user}</TableCell>
//                   <TableCell>{item.customers_needed}</TableCell>
//                   <TableCell>${item.monthly_revenue_needed}</TableCell>
//                   <TableCell>{item.profit_margin}%</TableCell>
//                   <TableCell>{item.time_to_breakeven} months</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calculator, Loader2, Plus } from "lucide-react";
import { useBreakEven } from "@/hooks/use-break-even";
import { useToast } from "@/hooks/use-toast";

// Sample data

// Form schema
const breakEvenFormSchema = z.object({
  fixed_costs: z.string().min(1, "Fixed costs are required"),
  avg_revenue_per_user: z
    .string()
    .min(1, "Average revenue per user is required"),
  variable_cost_per_user: z
    .string()
    .min(1, "Variable cost per user is required"),
});

type BreakEvenFormValues = z.infer<typeof breakEvenFormSchema>;

export default function BreakEvenAnalysis() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isCalculateDialogOpen, setIsCalculateDialogOpen] = useState(false);
  const [selectedBreakEven, setSelectedBreakEven] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const addForm = useForm<BreakEvenFormValues>({
    resolver: zodResolver(breakEvenFormSchema),
    defaultValues: {
      fixed_costs: "",
      avg_revenue_per_user: "",
      variable_cost_per_user: "",
    },
  });

  const calculateForm = useForm<BreakEvenFormValues>({
    resolver: zodResolver(breakEvenFormSchema),
    defaultValues: {
      fixed_costs: "",
      avg_revenue_per_user: "",
      variable_cost_per_user: "",
    },
  });

  const editForm = useForm<BreakEvenFormValues>({
    resolver: zodResolver(breakEvenFormSchema),
    defaultValues: {
      fixed_costs: "",
      avg_revenue_per_user: "",
      variable_cost_per_user: "",
    },
  });
  const {
    addBreakEven,
    calculateBreakEven,
    updateBreakEven,
    breakEven: breakEvenData,
    deleteBreakEven,
    isAdding,
    isCalculating,
    isUpdating,
    isDeleting,
  } = useBreakEven();

  
  const { toast } = useToast();
  function onAddSubmit(data: BreakEvenFormValues) {
    addBreakEven(data, {
      onSuccess: () => {
        setIsAddDialogOpen(false);
        toast({
          title: "Success",
          description: "Break-even analysis added successfully!",
        });
        setIsAddDialogOpen(false);
        addForm.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to add break-even analysis. Please try again.",
          variant: "destructive",
        });
      },
    });
  }

  function onCalculateSubmit(data: BreakEvenFormValues) {
    calculateBreakEven(data, {
      onSuccess(data, variables, context) {
        // toast
        setIsCalculateDialogOpen(false);
        toast({
          title: "Success",
          description: "Break-even analysis calculated successfully!",
        });
      },
    });
    console.log("Calculate break-even:", data);
    calculateForm.reset();
  }

  function handleEditClick(item: any) {
    setSelectedBreakEven(item);
    editForm.setValue("fixed_costs", item.fixed_costs);
    editForm.setValue("avg_revenue_per_user", item.avg_revenue_per_user);
    editForm.setValue("variable_cost_per_user", item.variable_cost_per_user);
    setIsEditDialogOpen(true);
  }

  function handleDeleteClick(item: any) {
    setSelectedBreakEven(item);
    setIsDeleteDialogOpen(true);
  }

  function onEditSubmit(data: BreakEvenFormValues) {
    if (selectedBreakEven) {
      updateBreakEven(
        { id: selectedBreakEven.id, data },
        {
          onSuccess: () => {
            setIsEditDialogOpen(false);
            toast({
              title: "Success",
              description: "Break-even analysis updated successfully!",
            });
            editForm.reset();
          },
          onError: () => {
            toast({
              title: "Error",
              description:
                "Failed to update break-even analysis. Please try again.",
              variant: "destructive",
            });
          },
        }
      );
    }
  }

  function onDeleteConfirm() {
    if (selectedBreakEven) {
      deleteBreakEven(selectedBreakEven.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          toast({
            title: "Success",
            description: "Break-even analysis deleted successfully!",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description:
              "Failed to delete break-even analysis. Please try again.",
            variant: "destructive",
          });
        },
      });
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Break-Even Analysis</h2>
        <div className="flex gap-2">
          <Dialog
            open={isCalculateDialogOpen}
            onOpenChange={setIsCalculateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Break-Even
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Calculate Break-Even Point</DialogTitle>
              </DialogHeader>
              <Form {...calculateForm}>
                <form
                  onSubmit={calculateForm.handleSubmit(onCalculateSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={calculateForm.control}
                    name="fixed_costs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fixed Costs</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={calculateForm.control}
                    name="avg_revenue_per_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Revenue Per User</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={calculateForm.control}
                    name="variable_cost_per_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variable Cost Per User</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isCalculating}
                  >
                    {isCalculating && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Calculate
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Break-Even
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Break-Even Analysis</DialogTitle>
              </DialogHeader>
              <Form {...addForm}>
                <form
                  onSubmit={addForm.handleSubmit(onAddSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={addForm.control}
                    name="fixed_costs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fixed Costs</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="avg_revenue_per_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Revenue Per User</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="variable_cost_per_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variable Cost Per User</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button disabled={isAdding} type="submit" className="w-full">
                    {isAdding && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Fixed Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Revenue Per User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$100.00</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Profit Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.5%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Time to Break-Even
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 months</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Break-Even Analysis History</CardTitle>
          <CardDescription>
            View all your break-even calculations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Fixed Costs</TableHead>
                <TableHead>Revenue/User</TableHead>
                <TableHead>Variable Cost/User</TableHead>
                <TableHead>Customers Needed</TableHead>
                <TableHead>Monthly Revenue</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Time to Break-Even</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(breakEvenData) &&
                breakEvenData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{formatDate(item.created_at)}</TableCell>
                    <TableCell>${item.fixed_costs}</TableCell>
                    <TableCell>${item.avg_revenue_per_user}</TableCell>
                    <TableCell>${item.variable_cost_per_user}</TableCell>
                    <TableCell>{item.customers_needed}</TableCell>
                    <TableCell>${item.monthly_revenue_needed}</TableCell>
                    <TableCell>{item.profit_margin}%</TableCell>
                    <TableCell>{item.time_to_breakeven} months</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500"
                          onClick={() => handleDeleteClick(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Break-Even Analysis</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="fixed_costs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fixed Costs</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="avg_revenue_per_user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Average Revenue Per User</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="variable_cost_per_user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variable Cost Per User</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isUpdating} type="submit" className="w-full">
                {isUpdating && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to delete this break-even analysis? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={onDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

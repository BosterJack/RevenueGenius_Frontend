// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { z } from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Pencil } from "lucide-react"
// import { usePlans } from "@/hooks/use-plans"
// import { useToast } from "@/hooks/use-toast"

// // Form schema
// const planFormSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   slug: z.string().min(1, "Slug is required"),
//   description: z.string().min(1, "Description is required"),
//   price: z.string().min(1, "Price is required"),
//   billing_cycle: z.enum(["monthly", "yearly", "one_time"]),
//   is_active: z.boolean(),
//   sort_order: z.number().int().positive(),
// })

// type PlanFormValues = z.infer<typeof planFormSchema>

// export default function PlansManagement() {
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [selectedPlan, setSelectedPlan] = useState<any>(null)
//  const { plans:plansData, isLoadingPlans,updatePlan,isUpdatingPlan,createPlan } = usePlans();
//   const addForm = useForm<PlanFormValues>({
//     resolver: zodResolver(planFormSchema),
//     defaultValues: {
//       name: "",
//       slug: "basic",
//       description: "",
//       price: "",
//       billing_cycle: "monthly",
//       is_active: true,
//       sort_order: 1,
//     },
//   })

//   const editForm = useForm<PlanFormValues>({
//     resolver: zodResolver(planFormSchema),
//     defaultValues: {
//       name: "",
//       slug: "basic",
//       description: "",
//       price: "",
//       billing_cycle: "monthly",
//       is_active: true,
//       sort_order: 1,
//     },
//   })
//   const toast =useToast()
// const onAddSubmit = async (data: PlanFormValues) => {

//     try {
//       if (isEditDialogOpen) {
//         await updatePlan({ id: selectedPlan.id, data },{
//           onSuccess: () => {
//             // toast({
//             //   title: "Success",
//             //   description: "The lead has been updated successfully!",

//             // });
//         }});

//       } else {
//         await createPlan(data,{
//           onSuccess: () => {
//             toast({
//               title: "Success",
//               description: "The lead has been saved successfully!",
//             });
//           }
//         });
//       }

//     } catch (error) {

//       toast({
//         title: "Error",
//         description:
//           "An error occurred while saving the lead. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };
// //   function onAddSubmit(data: PlanFormValues) {
// //     console.log("Add plan data:", data)
// //     setIsAddDialogOpen(false)
// //     addForm.reset()
// //   }

//   function onEditSubmit(data: PlanFormValues) {
//     console.log("Edit plan data:", data)
//     setIsEditDialogOpen(false)
//   }

//   function handleEditPlan(plan: any) {
//     setSelectedPlan(plan)
//     editForm.reset({
//       name: plan.name,
//       slug: plan.slug,
//       description: plan.description,
//       price: plan.price,
//       billing_cycle: plan.billing_cycle,
//       is_active: plan.is_active,
//       sort_order: plan.sort_order,
//     })
//     setIsEditDialogOpen(true)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Plans Management</h2>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add Plan
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Add New Plan</DialogTitle>
//             </DialogHeader>
//             <Form {...addForm}>
//               <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
//                 <FormField
//                   control={addForm.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Plan Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Basic Plan" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="slug"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Slug</FormLabel>
//                       <FormControl>
//                         <Input placeholder="basic" {...field} />
//                       </FormControl>
//                       <FormDescription>URL-friendly identifier for the plan</FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea placeholder="Plan description..." {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="price"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Price</FormLabel>
//                       <FormControl>
//                         <Input placeholder="29.99" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="billing_cycle"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Billing Cycle</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select billing cycle" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="monthly">Monthly</SelectItem>
//                           <SelectItem value="yearly">Yearly</SelectItem>
//                           <SelectItem value="one_time">One Time</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="is_active"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Active Status</FormLabel>
//                         <FormDescription>Make this plan available for purchase</FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch checked={field.value} onCheckedChange={field.onChange} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="sort_order"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Sort Order</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           {...field}
//                           onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Controls the display order of plans (lower numbers appear first)
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Add Plan
//                 </Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {Array?.isArray(plansData) && plansData.map((plan) => (
//           <Card key={plan.id} className="flex flex-col">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle>{plan.name}</CardTitle>
//                   <CardDescription className="mt-1">{plan.description}</CardDescription>
//                 </div>
//                 <Badge variant={plan.is_active ? "default" : "outline"}>{plan.is_active ? "Active" : "Inactive"}</Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="flex-grow">
//               <div className="text-3xl font-bold mb-4">
//                 ${plan.price}
//                 <span className="text-sm font-normal text-muted-foreground ml-1">
//                   {plan.billing_cycle === "one_time" ? "" : `/${plan.billing_cycle_display.toLowerCase()}`}
//                 </span>
//               </div>
//               <div className="text-sm text-muted-foreground">
//                 <p>Slug: {plan.slug}</p>
//                 <p>Billing: {plan.billing_cycle_display}</p>
//                 <p>Sort Order: {plan.sort_order}</p>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button variant="outline" className="w-full" onClick={() => handleEditPlan(plan)}>
//                 <Pencil className="mr-2 h-4 w-4" />
//                 Edit Plan
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle>Edit Plan</DialogTitle>
//           </DialogHeader>
//           {selectedPlan && (
//             <Form {...editForm}>
//               <form onSubmit={editForm.handleSubmit(onAddSubmit)} className="space-y-4">
//                 <FormField
//                   control={editForm.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Plan Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Basic Plan" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="slug"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Slug</FormLabel>
//                       <FormControl>
//                         <Input placeholder="basic" {...field} />
//                       </FormControl>
//                       <FormDescription>URL-friendly identifier for the plan</FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Description</FormLabel>
//                       <FormControl>
//                         <Textarea placeholder="Plan description..." {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="price"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Price</FormLabel>
//                       <FormControl>
//                         <Input placeholder="29.99" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="billing_cycle"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Billing Cycle</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select billing cycle" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="monthly">Monthly</SelectItem>
//                           <SelectItem value="yearly">Yearly</SelectItem>
//                           <SelectItem value="one_time">One Time</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="is_active"
//                   render={({ field }) => (
//                     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-base">Active Status</FormLabel>
//                         <FormDescription>Make this plan available for purchase</FormDescription>
//                       </div>
//                       <FormControl>
//                         <Switch checked={field.value} onCheckedChange={field.onChange} />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="sort_order"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Sort Order</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           {...field}
//                           onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
//                         />
//                       </FormControl>
//                       <FormDescription>
//                         Controls the display order of plans (lower numbers appear first)
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Update Plan
//                 </Button>
//               </form>
//             </Form>
//           )}
//         </DialogContent>
//       </Dialog>
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
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { usePlans } from "@/hooks/use-plans";
import { useToast } from "@/hooks/use-toast";

// Form schema
const planFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  billing_cycle: z.enum(["monthly", "yearly", "one_time"]),
  is_active: z.boolean(),
  sort_order: z.number().int().positive(),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

export default function PlansManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const {
    plans: plansData,
    isLoadingPlans,
    updatePlan,
    isUpdatingPlan,
    createPlan,
    deletePlan,
  } = usePlans();
  const addForm = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      slug: "basic",
      description: "",
      price: "",
      billing_cycle: "monthly",
      is_active: true,
      sort_order: 1,
    },
  });

  const editForm = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: "",
      slug: "basic",
      description: "",
      price: "",
      billing_cycle: "monthly",
      is_active: true,
      sort_order: 1,
    },
  });
  const { toast } = useToast();
  const onAddSubmit = async (data: PlanFormValues) => {
    try {
      if (isEditDialogOpen) {
        await updatePlan(
          { id: selectedPlan.id, data },
          {
            onSuccess: () => {
              // toast({
              //   title: "Success",
              //   description: "The lead has been updated successfully!",
              // });
            },
          }
        );
      } else {
        await createPlan(data, {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "The lead has been saved successfully!",
            });
          },
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "An error occurred while saving the lead. Please try again.",
        variant: "destructive",
      });
    }
  };
  //   function onAddSubmit(data: PlanFormValues) {
  //     console.log("Add plan data:", data)
  //     setIsAddDialogOpen(false)
  //     addForm.reset()
  //   }

  function onEditSubmit(data: PlanFormValues) {
    console.log("Edit plan data:", data);
    setIsEditDialogOpen(false);
  }

  function handleEditPlan(plan: any) {
    setSelectedPlan(plan);
    editForm.reset({
      name: plan.name,
      slug: plan.slug,
      description: plan.description,
      price: plan.price,
      billing_cycle: plan.billing_cycle,
      is_active: plan.is_active,
      sort_order: plan.sort_order,
    });
    setIsEditDialogOpen(true);
  }

  const handleDeletePlan = async () => {
    await deletePlan(selectedPlan.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Plans Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Plan</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
                               <div className="max-h-[60vh] pr-2 overflow-auto space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Basic Plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="basic" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly identifier for the plan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Plan description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="29.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="billing_cycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="one_time">One Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Make this plan available for purchase
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="sort_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Controls the display order of plans (lower numbers
                        appear first)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <Button type="submit" className="w-full">
                  Add Plan
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array?.isArray(plansData) &&
          plansData.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {plan.description}
                    </CardDescription>
                  </div>
                  <Badge variant={plan.is_active ? "default" : "outline"}>
                    {plan.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-3xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {plan.billing_cycle === "one_time"
                      ? ""
                      : `/${plan.billing_cycle_display.toLowerCase()}`}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Slug: {plan.slug}</p>
                  <p>Billing: {plan.billing_cycle_display}</p>
                  <p>Sort Order: {plan.sort_order}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-4 items-center justify-end">
                  <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleEditPlan(plan)}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Plan
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {setIsDeleteDialogOpen(true); setSelectedPlan(plan)}}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Plan
                </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] ">
          <DialogHeader>
            <DialogTitle>Edit Plan</DialogTitle>
          </DialogHeader>
          {selectedPlan && (
            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(onAddSubmit)}
                className="space-y-4"
              >
               <div className="max-h-[60vh] pr-2 overflow-auto space-y-4">
                 <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Basic Plan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="basic" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL-friendly identifier for the plan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Plan description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="29.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="billing_cycle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                          <SelectItem value="one_time">One Time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Status
                        </FormLabel>
                        <FormDescription>
                          Make this plan available for purchase
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="sort_order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Controls the display order of plans (lower numbers
                        appear first)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               </div>
                <Button type="submit" className="w-full">
                  Update Plan
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to delete the plan "{selectedPlan?.name}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeletePlan}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

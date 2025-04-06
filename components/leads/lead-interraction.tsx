"use client";

import { use, useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLeads } from "@/hooks/use-leads";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
// Sample data
const leadInteractionsData = [
  {
    id: "fd9bedc5-4ca8-48be-9086-d63d9bc15000",
    lead: "e9c97279-d4e2-4195-bd7e-62303ed887f8",
    date: "2025-04-05T12:26:56.676000Z",
    type: "email",
    type_display: "Email",
    notes: "Sent follow-up email about product demo",
  },
];

// Form schema
const interactionFormSchema = z.object({
  date: z.string({
    required_error: "Date is required",
  }),
  type: z.string().min(1, "Interaction type is required"),
  notes: z.string().min(1, "Notes are required"),
});

type InteractionFormValues = z.infer<typeof interactionFormSchema>;

export default function LeadInteractions() {
  const {
    addLeadInteraction,
    isAddingLeadInteraction,
    deleteLead,
    leadsInterractions,
    leads: leadInteractionsData,
    updateLeadInterraction,
    deleteLeadInterraction,
    isDeletingLeadInterraction,
    isUpdatingLeadInterraction,
  } = useLeads();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedInteraction, setSelectedInteraction] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<string>(
    (Array.isArray(leadInteractionsData) && leadInteractionsData[0]?.id) || ""
  ); 
  const { data } = leadsInterractions(selectedLead);

  const addForm = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionFormSchema),
    defaultValues: {
      date: "",
      type: "email",
      notes: "",
    },
  });
  // useEffect(() => {
  //   setSelectedInteraction()
  // })
  const editForm = useForm<InteractionFormValues>({
    resolver: zodResolver(interactionFormSchema),
    defaultValues: {
      date: "",
      type: "email",
      notes: "",
    },
  });
// useEffect(() => {
//   if (selectedInteraction) {
//     editForm.reset({
//       date: selectedInteraction.date,
//       type: selectedInteraction.type,
//       notes: selectedInteraction.notes,
//     });
//   }
// })
  function onAddSubmit(data: InteractionFormValues) {
    addLeadInteraction({ leadId: selectedLead, data });
    console.log("Add interaction data:", data);
    setIsAddDialogOpen(false);
    addForm.reset();
  }

  function onEditSubmit(data: InteractionFormValues) {
    updateLeadInterraction({
      id: selectedLead,
      interactionId: selectedInteraction?.id,
      data,
    });
    console.log("Edit interaction data:", data);
    setIsEditDialogOpen(false);
  }

  function handleEditInteraction(interaction: any) {
    setSelectedInteraction(interaction);
    editForm.reset({
      date: interaction.date,
      type: interaction.type,
      notes: interaction.notes,
    });
    setIsEditDialogOpen(true);
  }

  function formatDate(dateString: string) {
    // Vérifie si la date est valide avant de la formater
    const date = new Date(dateString);

    // Si la date n'est pas valide, renvoie une valeur de secours (par exemple : "Date invalide")
    if (isNaN(date.getTime())) {
      return "Date invalid";
    }

    return format(date, "MMM dd, yyyy HH:mm");
  }
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  function handleDeleteForecast(interaction: any) {
    setSelectedInteraction(interaction);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    deleteLeadInterraction({
      id: selectedLead,
      interactionId: selectedInteraction?.id,
    });

    setIsDeleteDialogOpen(false);
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center"></div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center gap-1">
            <div>
              <CardTitle>Lead Selection</CardTitle>
              <CardDescription>
                Select a lead to view their interactions
              </CardDescription>
            </div>
            <div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Interaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add Lead Interaction</DialogTitle>
                  </DialogHeader>
                  <Form {...addForm}>
                    <form
                      onSubmit={addForm.handleSubmit(onAddSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={addForm.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            {/* <Popover>
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
                      </Popover> */}

                            <FormControl>
                              <Input
                                type="date"
                                placeholder="YYYY-MM-DD"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Interaction Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select interaction type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="call">Call</SelectItem>
                                <SelectItem value="meeting">Meeting</SelectItem>
                                {/* <SelectItem value="demo">Demo</SelectItem> */}
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={addForm.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Interaction details..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        disabled={isAddingLeadInteraction}
                        type="submit"
                        className="w-full"
                      >
                        {isAddingLeadInteraction && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Add Interaction
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select value={selectedLead} onValueChange={setSelectedLead}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a lead" />
            </SelectTrigger>
            <SelectContent>
              {Array.isArray(leadInteractionsData) &&
                leadInteractionsData.map((lead) => (
                  <SelectItem key={lead.id} value={lead.id}>
                    {lead.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
          <CardDescription>
            All recorded interactions with the selected lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(data) &&
                data?.map((interaction) => (
                  <TableRow key={interaction.id}>
                    <TableCell>{formatDate(interaction.date)}</TableCell>
                    <TableCell>{interaction.type_display}</TableCell>
                    <TableCell>{interaction.notes}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditInteraction(interaction)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteForecast(interaction)}
                        className=""
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {data?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No interactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Interaction</DialogTitle>
          </DialogHeader>
          {selectedInteraction && selectedInteraction && (
            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(onEditSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={editForm.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>

                      <FormControl>
                        <Input
                          type="date"
                          placeholder="YYYY-MM-DD"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interaction Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Interaction details..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isUpdatingLeadInterraction}
                  type="submit"
                  className="w-full"
                >
                  {isUpdatingLeadInterraction && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Interaction
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              forecast and all its data points.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={confirmDelete}
              disabled={isDeletingLeadInterraction}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Pencil } from "lucide-react"

// // Sample data
// const usersData = [
//   {
//     id: 2,
//     email: "test@revenuegenius.com",
//     username: "test@revenuegenius.com",
//     first_name: "justTest",
//     last_name: "User11",
//     address: "",
//     phone: "",
//     profile_image: "http://209.97.147.23/media/profile_images/5a6b9a04-96f5-486d-899e-af9447a35dcd.png",
//     original_file_name: "dfhg.png",
//     content_type: "image/png",
//     stripe_customer_id: null,
//     google_id: null,
//     subscription: {
//       id: 1,
//       user: 2,
//       plan: 2,
//       plan_details: {
//         id: 2,
//         name: "Pro Plan",
//         slug: "pro",
//         description: "Plan professionnel avec toutes les fonctionnalités",
//         price: "39.00",
//         billing_cycle: "monthly",
//         is_active: true,
//         features: {},
//         sort_order: 2,
//         billing_cycle_display: "Monthly",
//       },
//       is_active: true,
//       started_at: "2025-04-01T23:21:06.960370Z",
//       expires_at: "2026-04-01T23:21:06.959564Z",
//       billing_period: "monthly",
//       stripe_subscription_id: null,
//       canceled_at: null,
//       is_pro: true,
//       status: "active",
//     },
//   },
// ]

// // Form schema
// const userFormSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   username: z.string().min(1, "Username is required"),
//   first_name: z.string().min(1, "First name is required"),
//   last_name: z.string().min(1, "Last name is required"),
//   address: z.string().optional(),
//   phone: z.string().optional(),
//   password: z.string().min(8, "Password must be at least 8 characters").optional(),
//   plan: z.string().min(1, "Plan is required"),
// })

// type UserFormValues = z.infer<typeof userFormSchema>

// export default function UsersManagement() {
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [selectedUser, setSelectedUser] = useState<any>(null)

//   const addForm = useForm<UserFormValues>({
//     resolver: zodResolver(userFormSchema),
//     defaultValues: {
//       email: "",
//       username: "",
//       first_name: "",
//       last_name: "",
//       address: "",
//       phone: "",
//       password: "",
//       plan: "basic",
//     },
//   })

//   const editForm = useForm<UserFormValues>({
//     resolver: zodResolver(userFormSchema),
//     defaultValues: {
//       email: "",
//       username: "",
//       first_name: "",
//       last_name: "",
//       address: "",
//       phone: "",
//       plan: "basic",
//     },
//   })

//   function onAddSubmit(data: UserFormValues) {
//     console.log("Add user data:", data)
//     setIsAddDialogOpen(false)
//     addForm.reset()
//   }

//   function onEditSubmit(data: UserFormValues) {
//     console.log("Edit user data:", data)
//     setIsEditDialogOpen(false)
//   }

//   function handleEditUser(user: any) {
//     setSelectedUser(user)
//     editForm.reset({
//       email: user.email,
//       username: user.username,
//       first_name: user.first_name,
//       last_name: user.last_name,
//       address: user.address || "",
//       phone: user.phone || "",
//       plan: user.subscription?.plan_details?.slug || "basic",
//     })
//     setIsEditDialogOpen(true)
//   }

//   function getInitials(firstName: string, lastName: string) {
//     return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Users Management</h2>
//         <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//           <DialogTrigger asChild>
//             <Button>
//               <Plus className="mr-2 h-4 w-4" />
//               Add User
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[500px]">
//             <DialogHeader>
//               <DialogTitle>Add New User</DialogTitle>
//             </DialogHeader>
//             <Form {...addForm}>
//               <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={addForm.control}
//                     name="first_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={addForm.control}
//                     name="last_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={addForm.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="email" placeholder="john.doe@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="johndoe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input type="password" placeholder="********" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone</FormLabel>
//                       <FormControl>
//                         <Input placeholder="+1 (555) 000-0000" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder="123 Main St, City" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={addForm.control}
//                   name="plan"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Subscription Plan</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a plan" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="basic">Basic Plan</SelectItem>
//                           <SelectItem value="pro">Pro Plan</SelectItem>
//                           <SelectItem value="lifetime">Lifetime Plan</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Add User
//                 </Button>
//               </form>
//             </Form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Users</CardTitle>
//           <CardDescription>Manage your users and their subscriptions</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Subscription</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {usersData.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <Avatar>
//                         <AvatarImage src={user.profile_image} alt={`${user.first_name} ${user.last_name}`} />
//                         <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">
//                           {user.first_name} {user.last_name}
//                         </p>
//                         <p className="text-sm text-muted-foreground">{user.username}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.subscription?.plan_details?.name || "No Plan"}</TableCell>
//                   <TableCell>
//                     <Badge variant={user.subscription?.is_active ? "default" : "outline"}>
//                       {user.subscription?.status || "Inactive"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
//                       <Pencil className="h-4 w-4" />
//                       <span className="sr-only">Edit</span>
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[500px]">
//           <DialogHeader>
//             <DialogTitle>Edit User</DialogTitle>
//           </DialogHeader>
//           {selectedUser && (
//             <Form {...editForm}>
//               <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormField
//                     control={editForm.control}
//                     name="first_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>First Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="John" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={editForm.control}
//                     name="last_name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Last Name</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Doe" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <FormField
//                   control={editForm.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input type="email" placeholder="john.doe@example.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="username"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Username</FormLabel>
//                       <FormControl>
//                         <Input placeholder="johndoe" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone</FormLabel>
//                       <FormControl>
//                         <Input placeholder="+1 (555) 000-0000" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Address</FormLabel>
//                       <FormControl>
//                         <Input placeholder="123 Main St, City" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={editForm.control}
//                   name="plan"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Subscription Plan</FormLabel>
//                       <Select onValueChange={field.onChange} defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a plan" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="basic">Basic Plan</SelectItem>
//                           <SelectItem value="pro">Pro Plan</SelectItem>
//                           <SelectItem value="lifetime">Lifetime Plan</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className="w-full">
//                   Update User
//                 </Button>
//               </form>
//             </Form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil } from "lucide-react"

// Sample data
const usersData = [
  {
    id: 2,
    email: "test@revenuegenius.com",
    username: "test@revenuegenius.com",
    first_name: "justTest",
    last_name: "User11",
    address: "",
    phone: "",
    profile_image: "http://209.97.147.23/media/profile_images/5a6b9a04-96f5-486d-899e-af9447a35dcd.png",
    original_file_name: "dfhg.png",
    content_type: "image/png",
    stripe_customer_id: null,
    google_id: null,
    subscription: {
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
  },
]

// Form schema
const userFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  plan: z.string().min(1, "Plan is required"),
})

type UserFormValues = z.infer<typeof userFormSchema>

export default function UsersManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const addForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      password: "",
      plan: "basic",
    },
  })

  const editForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      phone: "",
      plan: "basic",
    },
  })

  function onAddSubmit(data: UserFormValues) {
    console.log("Add user data:", data)
    setIsAddDialogOpen(false)
    addForm.reset()
  }

  function onEditSubmit(data: UserFormValues) {
    console.log("Edit user data:", data)
    setIsEditDialogOpen(false)
  }

  function handleEditUser(user: any) {
    setSelectedUser(user)
    editForm.reset({
      email: user.email,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address || "",
      phone: user.phone || "",
      plan: user.subscription?.plan_details?.slug || "basic",
    })
    setIsEditDialogOpen(true)
  }

  function getInitials(firstName: string, lastName: string) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(onAddSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic Plan</SelectItem>
                          <SelectItem value="pro">Pro Plan</SelectItem>
                          <SelectItem value="lifetime">Lifetime Plan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add User
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your users and their subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profile_image} alt={`${user.first_name} ${user.last_name}`} />
                        <AvatarFallback>{getInitials(user.first_name, user.last_name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.subscription?.plan_details?.name || "No Plan"}</TableCell>
                  <TableCell>
                    <Badge variant={user.subscription?.is_active ? "default" : "outline"}>
                      {user.subscription?.status || "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
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
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={editForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="basic">Basic Plan</SelectItem>
                          <SelectItem value="pro">Pro Plan</SelectItem>
                          <SelectItem value="lifetime">Lifetime Plan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Update User
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


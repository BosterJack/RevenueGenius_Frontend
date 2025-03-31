// // "use client"

// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import type { User } from "@/types/auth"

// // export function UserProfileSettings() {
// //   // État pour les données utilisateur
// //   const [user, setUser] = useState<Partial<User>>({
// //     first_name: "Jean",
// //     last_name: "Dupont",
// //     email: "jean.dupont@example.com",
// //     phone: "+33 6 12 34 56 78",
// //     address: "123 Rue de Paris, 75001 Paris",
// //     profile_image: "/avatar.png",
// //   })

// //   // Gestionnaire d'événements pour les données utilisateur
// //   const handleUserChange = (key: string, value: string) => {
// //     setUser({
// //       ...user,
// //       [key]: value,
// //     })
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
// //         <Avatar className="w-24 h-24">
// //           <AvatarImage src={user.profile_image || ""} alt="Photo de profil" />
// //           <AvatarFallback>
// //             {user.first_name?.[0]}
// //             {user.last_name?.[0]}
// //           </AvatarFallback>
// //         </Avatar>
// //         <div className="space-y-2">
// //           <h3 className="text-lg font-medium">
// //             {user.first_name} {user.last_name}
// //           </h3>
// //           <p className="text-sm text-muted-foreground">{user.email}</p>
// //           <Button variant="outline" size="sm">
// //             Changer la photo
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="space-y-2">
// //           <Label htmlFor="first_name">Prénom</Label>
// //           <Input
// //             id="first_name"
// //             value={user.first_name || ""}
// //             onChange={(e) => handleUserChange("first_name", e.target.value)}
// //           />
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="last_name">Nom</Label>
// //           <Input
// //             id="last_name"
// //             value={user.last_name || ""}
// //             onChange={(e) => handleUserChange("last_name", e.target.value)}
// //           />
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="email">Email</Label>
// //           <Input
// //             id="email"
// //             type="email"
// //             value={user.email || ""}
// //             onChange={(e) => handleUserChange("email", e.target.value)}
// //           />
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="phone">Téléphone</Label>
// //           <Input id="phone" value={user.phone || ""} onChange={(e) => handleUserChange("phone", e.target.value)} />
// //         </div>
// //         <div className="space-y-2 md:col-span-2">
// //           <Label htmlFor="address">Adresse</Label>
// //           <Input
// //             id="address"
// //             value={user.address || ""}
// //             onChange={(e) => handleUserChange("address", e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       <div className="space-y-2">
// //         <Label htmlFor="current_password">Mot de passe actuel</Label>
// //         <Input id="current_password" type="password" placeholder="Entrez votre mot de passe actuel" />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="space-y-2">
// //           <Label htmlFor="new_password">Nouveau mot de passe</Label>
// //           <Input id="new_password" type="password" placeholder="Entrez un nouveau mot de passe" />
// //         </div>
// //         <div className="space-y-2">
// //           <Label htmlFor="confirm_password">Confirmer le mot de passe</Label>
// //           <Input id="confirm_password" type="password" placeholder="Confirmez le nouveau mot de passe" />
// //         </div>
// //       </div>

// //       <div className="flex justify-end">
// //         <Button>Enregistrer les modifications</Button>
// //       </div>
// //     </div>
// //   )
// // }

// "use client"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { useAuth } from "@/hooks/use-auth"

// // Schéma de validation avec Zod
// const userSchema = z
//   .object({
//     first_name: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
//     last_name: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
//     email: z.string().email("Email invalide"),
//     phone: z.string().regex(/^\+?[0-9\s-]+$/, "Numéro de téléphone invalide"),
//     address: z.string().min(5, "L'adresse est trop courte"),
//     profile_image: z.string().optional(),
//     current_password: z.string().optional(),
//     new_password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
//     confirm_password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
//   })
//   .refine((data) => data.new_password === data.confirm_password, {
//     message: "Les mots de passe ne correspondent pas",
//     path: ["confirm_password"],
//   })

// type FormValues = z.infer<typeof userSchema>

// export function UserProfileSettings() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       first_name: "Jean",
//       last_name: "Dupont",
//       email: "jean.dupont@example.com",
//       phone: "+33 6 12 34 56 78",
//       address: "123 Rue de Paris, 75001 Paris",
//       profile_image: "/avatar.png",
//       current_password: "",
//       new_password: "",
//       confirm_password: "",
//     },
//   })

 
//   const {changeCurrentUserInformation}=useAuth()


//   function onSubmit(values: FormValues) {
//     changeCurrentUserInformation(values);
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
//           <Avatar className="w-24 h-24">
//             <AvatarImage src="/avatar.png" alt="Photo de profil" />
//             <AvatarFallback>JD</AvatarFallback>
//           </Avatar>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="first_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Prénom</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="last_name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nom</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type="email" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Téléphone</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Adresse</FormLabel>
//               <FormControl>
//                 <Input {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="current_password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Mot de passe actuel</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control}
//             name="new_password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nouveau mot de passe</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="confirm_password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirmer le mot de passe</FormLabel>
//                 <FormControl>
//                   <Input type="password" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <div className="flex justify-end">
//           <Button type="submit">Enregistrer les modifications</Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

"use client"
import { useForm } from "react-hook-form"
import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useAuth } from "@/hooks/use-auth"
import { useEffect, useState } from "react"
import { set } from "date-fns"
import StatusToast from "../toast-status"

// Validation schema with Zod
const userSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().optional(),
    address: z.string().optional(),
    profile_image: z.any().optional(),
  })

type FormValues = z.infer<typeof userSchema>

export function UserProfileSettings() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("/avatar.png")
  const { user: currentUser } = useAuth()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    if (currentUser) {
      form.reset({
        first_name: currentUser.first_name || "",
        last_name: currentUser.last_name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        profile_image: currentUser.profile_image || undefined,
      });
      setImagePreview(currentUser.profile_image || "/avatar.png");
    }
  }, [currentUser, form.reset]); // Dependencies

  const { changeCurrentUserInformation ,changeInformationSuccess,isChangeInformation} = useAuth()

  function onSubmit(values: FormValues) {
    // Create FormData object for multipart/form-data submission
    const formData = new FormData()

    // Add all text fields to FormData
    formData.append("first_name", values.first_name)
    formData.append("last_name", values.last_name)
    formData.append("email", values.email)
    //@ts-ignore
    formData.append("phone", values?.phone)
    //@ts-ignore
    formData.append("address", values.address)

    // Only add password fields if they have values
    // if (values.current_password) {
    //   formData.append("current_password", values.current_password)
    // }

    // if (values.new_password) {
    //   formData.append("new_password", values.new_password)
    // }

    // Add the image file if it exists
    if (imageFile) {
      formData.append("profile_image", imageFile)
    }

    // Call the update function with FormData
    changeCurrentUserInformation(formData)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      // Create a preview URL for the image
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          setImagePreview(reader.result.toString())
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("/avatar.png")
    form.setValue("profile_image", undefined)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border">
              <AvatarImage src={imagePreview} alt="Profile photo" />
              <AvatarFallback>
                {form.getValues("first_name")?.[0]}
                {form.getValues("last_name")?.[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center gap-2">
              <Input type="file" id="profile_image" className="hidden" accept="image/*" onChange={handleImageChange} />
              <Button type="button" variant="outline" onClick={() => document.getElementById("profile_image")?.click()}>
                Change photo
              </Button>
              {imagePreview !== "/avatar.png" && (
                <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={removeImage}>
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="grid grid-cols-1 hidden md:grid-cols-2 gap-6">
          {/* <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        <div className="flex justify-end">
          <Button disabled={isChangeInformation} type="submit">{isChangeInformation ? "Saving..." : "Save changes"}</Button>
        </div>
      </form>
      <StatusToast status={isChangeInformation  ? "pending" : false ? "error" : changeInformationSuccess  ? "success" : "idle"} />
    </Form>
  )
}

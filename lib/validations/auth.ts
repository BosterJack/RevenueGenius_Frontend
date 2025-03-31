import * as z from "zod"

export const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
})

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    confirmPassword: z.string(),
    first_name: z.string().min(1, { message: "Le prénom est requis" }),
    last_name: z.string().min(1, { message: "Le nom est requis" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export const profileUpdateSchema = z.object({
  first_name: z.string().min(1, { message: "Le prénom est requis" }),
  last_name: z.string().min(1, { message: "Le nom est requis" }),
  phone: z.string().optional(),
  address: z.string().optional(),
})

export const passwordUpdateSchema = z
  .object({
    current_password: z.string().min(1, { message: "Le mot de passe actuel est requis" }),
    new_password: z.string().min(8, { message: "Le nouveau mot de passe doit contenir au moins 8 caractères" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm_password"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ProfileUpdateFormValues = z.infer<typeof profileUpdateSchema>
export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateSchema>


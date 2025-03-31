import * as z from "zod"

export const leadSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().optional(),
  source: z.string().min(1, { message: "La source est requise" }),
  status: z.string().min(1, { message: "Le statut est requis" }),
  value: z.string().optional(),
  notes: z.string().optional(),
})

export const leadInteractionSchema = z.object({
  date: z.string().min(1, { message: "La date est requise" }),
  type: z.string().min(1, { message: "Le type est requis" }),
  notes: z.string().optional(),
})

export type LeadFormValues = z.infer<typeof leadSchema>
export type LeadInteractionFormValues = z.infer<typeof leadInteractionSchema>


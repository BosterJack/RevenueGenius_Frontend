import * as z from "zod"

export const contentSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis" }),
  type: z.string().min(1, { message: "Le type est requis" }),
  publish_date: z.string().min(1, { message: "La date de publication est requise" }),
  url: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
  cost: z.number().min(0, { message: "Le coût ne peut pas être négatif" }),
})

export const contentPerformanceSchema = z.object({
  visits: z.number().min(0, { message: "Le nombre de visites ne peut pas être négatif" }),
  leads: z.number().min(0, { message: "Le nombre de leads ne peut pas être négatif" }),
  conversions: z.number().min(0, { message: "Le nombre de conversions ne peut pas être négatif" }),
})

export type ContentFormValues = z.infer<typeof contentSchema>
export type ContentPerformanceFormValues = z.infer<typeof contentPerformanceSchema>


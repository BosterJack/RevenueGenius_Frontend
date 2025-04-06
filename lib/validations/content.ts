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


export const performanceSchema = z.object({
 
  visits: z.coerce
    .number()
    .int("Visits must be an integer")
    .min(0, "Visits cannot be negative")
    .max(2147483647, "Value too large"),
  leads: z.coerce
    .number()
    .int("Leads must be an integer")
    .min(0, "Leads cannot be negative")
    .max(2147483647, "Value too large"),
  conversions: z.coerce
    .number()
    .int("Conversions must be an integer")
    .min(0, "Conversions cannot be negative")
    .max(2147483647, "Value too large"),
})

export type PerformanceFormValues = z.infer<typeof performanceSchema>


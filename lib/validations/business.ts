import * as z from "zod"

export const businessUpdateSchema = z.object({
  name: z.string().min(1, { message: "Le nom de l'entreprise est requis" }),
  industry: z.string().min(1, { message: "Le secteur d'activité est requis" }),
  size: z.string().min(1, { message: "La taille de l'entreprise est requise" }),
  website: z.string().url({ message: "URL invalide" }).optional().or(z.literal("")),
  description: z.string().optional(),
})

export type BusinessUpdateFormValues = z.infer<typeof businessUpdateSchema>


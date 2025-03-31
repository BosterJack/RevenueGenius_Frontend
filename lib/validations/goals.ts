import * as z from "zod"

export const goalSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  type: z.string().min(1, { message: "Le type est requis" }),
  target_value: z.number().min(0, { message: "La valeur cible ne peut pas être négative" }),
  start_date: z.string().min(1, { message: "La date de début est requise" }),
  target_date: z.string().min(1, { message: "La date cible est requise" }),
  description: z.string().optional(),
})

export const milestoneSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  target_value: z.number().min(0, { message: "La valeur cible ne peut pas être négative" }),
  target_date: z.string().min(1, { message: "La date cible est requise" }),
})

export type GoalFormValues = z.infer<typeof goalSchema>
export type MilestoneFormValues = z.infer<typeof milestoneSchema>


import { z } from "zod";

export const workPostSchema = z.object({
  title: z.string().min(3, "Title is required"),

  description: z
    .string()
    .min(10, "Description is required"),

  subject: z.string().optional(),

  budget: z.coerce
    .number()
    .positive("Budget must be greater than 0"),

  deadline: z.string().optional(),
});
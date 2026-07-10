import { z } from "zod";

export const listingSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  type: z.enum(["SELL", "RENT"]),

  category: z
    .string()
    .min(2, "Category is required"),

  condition: z.enum([
    "NEW",
    "LIKE_NEW",
    "GOOD",
    "FAIR",
    "POOR",
  ]),

  location: z.string().optional(),

});
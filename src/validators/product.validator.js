import { z } from "zod";

export const productCreateSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().min(2).optional(),
  category: z.string().min(2, "Category is required"),
  gender: z.enum(["baby-boy", "baby-girl", "boy", "girl", "unisex"]).optional(),
  price: z.number().positive("Price must be greater than 0"),
  originalPrice: z.number().positive().optional(),
  discountPercent: z.number().int().min(0).max(90).optional().default(0),
  images: z.array(z.string().min(1)).min(1, "At least one image is required"),
  sizes: z.array(z.string().min(1)).min(1, "At least one size is required"),
  stock: z.number().int().min(0).optional().default(0),
  rating: z.number().min(0).max(5).optional().default(0),
  isNewArrival: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
});

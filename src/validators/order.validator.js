import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number().int().positive(),
  size: z.string().optional(),
  quantity: z.number().int().positive(),
});

export const orderCreateSchema = z.object({
  customerName: z.string().min(2, "Customer name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  shippingAddress: z.string().min(5, "Shipping address is required"),
  items: z.array(orderItemSchema).min(1, "Cart cannot be empty"),
  paymentMethod: z.enum(["COD", "Card"]),
});

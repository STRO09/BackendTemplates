import { z } from "zod";

/**
 * Validation schema for starting an order checkout.
 */
export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required."),
        quantity: z.number().int().min(1, "Quantity must be at least 1."),
      }),
    )
    .min(1, "Checkout must contain at least one item."),
});

export const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, "Razorpay order ID is required."),

  paymentId: z.string().min(1, "Payment ID is required."),

  signature: z.string().min(1, "Payment signature is required."),
});

import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [checkoutItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Checkout must contain at least one item.",
      },
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      required: true,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "expired"],
      default: "pending",
    },

    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

checkoutSchema.index({ user: 1, paymentStatus: 1 });
checkoutSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;

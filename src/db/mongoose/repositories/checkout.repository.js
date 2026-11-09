import MongoRepository from "./mongoRepository.js";

import Checkout from "../models/checkout.model.js";

class CheckoutRepository extends MongoRepository {
  constructor() {
    super(Checkout);
  }

  async findActiveByUser(userId) {
    return this.model.findOne({
      user: userId,
      paymentStatus: "pending",
      expiresAt: { $gt: new Date() },
    });
  }

  async findByRazorpayOrderId(razorpayOrderId) {
    return this.model.findOne({
      razorpayOrderId,
    });
  }

  /**
   * Find a pending checkout belonging to a user
   * using its payment-provider order ID.
   *
   * @param {string} userId
   * Authenticated user ID.
   *
   * @param {string} paymentOrderId
   * Payment-provider order ID associated with the checkout.
   *
   * @returns {Promise<Object|null>}
   * The matching checkout, or null if none exists.
   */
  async findPendingByUserAndPaymentOrderId(userId, paymentOrderId) {
    return this.model.findOne({
      user: userId,
      $or: [
        { paymentProviderOrderId: paymentOrderId },
        { razorpayOrderId: paymentOrderId },
      ],
      paymentStatus: "pending",
      expiresAt: {
        $gt: new Date(),
      },
    });
  }
}

export default new CheckoutRepository();

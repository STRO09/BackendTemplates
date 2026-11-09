/**
 * Abstract contract for payment providers.
 *
 * Payment providers are responsible for communicating
 * with external payment gateways.
 *
 * @abstract
 */
export default class PaymentProvider {
  /**
   * Create a payment order.
   *
   * @abstract
   *
   * @param {Object} options
   * @param {number} options.amount
   * Amount in the smallest currency unit.
   *
   * @param {string} options.currency
   * Currency code.
   *
   * @param {string} [options.receipt]
   * Provider receipt identifier.
   *
   * @param {Object} [options.notes]
   * Additional provider metadata.
   *
   * @returns {Promise<Object>}
   */
  async createOrder() {
    throw new Error("Method not implemented.");
  }

  /**
   * Verify a fetched payment against the provider order and checkout.
   *
   * @param {Object} options
   * @param {string} options.orderId
   * Provider-side order or payment-intent ID.
   * @param {string} options.paymentId
   * Provider-side payment ID.
   * @param {string} [options.signature]
   * Provider signature, when required by the provider.
   * @param {Object} options.payment
   * Payment details fetched directly from the provider.
   * @param {string} options.merchantReference
   * Application checkout reference.
   *
   * @returns {boolean}
   */
  verifyPayment() {
    throw new Error("Method not implemented.");
  }

  async fetchPayment() {
    throw new Error("Method not implemented.");
  }
}

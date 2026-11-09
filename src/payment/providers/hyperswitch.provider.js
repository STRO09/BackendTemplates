import PaymentProvider from "./provider.interface.js";
import env from "../../config/env.js";

class HyperswitchProvider extends PaymentProvider {
  getHeaders() {
    if (!env.HYPERSWITCH_API_KEY) {
      throw new Error(
        "HYPERSWITCH_API_KEY is required when using the Hyperswitch payment provider.",
      );
    }

    return {
      "Content-Type": "application/json",
      "api-key": env.HYPERSWITCH_API_KEY,
      ...(env.HYPERSWITCH_PROFILE_ID
        ? { "profile_id": env.HYPERSWITCH_PROFILE_ID }
        : {}),
    };
  }

  async request(path, options = {}) {
    const baseUrl = env.HYPERSWITCH_BASE_URL.replace(/\/+$/, "");
    const response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      const message =
        result?.error?.message ??
        result?.message ??
        `Hyperswitch API request failed with status ${response.status}.`;

      throw new Error(message);
    }

    return result;
  }

  async createOrder({ amount, currency, receipt }) {
    const payment = await this.request("/payments", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        order_id: receipt,
        capture_method: "automatic",
        confirm: false,
      }),
    });

    const id = payment.payment_id ?? payment.id;

    if (!id || !payment.client_secret) {
      throw new Error(
        "Hyperswitch did not return a payment ID and client secret.",
      );
    }

    return {
      id,
      clientSecret: payment.client_secret,
      status: payment.status,
    };
  }

  verifyPayment({ orderId, paymentId, payment, merchantReference }) {
    return Boolean(
      payment &&
        payment.payment_id === paymentId &&
        paymentId === orderId &&
        payment.order_id === merchantReference,
    );
  }

  async fetchPayment(paymentId) {
    const payment = await this.request(
      `/payments/${encodeURIComponent(paymentId)}?force_sync=true`,
    );

    return {
      ...payment,
      payment_id: payment.payment_id ?? payment.id,
      status: payment.status === "succeeded" ? "captured" : payment.status,
    };
  }
}

export default new HyperswitchProvider();

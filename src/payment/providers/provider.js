import env from "../../config/env.js";

import razorpayProvider from "./razorpay.provider.js";

const providers = {
  razorpay: razorpayProvider,
};

const paymentProvider = providers[env.PAYMENT_PROVIDER];

if (!paymentProvider) {
  throw new Error(`Unsupported payment provider: ${env.PAYMENT_PROVIDER}`);
}

export default paymentProvider;

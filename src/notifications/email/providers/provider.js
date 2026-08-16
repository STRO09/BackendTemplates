/**
 * Notification provider registry.
 *
 * Maps configured notification providers
 * to their implementations.
 */

import env from "../../../config/env.js";

import smtpProvider from "./smtp.provider.js";
// import resendProvider from "./resend.provider.js";
// import sendgridProvider from "./sendgrid.provider.js";

const providers = {
  smtp: smtpProvider,
  // resend: resendProvider,
  // sendgrid: sendgridProvider,
};

const notificationProvider = providers[env.NOTIFICATION_PROVIDER];

if (!notificationProvider) {
  throw new Error(
    `Unsupported notification provider: ${env.NOTIFICATION_PROVIDER}`,
  );
}

export default notificationProvider;

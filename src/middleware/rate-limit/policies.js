import strategies from "./strategies.js";

/**
 * Predefined rate-limiting policies for common use cases.
 */
const policies = {
  login() {
    return strategies.byIp({
      windowMs: 15 * 60 * 1000,
      limit: 5,
    });
  },

  register() {
    return strategies.byIp({
      windowMs: 60 * 60 * 1000,
      limit: 3,
    });
  },

  emailVerification() {
    return strategies.byUser({
      windowMs: 60 * 60 * 1000,
      limit: 3,
    });
  },

  passwordReset() {
    return strategies.byEmail({
      windowMs: 60 * 60 * 1000,
      limit: 3,
    });
  },

  api() {
    return strategies.byIp({
      windowMs: 15 * 60 * 1000,
      limit: 100,
    });
  },
};

export default policies;

/*
Example:

import policies from "./policies.js";

router.post(
  "/auth/login",
  policies.login(),
  loginController,
);

router.post(
  "/auth/verify-email/send",
  authenticate,
  policies.emailVerification(),
  verificationController,
);
*/
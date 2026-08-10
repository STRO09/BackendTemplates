import mongoose from "mongoose";

/**
 * MongoDB schema representing an authenticated refresh session.
 *
 * A user may have multiple active refresh sessions simultaneously,
 * such as a laptop, phone, and browser session.
 *
 * Refresh tokens themselves are never stored. Only their hashes are
 * persisted so a database leak does not expose usable credentials.
 */
const refreshSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    ipAddress: {
      type: String,
      default: null,
    },

    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * Automatically remove expired refresh sessions.
 *
 * MongoDB's TTL monitor removes documents after expiresAt.
 */
refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshSession", refreshSessionSchema);

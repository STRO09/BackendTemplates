import MongoRepository from "./mongoRepository.js";
import RefreshSession from "../models/refreshSession.model.js";

/**
 * Repository for refresh-session persistence.
 *
 * Provides persistence operations specific to authentication sessions
 * while inheriting common CRUD behavior from MongoRepository.
 */
class RefreshSessionRepository extends MongoRepository {
  constructor() {
    super(RefreshSession);
  }

  /**
   * Find a refresh session using its hashed refresh token.
   *
   * Used during refresh-token validation before checking the
   * session's revocation and expiration state.
   *
   * @param {string} tokenHash
   * Hash of the refresh token.
   *
   * @returns {Promise<import("mongoose").Document|null>}
   * Matching refresh session, or null.
   */
  async findByTokenHash(tokenHash) {
    return this.model.findOne({
      tokenHash,
    });
  }

  /**
   * Revoke a refresh session using its refresh token.
   *
   * Finds the session by its hashed refresh token and marks it as revoked.
   * Used when logging out the current authentication session.
   *
   * @param {string} tokenHash
   * Hash of the refresh token.
   *
   * @returns {Promise<import("mongoose").Document|null>}
   * Revoked session, or null when no matching session exists.
   */
  async revoke(tokenHash) {
    return this.model.findOneAndUpdate(
      {
        tokenHash,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  /**
   * Atomically revoke an active refresh session.
   *
   * The session is revoked only when it is currently active.
   * This operation is used during refresh-token rotation so that
   * concurrent refresh requests cannot successfully consume the
   * same refresh token more than once.
   *
   * @param {string} tokenHash
   * Refresh session token.
   *
   * @returns {Promise<import("mongoose").Document|null>}
   * The revoked session when the operation succeeds, or null when
   * the session is already revoked or does not exist.
   */
  async revokeIfActive(tokenHash) {
    return this.model.findOneAndUpdate(
      {
        tokenHash,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
      {
        returnDocument: "after",
      },
    );
  }

  /**
   * Revoke all active refresh sessions belonging to a user.
   *
   * Used to invalidate all active authentication sessions for a user,
   * such as during a "logout from all devices" operation.
   *
   * Already revoked sessions are left unchanged.
   *
   * @param {string} userId
   * User identifier.
   *
   * @returns {Promise<import("mongoose").UpdateResult>}
   * MongoDB update result containing the number of sessions modified.
   */
  async revokeAllForUser(userId) {
    return this.model.updateMany(
      {
        userId,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      },
    );
  }
}

export default new RefreshSessionRepository();

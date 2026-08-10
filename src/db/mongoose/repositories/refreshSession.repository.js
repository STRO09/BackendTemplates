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
     * Revoke a refresh session.
     *
     * Performs an unconditional revocation of the specified session.
     * Used when explicitly invalidating an existing refresh session,
     * such as logging out the current session.
     *
     * @param {string} id
     * Refresh session identifier.
     *
     * @returns {Promise<import("mongoose").Document|null>}
     * Updated session, or null when the session does not exist.
     */
    async revoke(id) {
        return this.model.findByIdAndUpdate(
            id,
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
     * @param {string} id
     * Refresh session identifier.
     *
     * @returns {Promise<import("mongoose").Document|null>}
     * The revoked session when the operation succeeds, or null when
     * the session is already revoked or does not exist.
     */
    async revokeIfActive(id) {
        return this.model.findOneAndUpdate(
            {
                _id: id,
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
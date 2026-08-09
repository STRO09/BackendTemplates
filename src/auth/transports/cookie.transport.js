/**
 * Extracts authentication tokens from HTTP cookies.
 *
 * This transport only handles the HTTP transport layer.
 * It does not verify or otherwise interpret tokens.
 */
class CookieTransport {

    /**
     * Extract the access token from the access-token cookie.
     *
     * @param {import("express").Request} req
     * Express request.
     *
     * @returns {string|null}
     * Access token, or null when unavailable.
     */
    extractAccessToken(req) {
        return req.cookies?.accessToken ?? null;
    }

    /**
     * Extract the refresh token from the refresh-token cookie.
     *
     * @param {import("express").Request} req
     * Express request.
     *
     * @returns {string|null}
     * Refresh token, or null when unavailable.
     */
    extractRefreshToken(req) {
        return req.cookies?.refreshToken ?? null;
    }
}

export default new CookieTransport();
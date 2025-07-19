/**
 * Type-safe API client for Merajut ASA
 * Provides comprehensive type safety for all API endpoints
 */
export class ApiClientError extends Error {
    error;
    response;
    constructor(error, response) {
        super(error.message);
        this.error = error;
        this.response = response;
        this.name = 'ApiClientError';
    }
}
//# sourceMappingURL=types.js.map
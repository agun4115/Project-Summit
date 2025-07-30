/**
 * Error types enum for consistent error handling
 */
const ERROR_TYPES = {
  VALIDATION_ERROR: 'ValidationError',
  UNAUTHORIZED_ERROR: 'UnauthorizedError',
  UNAUTHENTICATED_ERROR: 'UnauthenticatedError',
  INTERNAL_SERVER_ERROR: 'InternalServerError'
};

/**
 * HTTP status codes mapping for error types
 */
const ERROR_STATUS_CODES = {
  [ERROR_TYPES.VALIDATION_ERROR]: 400,
  [ERROR_TYPES.UNAUTHORIZED_ERROR]: 401,
  [ERROR_TYPES.UNAUTHENTICATED_ERROR]: 401,
  [ERROR_TYPES.INTERNAL_SERVER_ERROR]: 500
};

/**
 * Default error messages for each error type
 */
const ERROR_MESSAGES = {
  [ERROR_TYPES.VALIDATION_ERROR]: 'Validation failed',
  [ERROR_TYPES.UNAUTHORIZED_ERROR]: 'Access denied - insufficient permissions',
  [ERROR_TYPES.UNAUTHENTICATED_ERROR]: 'Authentication required',
  [ERROR_TYPES.INTERNAL_SERVER_ERROR]: 'Internal server error'
};

module.exports = {
  ERROR_TYPES,
  ERROR_STATUS_CODES,
  ERROR_MESSAGES
};

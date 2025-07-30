const { ERROR_TYPES, ERROR_MESSAGES } = require('../constants/errorTypes');

/**
 * Custom error class for application errors
 */
class AppError extends Error {
  constructor(type, message, details = null, statusCode = null) {
    super(message);
    this.name = type;
    this.details = details;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a validation error
 * @param {string} message - Error message
 * @param {Object} details - Validation details
 * @returns {AppError}
 */
const createValidationError = (message = null, details = null) => {
  return new AppError(
    ERROR_TYPES.VALIDATION_ERROR,
    message || ERROR_MESSAGES[ERROR_TYPES.VALIDATION_ERROR],
    details,
    400
  );
};

/**
 * Create an unauthorized error
 * @param {string} message - Error message
 * @returns {AppError}
 */
const createUnauthorizedError = (message = null) => {
  return new AppError(
    ERROR_TYPES.UNAUTHORIZED_ERROR,
    message || ERROR_MESSAGES[ERROR_TYPES.UNAUTHORIZED_ERROR],
    null,
    401
  );
};

/**
 * Create an unauthenticated error
 * @param {string} message - Error message
 * @returns {AppError}
 */
const createUnauthenticatedError = (message = null) => {
  return new AppError(
    ERROR_TYPES.UNAUTHENTICATED_ERROR,
    message || ERROR_MESSAGES[ERROR_TYPES.UNAUTHENTICATED_ERROR],
    null,
    401
  );
};

/**
 * Create an internal server error
 * @param {string} message - Error message
 * @returns {AppError}
 */
const createInternalServerError = (message = null) => {
  return new AppError(
    ERROR_TYPES.INTERNAL_SERVER_ERROR,
    message || ERROR_MESSAGES[ERROR_TYPES.INTERNAL_SERVER_ERROR],
    null,
    500
  );
};

module.exports = {
  AppError,
  createValidationError,
  createUnauthorizedError,
  createUnauthenticatedError,
  createInternalServerError
};

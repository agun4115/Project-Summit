const { ERROR_TYPES, ERROR_STATUS_CODES, ERROR_MESSAGES } = require('../constants/errorTypes');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('💥 Error:', err.stack);

  // Default error response
  let error = {
    success: false,
    message: err.message || ERROR_MESSAGES[ERROR_TYPES.INTERNAL_SERVER_ERROR],
    timestamp: new Date().toISOString(),
    type: err.name || ERROR_TYPES.INTERNAL_SERVER_ERROR
  };

  // Development environment - include stack trace
  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  // Handle specific error types
  if (err.name === ERROR_TYPES.VALIDATION_ERROR) {
    error.message = ERROR_MESSAGES[ERROR_TYPES.VALIDATION_ERROR];
    error.details = err.details || err.errors;
    return res.status(ERROR_STATUS_CODES[ERROR_TYPES.VALIDATION_ERROR]).json(error);
  }

  if (err.name === ERROR_TYPES.UNAUTHORIZED_ERROR) {
    error.message = ERROR_MESSAGES[ERROR_TYPES.UNAUTHORIZED_ERROR];
    return res.status(ERROR_STATUS_CODES[ERROR_TYPES.UNAUTHORIZED_ERROR]).json(error);
  }

  if (err.name === ERROR_TYPES.UNAUTHENTICATED_ERROR) {
    error.message = ERROR_MESSAGES[ERROR_TYPES.UNAUTHENTICATED_ERROR];
    return res.status(ERROR_STATUS_CODES[ERROR_TYPES.UNAUTHENTICATED_ERROR]).json(error);
  }

  if (err.name === ERROR_TYPES.INTERNAL_SERVER_ERROR) {
    error.message = ERROR_MESSAGES[ERROR_TYPES.INTERNAL_SERVER_ERROR];
    return res.status(ERROR_STATUS_CODES[ERROR_TYPES.INTERNAL_SERVER_ERROR]).json(error);
  }

  // Default to 500 server error for unknown error types
  const statusCode = err.statusCode || ERROR_STATUS_CODES[ERROR_TYPES.INTERNAL_SERVER_ERROR];
  res.status(statusCode).json(error);
};

module.exports = { errorHandler };

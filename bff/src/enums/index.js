
/**
 * Product sorting options enum
 */
const ProductSortBy = Object.freeze({
  CREATED_AT: 'createdAt',
  PRICE_LOW_TO_HIGH: 'priceLowToHigh',
  PRICE_HIGH_TO_LOW: 'priceHighToLow',
  BEST_MATCH: 'bestMatch'
});

/**
 * Sort order enum
 */
const SortOrder = Object.freeze({
  ASC: 'asc',
  DESC: 'desc'
});

const SortBy = Object.freeze({
  CREATED_AT: 'createdAt',
  PRICE_LOW_TO_HIGH: 'priceLowToHigh',
  PRICE_HIGH_TO_LOW: 'priceHighToLow',
  BEST_MATCH: 'bestMatch'
})

/**
 * Product status enum
 */
const ProductStatus = Object.freeze({
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED'
});

/**
 * Product type/unit enum
 */
const ProductType = Object.freeze({
  LITERS: 'L',
  KILOGRAMS: 'KG',
  ITEMS: 'ITEMS'
});

/**
 * User roles enum
 */
const UserRole = Object.freeze({
  CUSTOMER: 'Customer',
  DATA_STEWARD: 'Data Steward',
  SUPPLIER: 'Supplier'
});

/**
 * HTTP status codes enum
 */
const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
});

/**
 * API response messages enum
 */
const ResponseMessage = Object.freeze({
  SUCCESS: 'Success',
  DATA_RETRIEVED: 'Data retrieved successfully',
  DATA_CREATED: 'Data created successfully',
  DATA_UPDATED: 'Data updated successfully',
  DATA_DELETED: 'Data deleted successfully',
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
  PRODUCT_STATUS_UPDATED: 'Product status updated successfully',
  CART_ITEM_ADDED: 'Cart item added successfully',
  CART_UPDATED: 'Cart updated successfully',
  CART_ITEM_REMOVED: 'Cart item removed successfully',
  LOGIN_SUCCESS: 'Login successful',
  SIGNUP_SUCCESS: 'Signup successful',
  LOGOUT_SUCCESS: 'Logout successful',
  TOKEN_VALID: 'Token is valid',
  TOKEN_REFRESHED: 'Token refreshed successfully',
  VALIDATION_ERROR: 'Validation failed',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
  PRODUCT_NOT_FOUND: 'Product not found',
  CART_NOT_FOUND: 'Cart not found'
});

/**
 * Validation error types enum
 */
const ValidationErrorType = Object.freeze({
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_VALUE: 'INVALID_VALUE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  OUT_OF_RANGE: 'OUT_OF_RANGE'
});

/**
 * Helper functions to get enum values
 */
const EnumHelpers = Object.freeze({
  getProductSortValues: () => Object.values(ProductSortBy),
  getSortOrderValues: () => Object.values(SortOrder),
  getProductStatusValues: () => Object.values(ProductStatus),
  getProductTypeValues: () => Object.values(ProductType),
  getUserRoleValues: () => Object.values(UserRole),
  
  isValidProductSort: (value) => Object.values(ProductSortBy).includes(value),
  isValidSortOrder: (value) => Object.values(SortOrder).includes(value),
  isValidProductStatus: (value) => Object.values(ProductStatus).includes(value),
  isValidProductType: (value) => Object.values(ProductType).includes(value),
  isValidUserRole: (value) => Object.values(UserRole).includes(value)
});

module.exports = {
  ProductSortBy,
  SortOrder,
  SortBy,
  ProductStatus,
  ProductType,
  UserRole,
  HttpStatus,
  ResponseMessage,
  ValidationErrorType,
  EnumHelpers
};

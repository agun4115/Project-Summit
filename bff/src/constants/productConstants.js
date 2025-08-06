const { ProductSortBy, SortOrder, ProductStatus, ProductType } = require('../enums');

/**
 * Default pagination constants
 */
const PaginationDefaults = Object.freeze({
  PAGE: 0,
  LIMIT: 10,
  MAX_LIMIT: 100
});

/**
 * Mapping for frontend sort options to backend sort fields
 */
const SortMapping = Object.freeze({
  [ProductSortBy.CREATED_AT]: { field: 'createdAt', order: SortOrder.DESC },
  [ProductSortBy.PRICE_LOW_TO_HIGH]: { field: 'price', order: SortOrder.ASC },
  [ProductSortBy.PRICE_HIGH_TO_LOW]: { field: 'price', order: SortOrder.DESC },
  [ProductSortBy.BEST_MATCH]: { field: 'relevance', order: SortOrder.DESC }
});

module.exports = {
  ProductSortBy,
  SortOrder,
  PaginationDefaults,
  ProductStatus,
  ProductType,
  SortMapping
};

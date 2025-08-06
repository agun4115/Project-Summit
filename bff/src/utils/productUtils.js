const { 
  createValidationError, 
  createInternalServerError 
} = require('./errorUtils');
const { 
  ProductSortBy, 
  PaginationDefaults,
  SortMapping,
} = require('../constants/productConstants');
const { 
  EnumHelpers,
} = require('../enums');
const { getAllCategories } = require('../services/categoryService');

/**
 * Common validation helper for product queries
 */
const validateQueryParams = (queryParams) => {
  const { sortBy, sortOrder, category, unitType, q, status, minPrice, maxPrice } = queryParams;

  // Validate sortBy parameter
  if (sortBy && !EnumHelpers.isValidProductSort(sortBy)) {
    throw createValidationError('Invalid sort option', {
      validOptions: EnumHelpers.getProductSortValues(),
      received: sortBy
    });
  }

  // Validate sortOrder parameter
  if (sortOrder && !EnumHelpers.isValidSortOrder(sortOrder)) {
    throw createValidationError('Invalid sort order', {
      validOptions: EnumHelpers.getSortOrderValues(),
      received: sortOrder
    });
  }

  // Validate string parameters
  const stringParams = { category, unitType, q, status };
  for (const [key, value] of Object.entries(stringParams)) {
    if (value && typeof value !== 'string') {
      throw createValidationError(`Invalid ${key} parameter - must be a string`);
    }
  }

  // Validate unitType using enum helper
  if (unitType && !EnumHelpers.isValidProductType(unitType)) {
    throw createValidationError('Invalid product type', {
      validOptions: EnumHelpers.getProductTypeValues(),
      received: unitType
    });
  }

  // Validate price filters (for customer products)
  if (minPrice !== undefined) {
    if (isNaN(parseFloat(minPrice))) {
      throw createValidationError('minPrice must be a valid number');
    }
  }

  if (maxPrice !== undefined) {
    if (isNaN(parseFloat(maxPrice))) {
      throw createValidationError('maxPrice must be a valid number');
    }
  }

  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    throw createValidationError('minPrice cannot be greater than maxPrice');
  }
};

/**
 * Build query parameters for product service
 */
const buildQueryParams = (queryData) => {
  const { page, limit, sortBy, sortOrder, q, category, unitType, status, sellerId, minPrice, maxPrice } = queryData;

  // Get actual sort field and order from mapping
  const sortConfig = SortMapping[sortBy] || SortMapping[ProductSortBy.CREATED_AT];
  
  const queryParams = new URLSearchParams({
    page: parseInt(page) - 1 || PaginationDefaults.PAGE,
    limit: Math.min(parseInt(limit) || PaginationDefaults.LIMIT, PaginationDefaults.MAX_LIMIT),
    sortBy: sortConfig.field,
    sortOrder: sortOrder || sortConfig.order
  });

  // Add filters if provided
  if (q) queryParams.append('q', q);
  if (category) queryParams.append('category', category);
  if (unitType) queryParams.append('amountType', unitType);
  if (status) queryParams.append('status', status);
  if (sellerId) queryParams.append('sellerId', sellerId);
  if (minPrice) queryParams.append('minPrice', minPrice);
  if (maxPrice) queryParams.append('maxPrice', maxPrice);

  return queryParams;
};

/**
 * Add category information to products
 */
const enrichProductsWithCategories = async (products) => {
  try {
    const categories = await getAllCategories();
    const categoryMap = {};
    
    categories.data.forEach(cat => {
      categoryMap[cat.id] = cat;
    });

    products.data.forEach(product => {
      if (product.categoryId && categoryMap[product.categoryId]) {
        product.category = categoryMap[product.categoryId].name;
      } else {
        product.category = null;
      }
    });
  } catch (error) {
    console.warn('Failed to enrich products with category data:', error.message);
    // Continue without category enrichment
  }
};

/**
 * Handle product service errors
 */
const handleProductServiceError = (error) => {
  console.error('Error fetching products:', error.message);
  
  if (error.code === 'ECONNREFUSED') {
    throw createInternalServerError('Product service unavailable');
  }
  
  throw error;
};

module.exports = {
  validateQueryParams,
  buildQueryParams,
  enrichProductsWithCategories,
  handleProductServiceError
};

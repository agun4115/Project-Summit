const express = require('express');
const { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct
} = require('../services/productService');
const { asyncHandler } = require('../utils/asyncHandler');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const { 
  ProductSortBy, 
  SortOrder, 
  PaginationDefaults, 
  ProductStatus,
  ProductType
} = require('../constants/productConstants');
const { 
  HttpStatus, 
  ResponseMessage, 
  EnumHelpers 
} = require('../enums');

const router = express.Router();

/**
 * GET /api/v1/products
 * Get all products with pagination and filters
 */
router.get('/', asyncHandler(async (req, res) => {
  try {
    const { 
      page, 
      limit, 
      sortBy, 
      sortOrder,
      q, 
      category, 
      seller,
      type,
      status,
      minPrice, 
      maxPrice 
    } = req.query;
    
    // Validate sortBy parameter using enum helper
    if (sortBy && !EnumHelpers.isValidProductSort(sortBy)) {
      throw createValidationError('Invalid sort option', {
        validOptions: EnumHelpers.getProductSortValues(),
        received: sortBy
      });
    }

    // Validate sortOrder parameter using enum helper
    if (sortOrder && !EnumHelpers.isValidSortOrder(sortOrder)) {
      throw createValidationError('Invalid sort order', {
        validOptions: EnumHelpers.getSortOrderValues(),
        received: sortOrder
      });
    }

    // Validate price filters
    if (minPrice && isNaN(parseFloat(minPrice))) {
      throw createValidationError('minPrice must be a valid number');
    }

    if (maxPrice && isNaN(parseFloat(maxPrice))) {
      throw createValidationError('maxPrice must be a valid number');
    }

    if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
      throw createValidationError('minPrice cannot be greater than maxPrice');
    }
    
    // Check if category, seller, type, status, or q are present and not valid strings
    if ((category && typeof category !== 'string') || 
        (seller && typeof seller !== 'string') || 
        (type && typeof type !== 'string') ||
        (status && typeof status !== 'string') ||
        (q && typeof q !== 'string')) {
        throw createValidationError('Invalid query parameter');
    }

    // Validate type parameter using enum helper
    if (type && !EnumHelpers.isValidProductType(type)) {
      throw createValidationError('Invalid product type', {
        validOptions: EnumHelpers.getProductTypeValues(),
        received: type
      });
    }

    // Validate status parameter using enum helper
    if (status && !EnumHelpers.isValidProductStatus(status)) {
      throw createValidationError('Invalid product status', {
        validOptions: EnumHelpers.getProductStatusValues(),
        received: status
      });
    }

    const products = await getAllProducts({
      page: parseInt(page) || PaginationDefaults.PAGE,
      limit: parseInt(limit) || PaginationDefaults.LIMIT,
      sortBy: sortBy || ProductSortBy.CREATED_AT,
      sortOrder: sortOrder || SortOrder.DESC,
      q: q || '',
      category: category || '',
      seller: seller || '',
      type: type || '',
      status: status || '',
      minPrice: minPrice || '',
      maxPrice: maxPrice || ''
    });
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: products.data,
      filters: {
        category: category || null,
        seller: seller || null,
        type: type || null,
        status: status || null,
        minPrice: minPrice || null,
        maxPrice: maxPrice || null
      },
    pagination: {
        totalElements: products.totalElements,
        totalPages: products.totalPages,
        size: products.size,
        number: products.number,
        first: products.first,
        last: products.last,
        numberOfElements: products.numberOfElements,
        empty: products.empty
    },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw createInternalServerError('Product service unavailable');
    }
    
    throw error;
  }
}));


/**
 * GET /api/v1/products/:id
 * Get a single product by ID
 */
// router.get('/:id', asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!id) {
//       throw createValidationError('Product ID is required');
//     }
    
//     const product = await getProductById(id);
    
//     res.status(HttpStatus.OK).json({
//       success: true,
//       data: product,
//       timestamp: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Error fetching product by ID:', error.message);
    
//     if (error.code === 'ECONNREFUSED') {
//       throw createInternalServerError('Product service unavailable');
//     }
    
//     throw error;
//   }
// }));

/**
 * POST /api/v1/products
 * Create a new product
 */
router.post('/', asyncHandler(async (req, res) => {
  try {
    const productData = req.body;
    
    // Basic validation
    if (!productData.name || !productData.price) {
      throw createValidationError('Product name and price are required', {
        requiredFields: ['name', 'price']
      });
    }
    
    const newProduct = await createProduct(productData);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: newProduct,
      message: ResponseMessage.PRODUCT_CREATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw createInternalServerError('Product service unavailable');
    }
    
    throw error;
  }
}));

/**
 * PUT /api/v1/products/:id
 * Update a product
 */
router.put('/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      throw createValidationError('Product ID is required');
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      throw createValidationError('Update data is required');
    }
    
    const updatedProduct = await updateProduct(id, updateData);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: updatedProduct,
      message: ResponseMessage.PRODUCT_UPDATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating product:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw createInternalServerError('Product service unavailable');
    }
    
    throw error;
  }
}));

/**
 * PATCH /api/v1/products/:id/status
 * Update product status
 */
router.patch('/:id/status', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!id) {
      throw createValidationError('Product ID is required');
    }
    
    if (!status) {
      throw createValidationError('Status is required', {
        validStatuses: EnumHelpers.getProductStatusValues()
      });
    }

    // Validate status value using enum helper
    if (!EnumHelpers.isValidProductStatus(status)) {
      throw createValidationError('Invalid product status', {
        validStatuses: EnumHelpers.getProductStatusValues(),
        received: status
      });
    }
    
    const updatedProduct = await updateProductStatus(id, status);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: updatedProduct,
      message: `${ResponseMessage.PRODUCT_STATUS_UPDATED} to ${status}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating product status:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw createInternalServerError('Product service unavailable');
    }
    
    throw error;
  }
}));

/**
 * DELETE /api/v1/products/:id
 * Delete a product
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw createValidationError('Product ID is required');
    }
    
    const result = await deleteProduct(id);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: result,
      message: ResponseMessage.PRODUCT_DELETED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      throw createInternalServerError('Product service unavailable');
    }
    
    throw error;
  }
}));

module.exports = router;

const { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct
} = require('../services/productService');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const {
  validateQueryParams,
  buildQueryParams,
  enrichProductsWithCategories,
  handleProductServiceError
} = require('../utils/productUtils');
const { 
  ProductStatus,
} = require('../constants/productConstants');
const { 
  HttpStatus, 
  ResponseMessage, 
  EnumHelpers,
  UserRole,
} = require('../enums');

/**
 * Get all products with pagination and filters for customers
 */
const getCustomerProducts = async (req, res) => {
  try {
    const queryData = { 
      ...req.query,
      status: ProductStatus.ACCEPTED // Only show accepted products to customers
    };

    validateQueryParams(queryData);
    const queryParams = buildQueryParams(queryData);
    const products = await getAllProducts(queryParams);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: products.data,
      filters: {
        category: queryData.category || null,
        unitType: queryData.unitType || null,
        minPrice: queryData.minPrice || null,
        maxPrice: queryData.maxPrice || null
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
    handleProductServiceError(error);
  }
};

/**
 * Get products for a specific seller
 */
const getSellerProducts = async (req, res) => {
  try {
    const queryData = { 
      ...req.query,
      sellerId: req.user // Add seller ID from authenticated user
    };

    validateQueryParams(queryData);
    const queryParams = buildQueryParams(queryData);
    const products = await getAllProducts(queryParams);
    
    // Enrich products with category information
    await enrichProductsWithCategories(products);

    res.status(HttpStatus.OK).json({
      success: true,
      data: products.data,
      filters: {
        category: queryData.category || null,
        unitType: queryData.unitType || null,
        q: queryData.q || null
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
    handleProductServiceError(error);
  }
};

/**
 * Get all products (for admin/data steward)
 */
const getAllProductsController = async (req, res) => {
  try {
    const queryData = { 
      ...req.query,
      status: req.params.status // Get status from route params
    };

    validateQueryParams(queryData);
    const queryParams = buildQueryParams(queryData);
    const products = await getAllProducts(queryParams);
    
    // Enrich products with category information
    await enrichProductsWithCategories(products);

    res.status(HttpStatus.OK).json({
      success: true,
      data: products.data,
      filters: {
        category: queryData.category || null,
        unitType: queryData.unitType || null,
        q: queryData.q || null
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
    handleProductServiceError(error);
  }
};


/**
 * Get product statistics (dummy implementation)
 */
const getProductStats = async (req, res) => {
  try {
    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        totalProducts: 100,
        activeProducts: 80,
        pendingProducts: 15,
        rejectedProducts: 5
      },
      message: 'Product stats retrieved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching product stats:', error.message);
    throw createInternalServerError('Product service unavailable');
  }
};

/**
 * Get a single product by ID
 */
const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const userContext = req.user;
    
    if (!id) {
      throw createValidationError('Product ID is required');
    }
    
    const product = await getProductById(id);
    
    // Role-based access control
    if (userContext && userContext.role === UserRole.CUSTOMER) {
      // Customers can only see accepted products
      if (product.data.status !== ProductStatus.ACCEPTED) {
        throw createValidationError('Product not available');
      }
    }
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: product.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleProductServiceError(error);
  }
};

/**
 * Create a new product
 */
const createProductController = async (req, res) => {
  try {
    let productData = req.body;
    const userContext = req.user;
    
    if (!productData.title || !productData.pricePerUnit) {
      throw createValidationError('Product title and pricePerUnit are required', {
        requiredFields: ['title', 'pricePerUnit']
      });
    }
    
    // Add supplier-specific data
    if (userContext && req.role === UserRole.SUPPLIER) {
      productData = {
        ...productData,
        sellerId: userContext,
        status: ProductStatus.PENDING,
        images: productData.images || ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T2lsfGVufDB8fDB8fHww']
      };
    }
    
    const newProduct = await createProduct(productData);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: newProduct.data,
      message: ResponseMessage.PRODUCT_CREATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleProductServiceError(error);
  }
};

/**
 * Update a product
 */
const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;
    const userContext = req.user;
    
    if (!id) {
      throw createValidationError('Product ID is required');
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      throw createValidationError('Update data is required');
    }
    
    // Add owner context for suppliers
    if (userContext && userContext.role === UserRole.SUPPLIER) {
      if (userContext.productOwnershipCheck && 
          userContext.productOwnershipCheck.productId === id) {
        updateData.ownerId = userContext.id;
      }
    }
    
    const updatedProduct = await updateProduct(id, updateData);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: updatedProduct.data,
      message: ResponseMessage.PRODUCT_UPDATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleProductServiceError(error);
  }
};

/**
 * Update product status
 */
const updateProductStatusController = async (req, res) => {
  try {
    const { id, status } = req.params;
    
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
    handleProductServiceError(error);
  }
};

/**
 * Delete a product
 */
const deleteProductController = async (req, res) => {
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
    handleProductServiceError(error);
  }
};

module.exports = {
  getCustomerProducts,
  getSellerProducts,
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  updateProductStatusController,
  deleteProductController,
  getProductStats
};

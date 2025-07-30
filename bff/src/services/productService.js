const { createHttpClient } = require('../utils/httpClient');
const { 
  ProductSortBy, 
  SortOrder, 
  PaginationDefaults, 
  SortMapping 
} = require('../constants/productConstants');
const { UserRole } = require('../enums');

// Create HTTP client instance
const baseUrl = process.env.PRODUCT_MS_BASE_URL || 'http://localhost:8003';
const httpClient = createHttpClient(baseUrl);

const getAllProducts = async (params = {}, userContext = null) => {
  const { 
    page = PaginationDefaults.PAGE, 
    limit = PaginationDefaults.LIMIT, 
    sortBy = ProductSortBy.CREATED_AT, 
    sortOrder = SortOrder.DESC,
    q = '',
    category = '',
    seller = '',
    type = '',
    status = '',
    minPrice = '',
    maxPrice = ''
  } = params;

  // Get actual sort field and order from mapping
  const sortConfig = SortMapping[sortBy] || SortMapping[ProductSortBy.CREATED_AT];
  
  const queryParams = new URLSearchParams({
    page,
    limit: Math.min(limit, PaginationDefaults.MAX_LIMIT),
    sortBy: sortConfig.field,
    sortOrder: sortOrder || sortConfig.order
  });

  // Role-based filtering
  if (userContext) {
    // Customers can only see active products
    if (userContext.role === UserRole.CUSTOMER && !status) {
      queryParams.append('status', 'active');
    }
    
    // Suppliers can see all their products, but filtered by seller if not Data Steward
    if (userContext.role === UserRole.SUPPLIER && !seller) {
      queryParams.append('seller', userContext.id);
    }
    
    // Data Stewards can see all products (no additional filtering)
  }

  // Add filters if provided
  if (q) queryParams.append('q', q);
  if (category) queryParams.append('category', category);
  if (seller) queryParams.append('seller', seller);
  if (type) queryParams.append('type', type);
  if (status) queryParams.append('status', status);
  if (minPrice) queryParams.append('minPrice', minPrice);
  if (maxPrice) queryParams.append('maxPrice', maxPrice);

  const endpoint = `/api/v1/products?${queryParams}`;
  return await httpClient.get(endpoint);
};

const getProductById = async (productId, userContext = null) => {
  const endpoint = `/api/v1/products/${productId}`;
  const product = await httpClient.get(endpoint);
  
  // Role-based access control
  if (userContext && userContext.role === UserRole.CUSTOMER) {
    // Customers can only see active products
    if (product.data.status !== 'active') {
      throw new Error('Product not available');
    }
  }
  
  return product;
};

const createProduct = async (productData, userContext = null) => {
  // Add creator context for suppliers
  if (userContext && userContext.role === UserRole.SUPPLIER) {
    productData = {
      ...productData,
      sellerId: userContext.id,
      status: 'pending'
    };
  }
  
  const endpoint = '/api/v1/products';
  return await httpClient.post(endpoint, productData);
};

const updateProduct = async (productId, updateData, userContext = null) => {
  if (userContext && userContext.role === UserRole.SUPPLIER) {
    if (userContext.productOwnershipCheck && 
        userContext.productOwnershipCheck.productId === productId) {
      updateData.ownerId = userContext.id;
    }
  }
  
  const endpoint = `/api/v1/products/${productId}`;
  return await httpClient.put(endpoint, updateData);
};

const updateProductStatus = async (productId, status) => {
  const endpoint = `/api/v1/products/${productId}/status`;
  return await httpClient.patch(endpoint, { status });
};

const deleteProduct = async (productId) => {
  const endpoint = `/api/v1/products/${productId}`;
  return await httpClient.delete(endpoint);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct
};

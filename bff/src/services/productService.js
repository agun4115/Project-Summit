const { createHttpClient } = require('../utils/httpClient');

// Create HTTP client instance
const baseUrl = process.env.PRODUCT_MS_BASE_URL || 'http://localhost:8003';
const httpClient = createHttpClient(baseUrl);

const getAllProducts = async (queryParams) => {
  const endpoint = `/products?${queryParams}`;
  return await httpClient.get(endpoint);
};

const getProductById = async (productId) => {
  const endpoint = `/products/${productId}`;
  return await httpClient.get(endpoint);
};

const createProduct = async (productData) => {
  const endpoint = '/products';
  return await httpClient.post(endpoint, productData);
};

const updateProduct = async (productId, updateData) => {
  const endpoint = `/products/${productId}`;
  return await httpClient.put(endpoint, updateData);
};

const updateProductStatus = async (productId, status) => {
  const endpoint = `/products/${productId}/status`;
  return await httpClient.patch(endpoint, { status });
};

const deleteProduct = async (productId) => {
  const endpoint = `/products/${productId}`;
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

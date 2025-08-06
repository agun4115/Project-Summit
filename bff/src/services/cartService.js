const { createHttpClient } = require('../utils/httpClient');

// Create HTTP client instance
const baseUrl = process.env.CART_MS_BASE_URL || 'http://localhost:8004/api';
const httpClient = createHttpClient(baseUrl);

// QUESTION || Can't we validate user from the authentication token.
const getAllCartItems = async (userId) => {
  const endpoint = `/v1/cart/${userId}`;
  return await httpClient.get(endpoint);
};

const addCartItem = async (userId, cartItemData) => {
  const endpoint = `/v1/cart/${userId}`;
  return await httpClient.post(endpoint, cartItemData);
};

const updateCart = async (userId, cartData) => {
  const endpoint = `/v1/cart/${userId}`;
  return await httpClient.put(endpoint, cartData);
};

const deleteCartItem = async (userId, productId) => {
  const endpoint = `/v1/cart/${userId}/${productId}`;
  return await httpClient.delete(endpoint);
};
const clearCart = async (userId) => {
  const endpoint = `/v1/cart/${userId}`;
  return await httpClient.delete(endpoint);
};

module.exports = {
  getAllCartItems,
  addCartItem,
  updateCart,
  deleteCartItem,
  clearCart
};

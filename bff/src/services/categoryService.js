const { createHttpClient } = require('../utils/httpClient');

// Create HTTP client instance
const baseUrl = process.env.CATEGORY_MS_BASE_URL || 'http://localhost:8002';
const httpClient = createHttpClient(baseUrl);

const getAllCategories = async () => {
  const endpoint = '/api/v1/categories';
  return await httpClient.get(endpoint);
};

module.exports = {
  getAllCategories
};

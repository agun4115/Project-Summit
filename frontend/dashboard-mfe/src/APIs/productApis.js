import { apiClient } from '@sysco/shared-utility';
import { PRODUCT_STATUS } from '../Constants/enums';

// Product APIs
export const fetchProductsSeller = async (status = null, searchTerm = '', pageSize = 12, currentPage = 1) => {
  let url = '/v1/products/seller';
  const params = new URLSearchParams();

  if (status) {
    params.append('status', status);
  }

  if (searchTerm) {
    params.append('q', searchTerm);
  }

  if (pageSize) {
    params.append('limit', pageSize);
  }
  if (currentPage) {
    params.append('page', currentPage);
  }
  
  if (params.toString()) {
    url += `?${params.toString()}`;
  }
  const response = await apiClient.get(url);
  return response;
};

export const fetchAllProducts = async (status = null, searchTerm = '', pageSize = 12, currentPage = 1) => {
    let url = '/v1/products';
    const params = new URLSearchParams();

    if (status) {
        url = `/v1/products/${status}`;
    }
    if (searchTerm) params.append('q', searchTerm);

    if (pageSize) {
      params.append('limit', pageSize);
    }
    if (currentPage) {
      params.append('page', currentPage);
    }
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

  
    const response = await apiClient.get(url);
    return response;
};

export const createProduct = async (productData) => {
  const response = await apiClient.post('/v1/products', productData);
  return response;
};

export const updateProduct = async (productId, productData) => {
  const response = await apiClient.put(`/v1/products/${productId}`, productData);
  return response;
};

export const approveProduct = async (productId) => {
  const response = await apiClient.patch(`/v1/products/${productId}/${PRODUCT_STATUS.ACCEPTED}`);
  return response;
};

export const rejectProduct = async (productId, reason = '') => {
  const response = await apiClient.patch(`/v1/products/${productId}/${PRODUCT_STATUS.REJECTED}`, { reason });
  return response;
};

export const deleteProduct = async (productId) => {
  const response = await apiClient.delete(`/v1/products/${productId}`);
  return response;
};

// Category APIs
export const fetchCategories = async () => {
  const response = await apiClient.get('/v1/categories');
  return response;
};

// Statistics APIs
export const fetchProductStats = async () => {
  let url = '/v1/products/stats';
  const response = await apiClient.get(url);
  return response;
};

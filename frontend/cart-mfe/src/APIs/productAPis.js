const API_BASE_URL = 'http://localhost:3000/api/v1/products';

// Get authentication token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get authenticated headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Fetch multiple products by IDs
export const fetchProductsByIds = async (productIds) => {
  try {
    const productPromises = productIds.map(id => fetchProductById(id));
    const products = await Promise.all(productPromises);
    return products;
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    throw error;
  }
};
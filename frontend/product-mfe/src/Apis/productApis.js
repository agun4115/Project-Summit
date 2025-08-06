const API_BASE_URL = 'http://localhost:3000/api/v1/products';

// Get products with filters and pagination
export const fetchProducts = async (queryString = '') => {
  try {
    const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const result = await response.json();
    return result
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message || "Failed to fetch products");
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const result = await response.json();
    return result.data
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error.message || "Failed to fetch product");
  }
};

// Search products with filters
export const searchProducts = async (searchTerm, filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) queryParams.append('search', searchTerm);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.unitType) queryParams.append('unitType', filters.unitType);
    
    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error searching products:", error);
    throw new Error(error.message || "Failed to search products");
  }
};

// Create a new product
export const createProduct = async (productData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
};

// Delete a product
export const deleteProduct = async (productId) => {
    const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
};
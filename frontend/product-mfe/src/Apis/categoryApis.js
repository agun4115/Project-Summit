const API_BASE_URL = 'http://localhost:3000/api/v1/categories';

// Get all categories
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const results = await response.json();
    return results.data; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(error.message || "Failed to fetch categories");
  }
}

// Get categories formatted for dropdown filters
export async function fetchCategoriesForFilter() {
  try {
    const categories = await fetchCategories();
    // Transform categories to the format expected by Select component
    return categories.map(category => ({
      value: category.id ,
      label: category.name,
    }));
  } catch (error) {
    console.error("Error fetching categories for filter:", error);
    throw new Error(error.message || "Failed to fetch categories");
  }
}

// // Get category by ID
// export const fetchCategoryById = async (id) => {
//     const response = await axios.get(`${API_BASE_URL}/${id}`);
//     return response.data;
// };

// // Create a new category
// export const createCategory = async (categoryData) => {
//     const response = await axios.post(API_BASE_URL, categoryData);
//     return response.data;
// };

// // Update a category
// export const updateCategory = async (id, categoryData) => {
//     const response = await axios.put(`${API_BASE_URL}/${id}`, categoryData);
//     return response.data;
// };

// // Delete a category
// export const deleteCategory = async (id) => {
//     const response = await axios.delete(`${API_BASE_URL}/${id}`);
//     return response.data;
// };
const { getAllCategories } = require('../services/categoryService');
const { createInternalServerError } = require('../utils/errorUtils');

/**
 * Retrieve all categories from the category microservice
 */
const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    
    res.status(200).json({
      success: true,
      data: categories.data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching categories:', error.message);  
    throw createInternalServerError('Failed to fetch categories');
  }
};

module.exports = {
  getCategories
};

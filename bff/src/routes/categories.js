const express = require('express');
const { getAllCategories } = require('../services/categoryService');
const { asyncHandler } = require('../utils/asyncHandler');
const { createInternalServerError } = require('../utils/errorUtils');

const router = express.Router();

/**
 * GET /api/v1/categories
 * Retrieve all categories from the category microservice
 */
router.get('/', asyncHandler(async (req, res) => {
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
}));

module.exports = router;
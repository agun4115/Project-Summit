const express = require('express');
const { 
  getUserById,
  updateUser,
} = require('../services/userService');
const { asyncHandler } = require('../utils/asyncHandler');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const { validateEmail } = require('../utils/validationUtils');
const { authenticateToken } = require('../middleware/authMiddleware');
const { 
  authenticatedUser, 
  adminOnly,
  dataStewardOnly
} = require('../middleware/authMiddleware');
const { 
  HttpStatus, 
  ResponseMessage,
  UserRole 
} = require('../enums');

const router = express.Router();

/**
 * GET /api/v1/users/:id
 * Get user by ID
 * Available to: All authenticated users (with ownership check)
 */
router.get('/:id', authenticateToken, authenticatedUser, asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw createValidationError('User ID is required');
    }
    
    const userResult = await getUserById(id);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: userResult.data,
      message: ResponseMessage.DATA_RETRIEVED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    
    if (error.message === 'User not found') {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist',
        timestamp: new Date().toISOString()
      });
    }
    
    throw createInternalServerError('Failed to fetch user');
  }
}));


module.exports = router;

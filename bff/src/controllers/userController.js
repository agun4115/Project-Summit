const { 
  getUserById,
  updateUser,
} = require('../services/userService');
const { sanitizeUser } = require('../mocks/authUtils');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const { validateEmail } = require('../utils/validationUtils');
const { 
  HttpStatus, 
  ResponseMessage,
  UserRole 
} = require('../enums');

/**
 * Get user by ID
 * Available to: All authenticated users (with ownership check)
 */
const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      throw createValidationError('User ID is required');
    }
    
    const userResponse = await getUserById(id);
    const user = userResponse.user;

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist',
        timestamp: new Date().toISOString()
      });
    }

    // Return user data (excluding password)
    const userWithoutPassword = sanitizeUser(user);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        user: userWithoutPassword
      },
      message: ResponseMessage.DATA_RETRIEVED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching user:', error.message);
    
    if (error.message === 'User not found' || error.response?.status === 404) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist',
        timestamp: new Date().toISOString()
      });
    }
    
    throw createInternalServerError('Failed to fetch user');
  }
};

/**
 * Update user
 * Available to: All authenticated users (with ownership check)
 */
const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    if (!id) {
      throw createValidationError('User ID is required');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw createValidationError('Update data is required');
    }

    // Validate email if provided
    if (updateData.email && !validateEmail(updateData.email)) {
      throw createValidationError('Invalid email format');
    }
    
    const userResponse = await updateUser(id, updateData);
    const updatedUser = userResponse.user;

    if (!updatedUser) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist',
        timestamp: new Date().toISOString()
      });
    }

    // Return updated user data (excluding password)
    const userWithoutPassword = sanitizeUser(updatedUser);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: {
        user: userWithoutPassword
      },
      message: ResponseMessage.DATA_UPDATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user:', error.message);
    
    if (error.message === 'User not found' || error.response?.status === 404) {
      return res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        error: 'User not found',
        message: 'The requested user does not exist',
        timestamp: new Date().toISOString()
      });
    }
    
    throw createInternalServerError('Failed to update user');
  }
};

module.exports = {
  getUserByIdController,
  updateUserController
};

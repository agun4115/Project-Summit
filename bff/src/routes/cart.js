const express = require('express');
const { 
  getAllCartItems,
  addCartItem,
  updateCart,
  deleteCartItem
} = require('../services/cartService');
const { asyncHandler } = require('../utils/asyncHandler');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const { 
  HttpStatus, 
  ResponseMessage 
} = require('../enums');

const router = express.Router();

/**
 * GET /api/v1/cart/:userId
 * Get all cart items for a user
 * Available to: All authenticated users (with ownership check)
 */
router.get('/:userId', asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    
    const cartItems = await getAllCartItems(userId);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: cartItems.data,
      message: ResponseMessage.DATA_RETRIEVED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    throw createInternalServerError('Failed to fetch cart items');
  }
}));

/**
 * POST /api/v1/cart/:userId
 * Add item to cart
 */
router.post('/:userId', asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItemData = req.body;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    
    // Validate count is a positive number
    if (cartItemData.count <= 0 || !Number.isInteger(Number(cartItemData.count))) {
      throw createValidationError('Count must be a positive integer');
    }
    
    const newCartItem = await addCartItem(userId, cartItemData);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: newCartItem.data,
      message: ResponseMessage.DATA_CREATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error adding cart item:', error.message);
    throw createInternalServerError('Failed to add cart item');
  }
}));

/**
 * PUT /api/v1/cart/:userId
 * Update entire cart for a user
 * Available to: All authenticated users (with ownership check)
 */
router.put('/:userId', asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = req.body;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    
    if (!cartData || !Array.isArray(cartData.items)) {
      throw createValidationError('Cart data must contain an items array', {
        expectedFormat: { items: [{ productId: 'string', count: 'number' }] }
      });
    }
    
    const updatedCart = await updateCart(userId, cartData);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: updatedCart.data,
      message: ResponseMessage.DATA_UPDATED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating cart:', error.message);
    throw createInternalServerError('Failed to update cart');
  }
}));

/**
 * DELETE /api/v1/cart/:userId/items/:productId
 * Delete a specific cart item
 * Available to: All authenticated users (with ownership check)
 */
router.delete('/:userId/items/:productId', asyncHandler(async (req, res) => {
  try {
    const { userId, productId } = req.params;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    
    if (!productId) {
      throw createValidationError('Product ID is required');
    }
    
    const result = await deleteCartItem(userId, productId);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: result.data,
      message: ResponseMessage.DATA_DELETED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting cart item:', error.message);
    throw createInternalServerError('Failed to delete cart item');
  }
}));

module.exports = router;

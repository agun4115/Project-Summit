const { getProductById } = require('../services/productService');
const { filterProductForCart } = require('../utils/dataUtils');

const { 
  getAllCartItems,
  addCartItem,
  updateCart,
  deleteCartItem,
  clearCart: clearCartApi
} = require('../services/cartService');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const { 
  HttpStatus, 
  ResponseMessage 
} = require('../enums');

/**
 * Get all cart items for a user
 */
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    
    const cartItems = await getAllCartItems(userId);
    // For each cart item, fetch product details and merge them
    const itemsWithProductDetails = await Promise.all(
      (cartItems.data || []).map(async (item) => {
      const product = await getProductById(item.productId);      
      const filteredProduct = filterProductForCart(product.data);
      
      return {
        ...item,
        ...filteredProduct
      };
    })
  );
  cartItems.data = itemsWithProductDetails;
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
};

/**
 * Add item to cart
 */
const addItemToCart = async (req, res) => {
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
};

/**
 * Update entire cart for a user
 */
const updateUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cartData = req.body;
    
    if (!userId) {
      throw createValidationError('User ID is required');
    }
    if (!cartData) {
      throw createValidationError('Cart data must contain an items array', {
        expectedFormat: { items: { productId: 'string', count: 'number' } }
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
};

/**
 * Delete a specific cart item
 */
const removeCartItem = async (req, res) => {
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
};

/**
 * Clear all items in the cart
 */

const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw createValidationError('User ID is required');
    }

    await clearCartApi(userId);

    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessage.DATA_CLEARED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    throw createInternalServerError('Failed to clear cart');
  }
};

module.exports = {
  getCartItems,
  addItemToCart,
  updateUserCart,
  removeCartItem
};

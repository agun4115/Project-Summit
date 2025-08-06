const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const {
  getCartItems,
  addItemToCart,
  updateUserCart,
  removeCartItem
} = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', authenticateToken, asyncHandler(getCartItems));
router.post('/:userId', authenticateToken, asyncHandler(addItemToCart));
router.put('/:userId', authenticateToken, asyncHandler(updateUserCart));
router.delete('/:userId/', authenticateToken, asyncHandler(removeCartItem));
router.delete('/:userId/:productId', authenticateToken, asyncHandler(removeCartItem));

module.exports = router;

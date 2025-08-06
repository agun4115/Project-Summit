const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const {
  getCustomerProducts,
  createProductController,
  updateProductController,
  updateProductStatusController,
  deleteProductController,
  getAllProductsController,
  getSellerProducts,
  getProductStats
} = require('../controllers/productController');
const { authenticateToken, adminOnly, dataStewardOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', asyncHandler(getCustomerProducts));
router.get('/seller', authenticateToken, adminOnly, asyncHandler(getSellerProducts));
router.get('/stats', authenticateToken, adminOnly, asyncHandler(getProductStats));
router.get('/:status', authenticateToken, dataStewardOnly, asyncHandler(getAllProductsController));
router.post('/', authenticateToken, adminOnly, asyncHandler(createProductController));
router.put('/:id', asyncHandler(updateProductController));
router.patch('/:id/:status', asyncHandler(updateProductStatusController));
router.delete('/:id', asyncHandler(deleteProductController));

module.exports = router;

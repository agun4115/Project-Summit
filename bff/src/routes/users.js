const express = require('express');
const { asyncHandler } = require('../utils/asyncHandler');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authenticatedUser} = require('../middleware/authMiddleware');
const { getUserByIdController } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', authenticateToken, authenticatedUser, asyncHandler(getUserByIdController));

module.exports = router;

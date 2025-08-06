const { asyncHandler } = require('../utils/asyncHandler');
const express = require('express');

const {
  loginUser,
  signupUser,
  // verifyUserToken,
  // refreshUserToken,
  logoutUser
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', asyncHandler(loginUser));
router.post('/signup', asyncHandler(signupUser));
// router.post('/verify', asyncHandler(verifyUserToken));
// router.post('/refresh', asyncHandler(refreshUserToken));
router.post('/logout', authenticateToken, asyncHandler(logoutUser));

module.exports = router;

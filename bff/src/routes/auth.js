const express = require('express');
const { 
  login,
  signup,
  verifyToken,
  refreshToken,
  logout
} = require('../services/authService');
const { asyncHandler } = require('../utils/asyncHandler');
const { 
  createValidationError, 
  createInternalServerError 
} = require('../utils/errorUtils');
const {
  validateLoginCredentials,
  validateSignupData,
  validateToken,
  validateRefreshToken
} = require('../utils/validationUtils');
const { 
  HttpStatus, 
  ResponseMessage,
  UserRole 
} = require('../enums');

const router = express.Router();

/**
 * POST /api/v1/auth/login
 * User login with email/username and password
 */
router.post('/login', asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const validatedCredentials = validateLoginCredentials(email, password);
    
    const authResult = await login(validatedCredentials);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: authResult.user,
      tokens: authResult.tokens,
      message: ResponseMessage.LOGIN_SUCCESS,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    
    // Handle specific auth errors
    if (error.message.includes('Invalid credentials') || error.message.includes('User not found')) {
      throw createValidationError('Invalid email or password');
    }
    
    throw createInternalServerError('Login failed');
  }
}));

/**
 * POST /api/v1/auth/signup
 * User registration/signup for Customers and Suppliers
 */
router.post('/signup', asyncHandler(async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, role } = req.body;
    
    // Validate signup data using utility
    const validatedData = validateSignupData({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      role
    });
    
    // Check if role is allowed for public signup
    if (validatedData.role === UserRole.DATA_STEWARD) {
      throw createValidationError('Data Steward accounts can only be created by administrators', {
        allowedRoles: [UserRole.CUSTOMER, UserRole.SUPPLIER]
      });
    }
    
    const authResult = await signup(validatedData);
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      data: authResult.user,
      tokens: authResult.tokens,
      message: `${validatedData.role} ${ResponseMessage.SIGNUP_SUCCESS}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    
    // Handle specific auth errors
    if (error.message.includes('User already exists') || error.message.includes('UsernameExistsException')) {
      throw createValidationError('User with this email already exists');
    }
    
    if (error.message.includes('InvalidPasswordException')) {
      throw createValidationError('Password does not meet requirements');
    }
    
    throw createInternalServerError('Signup failed');
  }
}));

/**
 * POST /api/v1/auth/verify
 * Verify JWT token
 */
router.post('/verify', asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    
    // Validate token using utility
    const validatedToken = validateToken(token);
    
    const verificationResult = await verifyToken(validatedToken);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: verificationResult.data,
      message: ResponseMessage.TOKEN_VALID,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error verifying token:', error.message);
    
    if (error.message.includes('Invalid token') || error.message.includes('Token expired')) {
      throw createValidationError('Invalid or expired token');
    }
    
    throw createInternalServerError('Token verification failed');
  }
}));

/**
 * POST /api/v1/auth/refresh
 * Refresh access token using refresh token
 */
router.post('/refresh', asyncHandler(async (req, res) => {
  try {
    const { refreshToken: token } = req.body;
    
    // Validate refresh token using utility
    const validatedToken = validateRefreshToken(token);
    
    const refreshResult = await refreshToken(validatedToken);
    
    res.status(HttpStatus.OK).json({
      success: true,
      data: refreshResult.data,
      message: ResponseMessage.TOKEN_REFRESHED,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    
    if (error.message.includes('Invalid refresh token') || error.message.includes('Token expired')) {
      throw createValidationError('Invalid or expired refresh token');
    }
    
    throw createInternalServerError('Token refresh failed');
  }
}));

/**
 * POST /api/v1/auth/logout
 * User logout
 */
router.post('/logout', asyncHandler(async (req, res) => {
  try {
    const { token } = req.body;
    
    // Validate token using utility
    const validatedToken = validateToken(token);
    
    await logout(validatedToken);
    
    res.status(HttpStatus.OK).json({
      success: true,
      message: ResponseMessage.LOGOUT_SUCCESS,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error during logout:', error.message);
    throw createInternalServerError('Logout failed');
  }
}));

module.exports = router;

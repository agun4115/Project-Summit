const { 
  login,
  signup,
  verifyToken,
  refreshToken,
  logout
} = require('../services/authService');
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

/**
 * User login with email/username and password
 */
const loginUser = async (req, res) => {
  try {
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
};

/**
 * User registration/signup for Customers and Suppliers
 */
const signupUser = async (req, res) => {
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
};

/**
 * Verify JWT token
 */
const verifyUserToken = async (req, res) => {
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
};

/**
 * Refresh access token using refresh token
 */
const refreshUserToken = async (req, res) => {
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
};

/**
 * User logout
 */
const logoutUser = async (req, res) => {
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
};

module.exports = {
  loginUser,
  signupUser,
  verifyUserToken,
  refreshUserToken,
  logoutUser
};

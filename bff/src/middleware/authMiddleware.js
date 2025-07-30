const { verifyToken } = require('../services/authService');
const { HttpStatus } = require('../enums');

const ADMIN_ROLES = [UserRole.DATA_STEWARD, UserRole.SUPPLIER];
const ALL_ROLES = [UserRole.CUSTOMER, UserRole.DATA_STEWARD, UserRole.SUPPLIER];

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: 'Access token required',
        message: 'Please provide a valid authentication token',
        timestamp: new Date().toISOString()
      });
    }
    
    // Verify token with auth microservice
    const verificationResult = await verifyToken(token);
    
    if (!verificationResult.data || !verificationResult.data.user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: 'Invalid token',
        message: 'Token verification failed',
        timestamp: new Date().toISOString()
      });
    }
    
    // Add user information to request object
    req.user = verificationResult.data.user;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error.message);
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      error: 'Authentication failed',
      message: 'Unable to authenticate request',
      timestamp: new Date().toISOString()
    });
  }
};


/**
 * Check if user has any of the required roles
 */
const hasRole = (userRole, requiredRoles) => {
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }
  return requiredRoles.includes(userRole);
};

/**
 * Middleware for role-based access control
 */
const requireRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!hasRole(req.user.role, allowedRoles)) {
      return res.status(HttpStatus.FORBIDDEN).json({
        success: false,
        error: 'Insufficient permissions',
        message: `Access restricted to: ${allowedRoles.join(', ')}`,
        allowedRoles,
        userRole: req.user.role,
        timestamp: new Date().toISOString()
      });
    }

    next();
  };
};

const authenticatedUser = requireRoles(ALL_ROLES); // All authenticated users
const adminOnly = requireRoles(ADMIN_ROLES); // Data Steward or Supplier only
const dataStewardOnly = requireRoles([UserRole.DATA_STEWARD]); // Data Steward only

module.exports = {
  authenticateToken,
  authenticatedUser,
  adminOnly,
  dataStewardOnly
};

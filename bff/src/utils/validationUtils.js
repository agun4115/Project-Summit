const { createValidationError } = require('./errorUtils');
const { UserRole, EnumHelpers } = require('../enums');

/**
 * Email validation utility
 */
const validateEmail = (email) => {
  if (!email) {
    throw createValidationError('Email is required');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw createValidationError('Invalid email format');
  }
  
  return email.toLowerCase().trim();
};

/**
 * Password validation utility
 */
const validatePassword = (password, minLength = 8) => {
  if (!password) {
    throw createValidationError('Password is required');
  }
  
  if (password.length < minLength) {
    throw createValidationError(`Password must be at least ${minLength} characters long`);
  }
  
  // Check for password complexity (at least one uppercase, one lowercase, one number)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!passwordRegex.test(password)) {
    throw createValidationError('Password must contain at least one uppercase letter, one lowercase letter, and one number');
  }
  
  return password;
};

/**
 * Login password validation (less strict)
 */
const validateLoginPassword = (password) => {
  if (!password) {
    throw createValidationError('Password is required');
  }
  
  if (password.length < 6) {
    throw createValidationError('Password must be at least 6 characters long');
  }
  
  return password;
};

/**
 * Name validation utility
 */
const validateName = (name, fieldName) => {
  if (!name) {
    throw createValidationError(`${fieldName} is required`);
  }
  
  const trimmedName = name.trim();
  if (trimmedName.length < 2) {
    throw createValidationError(`${fieldName} must be at least 2 characters long`);
  }
  
  // Check for valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(trimmedName)) {
    throw createValidationError(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
  }
  
  return trimmedName;
};

/**
 * Phone number validation utility (optional field)
 */
const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return null; // Optional field
  }
  
  const trimmedPhone = phoneNumber.trim();
  if (!/^\+?[\d\s\-\(\)]+$/.test(trimmedPhone)) {
    throw createValidationError('Invalid phone number format');
  }
  
  return trimmedPhone;
};

/**
 * User role validation utility
 */
const validateUserRole = (role) => {
  if (!role) {
    return UserRole.CUSTOMER; // Default to Customer if not provided
  }
  
  if (!EnumHelpers.isValidUserRole(role)) {
    throw createValidationError('Invalid user role', {
      validRoles: EnumHelpers.getUserRoleValues(),
      received: role
    });
  }
  
  return role;
};

/**
 * Token validation utility
 */
const validateToken = (token, fieldName = 'Token') => {
  if (!token) {
    throw createValidationError(`${fieldName} is required`);
  }
  
  if (typeof token !== 'string' || token.trim().length === 0) {
    throw createValidationError(`${fieldName} must be a valid string`);
  }
  
  return token.trim();
};

/**
 * Login credentials validation
 */
const validateLoginCredentials = (email, password) => {
  const validatedEmail = validateEmail(email);
  const validatedPassword = validateLoginPassword(password);
  
  return {
    email: validatedEmail,
    password: validatedPassword
  };
};

/**
 * Signup data validation
 */
const validateSignupData = (userData) => {
  const { email, password, firstName, lastName, phoneNumber, role } = userData;
  
  // Validate required fields
  const validatedEmail = validateEmail(email);
  const validatedPassword = validatePassword(password, 8);
  const validatedFirstName = validateName(firstName, 'First name');
  const validatedLastName = validateName(lastName, 'Last name');
  const validatedPhoneNumber = validatePhoneNumber(phoneNumber);
  const validatedRole = validateUserRole(role);
  
  // Check required fields based on role
  if (validatedRole === UserRole.SUPPLIER) {
    // Suppliers might need additional validation in the future
    if (!phoneNumber) {
      throw createValidationError('Phone number is required for suppliers');
    }
  }
  
  return {
    email: validatedEmail,
    password: validatedPassword,
    firstName: validatedFirstName,
    lastName: validatedLastName,
    phoneNumber: validatedPhoneNumber,
    role: validatedRole
  };
};

/**
 * Refresh token validation
 */
const validateRefreshToken = (refreshToken) => {
  return validateToken(refreshToken, 'Refresh token');
};

module.exports = {
  validateEmail,
  validatePassword,
  validateLoginPassword,
  validateName,
  validatePhoneNumber,
  validateUserRole,
  validateToken,
  validateLoginCredentials,
  validateSignupData,
  validateRefreshToken
};

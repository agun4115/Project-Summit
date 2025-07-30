const { createHttpClient } = require('../utils/httpClient');
const { 
  findUserByEmail, 
  findUserById, 
  addUser 
} = require('../mocks/userData');
const {
  generateMockToken,
  isTokenExpired,
  sanitizeUser
} = require('../mocks/authUtils');
const { createUserProfile } = require('./userService');

// const AWS = require('aws-sdk');

// Configure AWS Cognito
// const cognito = new AWS.CognitoIdentityServiceProvider({
//   region: process.env.AWS_REGION || 'us-east-1'
// });

// Create HTTP client instance for user microservice (additional user services)
const baseUrl = process.env.USER_MS_BASE_URL || 'http://localhost:8001';
const httpClient = createHttpClient(baseUrl);

const login = async (credentials) => {
  // Mock login implementation
  const { email, password } = credentials;
  
  // Find user 
  const user = findUserByEmail(email);
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  // Generate mock tokens
  const accessToken = generateMockToken(user);
  
  // Return user data and tokens (excluding password)
  
  const sanitizedUser = sanitizeUser(user);
  
  return {
      user: sanitizedUser,
      tokens: {
        accessToken,
        expiresIn: 86400, // 24 hours in seconds
        tokenType: 'Bearer'
    }
  };
};

const signup = async (userData) => {
  // Mock signup implementation
  const { email } = userData;
  
  // Check if user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new mock user
  const newUser = addUser(userData);
  
  // Create user profile in user microservice
  try {
    const user = await createUserProfile(newUser);
  } catch (error) {
    console.warn('Failed to create user profile in microservice:', error.message);
    // Continue with signup even if profile creation fails
  }
  
  // Return user data (excluding password)
  const userWithoutPassword = sanitizeUser(user);
const accessToken = generateMockToken(user);    
  
  return {
    data: {
      user: userWithoutPassword,
      tokens: {
        accessToken,
        expiresIn: 86400, // 24 hours in seconds
        tokenType: 'Bearer'
      },
      message: 'User created successfully. Please check your email for verification instructions.'
    }
  };
};

// const verifyToken = async (token) => {
//   try {
//     // Parse mock JWT token
//     const payload = parseMockToken(token);
    
//     // Find user in mock database
//     const user = findUserById(payload.sub);
//     if (!user) {
//       throw new Error('User not found');
//     }
    
//     // Return user data (excluding password)
//     const userWithoutPassword = sanitizeUser(user);
    
//     return {
//       data: {
//         user: {
//           ...userWithoutPassword,
//           roles: [user.role] // For compatibility with role middleware
//         }
//       }
//     };
//   } catch (error) {
//     console.error('Mock token verification error:', error);
//     throw new Error('Invalid or expired token');
//   }
// };


const logout = async (token) => {
  // Mock logout implementation
  return {
    data: {
      message: 'Logged out successfully'
    }
  };
};

module.exports = {
  login,
  signup,
//   verifyToken,
  logout
};

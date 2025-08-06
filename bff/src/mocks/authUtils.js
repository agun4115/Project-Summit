
const {findUserById} = require('./userData');
// Mock utilities for authentication
const tokenMap = {
  '550e8400-e29b-41d4-a716-446655440001': 'mock_access_token_customer_1',
  '550e8400-e29b-41d4-a716-446655440002': 'mock_access_token_supplier_2', 
  '550e8400-e29b-41d4-a716-446655440003': 'mock_access_token_datasteward_3',
  '550e8400-e29b-41d4-a716-446655440005': 'mock_access_token_supplier_1',
  "550e8400-e29b-41d4-a716-446655440008" : 'mock_access_token_datasteward_1'
};

const generateMockToken = (user) => {
    return tokenMap[user.id];
};

const mockVerifyToken = (token) => {
  // Mock verification logic
  const userId = Object.keys(tokenMap).find(id => tokenMap[id] === token);
  
  if (!userId) {
    throw new Error('Invalid token');
  }
  
  // Find user in mock database
  const user = findUserById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return {
    user: user.id,
    role: user.role,
  };
};

// Remove password from user object
const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  generateMockToken,
  sanitizeUser,
  mockVerifyToken,
};

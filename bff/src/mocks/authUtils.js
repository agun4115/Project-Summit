// Mock utilities for authentication

// Generate mock access token (hardcoded)
const generateMockToken = (user) => {
  // Simple hardcoded tokens based on user role and ID
  const tokenMap = {
    '1': 'mock_access_token_customer_1',
    '2': 'mock_access_token_supplier_2', 
    '3': 'mock_access_token_datasteward_3'
  };
  
  return tokenMap[user.id] || `mock_access_token_user_${user.id}`;
};

// Generate mock refresh token (hardcoded)
const generateMockRefreshToken = (userId) => {
  const refreshTokenMap = {
    '1': 'mock_refresh_token_customer_1',
    '2': 'mock_refresh_token_supplier_2',
    '3': 'mock_refresh_token_datasteward_3'
  };
  
  return refreshTokenMap[userId] || `mock_refresh_token_user_${userId}`;
};

// Parse mock token (simplified)
const parseMockToken = (token) => {
  if (!token || !token.startsWith('mock_access_token_')) {
    throw new Error('Invalid token format');
  }
  
  // Extract user info from hardcoded token
  const tokenMap = {
    'mock_access_token_customer_1': { sub: '1', role: 'Customer', email: 'customer@example.com' },
    'mock_access_token_supplier_2': { sub: '2', role: 'Supplier', email: 'supplier@example.com' },
    'mock_access_token_datasteward_3': { sub: '3', role: 'Data Steward', email: 'datasteward@example.com' }
  };
  
  const payload = tokenMap[token];
  if (!payload) {
    throw new Error('Invalid token');
  }
  
  return payload;
};


// Parse refresh token to extract user ID (simplified)
const parseRefreshToken = (refreshToken) => {
  if (!refreshToken || !refreshToken.startsWith('mock_refresh_token_')) {
    throw new Error('Invalid refresh token');
  }
  
  // Extract user ID from hardcoded refresh token
  const refreshTokenMap = {
    'mock_refresh_token_customer_1': '1',
    'mock_refresh_token_supplier_2': '2',
    'mock_refresh_token_datasteward_3': '3'
  };
  
  const userId = refreshTokenMap[refreshToken];
  if (!userId) {
    throw new Error('Invalid refresh token');
  }
  
  return userId;
};

// Remove password from user object
const sanitizeUser = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = {
  generateMockToken,
  generateMockRefreshToken,
  parseMockToken,
  parseRefreshToken,
  sanitizeUser
};

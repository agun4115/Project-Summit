const { createHttpClient } = require('../utils/httpClient');
const { sanitizeUser } = require('../mocks/authUtils');

// HTTP client instance for user microservice
const baseUrl = process.env.USER_MS_BASE_URL || 'http://localhost:8001';
const httpClient = createHttpClient(baseUrl);

const getUserById = async (userId) => {
    try {
        const response = await httpClient.get(`/api/v1/users/${userId}`);
        const user = response.data.user;

        if (!user) {
            throw new Error('User not found');
        }

        // Return user data (excluding password)
        const userWithoutPassword = sanitizeUser(user);

        return {
            data: {
                user: userWithoutPassword
            }
        };
    } catch (error) {
        throw new Error('User not found');
    }
};

const updateUser = async (userId, updateData) => {
  // Mock implementation - update user data
try {
    const response = await httpClient.put(`/api/v1/users/${userId}`, updateData);
    const updatedUser = response.data.user;

    if (!updatedUser) {
        throw new Error('User not found');
    }

    // Return updated user data (excluding password)
    const userWithoutPassword = sanitizeUser(updatedUser);

    return {
        data: {
            user: userWithoutPassword
        }
    };
} catch (error) {
    throw new Error('Failed to update user');
}
};

const createUserProfile = async (userData) => {
  // This would be called from auth service during signup
  // to create additional user profile data in the user microservice
  try {
    const user = await httpClient.post('/api/v1/users', {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      role: userData.role
    });
    
    
    return user.data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Failed to create user profile');
  }
};


module.exports = {
  getUserById,
  updateUser,
  createUserProfile,
};

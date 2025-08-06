const { createHttpClient } = require('../utils/httpClient');

// HTTP client instance for user microservice
const baseUrl = process.env.USER_MS_BASE_URL || 'http://localhost:8001';
const httpClient = createHttpClient(baseUrl);

const getUserById = async (userId) => {
    const response = await httpClient.get(`/api/v1/users/${userId}`);
    return response.data;
};

const updateUser = async (userId, updateData) => {
    const response = await httpClient.put(`/api/v1/users/${userId}`, updateData);
    return response.data;
};

const createUserProfile = async (userData) => {
    const response = await httpClient.post('/api/v1/users', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        role: userData.role
    });
    return response.data;
};


module.exports = {
  getUserById,
  updateUser,
  createUserProfile,
};

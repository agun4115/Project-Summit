const API_BASE_URL = 'http://localhost:3000/api/v1/auth';

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error(error.message || 'Failed to login');
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error(error.message || 'Failed to register');
  }
};

// Logout user
// export const logoutUser = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/logout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Logout failed');
//     }

//     return { success: true };
//   } catch (error) {
//     console.error('Error logging out:', error);
//     throw new Error(error.message || 'Failed to logout');
//   }
// };

// // Verify token
// export const verifyToken = async (token) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/verify`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Token verification failed');
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     throw new Error(error.message || 'Failed to verify token');
//   }
// };

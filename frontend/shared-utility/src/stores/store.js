import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cartReducer from '../slices/cartSlice';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedUser = localStorage.getItem('user');
    const serializedToken = localStorage.getItem('token');
    
    if (serializedUser && serializedToken) {
      return {
        auth: {
          user: JSON.parse(serializedUser),
          token: serializedToken,
          isAuthenticated: true
        }
      };
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }
  return undefined; // Let Redux use initial state
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

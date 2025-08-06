import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction, setUser } from '../slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = (onLogoutComplete) => {
    localStorage.clear();
    dispatch(logoutAction());
    
    // Optional callback for navigation or other post-logout actions
    if (onLogoutComplete && typeof onLogoutComplete === 'function') {
      onLogoutComplete();
    }
  };

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    dispatch(setUser({
      user: userData,
      token: token,
    }));
  };

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};

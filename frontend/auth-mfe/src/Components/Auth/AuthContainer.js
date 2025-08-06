import React, { useState, useEffect } from 'react';
import { useAuth, setUser, logout } from '@sysco/shared-utility';
import { useLocation } from 'react-router-dom';
import LoginPage from 'Components/Auth/LoginPage';
import SignupPage from 'Components/Auth/SignupPage';
import ProfilePage from 'Components/Profile/ProfilePage';
import { UserRole } from '../../Constants/enums';

const AuthContainer = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState('login');

  const {user, login} = useAuth();
  // if (user) {
  //   // User is already authenticated
  //   window.location.href = '/auth/profile';
  // }

  useEffect(() => {
    // Determine view based on URL path
    const path = location.pathname;
    if (path.includes('/profile')) {
      setCurrentView('profile');
    } else if (path.includes('/signup')) {
      if (user) {
        window.location.href = '/auth/profile';
      }
      setCurrentView('signup');
    } else {
      if (user) {
        window.location.href = '/auth/profile';
      }
      setCurrentView('login');
    }
  }, [location.pathname]);

  const handleLoginSuccess = (result) => {
    const token = result.tokens.accessToken;
    login(result.data, token);
    if (result.data.role === UserRole.CUSTOMER) {
      window.location.href = '/';
    }
    else if (result.data.role === UserRole.DATA_STEWARD || result.data.role === UserRole.SUPPLIER) {
      window.location.href = '/admin';
    }

    // window.history.pushState({}, '', '/');
  };

  const handleLogout = async () => {
    logout();
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // You can implement edit profile functionality here
  };

  const navigateToSignup = () => {
    setCurrentView('signup');
    window.history.pushState({}, '', '/auth/signup');
  };

  const navigateToLogin = () => {
    setCurrentView('login');
    window.history.pushState({}, '', '/auth');
  };

  // Show profile page if user is authenticated and on profile route
  if (currentView === 'profile') {
    const currentUser = user;
    return (
      <ProfilePage
        user={currentUser}
        onLogout={handleLogout}
        onEdit={handleEditProfile}
      />
    );
  }

  return (
    <div>
      {currentView === 'login' ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={navigateToSignup}
        />
      ) : (
        <SignupPage
          onSignupSuccess={handleLoginSuccess}
          onNavigateToLogin={navigateToLogin}
        />
      )}
    </div>
  );
};

export default AuthContainer;

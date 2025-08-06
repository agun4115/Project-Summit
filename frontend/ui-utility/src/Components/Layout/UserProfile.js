import React from 'react';

const UserProfile = () => {
  const handleClick = () => {
    // Navigate to profile page
    window.location.href = '/auth/profile';
  };

  return (
    <div
      style={{ 
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <img
        src="https://ui-avatars.com/api/?name=User"
        alt="User avatar"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#fff',
          border: '2px solid #1890ff',
        }}
      />
    </div>
  );
};

export default UserProfile;

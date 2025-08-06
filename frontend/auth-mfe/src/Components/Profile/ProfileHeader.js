import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Typography, Button, Space } from '@sysco/ui-utility';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@sysco/ui-utility';
import { profileColors } from './profileTheme';
import { useAuth } from '@sysco/shared-utility';

const { Title, Text } = Typography;

const ProfileHeader = ({ onEdit }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate('/login');
    });
  };

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '16px 0',
      borderBottom: `1px solid ${profileColors.border.light}`
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          size={64} 
          icon={<UserOutlined />} 
          style={{ 
            marginRight: '16px',
            backgroundColor: profileColors.primary
          }} 
        />
        <div>
          <Title level={3} style={{ margin: 0, color: profileColors.text.primary }}>
            {user.firstName} {user.lastName}
          </Title>
          <Text style={{ color: profileColors.text.secondary, fontSize: '14px' }}>
            {user.role}
          </Text>
        </div>
      </div>
      <Space>
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={onEdit}
          style={{ borderColor: profileColors.secondary }}
        >
          Edit Profile
        </Button>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ backgroundColor: profileColors.error }}
        >
          Logout
        </Button>
      </Space>
    </div>
  );
};

export default ProfileHeader;

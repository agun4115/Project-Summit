import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Row, Col, Navbar, Footer } from '@sysco/ui-utility';
import ProfileHeader from './ProfileHeader';
import PersonalInfoSection from './PersonalInfoSection';
import AccountInfoSection from './AccountInfoSection';
import { profileColors } from './profileTheme';
import { useAuth } from '@sysco/shared-utility';

const { Text } = Typography;

const ProfilePage = ({ onEdit }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      logout(() => {
        navigate('/login');
    });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div style={{ 
        padding: '24px', 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: profileColors.background.secondary,
        minHeight: 'calc(100vh - 180px)'
      }}>
        <Row gutter={24}>
          <Col span={24}>
            <Card
              style={{
                backgroundColor: profileColors.background.primary,
                border: `1px solid ${profileColors.border.light}`,
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <ProfileHeader onEdit={onEdit} />
              
              <PersonalInfoSection />
              
              <AccountInfoSection />
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;

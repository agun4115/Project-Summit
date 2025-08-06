import React from 'react';
import { Typography, Row, Col } from '@sysco/ui-utility';
import { profileColors } from './profileTheme';
import { useAuth } from '@sysco/shared-utility';

const { Title, Text } = Typography;

const AccountInfoSection = () => {
  const { user } = useAuth();

  const InfoField = ({ label, value, valueColor }) => (
    <div style={{ marginBottom: '16px' }}>
      <Text strong style={{ 
        display: 'block', 
        marginBottom: '4px',
        color: profileColors.text.primary,
        fontSize: '14px'
      }}>
        {label}
      </Text>
      <Text style={{ 
        color: valueColor || profileColors.text.secondary,
        fontSize: '16px'
      }}>
        {value || 'Not available'}
      </Text>
    </div>
  );

  return (
    <div style={{ padding: '24px 0' }}>
      <Title level={4} style={{ 
        marginBottom: '20px',
        color: profileColors.primary
      }}>
        Account Information
      </Title>
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12}>
          <InfoField label="Role" value={user.role} />
        </Col>
        <Col xs={24} sm={12}>
          <InfoField 
            label="Account Status" 
            value="Active" 
            valueColor={profileColors.success}
          />
        </Col>
        {user.createdAt && (
          <Col xs={24} sm={12}>
            <InfoField 
              label="Member Since" 
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </Col>
        )}
        {user.lastLogin && (
          <Col xs={24} sm={12}>
            <InfoField 
              label="Last Login" 
              value={new Date(user.lastLogin).toLocaleString()}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AccountInfoSection;

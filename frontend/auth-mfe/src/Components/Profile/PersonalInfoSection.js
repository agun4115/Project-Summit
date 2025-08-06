import React from 'react';
import { Typography, Row, Col } from '@sysco/ui-utility';
import { profileColors } from './profileTheme';
import { useAuth } from '@sysco/shared-utility';

const { Title, Text } = Typography;

const PersonalInfoSection = () => {
  const { user } = useAuth();

  const InfoField = ({ label, value }) => (
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
        color: profileColors.text.secondary,
        fontSize: '16px'
      }}>
        {value || 'Not provided'}
      </Text>
    </div>
  );

  return (
    <div style={{ 
      padding: '24px 0',
      borderBottom: `1px solid ${profileColors.border.light}`
    }}>
      <Title level={4} style={{ 
        marginBottom: '20px',
        color: profileColors.primary
      }}>
        Personal Information
      </Title>
      <Row gutter={[24, 16]}>
        <Col xs={24} sm={12}>
          <InfoField label="First Name" value={user.firstName} />
        </Col>
        <Col xs={24} sm={12}>
          <InfoField label="Last Name" value={user.lastName} />
        </Col>
        <Col xs={24} sm={12}>
          <InfoField label="Email" value={user.email} />
        </Col>
        <Col xs={24} sm={12}>
          <InfoField label="Phone Number" value={user.phoneNumber} />
        </Col>
      </Row>
    </div>
  );
};

export default PersonalInfoSection;

import { Layout, Row, Col, Typography, Button } from 'antd';
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  const socialMediaLinks = [
    { icon: <FacebookOutlined />, href: '#' },
    { icon: <TwitterOutlined />, href: '#' },
    { icon: <LinkedinOutlined />, href: '#' },
    { icon: <InstagramOutlined />, href: '#' },
  ];

  return (
    <AntFooter
      style={{
        backgroundColor: '#001529',
        color: '#ffffff',
        padding: '20px 24px 20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[32, 24]}>
          {/* Company Info */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#ffffff', marginBottom: '16px' }}>
              About Sysco
            </Title>
            <Text style={{ color: '#d9d9d9', fontSize: '14px', lineHeight: 1.6 }}>
              Global leader in food distribution, serving restaurants, healthcare, 
              and educational facilities worldwide.
            </Text>
          </Col>

          {/* Quick Links */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#ffffff', marginBottom: '16px' }}>
              Quick Links
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['About Us', 'Products', 'Contact'].map(link => (
                <Link 
                  key={link}
                  href="#" 
                  style={{ color: '#d9d9d9', fontSize: '14px' }}
                >
                  {link}
                </Link>
              ))}
            </div>
          </Col>

          {/* Contact Info */}
          <Col xs={24} md={8}>
            <Title level={4} style={{ color: '#ffffff', marginBottom: '16px' }}>
              Contact Us
            </Title>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneOutlined style={{ color: '#1890ff' }} />
                <Text style={{ color: '#d9d9d9', fontSize: '14px' }}>1-800-SYSCO-1</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MailOutlined style={{ color: '#1890ff' }} />
                <Text style={{ color: '#d9d9d9', fontSize: '14px' }}>support@sysco.com</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvironmentOutlined style={{ color: '#1890ff' }} />
                <Text style={{ color: '#d9d9d9', fontSize: '14px' }}>Houston, TX</Text>
              </div>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: '1px solid #434343',
            marginTop: '32px',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Text style={{ color: '#8c8c8c', fontSize: '14px' }}>
            © 2025 Sysco Corporation. All rights reserved.
          </Text>
          
          {/* Social Media Links */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {socialMediaLinks.map((social, index) => (
              <Button
                key={index}
                shape="circle"
                icon={social.icon}
                href={social.href}
                style={{
                  color: '#d9d9d9',
                  borderColor: 'transparent',
                  backgroundColor: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#1890ff';
                  e.target.style.backgroundColor = 'rgba(24, 144, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d9d9d9';
                  e.target.style.backgroundColor = 'transparent';
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;

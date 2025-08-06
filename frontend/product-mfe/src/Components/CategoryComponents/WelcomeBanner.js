import { Card, Typography, Button } from '@sysco/ui-utility';
import { SmileOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const WelcomeBanner = () => {
    const handleClick = () => {
        window.scrollTo({
            top: window.innerHeight * 0.6,
            behavior: 'smooth'
        });
    };

    return (
        <Card
            style={{
                background: 'linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%)',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                textAlign: 'center',
                padding: '24px 24px',
                margin: '0px 2px'
            }}
            bordered={false}
        >
            <SmileOutlined style={{ fontSize: 48, color: '#722ed1', marginBottom: 8 }} />
            <Title level={2} style={{ color: '#391085', marginBottom: 8 }}>
                Welcome to Sysco Shop!
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#391085', marginBottom: 8 }}>
                We're glad to have you here.
            </Paragraph>
            <Button type="primary" size="large" shape="round" onClick={handleClick}>
                Select a Category to get Started
            </Button>
        </Card>
    );
};

export default WelcomeBanner;
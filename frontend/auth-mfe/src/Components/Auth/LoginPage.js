import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Space } from '@sysco/ui-utility';
import { loginUser } from 'APIs/authApis';

const { Title, Text, Link } = Typography;

const LoginPage = ({ onLoginSuccess, onNavigateToSignup }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            setError('');
            const result = await loginUser(values.email, values.password);

            if (onLoginSuccess) {
                onLoginSuccess(result);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '20px'
        }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Title level={2} style={{ color: '#003366', marginBottom: '8px' }}>
                        Welcome Back
                    </Title>
                    <Text type="secondary">
                        Sign in to your Sysco account
                    </Text>
                </div>

                {error && (
                    <Alert
                        message="Login Failed"
                        description={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px' }}
                    />
                )}

                <Form
                    form={form}
                    name="login"
                    layout="vertical"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email address!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            size="large"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password must be at least 6 characters!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            size="large"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={loading}
                            block
                            style={{
                                backgroundColor: '#003366',
                                borderColor: '#003366',
                                height: '48px',
                                fontSize: '16px',
                            }}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Space direction="vertical" size="small">
                        <Text type="secondary">
                            Don't have an account?{' '}
                            <Link
                                onClick={onNavigateToSignup}
                                style={{ color: '#003366', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Sign up here
                            </Link>
                        </Text>
                        <Link
                            href="/"
                            style={{ color: '#003366' }}
                        >
                            Want to Browse More?
                        </Link>
                    </Space>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;

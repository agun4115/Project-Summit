import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Alert, Select } from '@sysco/ui-utility';
import { registerUser } from 'APIs/authApis';
import { UserRole, AUTH_DEFAULTS } from 'Constants/enums';

const { Title, Text, Link } = Typography;
const { Option } = Select;

const SignupPage = ({ onSignupSuccess, onNavigateToLogin }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            setError('');

            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                password: values.password,
                role: values.role || UserRole.CUSTOMER,
            };

            const result = await registerUser(userData);

            if (onSignupSuccess) {
                onSignupSuccess(result);
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
                    maxWidth: '500px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Title level={2} style={{ color: '#003366', marginBottom: '8px' }}>
                        Create Account
                    </Title>
                    <Text type="secondary">
                        Join Sysco and start your journey
                    </Text>
                </div>

                {error && (
                    <Alert
                        message="Registration Failed"
                        description={error}
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px' }}
                    />
                )}

                <Form
                    form={form}
                    name="signup"
                    layout="vertical"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFinishFailed}
                    initialValues={AUTH_DEFAULTS}
                    autoComplete="off"
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                },
                                {
                                    min: 2,
                                    message: 'First name must be at least 2 characters!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="First name"
                                size="large"
                                disabled={loading}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                                {
                                    min: 2,
                                    message: 'Last name must be at least 2 characters!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Last name"
                                size="large"
                                disabled={loading}
                            />
                        </Form.Item>
                    </div>

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
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                            {
                                pattern: /^[\d\s\-\+\(\)]+$/,
                                message: 'Please enter a valid phone number!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your phone number"
                            size="large"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your role!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select your role"
                            size="large"
                            disabled={loading}
                        >
                            {Object.entries(UserRole).map(([key, value]) => (
                                <Option key={key} value={value}>
                                    {value}
                                </Option>
                            ))}
                        </Select>
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
                                min: 8,
                                message: 'Password must be at least 8 characters!',
                            },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Create a password"
                            size="large"
                            disabled={loading}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm your password"
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
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text type="secondary">
                        Already have an account?{' '}
                        <Link
                            onClick={onNavigateToLogin}
                            style={{ color: '#003366', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            Sign in here
                        </Link>
                    </Text>
                </div>
            </Card>
        </div>
    );
};

export default SignupPage;

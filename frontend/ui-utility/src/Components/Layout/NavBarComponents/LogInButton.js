import React from 'react';
import { Button } from 'antd';

const LogInButton = () => {
    const handleLogin = () => {
        // Use window.location for navigation in microfrontend environment
        window.location.href = '/auth/log';
    };

    return (
        <Button type="primary" onClick={handleLogin}>
            Log In
        </Button>
    );
};

export default LogInButton;
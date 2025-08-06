import React from 'react';

const Logo = () => {
const navigateToHome = () => {
    window.location.href = "/";
};

return (
    <div
        style={{ display: 'flex', alignItems: 'center', flexShrink: 0, height: '100%', cursor: 'pointer' }}
        onClick={navigateToHome}
    >
        <img
            src="https://cdn.shop.sysco.com/img/logo/sysco-logo-white.svg"
            alt="Sysco Logo"
            style={{ height: '50px', width: 'auto' }}
        />
    </div>
);
};

export default Logo;

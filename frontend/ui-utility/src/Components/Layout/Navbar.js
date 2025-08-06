import { Layout } from 'antd';
import Logo from './NavBarComponents/Logo';
import SearchBar from './NavBarComponents/SearchBar';
import UserProfile from './UserProfile';
import CartItem from './NavBarComponents/CartItem';
// import {useAuth } from '@sysco/shared-utils'
import LogInButton from './NavBarComponents/LogInButton';
const { Header } = Layout;

const Navbar = () => {
    const onSearch = (value) => {
        if (value && value.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(value.trim())}`;
        }
    };
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
return (
    <Header
        style={{
            backgroundColor: '#003366',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                height: '100%',
            }}
        >
            <Logo />
            {user?.role === 'Customer' &&  <SearchBar onSearch={onSearch} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {user?.role === 'Customer' && <CartItem />}
                {user ? <UserProfile /> : <LogInButton />}
            </div>
        </div>
    </Header>
);
};

export default Navbar;

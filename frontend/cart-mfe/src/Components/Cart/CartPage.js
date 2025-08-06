import React, { useState, useEffect, use } from 'react';
import { Typography, Button, Row, Col, Spin } from '@sysco/ui-utility';
import { useCart } from '@sysco/shared-utility';
import {Navbar, Footer} from '@sysco/ui-utility';
import CartSummary from './CartSummary';
import CartItem from './CartItem';

const { Title, Text } = Typography;

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { items, removeFromCart, updateCount } = useCart();

  // Calculate totals from local state to avoid Redux dependency issues
  const localTotalItems = cartItems.reduce((total, item) => total + (item.count || 0), 0);
  const localTotalAmount = cartItems.reduce((total, item) => total + ((item.pricePerUnit || 0) * (item.count || 0)), 0);
  
  useEffect(() => {
    console.log("Hi")
    if (items) {
      setCartItems(items);
      setLoading(false);
    }
  }, [items?.length]); 

  const handleRemove = async (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    removeFromCart(id);
  };

  const handleUpdateQuantity = async (id, quantity) => {
    // Optimistically update UI first
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, count: quantity } : item
      )
    );
    // Then call the Redux action
    await updateCount(id, quantity);
  };
  

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
     <Navbar />
      
      <div style={{ 
        padding: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 180px)'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Title level={2} style={{ margin: 0, color: '#1a237e' }}>
              Shopping Cart
            </Title>
            <Button 
              onClick={() => window.location.reload()}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              🔄 Refresh
            </Button>
          </div>
          {!loading && (
            <Text style={{ color: '#666', fontSize: '16px' }}>
              {localTotalItems} items in your cart
            </Text>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <Spin size="large" />
            <div style={{ marginTop: '16px' }}>
              <Text>Loading your cart...</Text>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 0',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <Title level={4} style={{ color: '#666', marginBottom: '16px' }}>
              Your cart is empty
            </Title>
            <Text style={{ color: '#888' }}>
              Add some products to get started!
            </Text>
          </div>
        ) : (
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '8px', 
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
            </Col>

            <Col xs={24} lg={8}>
              <CartSummary total={localTotalAmount} totalItems={localTotalItems} />
            </Col>
          </Row>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

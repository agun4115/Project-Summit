import React from 'react';
import { Card, Typography, Button, Divider, Space } from '@sysco/ui-utility';

const { Text, Title } = Typography;

const CartSummary = ({total, totalItems }) => {
  const finalTotal = total;

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div style={{ position: 'sticky', top: '24px' }}>
      <Card
        title={
          <Title level={4} style={{ margin: 0, color: '#1a237e' }}>
            Order Summary
          </Title>
        }
        style={{ 
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {/* Items Summary */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <Text style={{ color: '#666' }}>
                Items ({totalItems})
              </Text>
              <Text style={{ fontWeight: 'bold' }}>
                Rs. {total.toFixed(2)}
              </Text>
            </div>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          {/* Checkout Button */}
          <Button
            type="primary"
            size="large"
            block
            onClick={handleCheckout}
            disabled={totalItems === 0}
            style={{
              height: '48px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#1a237e',
              borderColor: '#1a237e',
              marginTop: '16px'
            }}
          >
            Proceed to Checkout
          </Button>

          {/* Continue Shopping */}
          <Button
            type="default"
            size="large"
            block
            onClick={() => window.location.href = '/'}
            style={{
              height: '40px',
              fontSize: '14px'
            }}
          >
            Continue Shopping
          </Button>

          {/* Security Info */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Text style={{ fontSize: '12px', color: '#999' }}>
              🔒 Secure checkout with SSL encryption
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default CartSummary;

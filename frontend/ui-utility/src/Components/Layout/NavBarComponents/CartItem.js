import { Badge, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '@sysco/shared-utility';
import React, { useEffect } from 'react';
const CartItem = ({}) => {
  const { totalItems = 0, totalAmount = 0, syncCart } = useCart();
  useEffect(() => {
    syncCart();
  }, []);
  const handleClick = () => {
      window.location.href = '/cart';
  };

  return (
    <div 
      style={{
        display: 'inline-block'
      }}
      onClick={handleClick}
    >
      <Badge 
        count={totalItems} 
        showZero={false}
        style={{
          backgroundColor: '#1890ff',
          color: '#fff',
          fontWeight: 'bold',
          minWidth: '20px',
          height: '20px',
          lineHeight: '20px',
          borderRadius: '10px',
          fontSize: '12px',
          boxShadow: '0 0 0 1px #d9d9d9 inset'
        }}
        offset={[-5, 5]}
      >
        <Button
          type="text"
          icon={<ShoppingCartOutlined />}
          size='middle'
          style={{
            color: '#1890ff',
            fontSize: '20px',
            padding: '6px',
            height: 'auto',
            width: 'auto',
            border: 'none',
            background: 'transparent',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title={`Cart (${totalItems} items) - Total: $${totalAmount.toFixed(2)}`}
        />
      </Badge>
    </div>
  );
};

export default CartItem;

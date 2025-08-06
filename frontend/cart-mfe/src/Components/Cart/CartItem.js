import { Card, Typography, Button, InputNumber, Space } from '@sysco/ui-utility';
import { UNIT_TYPES } from '../../Constants/enums';
import { DeleteOutlined } from '@sysco/ui-utility';
// import { useCart } from '@sysco/shared-utility';

const { Text, Title } = Typography;

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.pricePerUnit * item.count;
  // const { items, removeFromCart, updateCount } = useCart();
  return (
    <div style={{ marginBottom: '16px' }}>
      <Card
        style={{ 
          border: '1px solid #f0f0f0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}>
          <Button
            type="text"
            danger
            onClick={() => onRemove(item.id)}
            icon={<DeleteOutlined style={{ color: '#d32f2f', fontSize: '18px' }} />}
            style={{ 
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '4px 8px',
              height: 'auto',
              zIndex: 1
            }}
            title="Remove item"
          />
          
          {/* item Image */}
          <div style={{ flexShrink: 0 }}>
            <img
              src={item.images?.[0]}
              alt={item.title}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '6px',
                border: '1px solid #f0f0f0'
              }}
            />
          </div>

          {/* item Details */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
            <div>
              <Title level={4} style={{ margin: '0 0 8px 0', color: '#1a237e' }}>
                {item.title}
              </Title>
              <Text style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
                {item.description}
              </Text>
              <Text style={{ color: '#388e3c', fontWeight: 'bold' }}>
                Rs. {item.pricePerUnit} per {UNIT_TYPES[item.amountType] || item.amountType}
              </Text>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginTop: '16px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <Space align="center" wrap>
                <InputNumber
                  min={1}
                  max={99}
                  value={item.count}
                  onChange={(value) => onUpdateQuantity(item.id, value)}
                  style={{ width: '40px' }}
                />
                <Text >
                  {UNIT_TYPES[item.amountType]}
                </Text>
              </Space>

              <div style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a237e' }}>
                  Rs. {itemTotal.toFixed(2)}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CartItem;

import React from 'react';
import { Modal, Button, Space, Typography} from '@sysco/ui-utility';

const { Text, Title } = Typography;

const ProductDetailsModal = ({ visible, onClose, product }) => {
  if (!product) return null;
  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
      styles={{
        body: { padding: 0 },
        header: { display: 'none' }
      }}
    >
      {/* Custom Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        padding: '12px',
        textAlign: 'center',
        borderRadius: '8px 8px 0 0'
      }}>
        <Title 
          level={3} 
          style={{ 
            color: 'white', 
            margin: 0,
            fontWeight: 600
          }}
        >
          {product.title}
        </Title>
      </div>

      {/* Content */}
      <div style={{ padding: '12px' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {/* Product Info Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '8px',
            marginBottom: '8px'
          }}>
            <div style={{ 
              padding: '8px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text strong style={{ color: '#1a237e', fontSize: '14px' }}>Price</Text>
              <div>
                <Text style={{ fontSize: '18px', fontWeight: 'bold', color: '#52c41a' }}>
                  Rs. {product.pricePerUnit}
                </Text>
              </div>
            </div>

            <div style={{ 
              padding: '8px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text strong style={{ color: '#1a237e', fontSize: '14px' }}>Category</Text>
              <div>
                <Text style={{ fontSize: '16px' }}>{product.category}</Text>
              </div>
            </div>

            <div style={{ 
              padding: '8px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Text strong style={{ color: '#1a237e', fontSize: '14px' }}>Unit Type</Text>
              <div>
                <Text style={{ fontSize: '16px' }}>{product.amountType}</Text>
              </div>
            </div>

            {product.amount !== undefined && (
              <div style={{ 
                padding: '8px', 
                background: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Text strong style={{ color: '#1a237e', fontSize: '14px' }}>Stock</Text>
                <div>
                  <Text style={{ fontSize: '16px' }}>{product.amount} {product.amountType.toLowerCase()}</Text>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ 
            padding: '20px', 
            background: '#fafafa', 
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <Text strong style={{ color: '#1a237e', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Description
            </Text>
            <Text style={{ lineHeight: '1.6', color: '#666' }}>
              {product.description}
            </Text>
          </div>

          {/* Images */}
          {product.images && product.images.length > 0 && (
            <div>
              <Text strong style={{ color: '#1a237e', fontSize: '14px', display: 'block', marginBottom: '12px' }}>
                Product Images
              </Text>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginTop: '8px'
              }}>
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      style={{ 
                        width: '100%', 
                        height: '120px', 
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Space>
      </div>

      {/* Footer */}
      <div style={{ 
        padding: '8px 24px', 
        borderTop: '1px solid #e9ecef',
        textAlign: 'center',
        background: '#fafafa'
      }}>
        <Button 
          type="primary" 
          onClick={onClose}
          size="large"
          style={{
            minWidth: '120px',
            borderRadius: '6px',
            fontWeight: '500'
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;

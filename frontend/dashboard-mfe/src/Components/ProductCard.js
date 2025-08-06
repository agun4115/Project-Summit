import React from 'react';
import { Card, Button, Tag, Typography, Space, Image } from '@sysco/ui-utility';
import { CheckOutlined, CloseOutlined, EditOutlined, EyeOutlined } from '@sysco/ui-utility';
import { PRODUCT_STATUS, USER_ROLES } from '../Constants/enums';
const { Text, Title } = Typography;

const ProductCard = ({ product, userRole, onApprove, onReject, onEdit, onView }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case PRODUCT_STATUS.ACCEPTED: return 'green';
      case PRODUCT_STATUS.PENDING: return 'orange';
      case PRODUCT_STATUS.REJECTED: return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
  };

  const renderActions = () => {
    if (userRole === USER_ROLES.DATA_STEWARD) {
    return (
      <Space>
        {product.status !== PRODUCT_STATUS.ACCEPTED && (
        <Button 
          type="primary" 
          icon={<CheckOutlined />} 
          onClick={() => onApprove(product.id)}
          size="small"
        >
          Approve
        </Button>
        )}
         {product.status !== PRODUCT_STATUS.REJECTED && (
            <Button 
                danger 
                icon={<CloseOutlined />} 
                onClick={() => onReject(product.id)}
                disabled={product.status === PRODUCT_STATUS.REJECTED}
                size="small"
                >
                Reject
            </Button>
         )}
        <Button 
        icon={<EyeOutlined />} 
        onClick={() => onView(product)}
        size="small"
        >
        View
        </Button>
      </Space>
    );
    }

    if (userRole === USER_ROLES.SUPPLIER) {
      return (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(product)}
            size="small"
          >
            Edit
          </Button>
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => onView(product)}
            size="small"
          >
            View
          </Button>
        </Space>
      );
    }

    return null;
  };

  return (
    <Card
      style={{ 
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}
      bodyStyle={{ padding: '16px' }}
      hoverable
    >
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Product Image */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src={product.images?.[0] || '/placeholder-image.jpg'}
            alt={product.title}
            width={100}
            height={100}
            style={{ 
              objectFit: 'cover',
              borderRadius: '6px',
              border: '1px solid #f0f0f0'
            }}
            fallback="/placeholder-image.jpg"
          />
        </div>

        {/* Product Details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <Title level={5} style={{ margin: 0, color: '#1a237e' }}>
                {product.title}
              </Title>
              <Tag color={getStatusColor(product.status)}>
                {getStatusText(product.status)}
              </Tag>
            </div>
            
            <Text style={{ color: '#666', display: 'block', marginBottom: '8px' }}>
              {product.description}
            </Text>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
              <Text style={{ color: '#388e3c', fontWeight: 'bold' }}>
                Rs. {product.pricePerUnit}
              </Text>
              <Text style={{ color: '#666' }}>
                Category: {product.category}
              </Text>
            </div>

            {userRole === 'DATA_STEWARD' && product.supplierName && (
              <Text style={{ color: '#666', fontSize: '12px' }}>
                Supplier: {product.supplierName}
              </Text>
            )}
          </div>

          {/* Actions */}
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
            {renderActions()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;

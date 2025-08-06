import React from 'react';
import { Row, Col, Typography, Pagination, Spin, Empty } from '@sysco/ui-utility';
import ProductCard from './ProductCard';

const { Title, Text } = Typography;

const ProductGrid = ({ products, loading, error, pagination, onPageChange }) => {
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <Text type="danger" style={{ fontSize: '16px' }}>{error}</Text>
      </div>
    );
  }

  const renderProductCard = (product) => (
    <Col key={product.id} xs={24} sm={12} lg={8} xl={8}>
      <ProductCard product={product} />
    </Col>
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Products</Title>
          {!loading && (
            <Text style={{ color: '#666' }}>
              {pagination.total > 0 ? (
                <>Showing {((pagination.current - 1) * pagination.pageSize) + 1}-{Math.min(pagination.current * pagination.pageSize, pagination.total)} of {pagination.total} products</>
              ) : (
                'No products found'
              )}
            </Text>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>Loading products...</Text>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <>
          <Row gutter={[16, 16]}>
            {products.map(renderProductCard)}
          </Row>

          {/* Pagination */}
          {pagination.total}
          {pagination.total > pagination.pageSize && (
            <div style={{ textAlign: 'center', marginTop: '32px', padding: '24px 0' }}>
              <Pagination
                current={pagination.current}
                total={pagination.total}
                pageSize={pagination.pageSize}
                onChange={onPageChange}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                pageSizeOptions={['12', '24', '48', '96']}
              />
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <Empty
            description="No products found"
            style={{ marginBottom: '16px' }}
          />
          <Text style={{ color: '#666' }}>
            Try adjusting your filters or search criteria
          </Text>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

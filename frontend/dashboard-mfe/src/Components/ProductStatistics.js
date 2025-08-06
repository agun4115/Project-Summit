import React, { useState, useEffect } from 'react';
import { Typography } from '@sysco/ui-utility';
import { fetchProductStats } from '../APIs/productApis';

const { Text } = Typography;

const ProductStatistics = ({ userRole, shouldRefresh }) => {
  const [productCounts, setProductCounts] = useState({
    active: 0,
    pending: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const stats = await fetchProductStats(userRole);
      setProductCounts(stats);
    } catch (error) {
      console.error('Failed to fetch product statistics:', error);
      // Set    default values on error
      setProductCounts({ active: 0, pending: 0, rejected: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [userRole, shouldRefresh]);

  if (loading) {
    return (
      <div style={{ 
        marginTop: '30px', 
        padding: '16px', 
        background: '#f8f9fa', 
        borderRadius: '6px' 
      }}>
        <Typography.Title level={5} style={{ margin: '0 0 12px 0' }}>
          Summary
        </Typography.Title>
        <Text style={{ fontSize: '12px', color: '#666' }}>Loading...</Text>
      </div>
    );
  }

  const totalProducts = (productCounts.active || 0) + (productCounts.pending || 0) + (productCounts.rejected || 0);

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '16px', 
      background: '#f8f9fa', 
      borderRadius: '6px' 
    }}>
      <Typography.Title level={5} style={{ margin: '0 0 12px 0' }}>
        Summary
      </Typography.Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: '12px', color: '#666' }}>Total:</Text>
          <Text style={{ fontSize: '12px', fontWeight: 'bold' }}>
            {totalProducts}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: '12px', color: '#52c41a' }}>Active:</Text>
          <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#52c41a' }}>
            {productCounts.active || 0}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: '12px', color: '#faad14' }}>Pending:</Text>
          <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#faad14' }}>
            {productCounts.pending || 0}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: '12px', color: '#ff4d4f' }}>Rejected:</Text>
          <Text style={{ fontSize: '12px', fontWeight: 'bold', color: '#ff4d4f' }}>
            {productCounts.rejected || 0}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ProductStatistics;

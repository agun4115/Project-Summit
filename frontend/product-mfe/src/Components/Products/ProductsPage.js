import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from '@sysco/ui-utility';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import { fetchProducts } from 'APIs/productApis.js';

const { Content } = Layout;

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    first: true,
    last: false,
    current: 1,
    totalPages: 0,
    pageSize: 12,
    total: 0
  });

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    unitType: searchParams.get('unitType') || ''
  });

  const updateURL = (newFilters, currentPage = 1) => {
    const params = new URLSearchParams();
    
    // Add filters to URL
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice);
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice);
    if (newFilters.unitType) params.set('unitType', newFilters.unitType);
    
    // Add page if not the first page
    if (currentPage > 1) params.set('page', currentPage.toString());
    
    setSearchParams(params);
  };

  const loadProducts = async (currentFilters = filters, currentPage = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      if (currentFilters.category) queryParams.append('category', currentFilters.category);
      if (currentFilters.minPrice) queryParams.append('minPrice', currentFilters.minPrice);
      if (currentFilters.maxPrice) queryParams.append('maxPrice', currentFilters.maxPrice);
      if (currentFilters.unitType) queryParams.append('unitType', currentFilters.unitType);
      
      // Add pagination params
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', pagination.pageSize.toString());

      const response = await fetchProducts(queryParams.toString());
        setProducts(response.data || []);
        setPagination(prev => ({
            ...prev,
            current: currentPage,
            total: response.pagination.totalElements || 0,
            totalPages: response.pagination.totalPages - 1 || 0,
            first: response.pagination.first,
            last: response.pagination.last,
        }));
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Load products on component mount and when URL changes
  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 1;
    setPagination(prev => ({ ...prev, current: currentPage }));
    loadProducts(filters, currentPage);
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to first page
    updateURL(newFilters, 1);
    loadProducts(newFilters, 1);
  };

  const handlePageChange = (page, pageSize) => {
    setPagination(prev => ({ ...prev, current: page, pageSize }));
    updateURL(filters, page);
    loadProducts(filters, page);
  };

  const handleClearFilters = () => {
    const clearedFilters = { category: '', minPrice: '', maxPrice: '', unitType: '' };
    setFilters(clearedFilters);
    setPagination(prev => ({ ...prev, current: 1 }));
    updateURL(clearedFilters, 1);
    loadProducts(clearedFilters, 1);
  };

  return (
    <Content style={{ padding: '24px', minHeight: '100vh' }}>
      <Row gutter={24}>
        {/* Left Sidebar - Filters */}
        <Col xs={24} md={6} lg={5}>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            loading={loading}
          />
        </Col>
        
        {/* Right Side - Products */}
        <Col xs={24} md={18} lg={19}>
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default ProductsPage;

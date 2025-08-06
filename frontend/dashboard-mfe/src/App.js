import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Typography, 
  Row, 
  Col, 
  Spin, 
  Empty, 
  Button,
  message,
  Input,
  Pagination
} from '@sysco/ui-utility';
import { Navbar, Footer } from '@sysco/ui-utility';
import ProductCard from './Components/ProductCard';
import ProductForm from './Components/ProductForm';
import ProductDetailsModal from './Components/ProductDetailsModal';
import Sidebar from './Components/Sidebar';
import {
  fetchAllProducts,
  fetchProductsSeller,
  createProduct,
  updateProduct,
  approveProduct,
  rejectProduct,
  fetchCategories,
} from './APIs/productApis';
import { PRODUCT_STATUS, USER_ROLES } from './Constants/enums';
import {useAuth} from "@sysco/shared-utility";
const { Title, Text } = Typography;
const { Content } = Layout;
const { Search } = Input;

const App = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    pageSize: 12,
    totalItems: 0,
    totalPages: 0,
    numberOfElements: 0,
    first: true,
    last: false,
    empty: false,
  });
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState(PRODUCT_STATUS.ACCEPTED);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  
  // Modal states
  const [productFormVisible, setProductFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const { user } = useAuth();
  const userRole = user?.role || USER_ROLES.SUPPLIER;
  const userId = user?.id || null;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        initializeFromUrlParams();
        const categoriesData = await fetchCategories();
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };
    
    loadInitialData();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [activeFilter, searchTerm, currentPage, pageSize]);

  const initializeFromUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('status');
    const searchParam = urlParams.get('q');
    const pageParam = urlParams.get('page');
    const pageSizeParam = urlParams.get('pageSize');

    if (statusParam && Object.values(PRODUCT_STATUS).includes(statusParam)) {
      setActiveFilter(statusParam);
    }

    if (searchParam) {
      setSearchTerm(searchParam);
    }

    if (pageParam && !isNaN(parseInt(pageParam))) {
      setCurrentPage(parseInt(pageParam));
    }

    if (pageSizeParam && ['12', '24', '48', '96'].includes(pageSizeParam)) {
      setPageSize(parseInt(pageSizeParam));
    }
  };


  const loadProducts = async () => {
    try {
      setLoading(true);
      
    if (userRole === USER_ROLES.SUPPLIER) {
        const response = await fetchProductsSeller(activeFilter, searchTerm, pageSize, currentPage);
        setProducts(response.data || []);
        setPaginationInfo({
          currentPage: response.pagination.number || 1,
          pageSize: response.pagination.pageSize || 12,
          totalItems: response.pagination.totalElements || 0,
          totalPages: response.pagination.totalPages || 0,
          numberOfElements: response.pagination.numberOfElements || 0,
          first: response.pagination.first || false,
          last: response.pagination.last || false,
          empty: response.pagination.empty || false,
        });
    } else {
        const response = await fetchAllProducts(activeFilter, searchTerm, pageSize, currentPage);
        setProducts(response.data || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      message.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
    updateUrlParams(filter, searchTerm, 1, pageSize);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
    updateUrlParams(activeFilter, value, 1, pageSize);
  };

  const handlePageChange = async (page, size) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
    }
    updateUrlParams(activeFilter, searchTerm, page, size || pageSize);
    // Don't call loadProducts() here - let the useEffect handle it
  };

  const updateUrlParams = (filter, search, page = currentPage, size = pageSize) => {
    const url = new URL(window.location);
    url.searchParams.set('status', filter);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('pageSize', size.toString());
    
    if (search) {
      url.searchParams.set('q', search);
    } else {
      url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductFormVisible(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setViewModalVisible(true);
  };

  const handleProductSubmit = async (productData, productId = null) => {
    try {
      if (productId) {
        // Update existing product
        await updateProduct(productId, productData);
        message.success('Product updated successfully');
      } else {
        // Create new product
        const newProductData = {
          ...productData,
          supplierId: userId,
        };
        await createProduct(newProductData);
        message.success('Product created successfully');
      }
      
      setProductFormVisible(false);
      loadProducts();
    } catch (error) {
      console.error('Error submitting product:', error);
      throw error;
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await approveProduct(productId);
      message.success('Product approved successfully');
      loadProducts();
    } catch (error) {
      console.error('Error approving product:', error);
      message.error('Failed to approve product');
    }
  };

  const handleRejectProduct = async (productId) => {
        try {
          console.log('Confirming rejection for product:', productId);
          await rejectProduct(productId, 'Product rejected by data steward');
          message.success('Product rejected successfully');
          loadProducts();
        } catch (error) {
          console.error('Error rejecting product:', error);
          message.error('Failed to reject product');
        }  
  };

  const renderHeader = () => (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1a237e' }}>
            {userRole === USER_ROLES.DATA_STEWARD ? 'Product Management' : 'My Products'}
          </Title>
          <Text style={{ color: '#666' }}>
            {userRole === USER_ROLES.DATA_STEWARD
              ? 'Manage product approvals and listings'
              : 'Manage your product inventory'
            }
          </Text>
        </div>
        
        {userRole === USER_ROLES.SUPPLIER && (
          <Button 
            type="primary" 
            onClick={handleAddProduct}
            size="large"
          >
            Add New Product
          </Button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Search
          placeholder="Search products..."
          allowClear
          style={{ maxWidth: '300px' }}
          onSearch={handleSearch}
          onChange={(e) => !e.target.value && setSearchTerm('')}
        />
        <Text style={{ color: '#666', fontSize: '14px' }}>
          {!loading && paginationInfo.totalItems > 0 ? (
            <>Showing {((paginationInfo.currentPage - 1) * paginationInfo.pageSize) + 1}-{Math.min(paginationInfo.currentPage * paginationInfo.pageSize, paginationInfo.totalItems)} of {paginationInfo.totalItems} products</>
          ) : !loading ? (
            'No products found'
          ) : (
            'Loading products...'
          )}
        </Text>
      </div>
    </div>
  );

  const renderProductGrid = () => {
    if (loading) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: '16px' }}>
            <Text>Loading products...</Text>
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Empty
          description={
            searchTerm 
              ? `No products found matching "${searchTerm}"`
              : `No ${activeFilter} products found`
          }
          style={{ padding: '60px 0' }}
        />
      );
    }

    return (
      <>
        <div style={{ marginBottom: '24px' }}>
          {products   .map(product => (
            <ProductCard
              key={product.id}
              product={product}
              userRole={userRole}
              onApprove={handleApproveProduct}
              onReject={handleRejectProduct}
              onEdit={handleEditProduct}
              onView={handleViewProduct}
            />
          ))}
        </div>

        {products.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '32px', padding: '24px 0' }}>
            <Text>
              Page {paginationInfo.currentPage} of {paginationInfo.totalPages}
            </Text>
            <Pagination
              current={paginationInfo.currentPage}
              total={paginationInfo.totalItems}
              pageSize={paginationInfo.pageSize}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} products`
              }
              pageSizeOptions={['12', '24', '48', '96']}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar />
      <Content style={{ padding: '24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Row gutter={24}>
            <Col xs={24} lg={6}>
              <Sidebar
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                userRole={userRole}
                onAddProduct={handleAddProduct}
              />
            </Col>
            
            <Col xs={24} lg={18}>
              <div style={{ 
                background: '#fff', 
                borderRadius: '8px', 
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minHeight: '600px'
              }}>
                {renderHeader()}
                {renderProductGrid()}
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer />

      {/* Product Form Modal */}
      <ProductForm
        visible={productFormVisible}
        onCancel={() => setProductFormVisible(false)}
        onSubmit={handleProductSubmit}
        product={selectedProduct}
        categories={categories}
      />

      {/* Product View Modal */}
      <ProductDetailsModal
        visible={viewModalVisible}
        onClose={() => setViewModalVisible(false)}
        product={selectedProduct}
      />
    </Layout>
  );
};

export default App;
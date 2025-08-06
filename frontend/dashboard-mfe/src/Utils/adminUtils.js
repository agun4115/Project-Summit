// Utility functions for admin functionality

export const getUserRole = () => {
  return localStorage.getItem('userRole') || 'SUPPLIER';
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};

export const setUserRole = (role) => {
  localStorage.setItem('userRole', role);
};

export const setUserId = (userId) => {
  localStorage.setItem('userId', userId);
};

export const formatPrice = (price) => {
  return `Rs. ${parseFloat(price).toFixed(2)}`;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case PRODUCT_STATUS.ACCEPTED: return '#52c41a';
    case PRODUCT_STATUS.PENDING: return '#faad14';
    case PRODUCT_STATUS.REJECTED: return '#ff4d4f';
    default: return '#d9d9d9';
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const validateProductForm = (values) => {
  const errors = {};
  
  if (!values.title?.trim()) {
    errors.title = 'Product title is required';
  }
  
  if (!values.description?.trim()) {
    errors.description = 'Product description is required';
  }
  
  if (!values.pricePerUnit || values.pricePerUnit <= 0) {
    errors.pricePerUnit = 'Price must be greater than 0';
  }
  
  if (!values.category) {
    errors.category = 'Category is required';
  }
  
  if (!values.amountType) {
    errors.amountType = 'Unit type is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

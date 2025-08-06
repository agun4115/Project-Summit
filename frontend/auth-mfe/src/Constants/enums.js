// User Role Enum
export const UserRole = Object.freeze({
  CUSTOMER: 'Customer',
  DATA_STEWARD: 'Data Steward',
  SUPPLIER: 'Supplier'
});

// Auth Constants
export const AUTH_DEFAULTS = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  role: UserRole.CUSTOMER
};

// Mock users for development/testing
const mockUsers = [
  {
    id: '1',
    username: 'customer1',
    email: 'customer@example.com',
    password: 'Customer123',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '+1234567890',
    role: 'Customer',
    emailVerified: true,
    phoneVerified: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    username: 'supplier1',
    email: 'supplier@example.com',
    password: 'Supplier123',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '+1987654321',
    role: 'Supplier',
    emailVerified: true,
    phoneVerified: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    username: 'datasteward1',
    email: 'datasteward@example.com',
    password: 'DataSteward123',
    firstName: 'Mike',
    lastName: 'Johnson',
    phoneNumber: '+1555123456',
    role: 'Data Steward',
    emailVerified: true,
    phoneVerified: false
  }
];

// Helper functions for mock user operations
const findUserByEmail = (email) => {
  return mockUsers.find(u => u.email === email.toLowerCase());
};

const findUserById = (id) => {
  return mockUsers.find(u => u.id === id);
};

const addUser = (userData) => {
  const newUser = {
    id: String(mockUsers.length + 1),
    username: `user${mockUsers.length + 1}`,
    email: userData.email.toLowerCase(),
    password: userData.password,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phoneNumber: userData.phoneNumber || null,
    role: userData.role || 'Customer',
    emailVerified: false,
    phoneVerified: false
  };
  
  mockUsers.push(newUser);
  return newUser;
};

const getUserCount = () => {
  return mockUsers.length;
};

module.exports = {
  mockUsers,
  findUserByEmail,
  findUserById,
  addUser,
  getUserCount
};

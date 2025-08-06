const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger } = require('./middleware/requestLogger');
const { addCustomHeaders } = require('./middleware/headersMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;


// app.use(addCustomHeaders); // Custom headers middleware
// app.use(helmet()); // Security middleware

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:9001',
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // Request logging

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'shop-bff'
  });
});

// API routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Shop BFF server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;

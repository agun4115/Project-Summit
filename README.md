# Project Summit - Microservices Architecture

## Overview
This repository contains the complete microservices architecture for Project Summit, including backend microservices (Spring Boot), BFF (Backend for Frontend), and frontend applications. Each service is designed to be independent and scalable.

## Architecture Components

### Backend Microservices (Spring Boot)
- **User Service** - Port: 8001 - Manages user registration, authentication, and profiles
- **Category Service** - Port: 8002 - Manages product categories and hierarchies  
- **Product Service** - Port: 8003 - Handles product catalog, details, and inventory
- **Cart Service** - Port: 8004 - Manages user shopping carts and operations

### BFF (Backend for Frontend)
- **Shop BFF** - Port: 3000 - Node.js/Express API gateway and business logic layer

### Frontend Applications (Micro-frontends)
- **Root MFE** - Port: 9001 - Main application shell
- **Auth MFE** - Authentication micro-frontend
- **Product MFE** - Product catalog micro-frontend  
- **Cart MFE** - Shopping cart micro-frontend
- **Shared Utility** - Shared components and utilities
- **UI Utility** - Common UI components

## Prerequisites
- **Java 17+** (for Spring Boot microservices)
- **Node.js 20+** (for BFF and frontend)
- **npm** (package manager)
- **PostgreSQL** (database)

## Quick Start

## Quick Installation Script

For faster setup, you can use these command sequences:

### Windows (PowerShell/Command Prompt)
```batch
REM Install all dependencies at once
cd bff && npm install && cd ..
cd frontend && npm run install && cd ..
echo All dependencies installed!
```

### Linux/macOS (Bash)
```bash
# Install all dependencies
(cd microservices && ./launch-services.bat)
(cd bff && npm install) && \
(cd frontend && npm run install) && \
echo "All dependencies installed!"
```

### 🚀 Option 1: Launch All Services with Batch Script (Windows)

The `launch-services.bat` script automatically starts all backend microservices in the correct order with proper timing delays.

```bash
# Navigate to microservices directory
cd micro-services

# Run the launch script (Windows only)
launch-services.bat
```

**What the batch script does:**
1. **Starts Category Service** (Port: 8002) - No dependencies
2. **Waits 10 seconds** - Allows service to fully initialize
3. **Starts Cart Service** (Port: 8004) - Depends on Category Service
4. **Waits 10 seconds** - Service initialization time
5. **Starts Product Service** (Port: 8003) - Depends on Category Service  
6. **Waits 10 seconds** - Service initialization time
7. **Starts User Service** (Port: 8001) - No dependencies
8. **Displays service URLs** - Shows where each service is running
9. **Keeps all services running** - Each in its own command window

**To Stop Services:**
- Close individual service windows to stop specific services
- Or press `Ctrl+C` in each service window
- The launcher window can be closed after services are running

## Service URLs & Health Checks

Once all services are running, you can access:

### Backend Microservices
- **Category Service**: http://localhost:8002/api/v1/categories
- **User Service**: http://localhost:8001/api/v1/users  
- **Product Service**: http://localhost:8003/api/v1/products
- **Cart Service**: http://localhost:8004/api/cart

### BFF (API Gateway) 
- **Shop BFF**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Routes**:
  - `GET /api/v1/categories` - Get all categories
  - `POST /api/v1/auth/login` - User login
  - `POST /api/v1/auth/signup` - User registration
  - `GET /api/v1/products` - Get products with filters
  - `GET /api/v1/cart/:userId` - Get user cart
  - `GET /api/v1/users/:id` - Get user profile

### Frontend Applications
- **Main Application**: http://localhost:9001

## Development Workflow

### For Backend Development (Spring Boot)
```bash
# Make changes to Java code
# Hot reload is enabled, service will restart automatically

# To rebuild and restart manually:
cd [service_directory]
./mvnw clean spring-boot:run
```

### For BFF Development (Node.js)
```bash
cd bff
npm run dev  # Uses nodemon for hot reload
```

### Service Dependencies
Start services in this order for best results:
1. Category Service (no dependencies)
2. User Service (no dependencies)  
3. Product Service (depends on Category Service)
4. Cart Service (depends on User & Product Services)
5. BFF (depends on all backend services)
6. Frontend (depends on BFF)

## API Documentation
- **Swagger/OpenAPI**: Available at each service's `/swagger-ui.html` endpoint

### Backend Services (Spring Boot)
```bash
## Environment Configuration

### BFF Environment Variables
Create `.env` file in `/bff` directory:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:9001

# Microservice URLs
USER_MS_BASE_URL=http://localhost:8001
CATEGORY_MS_BASE_URL=http://localhost:8002
PRODUCT_MS_BASE_URL=http://localhost:8003
CART_MS_BASE_URL=http://localhost:8004

# Database 
DATABASE_URL=postgresql://localhost:5432/shop_db
```

### Spring Boot Configuration
Each microservice has its `application.properties` or `application.yml` in `src/main/resources/`.


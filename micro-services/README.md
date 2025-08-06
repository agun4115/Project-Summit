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
- **Node.js 18+** (for BFF and frontend)
- **npm** or **yarn** (package manager)
- **PostgreSQL** (database - if using persistent storage)

## Quick Start

## Quick Installation Script

For faster setup, you can use these command sequences:

### Windows (PowerShell/Command Prompt)
```batch
REM Install all dependencies at once
cd bff && npm install && cd ..
cd frontend\root-mfe && npm install && cd ..\..
cd frontend\auth-mfe && npm install && cd ..\..
cd frontend\product-mfe && npm install && cd ..\..
cd frontend\cart-mfe && npm install && cd ..\..
cd frontend\shared-utility && npm install && cd ..\..
cd frontend\ui-utility && npm install && cd ..\..
echo All dependencies installed!
```

### Linux/macOS (Bash)
```bash
# Install all dependencies
(cd bff && npm install) && \
(cd frontend/root-mfe && npm install) && \
(cd frontend/auth-mfe && npm install) && \
(cd frontend/product-mfe && npm install) && \
(cd frontend/cart-mfe && npm install) && \
(cd frontend/shared-utility && npm install) && \
(cd frontend/ui-utility && npm install) && \
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

**Output Example:**
```
Starting all microservices...

Starting Category Service...
Waiting 10 seconds...
Starting Cart Service...
Waiting 10 seconds...
Starting Product Service...
Waiting 10 seconds...
Starting User Service...

All services are starting!
Category Service: http://localhost:8002
Cart Service: http://localhost:8004
Product Service: http://localhost:8003
User Service: http://localhost:8001

Close the individual service windows to stop each service.
Press any key to exit this launcher...
```

**To Stop Services:**
- Close individual service windows to stop specific services
- Or press `Ctrl+C` in each service window
- The launcher window can be closed after services are running

### 🚀 Option 2: Manual Installation and Launch

#### Step 1: Install Dependencies

```bash
# Install BFF dependencies
cd bff
npm install

# Install frontend dependencies
cd ../frontend/root-mfe
npm install

cd ../auth-mfe
npm install

cd ../product-mfe
npm install

cd ../cart-mfe
npm install

cd ../shared-utility
npm install

cd ../ui-utility
npm install
```

#### Step 2: Start Backend Microservices

```bash
# Navigate to microservices directory
cd micro-services

# Start each service in separate terminals:

# Terminal 1 - Category Service
cd category_service
./mvnw spring-boot:run
# OR on Windows: mvnw.cmd spring-boot:run

# Terminal 2 - User Service  
cd user_service
./mvnw spring-boot:run

# Terminal 3 - Product Service
cd product_service
./mvnw spring-boot:run

# Terminal 4 - Cart Service
cd cart_service
./mvnw spring-boot:run
```

#### Step 3: Start BFF

```bash
# In a new terminal
cd bff
npm run dev
# BFF will start on http://localhost:3000
```

#### Step 4: Start Frontend

```bash
# In a new terminal
cd frontend/root-mfe
npm start
# Frontend will start on http://localhost:9001
```

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

### For Frontend Development
```bash
cd frontend/[mfe-name]
npm run dev  # Hot reload enabled
```

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Check what's using the port
netstat -ano | findstr :8002
# Kill the process if needed
taskkill /PID [process_id] /F
```

**Service Not Starting:**
- Check Java version: `java -version` (should be 17+)
- Check Node version: `node -v` (should be 18+)
- Verify PostgreSQL is running (if using database)
- Check logs in service terminal windows

**Services Can't Connect:**
- Ensure all dependent services are running
- Check service URLs in environment variables
- Verify firewall settings

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
- **Postman Collection**: Import from `docs/api-collection.json` (if available)

## Testing

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

## Deployment

### Development
- Local Spring Boot instances using `launch-services.bat`
- Node.js BFF with `npm run dev`
- Frontend micro-frontends with `npm run start`

## Monitoring & Logging

### Health Checks
Each service exposes health endpoints:
- Spring Boot: `/actuator/health`
- BFF: `/health`

### Logs
- **Spring Boot**: Console logs with configurable levels
- **BFF**: Request logging middleware with timestamps
- **Production**: Centralized logging with ELK stack

## Complete Development Setup

### 1. Initial Setup
```bash
# Clone and navigate to project
git clone [repository-url]
cd Project-Summit

# Install all dependencies (choose your platform script above)
```

### 2. Start Backend Services
```bash
# Navigate to microservices
cd micro-services

# Start all backend services
launch-services.bat  # Windows
# OR manually start each service
```

### 3. Start BFF (API Gateway)
```bash
# In new terminal
cd bff
npm run start
# Wait for "🚀 Shop BFF server running on port 3000"
```

### 4. Start Frontend
```bash
# In new terminal  
cd frontend
npm run start
# Wait for application to open at http://localhost:9001
```

### 5. Verify Everything is Running
- **Backend Services**: Check http://localhost:8001-8004
- **BFF Health**: http://localhost:3000/health
- **Frontend**: http://localhost:9001



# Shop BFF (Backend for Frontend)

A Node.js Backend for Frontend service that acts as an intermediary between the frontend application and microservices.

## 🏗️ Architecture

This BFF service is designed to:
- Aggregate data from multiple microservices
- Provide a unified API for the frontend
- Handle cross-cutting concerns (CORS, logging, error handling)
- Optimize data fetching for frontend needs

## 📁 Project Structure

```
src/
├── middleware/          # Custom middleware functions
│   ├── errorHandler.js  # Global error handling
│   └── requestLogger.js # Request/response logging
├── routes/              # API route definitions
│   └── categories.js    # Category-related endpoints
├── services/            # Business logic and external API calls
│   └── categoryService.js # Category microservice integration
├── utils/               # Utility functions
│   └── asyncHandler.js  # Async error handling wrapper
└── server.js           # Main application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- Category Microservice running on port 8002

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the development server:
```bash
npm run dev
```

The BFF service will be available at `http://localhost:9001`

## 📡 API Endpoints

### Categories

#### GET /api/categories
Retrieves all categories from the category microservice.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Electronics",
      "description": "Electronic items"
    }
  ],
  "timestamp": "2025-07-26T10:00:00.000Z"
}
```

### Health Check

#### GET /health
Service health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-07-26T10:00:00.000Z",
  "service": "shop-bff"
}
```

## 🔧 Configuration

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | BFF service port | 9001 |
| `NODE_ENV` | Environment | development |
| `CATEGORY_MS_BASE_URL` | Category microservice URL | http://localhost:8002 |
| `FRONTEND_URL` | Frontend application URL | http://localhost:3000 |
| `LOG_LEVEL` | Logging level | info |

## 🧪 Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🛡️ Security Features

- Helmet.js for security headers
- CORS configuration
- Request logging
- Error handling without sensitive data exposure

## 🔗 Integration

This BFF service integrates with:
- **Frontend**: Serves API on port 9001
- **Category Microservice**: Consumes API on port 8002

## 📚 Best Practices Implemented

- ✅ Separation of concerns (routes, services, middleware)
- ✅ Error handling and logging
- ✅ Environment configuration
- ✅ Security middleware
- ✅ Health check endpoints
- ✅ Proper HTTP status codes
- ✅ Timeout handling for external services
- ✅ Graceful error responses

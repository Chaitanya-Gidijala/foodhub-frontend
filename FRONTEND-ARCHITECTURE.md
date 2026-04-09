# ✅ FoodHub Frontend - Updated Architecture

## Changes Based on Railway System

### 1. ✅ Environment Configuration
- **Created:** `src/environments/environment.ts`
- **Created:** `src/environments/environment.prod.ts`
- **Centralized:** API Gateway URL in one place

### 2. ✅ API Configuration
- **Created:** `src/app/config/api.config.ts`
- **Pattern:** Centralized API endpoints
- **Benefits:** Easy to maintain, single source of truth

### 3. ✅ HTTP Interceptors
- **Created:** `src/app/interceptors/auth.interceptor.ts`
  - Automatically adds JWT token to all requests
  - No need to manually add Authorization header
  
- **Created:** `src/app/interceptors/error.interceptor.ts`
  - Global error handling
  - Shows user-friendly error messages
  - Auto-logout on 401 Unauthorized
  - Handles 400, 404, 500 errors

### 4. ✅ Updated All Services
- AuthService → Uses API_ENDPOINTS.AUTH
- RestaurantService → Uses API_ENDPOINTS.RESTAURANT
- MenuService → Uses API_ENDPOINTS.MENU
- CartService → Uses API_ENDPOINTS.CART
- OrderService → Uses API_ENDPOINTS.ORDER
- PaymentService → Uses API_ENDPOINTS.PAYMENT

---

## Architecture Flow

```
User Action
    ↓
Component
    ↓
Service (uses API_ENDPOINTS)
    ↓
HTTP Request
    ↓
AuthInterceptor (adds JWT token)
    ↓
API Gateway (http://localhost:9001)
    ↓
Backend Microservice
    ↓
Response
    ↓
ErrorInterceptor (handles errors)
    ↓
Component (displays result)
```

---

## Key Benefits

### 1. Centralized Configuration
```typescript
// Change API Gateway URL in ONE place
export const environment = {
  apiGateway: 'http://localhost:9001'
};
```

### 2. Automatic JWT Handling
```typescript
// No need to manually add token
// AuthInterceptor does it automatically
this.http.get(API_ENDPOINTS.RESTAURANT.GET_ALL)
```

### 3. Global Error Handling
```typescript
// ErrorInterceptor catches all errors
// Shows snackbar messages
// Auto-logout on 401
```

### 4. Type-Safe Endpoints
```typescript
// Compile-time checking
API_ENDPOINTS.CART.GET_BY_USER(userId)
API_ENDPOINTS.ORDER.PLACE(userId)
```

---

## Environment Setup

### Development:
```typescript
export const environment = {
  production: false,
  apiGateway: 'http://localhost:9001'
};
```

### Production:
```typescript
export const environment = {
  production: true,
  apiGateway: 'https://api.foodhub.com'
};
```

---

## API Endpoints Structure

```typescript
API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile'
  },
  RESTAURANT: {
    GET_ALL: '/api/restaurants',
    GET_BY_NAME: (name) => `/api/restaurants/${name}`,
    CREATE: '/api/restaurants'
  },
  MENU: {
    GET_BY_RESTAURANT: (name) => `/api/restaurants/${name}/menu-items`,
    ADD: '/api/menu-items'
  },
  CART: {
    ADD: '/cart/add',
    GET_BY_USER: (userId) => `/cart/user/${userId}`,
    UPDATE: (cartItemId) => `/cart/update/${cartItemId}`,
    REMOVE: (cartItemId) => `/cart/remove/${cartItemId}`,
    CLEAR: (userId) => `/cart/clear/${userId}`
  },
  ORDER: {
    PLACE: (userId) => `/orders/place/${userId}`,
    GET_BY_USER: (userId) => `/orders/user/${userId}`,
    GET_BY_ID: (orderId) => `/orders/${orderId}`
  },
  PAYMENT: {
    CREATE_SESSION: '/api/payments/create-session',
    GET_STATUS: (sessionId) => `/api/payments/status/${sessionId}`
  }
}
```

---

## Error Handling

### Automatic Error Messages:
- **401** → "Unauthorized. Please login again." + Auto-logout
- **404** → "Resource not found"
- **400** → "Bad request" or custom error message
- **500** → "Server error. Please try again later."

### User Experience:
- All errors shown via Material Snackbar
- 4-second duration
- User-friendly messages
- No need for try-catch in components

---

## Comparison with Railway System

### Railway System:
```typescript
apiUrls: {
  userService: 'http://localhost:8001',
  trainService: 'http://localhost:8002',
  bookingService: 'http://localhost:8003',
  paymentService: 'http://localhost:8004'
}
```

### FoodHub System:
```typescript
apiGateway: 'http://localhost:9001'
// Single gateway for all services
```

---

## ✅ Status: Frontend Architecture Complete!

All services now use:
- ✅ Centralized API configuration
- ✅ Automatic JWT token injection
- ✅ Global error handling
- ✅ Type-safe endpoints
- ✅ Environment-based configuration

Ready to run! 🚀

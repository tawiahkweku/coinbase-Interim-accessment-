# Coinbase Clone Backend API

This is the backend API for the Coinbase Clone frontend application.

## Features

- **JWT Authentication**: User registration and login with secure token-based authentication
- **Cryptocurrency Management**: CRUD operations for cryptocurrency data
- **Protected Routes**: User profile and crypto creation endpoints require authentication
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and return JWT token

### User
- `GET /api/user/profile` - Get user profile (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Cryptocurrency
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top gainers (sorted by 24h change)
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new cryptocurrency (protected)
- `GET /api/crypto/:id` - Get single cryptocurrency by ID

### Health Check
- `GET /api/health` - Server health check

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

3. Seed the database with sample data:
```bash
node seed.js
```

4. Start the server:
```bash
npm run dev
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## Data Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: Date.now)
}
```

### Crypto Schema
```javascript
{
  name: String (required),
  symbol: String (required, unique),
  price: Number (required),
  image: String (required),
  change24h: Number (required),
  marketCap: Number (default: 0),
  volume24h: Number (default: 0),
  isNewListing: Boolean (default: false),
  createdAt: Date (default: Date.now)
}
```

## Usage Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Cryptocurrencies
```bash
curl -X GET http://localhost:5000/api/crypto
```

### Add New Cryptocurrency (requires auth)
```bash
curl -X POST http://localhost:5000/api/crypto \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "New Coin",
    "symbol": "NEW",
    "price": 100.50,
    "image": "https://example.com/image.png",
    "change24h": 5.25
  }'
```

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Request validation with express-validator
- CORS enabled for frontend integration
- Error handling and sanitization

## Deployment

This backend can be deployed to services like:
- Render (recommended)
- Heroku
- Vercel (with serverless functions)
- DigitalOcean

Make sure to set environment variables in your deployment environment.

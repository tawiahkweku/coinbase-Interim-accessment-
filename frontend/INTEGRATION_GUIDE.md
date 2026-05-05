# Coinbase Clone - Full-Stack Integration Guide

This guide explains how to set up and run the complete Coinbase Clone application with backend integration.

## Project Structure

```
coinbase-clone/
├── backend/                 # Node.js + MongoDB API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Main server file
│   ├── seed.js             # Database seeding script
│   └── package.json
├── src/
│   ├── components/         # React components
│   │   ├── auth/           # Authentication components
│   │   ├── crypto/         # Crypto-related components
│   │   └── layout/         # Layout components
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   └── App.jsx             # Main app component
└── package.json
```

## Features Implemented

### ✅ Authentication System
- **JWT-based authentication** with secure token storage
- **User registration** with validation (name, email, password)
- **User login** with email/password authentication
- **Protected routes** that require authentication
- **Automatic token management** with interceptors

### ✅ User Management
- **User profile page** (`/profile`) - protected route
- **Profile editing** functionality
- **User session management**
- **Logout functionality**

### ✅ Cryptocurrency Data
- **GET /crypto** - All tradable cryptocurrencies
- **GET /crypto/gainers** - Top gainers sorted by 24h change
- **GET /crypto/new** - New listings
- **POST /crypto** - Add new cryptocurrency (authenticated)
- **Real-time data display** on frontend

### ✅ Frontend Integration
- **React Context** for authentication state
- **API service layer** with axios interceptors
- **Protected route components**
- **Responsive UI** with authentication states
- **Error handling** and loading states

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
# Copy .env file and update with your MongoDB URI
cp .env.example .env

# Seed the database with sample data
node seed.js

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to root directory
cd ..

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Environment Configuration

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/coinbase-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User (Protected)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Cryptocurrency
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top gainers
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new cryptocurrency (protected)

### Health Check
- `GET /api/health` - Server health status

## Testing the Application

### 1. Test Authentication
1. Navigate to `http://localhost:5173/signup`
2. Create a new account
3. Verify you're redirected to home page
4. Check that navbar shows user menu

### 2. Test Protected Routes
1. Try accessing `http://localhost:5173/profile` without login
2. Should redirect to signin page
3. Login and try again - should access profile

### 3. Test Crypto Data
1. Navigate to home page
2. Check crypto ticker section loads data
3. Switch between "Tradable", "Top gainers", "New on Coinbase" tabs
4. Verify data changes appropriately

### 4. Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test crypto endpoints
curl http://localhost:5000/api/crypto
curl http://localhost:5000/api/crypto/gainers
curl http://localhost:5000/api/crypto/new

# Test authentication
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

## Deployment

### Backend Deployment (Render)
1. Push backend code to GitHub
2. Create new Render service
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Update API base URL in `src/services/api.js`
2. Push frontend code to GitHub
3. Deploy to Vercel/Netlify
4. Set environment variables if needed

## Security Features

- **Password hashing** with bcryptjs
- **JWT token** authentication
- **Request validation** with express-validator
- **CORS protection**
- **Input sanitization**
- **Protected routes** with middleware

## Sample Data

The backend includes 10 sample cryptocurrencies:
- Bitcoin (BTC), Ethereum (ETH), Solana (SOL)
- Cardano (ADA), Polygon (MATIC), Avalanche (AVAX)
- Chainlink (LINK), Polkadot (DOT)
- NewCoin (NEW), FutureToken (FTK) - marked as new listings

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env
   - Verify database name is correct

2. **CORS Issues**
   - Backend CORS is configured for localhost:5173
   - Update if using different frontend port

3. **Authentication Errors**
   - Check JWT_SECRET in .env
   - Verify token storage in localStorage
   - Check API base URL configuration

4. **Frontend Not Loading Data**
   - Ensure backend is running on port 5000
   - Check API service configuration
   - Verify network requests in browser dev tools

### Development Tips

1. Use browser dev tools to monitor API requests
2. Check backend console for error messages
3. Verify MongoDB data using MongoDB Compass
4. Test endpoints individually with curl/Postman

## Next Steps

Potential enhancements:
- Add more cryptocurrency features (buy/sell simulation)
- Implement real-time price updates with WebSockets
- Add portfolio tracking
- Implement transaction history
- Add more user profile features
- Enhance mobile responsiveness
- Add unit and integration tests

## Submission Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel/Netlify
- [ ] All API endpoints tested
- [ ] Authentication flow working
- [ ] Protected routes functioning
- [ ] Crypto data displaying correctly
- [ ] Database seeded with sample data
- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Documentation updated

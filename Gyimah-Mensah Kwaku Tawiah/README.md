[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fcRde9Vj)
# Coinbase Clone - Full-Stack Integration

## 📋 Overview

This is a **full-stack Coinbase clone** with complete backend integration, featuring JWT authentication, cryptocurrency management, and protected user profiles. The application includes both a Node.js/MongoDB backend API and a React frontend with real-time data integration.

---

## 🚀 Quick Start

### 📦 Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd coinbase-clone
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with sample data
node seed.js

# Start backend server
npm run dev
```
**Backend runs on:** `http://localhost:5000`

### 3. Frontend Setup
```bash
# Navigate to root directory (in new terminal)
cd ..

# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```
**Frontend runs on:** `http://localhost:5174` (or `http://localhost:5173`)

---

## 🎯 Features Implemented

### ✅ Authentication System
- **JWT-based authentication** with secure token storage
- **User registration** (`/signup`) with validation
- **User login** (`/signin`) with email/password
- **Protected routes** requiring authentication
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

### ✅ Frontend Features
- **React Context** for authentication state
- **API service layer** with axios interceptors
- **Protected route components**
- **Responsive UI** with authentication states
- **Error handling** and loading states

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user and return JWT token

### User (Protected)
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Cryptocurrency
- `GET /api/crypto` - Get all cryptocurrencies
- `GET /api/crypto/gainers` - Get top gainers (sorted by 24h change)
- `GET /api/crypto/new` - Get new listings
- `POST /api/crypto` - Add new cryptocurrency (protected)
- `GET /api/crypto/:id` - Get single cryptocurrency by ID

### Health Check
- `GET /api/health` - Server health status

---

## 📁 Project Structure

```
coinbase-clone/
├── backend/                 # Node.js + MongoDB API
│   ├── models/             # Mongoose schemas (User, Crypto)
│   ├── routes/             # Express routes (auth, crypto, user)
│   ├── middleware/         # Authentication middleware
│   ├── server.js           # Main server file
│   ├── seed.js             # Database seeding script
│   └── package.json
├── src/
│   ├── components/         # React components
│   │   ├── auth/           # Authentication components
│   │   ├── crypto/         # Crypto-related components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── contexts/           # React contexts (AuthContext)
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Profile.jsx     # Protected route
│   │   ├── Explore.jsx
│   │   ├── AssetDetail.jsx
│   │   └── Learn.jsx
│   ├── services/           # API service functions
│   ├── App.jsx             # Main app with routing
│   └── main.jsx            # Application entry point
└── package.json
```

---

## 🧪 Testing the Application

### 1. Test Authentication Flow
1. Navigate to `http://localhost:5174/signup`
2. Create a new account with name, email, password
3. Verify you're redirected to home page after registration
4. Check navbar shows user menu with profile/logout options

### 2. Test Protected Routes
1. Try accessing `http://localhost:5174/profile` without login
2. Should redirect to signin page
3. Login and try again - should access profile page

### 3. Test Crypto Data
1. Navigate to home page
2. Check crypto ticker section loads data from backend
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

---

## 🚀 Deployment Instructions

### Backend Deployment (Render)
1. **Push backend code to GitHub**
2. **Create new Render service**
3. **Connect GitHub repository**
4. **Set environment variables**:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Secure JWT secret key
   - `NODE_ENV` - production
5. **Deploy and test API endpoints**

### Frontend Deployment (Vercel/Netlify)
1. **Update API base URL** in `src/services/api.js` to deployed backend URL
2. **Push frontend code to GitHub**
3. **Deploy to Vercel/Netlify**
4. **Test complete application**

### Environment Variables
```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/coinbase-clone
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

---

## 🔒 Security Features

- **Password hashing** with bcryptjs
- **JWT token** authentication with expiration
- **Request validation** with express-validator
- **CORS protection** configured for frontend
- **Input sanitization** and error handling
- **Protected routes** with authentication middleware

---

## 📊 Sample Data

The backend includes 10 sample cryptocurrencies:
- **Bitcoin (BTC)**, **Ethereum (ETH)**, **Solana (SOL)**
- **Cardano (ADA)**, **Polygon (MATIC)**, **Avalanche (AVAX)**
- **Chainlink (LINK)**, **Polkadot (DOT)**
- **NewCoin (NEW)**, **FutureToken (FTK)** - marked as new listings

---

## 🎨 Design Reference

Visit [coinbase.com](https://www.coinbase.com/) for:
- Overall layout and structure
- Consistent color scheme and typography
- Navigation flow between pages
- Responsive behavior on all screen sizes
- User interface patterns and interactions

---

## 💡 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Heroicons** - Icons
- **Vite** - Build tool

---

## 🌐 Deployment Links

**🚀 IMPORTANT: Submit the following links via Google Form:**
- **Deployed Backend URL** (Render)
- **Deployed Frontend URL** (Vercel/Netlify)
- **GitHub Repository URL**

**⚠️ Note:** Ensure all submitted links are working and accessible. No marks will be awarded for invalid or inaccessible submissions.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [Vercel Deployment Guide](https://vercel.com/docs/frameworks/react)

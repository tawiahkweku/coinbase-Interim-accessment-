import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        // Verify token is still valid by fetching profile
        userAPI.getProfile()
          .then(response => {
            if (response.data.success) {
              setUser(response.data.data);
              localStorage.setItem('user', JSON.stringify(response.data.data));
            }
          })
          .catch(() => {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(userData);
      
      if (response.data.success) {
        const { user: newUser, token } = response.data.data;
        setUser(newUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(credentials);
      
      if (response.data.success) {
        const { user: loggedInUser, token } = response.data.data;
        setUser(loggedInUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setError(null);
  };

  const loginWithDemo = async () => {
    try {
      setLoading(true);
      setError(null);
      // Try to login with demo credentials
      const response = await authAPI.login({ 
        email: 'demo@coinbase.demo', 
        password: 'demo123456' 
      });
      
      if (response.data.success) {
        const { user: demoUser, token } = response.data.data;
        setUser(demoUser);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, message: 'Logged in with demo account' };
      }
    } catch (error) {
      // Demo user doesn't exist, create one
      try {
        const response = await authAPI.register({
          name: 'Demo User',
          email: 'demo@coinbase.demo',
          password: 'demo123456'
        });
        
        if (response.data.success) {
          const { user: demoUser, token } = response.data.data;
          setUser(demoUser);
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(demoUser));
          return { success: true, message: 'Demo account created' };
        }
      } catch (registerError) {
        // If registration also fails, try direct login (user might already exist from previous session)
        const message = 'Could not create demo account. Please try regular signup.';
        setError(message);
        return { success: false, message };
      }
    } finally {
      setLoading(false);
    }
    return { success: false, message: 'Demo login failed' };
  };

  const updateUserProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await userAPI.updateProfile(userData);
      
      if (response.data.success) {
        const updatedUser = response.data.data;
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true, message: response.data.message };
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    loginWithDemo,
    updateUserProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

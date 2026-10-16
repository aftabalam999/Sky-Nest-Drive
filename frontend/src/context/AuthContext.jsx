import { useState, useEffect } from 'react';
import { AuthContext } from './authContextInstance';

const TOKEN_KEY = 'sky_nest_token';
const USER_KEY = 'sky_nest_user';
const API_URL = import.meta.env.VITE_API_URL || '/api/auth';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // Validate token and restore profile from server on initial mount
  useEffect(() => {
    const verifyToken = async () => {
      const activeToken = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      if (!activeToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            setUser(data.user);
            setToken(activeToken);
            // Sync user to storage
            if (localStorage.getItem(TOKEN_KEY)) {
              localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            } else {
              sessionStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
          } else {
            logout();
          }
        } else {
          // Token expired or invalid
          logout();
        }
      } catch (err) {
        console.warn('Backend server verification error:', err);
        // Keep cached user if server is momentarily unreachable
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Server Login
  const login = async (email, password, rememberMe = true) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setLoading(false);
        return {
          success: false,
          message: data.message || 'Login failed. Please check your credentials.',
        };
      }

      const targetStorage = rememberMe ? localStorage : sessionStorage;
      // Clear alternative storage to avoid conflicting tokens
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);

      targetStorage.setItem(TOKEN_KEY, data.token);
      targetStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      setLoading(false);

      return {
        success: true,
        user: data.user,
        message: data.message,
      };
    } catch (err) {
      console.error('Server login network error:', err);
      setLoading(false);
      return {
        success: false,
        message: 'Unable to connect to authentication server. Please ensure backend is running.',
      };
    }
  };

  // Server Register / Signup
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setLoading(false);
        return {
          success: false,
          message: data.message || 'Account registration failed. Please try again.',
        };
      }

      // Automatically log the newly registered user in
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
      setLoading(false);

      return {
        success: true,
        user: data.user,
        message: data.message,
      };
    } catch (err) {
      console.error('Server signup network error:', err);
      setLoading(false);
      return {
        success: false,
        message: 'Unable to connect to registration server. Please check backend connection.',
      };
    }
  };

  // Logout - removes session tokens from both storages
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  // Forgot Password API Call
  const forgotPassword = async (email) => {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return {
        success: response.ok && data.success,
        message: data.message || 'Password reset request processed.',
      };
    } catch (err) {
      console.error('Forgot password network error:', err);
      return {
        success: false,
        message: 'Network error communicating with server.',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

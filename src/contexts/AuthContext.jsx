import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginApi, registerApi } from '@/api/auth';
import { responseErrors } from '@/utils/helpers';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (data) => {
    try {
      const response = await loginApi(data);

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }

    } catch (error) {
      responseErrors(error)
      console.error('# Login error:', error);
    }
  };

  const registerUser = async (data) => {
    try {
      const response = await registerApi(data);

      if (response.status === 200) {
        const { user } = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }

    } catch (error) {
      responseErrors(error)
      console.error('# Register error:', error.response);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      registerUser,
      loading, // Include loading in the context value
    }), [user, loading]); // Add loading to the dependency array

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

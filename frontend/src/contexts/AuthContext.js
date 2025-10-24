// frontend/src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // 토큰을 헤더에 먼저 설정
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      const response = await api.get('/auth/user/');
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login/', { username, password });
      console.log('로그인 응답:', response.data);
      
      const token = response.data.token;
      
      if (!token) {
        console.error('토큰이 응답에 없습니다:', response.data);
        return false;
      }
      
      // 토큰 저장
      localStorage.setItem('token', token);
      
      // API 기본 헤더에 토큰 설정
      api.defaults.headers.common['Authorization'] = `Token ${token}`;
      
      console.log('토큰 설정 완료:', token);
      
      // 사용자 정보 가져오기
      const userResponse = await api.get('/auth/user/');
      setUser(userResponse.data);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
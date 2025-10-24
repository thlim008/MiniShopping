// frontend/src/contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) {
      console.log('사용자가 로그인하지 않음');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('장바구니 요청 토큰:', token); // 디버깅용
      
      const response = await api.get('/orders/cart/');
      setCart(response.data);
    } catch (error) {
      console.error('장바구니 로드 실패:', error.response?.data || error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/orders/cart/add/', {
        product_id: productId,
        quantity: quantity,
      });
      setCart(response.data);
      return true;
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      return false;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await api.put(`/orders/cart/items/${itemId}/`, {
        quantity: quantity,
      });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('장바구니 수정 실패:', error);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/orders/cart/items/${itemId}/`);
      await fetchCart();
      return true;
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      return false;
    }
  };

  const clearCart = () => {
    setCart({ items: [], total_price: 0 });
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      fetchCart, 
      addToCart, 
      updateCartItem, 
      removeFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
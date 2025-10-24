// frontend/src/contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total_price: 0 }); // 초기값 설정 중요!
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], total_price: 0 }); // 로그아웃시 초기화
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders/cart/');
      // 응답이 없거나 items가 없으면 기본값 설정
      setCart({
        items: response.data.items || [],
        total_price: response.data.total_price || 0,
        ...response.data
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // 오류시 기본값 설정
      setCart({ items: [], total_price: 0 });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      return { 
        success: false, 
        error: '로그인이 필요합니다.' 
      };
    }

    try {
      await api.post('/orders/cart/add/', {
        product_id: productId,
        quantity,
      });
      await fetchCart();
      return { success: true };
    } catch (error) {
      console.error('Add to cart error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || '장바구니 추가 실패' 
      };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await api.patch(`/orders/cart/items/${itemId}/`, {
        quantity,
      });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: '수량 업데이트 실패' 
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/orders/cart/items/${itemId}/remove/`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: '상품 제거 실패' 
      };
    }
  };

  const clearCart = () => {
    setCart({ items: [], total_price: 0 });
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
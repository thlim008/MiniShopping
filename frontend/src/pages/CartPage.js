// frontend/src/pages/CartPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  TextField,
  Box,
  Paper,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart, clearCart, fetchCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({
    shipping_address: user?.address || '',
    phone_number: user?.phone_number || '',
  });

  useEffect(() => {
    if (user) {
      setOrderInfo({
        shipping_address: user.address || '',
        phone_number: user.phone_number || '',
      });
      if (fetchCart) {
        fetchCart();
      }
    }
  }, [user, fetchCart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity > 0) {
      await updateCartItem(itemId, newQuantity);
    }
  };

  const handleRemoveItem = async (itemId) => {
    await removeFromCart(itemId);
  };

  const handleOrderSubmit = async () => {
    if (!orderInfo.shipping_address || !orderInfo.phone_number) {
      alert('배송 정보를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await api.post('/orders/create/', orderInfo);
      alert('주문이 완료되었습니다!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert('주문 처리 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h4">로그인이 필요합니다.</Typography>
        <Button onClick={() => navigate('/login')}>로그인 페이지로</Button>
      </Container>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <Container>
        <Typography variant="h4">장바구니가 비어있습니다.</Typography>
        <Button onClick={() => navigate('/')}>쇼핑 계속하기</Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        장바구니
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <List>
          {cart.items.map((item) => (
            <div key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.product.name}
                  secondary={`₩${Number(item.product.price).toLocaleString()} x ${item.quantity}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton 
                    size="small"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton 
                    size="small"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        
        <Typography variant="h6" sx={{ mt: 2 }}>
          총 금액: ₩{Number(cart.total_price).toLocaleString()}
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          배송 정보
        </Typography>
        
        <TextField
          fullWidth
          label="배송 주소"
          value={orderInfo.shipping_address}
          onChange={(e) => setOrderInfo({...orderInfo, shipping_address: e.target.value})}
          margin="normal"
          multiline
          rows={2}
        />
        
        <TextField
          fullWidth
          label="전화번호"
          value={orderInfo.phone_number}
          onChange={(e) => setOrderInfo({...orderInfo, phone_number: e.target.value})}
          margin="normal"
        />
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          onClick={handleOrderSubmit}
        >
          주문 완료
        </Button>
      </Paper>
    </Container>
  );
};

export default CartPage;
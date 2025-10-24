// frontend/src/components/Layout.js
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Container,
  Box,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 안전한 접근 - cart.items가 undefined일 수 있음
  const cartItemCount = cart?.items?.length || 0;

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              🛒 미니 쇼핑몰
            </Link>
          </Typography>
          
          <IconButton color="inherit" onClick={() => navigate('/cart')}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/orders')}>
                주문내역
              </Button>
              <Button color="inherit">
                {user.username}님
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                로그인
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                회원가입
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import api from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    
    const success = await addToCart(productId, 1);
    if (success) {
      alert('장바구니에 추가되었습니다!');
    } else {
      alert('장바구니 추가에 실패했습니다.');
    }
  };

  if (loading) return <Typography>로딩 중...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        상품 목록
      </Typography>
      
      <Grid container spacing={4}>
        {products.length === 0 ? (
          <Grid item xs={12}>
            <Typography>상품이 없습니다. Admin 페이지에서 상품을 추가해주세요.</Typography>
          </Grid>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.image 
                      ? `http://localhost:8000${product.image}` 
                      : 'https://placehold.co/200x200?text=No+Image'
                  }
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/200x200?text=No+Image';
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    카테고리: {product.category_name}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ₩{Number(product.price).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    재고: {product.stock}개
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    장바구니 담기
                  </Button>
                  <Button 
                    size="small" 
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    상세보기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
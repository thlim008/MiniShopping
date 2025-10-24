import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Chip
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/${id}/`);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('상품을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const result = addToCart(product, quantity);
    if (result.success) {
      alert(result.message);
      navigate('/cart');
    } else {
      alert(result.message);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || '상품을 찾을 수 없습니다.'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          목록으로 돌아가기
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        목록으로
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={
                product.image
                  ? `http://localhost:8000${product.image}`
                  : 'https://via.placeholder.com/400'
              }
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: 2
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Chip
                label={product.stock > 0 ? `재고: ${product.stock}개` : '품절'}
                color={product.stock > 0 ? 'success' : 'error'}
                sx={{ mb: 2 }}
              />

              <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                {product.price.toLocaleString()}원
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" gutterBottom>
                  수량
                </Typography>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{
                    min: 1,
                    max: product.stock
                  }}
                  sx={{ width: '100px', mb: 3 }}
                />

                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? '품절' : '장바구니 담기'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetailPage;
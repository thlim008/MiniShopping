import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/orders/list/');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('주문 내역을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '주문 대기';
      case 'confirmed':
        return '주문 확인';
      case 'shipped':
        return '배송 중';
      case 'delivered':
        return '배송 완료';
      case 'cancelled':
        return '주문 취소';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (orders.length === 0) {
    return (
      <Container>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            주문 내역이 없습니다
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        주문 내역
      </Typography>

      <Box sx={{ mt: 3 }}>
        {orders.map((order) => (
          <Accordion key={order.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="h6">
                  주문번호: {order.id}
                </Typography>
                <Chip
                  label={getStatusText(order.status)}
                  color={getStatusColor(order.status)}
                  size="small"
                />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                  {new Date(order.created_at).toLocaleDateString('ko-KR')}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  주문 정보
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">이름: {order.customer_name}</Typography>
                  <Typography variant="body2">이메일: {order.customer_email}</Typography>
                  <Typography variant="body2">전화번호: {order.customer_phone}</Typography>
                  <Typography variant="body2">배송지: {order.shipping_address}</Typography>
                </Box>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  주문 상품
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>상품명</TableCell>
                        <TableCell align="right">수량</TableCell>
                        <TableCell align="right">가격</TableCell>
                        <TableCell align="right">합계</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product_name}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{item.price.toLocaleString()}원</TableCell>
                          <TableCell align="right">
                            {(item.price * item.quantity).toLocaleString()}원
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="h6" color="primary">
                    총 금액: {order.total_price.toLocaleString()}원
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default OrdersPage;
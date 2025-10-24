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
import api from '../services/api'; // ✅ axios 대신 api 사용!
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
      // ✅ api 사용 (토큰 자동 포함), URL 수정
      const response = await api.get('/orders/orders/');
      console.log('주문 목록:', response.data);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      console.error('주문 목록 로드 실패:', err.response?.data || err);
      setError('주문 내역을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
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
        return '주문대기';
      case 'processing':
        return '처리중';
      case 'shipped':
        return '배송중';
      case 'delivered':
        return '배송완료';
      case 'cancelled':
        return '취소됨';
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
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
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
                  배송 정보
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">전화번호: {order.phone_number}</Typography>
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
                      {order.items && order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product?.name || '상품명 없음'}</TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">{Number(item.price).toLocaleString()}원</TableCell>
                          <TableCell align="right">
                            {(Number(item.price) * item.quantity).toLocaleString()}원
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="h6" color="primary">
                    총 금액: {Number(order.total_amount).toLocaleString()}원
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
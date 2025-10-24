from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from django.db import transaction
from .models import Cart, CartItem, Order, OrderItem
from products.models import Product
from .serializers import (
    CartSerializer, 
    CartItemSerializer,
    OrderSerializer,
    OrderCreateSerializer
)

class CartView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        product = get_object_or_404(Product, id=product_id, is_active=True)
        cart, created = Cart.objects.get_or_create(user=request.user)
        
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UpdateCartItemView(generics.UpdateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

class RemoveFromCartView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        
        if not cart.items.exists():
            return Response(
                {"error": "장바구니가 비어있습니다."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = OrderCreateSerializer(data=request.data)
        if serializer.is_valid():
            # 주문 생성
            order = Order.objects.create(
                user=request.user,
                total_amount=cart.total_price,
                shipping_address=serializer.validated_data['shipping_address'],
                phone_number=serializer.validated_data['phone_number']
            )
            
            # 주문 아이템 생성
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )
                
                # 재고 감소
                item.product.stock -= item.quantity
                item.product.save()
            
            # 장바구니 비우기
            cart.items.all().delete()
            
            return Response(
                OrderSerializer(order).data, 
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['POST'])
@permission_classes([AllowAny])
def simple_order_create(request):
    """장바구니 없이 바로 주문하는 API"""
    from django.db import transaction
    
    customer_name = request.data.get('customer_name')
    customer_email = request.data.get('customer_email')
    customer_phone = request.data.get('customer_phone')
    shipping_address = request.data.get('shipping_address')
    items = request.data.get('items', [])

    if not all([customer_name, customer_email, customer_phone, shipping_address]):
        return Response(
            {'error': '모든 주문 정보를 입력해주세요.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not items:
        return Response(
            {'error': '주문할 상품이 없습니다.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            total_amount = 0
            
            # 주문 생성
            order = Order.objects.create(
                user=request.user if request.user.is_authenticated else None,
                total_amount=0,  # 나중에 업데이트
                shipping_address=shipping_address,
                phone_number=customer_phone,
                status='pending'
            )

            # 주문 아이템 생성
            for item_data in items:
                product_id = item_data.get('product_id')
                quantity = item_data.get('quantity')
                price = item_data.get('price')

                product = get_object_or_404(Product, id=product_id)

                if product.stock < quantity:
                    raise ValueError(f'{product.name}의 재고가 부족합니다.')

                # 재고 감소
                product.stock -= quantity
                product.save()

                # 주문 아이템 생성
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=price
                )

                total_amount += price * quantity

            # 총 가격 업데이트
            order.total_amount = total_amount
            order.save()

            return Response({
                'id': order.id,
                'total_price': total_amount,
                'status': order.status,
                'message': '주문이 완료되었습니다.'
            }, status=status.HTTP_201_CREATED)

    except ValueError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': '주문 처리 중 오류가 발생했습니다.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.db import transaction

@api_view(['POST'])
@permission_classes([AllowAny])
def simple_order_create(request):
    """장바구니 없이 바로 주문하는 API"""
    customer_name = request.data.get('customer_name')
    customer_email = request.data.get('customer_email')
    customer_phone = request.data.get('customer_phone')
    shipping_address = request.data.get('shipping_address')
    items = request.data.get('items', [])

    if not all([customer_name, customer_email, customer_phone, shipping_address]):
        return Response(
            {'error': '모든 주문 정보를 입력해주세요.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not items:
        return Response(
            {'error': '주문할 상품이 없습니다.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            total_amount = 0
            
            # 주문 생성
            order = Order.objects.create(
                user=request.user if request.user.is_authenticated else None,
                total_amount=0,
                shipping_address=shipping_address,
                phone_number=customer_phone,
                status='pending'
            )

            # 주문 아이템 생성
            for item_data in items:
                product_id = item_data.get('product_id')
                quantity = item_data.get('quantity')
                price = item_data.get('price')

                product = get_object_or_404(Product, id=product_id)

                if product.stock < quantity:
                    raise ValueError(f'{product.name}의 재고가 부족합니다.')

                # 재고 감소
                product.stock -= quantity
                product.save()

                # 주문 아이템 생성
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=price
                )

                total_amount += price * quantity

            # 총 가격 업데이트
            order.total_amount = total_amount
            order.save()

            return Response({
                'id': order.id,
                'total_price': total_amount,
                'status': order.status,
                'message': '주문이 완료되었습니다.'
            }, status=status.HTTP_201_CREATED)

    except ValueError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {'error': '주문 처리 중 오류가 발생했습니다.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def simple_order_list(request):
    """로그인한 사용자의 주문 목록"""
    orders = Order.objects.filter(user=request.user).prefetch_related('items__product')
    
    orders_data = []
    for order in orders:
        items_data = []
        for item in order.items.all():
            items_data.append({
                'id': item.id,
                'product_name': item.product.name,
                'quantity': item.quantity,
                'price': float(item.price)
            })
        
        orders_data.append({
            'id': order.id,
            'customer_name': request.user.username,
            'customer_email': request.user.email,
            'customer_phone': order.phone_number,
            'shipping_address': order.shipping_address,
            'total_price': float(order.total_amount),
            'status': order.status,
            'created_at': order.created_at,
            'items': items_data
        })
    
    return Response(orders_data)
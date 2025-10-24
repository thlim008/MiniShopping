from django.urls import path
from . import views

urlpatterns = [
    # 간단한 주문 API (프론트엔드용)
    path('', views.simple_order_create, name='simple-order-create'),
    path('list/', views.simple_order_list, name='simple-order-list'),
    
    # 기존 장바구니 기반 API
    path('cart/', views.CartView.as_view(), name='cart'),
    path('cart/add/', views.AddToCartView.as_view(), name='add-to-cart'),
    path('cart/item/<int:pk>/', views.UpdateCartItemView.as_view(), name='update-cart-item'),
    path('cart/item/<int:pk>/remove/', views.RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/create/', views.OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
]
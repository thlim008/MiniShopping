from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': 'Welcome to Mini Shop API',
        'endpoints': {
            'admin': '/admin/',
            'products': '/api/products/',
            'orders': '/api/orders/',
            'auth': {
                'login': '/api/auth/login/',
                'register': '/api/auth/register/',
                'logout': '/api/auth/logout/',
                'user': '/api/auth/user/',
            }
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/products/', include('products.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/auth/', include('accounts.urls')),
    
    # JWT 토큰 인증 - 제거 또는 주석 처리!
    # path('api/accounts/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/accounts/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
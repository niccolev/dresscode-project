from django.urls import path
from . import views


urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.getRoutes, name='routes'),

    path('users/register/', views.registerUser, name="register"),

    path('products/', views.getProducts, name='products'),
    path('products/upload/', views.uploadImage, name='image-upload'),
    path('products/<int:pk>/', views.getProduct, name='product'),
    path('products/<int:pk>/reviews/', views.createProductReview, name='create-review'),
    path('products/create/', views.createProduct, name='product-create'),
    path('products/update/<int:pk>/', views.updateProduct, name='product-update'),
    path('products/delete/<int:pk>/', views.deleteProduct, name='product-delete'),

    path('users/profile/', views.getUserProfile, name='users-profile'),
    path('users/', views.getUsers, name='users'),
    path('users/', views.getUsers, name='users'),
    path('users/<int:pk>/', views.getUserById, name='user'),
    path('users/update/<int:pk>/', views.updateUser, name='user-update'),
    path('users/delete/<int:pk>/', views.deleteUser, name='user-delete'),

    path('orders/add/', views.addOrderItems, name='orders-add'),
    path('orders/', views.getOrders, name='orders'),
    path('orders/myorders/', views.getMyOrders, name='my-orders'),
    path('orders/<int:pk>/deliver/', views.updateOrderToDelivered, name='user-delivered'),
    path('orders/<int:pk>/', views.getOrderById, name='user-order'),
    path('orders/<int:pk>/pay/', views.updateOrderToPaid, name='pay'),
]

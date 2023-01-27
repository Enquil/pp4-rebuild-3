from django.urls import path
from . import views

urlpatterns = [
    path("", views.PostList.as_view(), name="index"),
    path('financedata/', views.financedata, name='financedata'),
    path('<slug:slug>/', views.PostDetail.as_view(), name='post_detail'),
]

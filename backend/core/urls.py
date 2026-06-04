from django.urls import path
from .views import SubmitLead, AdminLogin, LeadList, LeadDetail

urlpatterns = [
    # Public
    path('leads/',                      SubmitLead.as_view(),  name='submit-lead'),

    # Admin
    path('admin-portal/login/',         AdminLogin.as_view(),  name='admin-login'),
    path('admin-portal/leads/',         LeadList.as_view(),    name='lead-list'),
    path('admin-portal/leads/<int:pk>/', LeadDetail.as_view(), name='lead-detail'),
]

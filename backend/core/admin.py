from django.contrib import admin
from .models import Lead


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display  = ('name', 'email', 'service', 'budget', 'is_read', 'created_at')
    list_filter   = ('is_read', 'service')
    search_fields = ('name', 'email', 'company', 'message')
    readonly_fields = ('created_at',)
    ordering      = ('-created_at',)

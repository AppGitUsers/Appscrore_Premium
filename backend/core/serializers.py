from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Lead
        fields = [
            'id', 'name', 'email', 'phone', 'company',
            'service', 'budget', 'timeline', 'message',
            'is_read', 'created_at',
        ]
        read_only_fields = ['id', 'is_read', 'created_at']


class LeadSubmitSerializer(serializers.ModelSerializer):
    """Used for public form submission — stricter validation."""
    name    = serializers.CharField(max_length=255)
    email   = serializers.EmailField()
    message = serializers.CharField()

    class Meta:
        model  = Lead
        fields = ['name', 'email', 'phone', 'company', 'service', 'budget', 'timeline', 'message']

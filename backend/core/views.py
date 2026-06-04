from django.contrib.auth import authenticate
from rest_framework                      import status
from rest_framework.views                import APIView
from rest_framework.response             import Response
from rest_framework.permissions          import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens     import RefreshToken
from django.utils                        import timezone
import datetime

from .models       import Lead
from .serializers  import LeadSerializer, LeadSubmitSerializer


# ── Public: submit contact form ───────────────────────────────────────────────
class SubmitLead(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LeadSubmitSerializer(data=request.data)
        if serializer.is_valid():
            lead = serializer.save()
            return Response(
                {'id': lead.id, 'message': 'Enquiry submitted successfully'},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ── Admin: login ──────────────────────────────────────────────────────────────
class AdminLogin(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username', '').strip()
        password = request.data.get('password', '').strip()

        if not username or not password:
            return Response(
                {'error': 'Username and password are required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(username=username, password=password)
        if user is None or not user.is_staff:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)
        return Response({
            'access':  str(refresh.access_token),
            'refresh': str(refresh),
        })


# ── Admin: list leads + stats ─────────────────────────────────────────────────
class LeadList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        leads  = Lead.objects.all()
        today  = timezone.now().date()

        stats = {
            'total':  leads.count(),
            'unread': leads.filter(is_read=False).count(),
            'today':  leads.filter(created_at__date=today).count(),
        }

        serializer = LeadSerializer(leads, many=True)
        return Response({'leads': serializer.data, 'stats': stats})


# ── Admin: mark as read / delete ──────────────────────────────────────────────
class LeadDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Lead.objects.get(pk=pk)
        except Lead.DoesNotExist:
            return None

    def patch(self, request, pk):
        lead = self.get_object(pk)
        if lead is None:
            return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)
        lead.is_read = True
        lead.save()
        return Response({'success': True})

    def delete(self, request, pk):
        lead = self.get_object(pk)
        if lead is None:
            return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)
        lead.delete()
        return Response({'success': True}, status=status.HTTP_200_OK)

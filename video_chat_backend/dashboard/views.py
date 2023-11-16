from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from . serializer import AccountSerializer, ChatGroupSerializer
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from . models import Account, ChatGroup, ChatMessage
from rest_framework.permissions import IsAuthenticated


# jwt token authentication
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['is_active'] = user.is_active
        token['email'] = user.email

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def home(request):
    context = {}
    return Response({'data':context}, status=status.HTTP_200_OK)

# user signup
@api_view(['POST'])
def Signup(request):
    data = request.data['formData']
    data['first_name'] = data['firstName']
    data['last_name'] = data['lastName']
    password = data['password']
    email = data['email']
    if Account.objects.filter(email=email).exists():
        message = 'Email already exists!'
        res_status = status.HTTP_202_ACCEPTED
        context = {
            'message':message
        }
        return Response({'data':context}, status=res_status)
    serializer = AccountSerializer(data=data, many=False)
    if serializer.is_valid():
        obj = serializer.save()
        obj.is_active = True
        obj.password = make_password(password)
        obj.save()
        message = 'Signup successfull!'
        res_status=status.HTTP_200_OK
    else:
        message='Invalid inputs!'
        res_status = status.HTTP_202_ACCEPTED
    context = {
        'message':message,
    }
    return Response({'data':context}, status=res_status)

# Create a new room 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_room(request):
    if request.method == 'POST':
        room_name = request.data.get('roomName')
        try:
            if ChatGroup.objects.filter(name=room_name).exists():
                context = {
                    'roomName':room_name,
                    'message':'Room already exists!'
                }
                res_status = status.HTTP_202_ACCEPTED
                return Response({'data':context}, status=res_status)
            chat_group = ChatGroup.objects.create(name=room_name, created_by = request.user)

            # You might want to redirect the user to the room after creation
        except Exception as e:
            context = {
                'roomName':room_name,
                'message':'Room creation failed!'
            }
            res_status = status.HTTP_202_ACCEPTED
            return Response({'data':context}, status=res_status)
        res_status = status.HTTP_201_CREATED
        context = {
            'roomName':room_name,
            'message':'Room created successfully!'
        }
        return Response({'data':context}, status=res_status)
    
# enter to an existing chat room
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def enter_to_room(request, roomName):
    context = {}
    room_name = request.GET.get('roomName')
    if ChatGroup.objects.filter(name=roomName).exists():
        room = ChatGroup.objects.get(name=roomName)
        serializer = ChatGroupSerializer(room, many=False)
        context['message'] = 'Start chat!'
        context['roomName'] = serializer.data
        res_status = status.HTTP_200_OK
    else:
        context['message'] = 'Room does not exists'
        res_status = status.HTTP_202_ACCEPTED
    return Response({'data':context}, status=res_status)
    

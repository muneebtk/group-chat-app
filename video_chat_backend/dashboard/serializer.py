from rest_framework import serializers
from . models import Account, ChatGroup, ChatMessage

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class ChatGroupSerializer(serializers.ModelSerializer):
    created_by = AccountSerializer()
    class Meta:
        model = ChatGroup
        fields = ['name', 'created_by', 'date_time']
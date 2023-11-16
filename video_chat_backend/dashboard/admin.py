from django.contrib import admin
from . models import Account, ChatGroup, ChatMessage
# Register your models here.

admin.site.register(Account)
admin.site.register(ChatMessage)
admin.site.register(ChatGroup)
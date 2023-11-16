# from channels.routing import URLRouter, ProtocolTypeRouter
# from django.urls import path, re_path
# from dashboard.consumers import VideoChatConsumer

# websocket_urlpatterns = [
#     re_path(r'^ws/some_path/$', VideoChatConsumer.as_asgi()),
# ]

# application = ProtocolTypeRouter({
#     'websocket': URLRouter(websocket_urlpatterns),
# })

# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.urls import path
# from dashboard.consumers import VideoCallConsumer

# application = ProtocolTypeRouter({
#     'websocket': URLRouter([
#         path('ws/chat/', VideoCallConsumer.as_asgi()),
#     ])
# })

# routing.py
from django.urls import re_path

from dashboard import consumers

websocket_urlpatterns = [
re_path(r'ws/some_path/$', consumers.MyConsumer.as_asgi()),
]

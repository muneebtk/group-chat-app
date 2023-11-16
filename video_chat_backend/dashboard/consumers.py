import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from . models import ChatGroup, ChatMessage, Account


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get("type")

        if message_type == "webrtc":
            # Signaling message for WebRTC
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, {"type": "webrtc_message", "data": text_data_json}
            )
        elif message_type == "chat_message":
            # Normal chat message
            message = text_data_json["message"]
            email = text_data_json.get('email')
            try:
                room_name = self.room_name
                message_by = Account.objects.get(email=email)
                group = ChatGroup.objects.get(name=room_name)
            except:
                pass
            ChatMessage.objects.create(message=message, message_by=message_by, group=group)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name, 
                {
                    'email':email,
                    "type": "chat_message",
                    "message": message,
                })
        else:
            raise ValueError("No handler for message type %s" % message_type)

    # Receive WebRTC message from room group
    def webrtc_message(self, event):
        data = event["data"]
        self.send(text_data=json.dumps(data))

    # Receive chat message from room group
    def chat_message(self, event):
        message = event["message"]
        email = event['email'] # additonally added the email
        self.send(text_data=json.dumps({"type": "chat_message", "message": message, 'email':email}))

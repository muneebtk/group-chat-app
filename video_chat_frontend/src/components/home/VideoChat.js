import { Button, Card, CardContent, Paper, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Notyf } from 'notyf';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';


const ChatRoom = () => {
  const [chatLog, setChatLog] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const chatSocketRef = useRef(null);
  const notyf = new Notyf()
  const { roomName } = useParams();
  let { authTokens, user } = useContext(AuthContext);
  useEffect(() => {
    // Establish WebSocket connection when the component mounts
    chatSocketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);


    chatSocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat_message') {
        // Convert data.sender and data.message to strings if they are objects
        const sender = typeof data.sender === 'object' ? JSON.stringify(data.sender) : data.sender;
        const messageText = typeof data.message === 'object' ? JSON.stringify(data.message) : data.message;
        const newMessage = {
          text: data.message,
          sender: data.email,
        };
        setChatLog((prevChatLog) => [...prevChatLog, newMessage]);

      }
    };
    chatSocketRef.current.onclose = (event) => {
    };
    return () => {
      if (chatSocketRef.current) {
        chatSocketRef.current.close();
      }
    };
  }, [roomName]);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (chatSocketRef.current.readyState === WebSocket.OPEN) {
      chatSocketRef.current.send(JSON.stringify({
        type: 'chat_message', 
        message: messageInput,
        email: user.email,
      }));
      setMessageInput('');
    }
  };
  let messages = chatLog
  return (
    <Container sx={{
      mt: 2, display: 'flex', flexWrap: 'flexWrap', maxHeight: 600, xs: 8, md: 8, lg: 6, xxl: 4, justifyContent: 'center',
      flexDirection: 'column', width: '50%'
    }}>
      <Paper elevation={3} sx={{ maxHeight: 600, overflowY: 'auto', p: 2, height: 500, bgcolor: '#00000' }}>
        <Typography align='center' variant='h5'>{ roomName}</Typography>
        {messages ? messages.map((message, index) => (
            <div >
              {message && user && message.sender === user.email ?
                <div>

                  {/* <Typography variant='caption' sx={{ textAlign: 'start', mr: 'auto', display: 'flex', justifyContent: 'end' }}>
                    {message.sender}</Typography> */}
                  <Paper key={index} sx={{
                    marginBottom: 2, padding: 2, width: 'fit-content', height: 'fit-content', minWwidth: 10,
                    maxWidth: 400, borderRadius: 10, Padding: 3, background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
                    ml: 'auto'
                  }} >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                  </Paper>
                </div>
                :
                <div>
                  <Typography variant='caption' sx={{
                    textAlign: 'start', mr: 'auto', display: 'flex',
                    justifyContent: 'start'
                  }}>{message.sender}</Typography>

                  <Paper key={index} sx={{
                    marginBottom: 2, padding: 2, width: 'fit-content', height: 'fit-content', minWwidth: 10,
                    maxWidth: 400, borderRadius: 10, Padding: 3, background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
                  }} >
                    <Typography variant="body1">
                      {message.text}
                    </Typography>
                  </Paper>
                </div>
              }
            </div>
        )) : null}
      </Paper>
      <div style={{ display: 'flex', marginTop: 10 }}>
        <TextField
          id="chat-message-input"
          label='Type Here..'
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ width: 600 }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto' }}>
          <Button
            id="chat-message-submit"
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default ChatRoom;

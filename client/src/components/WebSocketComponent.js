import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const jwtToken = 
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQDEyMyJ9.dudNp1EMf778u4I8r0zIn0IYPDuFTIZlAmi_smW5qTY";

  // useEffect(() => {
  //   const socket = io('http://localhost:8081',{
  //     auth:{
  //       token : `Bearer ${jwtToken}`
  //     }
  //   });
  // }, []);

  useEffect(() => {
    // Initialize the WebSocket connection
    const socket = new SockJS('http://localhost:8081/connect');
    const client = Stomp.over(socket);

    // Connect with JWT token in the headers
    client.connect(
      { Authorization: `Bearer ${jwtToken}` },
      () => {
        // Subscribe to the chat topic upon successful connection
        client.subscribe('/user/67224de8bd0574554e23485a/queue/messages', (message) => {
          let receivedMessage = message.body;
          if(typeof receivedMessage == "string"){
            console.log(receivedMessage);
          }
          else{
            receivedMessage = JSON.parse(receivedMessage);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
          }
        });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );

    setStompClient(client);

    // Disconnect WebSocket on component unmount
    return () => {
      if (client) {
        client.disconnect(() => console.log('WebSocket disconnected.'));
      }
    };
  }, []);

  const sendMessage = () => {
    
    if (stompClient && input) {
      stompClient.send(
        "/connection/send.message",
        {},
        JSON.stringify({
          senderId : "67224de8bd0574554e23485a",
          receiverId : "67224df2bd0574554e23485b",
          message : "Hi gube"
        })
      )
    }
  };

  return (
    <div>
      <h2>WebSocket Chat</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;

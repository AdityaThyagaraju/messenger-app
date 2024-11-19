import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

class Messenger{

  constructor(user, receiveMessage){
    const socket = new SockJS('http://localhost:8081/connect');
    const client = Stomp.over(socket);
    this.chat = {};
    this.client = client;
    this.user = user;

    client.connect(
      { Authorization: `Bearer ${user.token}` },
      () => {
        client.subscribe(`/user/${user.id}/queue/messages`, (message) => {
          let receivedMessage = message.body;
          console.log(receivedMessage);
          
          let chat = JSON.parse(receivedMessage);
          receiveMessage(chat);
        });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
  }

  sendMessage(recipientId, message){
    this.chat = {
      senderId : this.user.id,
      receiverId : recipientId,
      message : message
    }
    this.client.send(
      "/connection/send.message",
      {},
      JSON.stringify({
        senderId : this.user.id,
        receiverId : recipientId,
        message : message
      })
    )
  }
}

export default Messenger;

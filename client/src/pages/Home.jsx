import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import MessageSection from "../components/MessageSection";
import ProfileSection from "../components/ProfileSection";
import ConversationSection from "../components/ConversationSection";
import UserContext from "../context/UserContext";
import Messenger from "../components/Messenger";

function Home(){

  const {user, setUser}  = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const friend = useRef(null);
  const [messenger, setMessenger] = useState(null);
  const [chats, setChats] = useState([]);

  const getChats = async (chatIds) => {
    try {
      const chatList = await Promise.all(
        chatIds.map(async (chatId) => {
          const response = await fetch(`http://localhost:8082/chats/${chatId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${user.token}`,
            },
          });

          if (!response.ok) return null;

          const rawData = await response.text();
          return rawData ? JSON.parse(rawData) : null;
        })
      );

      setChats(chatList.filter((chat) => chat !== null));
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const getFriend = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/user/friend/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch friend data");

      const friendJson = await response.json();
      friend.current = friendJson;
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  const receiveChat = (chat) => {
    let id = friend.current.id;
    if(typeof chat == "string"){
      console.log(chat);
      return;
    }
    if (chat.senderId === id || chat.receiverId === id) {
      setChats((prevChats) => [...prevChats, chat]);
    }
  };

  const getConversations = async () => {
    let data = await fetch('http://localhost:8081/conversations',
                {
                  method:"GET",
                  headers:{
                    "Content-Type":"application/json",
                    "Authorization" : `Bearer ${user.token}`
                  }
                }
              );
    let conversationsNew = await data.json();
    setConversations(conversationsNew); 
  }

  const selectConversationId = (index)=>{
    let conv = conversations[index];
    setConversation(conv);
  }

  useEffect(() => {
    
    if (conversation) {
      getChats(conversation.chatIds);
      let messenger = new Messenger(user, receiveChat);
      setMessenger(messenger);
      const { user1Id, user2Id } = conversation;
      getFriend(user1Id === user.id ? user2Id : user1Id);
    }

    if(user!=null){
      getConversations();
    }
    
  },[user, conversation])

  return (
    <div className="flex h-screen bg-gray-200 gap-1">
      <div className="h-full bg-blue-800 w-1/24 flex flex-col justify-between">
        <button className="w-full py-2 text-white text-3xl focus:bg-white focus:text-black">
          <i className="fa-solid fa-inbox"></i>
        </button>
        <div className="text-center p-3">
          <i className="fa-regular fa-user bg-gray-200 p-2 rounded-full"></i>
          <span
            className="w-3 h-3 bg-green-500 rounded-full inline-block"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "35px",
            }}
          ></span>
        </div>
      </div>

      <ConversationSection 
      conversations={conversations} 
      selected={conversation?conversation.id:-1}
      setSelected={selectConversationId} />

      {conversation && (
        <>
          <MessageSection 
          conversation={conversation}
          chats={chats}
          friend={friend.current}
          messenger={messenger} />
          
          <ProfileSection 
          friend={friend.current} />
        </>
      )}

    </div>
  );
}

export default Home;



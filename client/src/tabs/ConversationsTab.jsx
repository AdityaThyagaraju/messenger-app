import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import MessageSection from "../components/MessageSection";
import ProfileSection from "../components/ProfileSection";
import ConversationSection from "../components/ConversationSection";
import UserContext from "../context/UserContext";
import Messenger from "../components/Messenger";

const ConversationsTab = ({startConversation, setStartConversation})=>{
  const {user, setUser}  = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [friend, setFriend] = useState(null);
  const [chats, setChats] = useState([]);
  const friendRef = useRef(null);
  const messenger = useRef(null);
  const conversationSet = useRef(new Set());

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
      friendRef.current = friendJson;
      setFriend(friendJson);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  const receiveChat = (chat) => {
    let id = friendRef.current?friendRef.current.id:-1;
    let senderId = chat.senderId==user.id?chat.receiverId:chat.senderId;
    if(typeof chat == "string"){
      console.log(chat);
      return;
    }

    if(chat.senderId === id || chat.receiverId === id) {
      setChats((prevChats) => [...prevChats, chat]);
    }
    getConversations();
    // console.log(conversationSet.current);
    // if(conversationSet.current.has(senderId)){
      
    //   conversations.forEach((conversation) => {
    //     if((chat.senderId == user.id && 
    //       (conversation.user1Id == chat.receiverId || conversation.user2Id == chat.receiverId)) ||
    //       (chat.receiverId == user.id && 
    //         (conversation.user1Id == chat.senderId || conversation.user2Id == chat.senderId))
    //     ){  
    //         conversation.lastMessageTime = chat.timestamp;
    //         conversation.lastMessageSenderId = chat.senderId;
    //         conversation.lastMessage = chat.message;
    //         updateConversation(conversation);
    //       }
    //   })
    // }
    // else{
    //   setConversations((prevConversations) => [{
    //     user1Id:senderId,
    //     user2Id:user.id,
    //     lastMessageTime:chat.timestamp,
    //     lastMessageSenderId:chat.senderId,
    //     lastMessage:chat.message
    //   }, ...prevConversations]);
    //   conversationSet.current.add(senderId);
    // }
  };

  // const updateConversation = (updatedConversation) => {
  //   setConversations((prevConversations) =>
  //     prevConversations.map((conversation) =>
  //       conversation.id === updatedConversation.id
  //         ? { ...conversation, ...updatedConversation } // Update specific conversation
  //         : conversation // Keep others unchanged
  //     )
  //   );
  // };
  

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

    let checkConversation = conversationsNew.filter((conv)=>
      (conv.user1Id==startConversation || conv.user2Id==startConversation)).length==0;
    
    if(startConversation!=""){

      if(checkConversation){
        conversationsNew = [{
          "user1Id":user.id,
          "user2Id":startConversation
        }].concat(conversationsNew);

        setConversation({
          "user1Id":user.id,
          "user2Id":startConversation
        });
      }
      else{
        let localConversation = null;
        conversationsNew.forEach((conv) => {
          if(conv.user1Id==startConversation || conv.user2Id==startConversation){
            localConversation = conv;
          }
        });
        setConversation(localConversation)
      }
    }
    
    setStartConversation("");
    setConversations(conversationsNew);
    conversationSet.current = new Set(conversationsNew.map((con)=>
      con.user1Id == user.id? con.user2Id : con.user1Id));
  }

  const selectConversationId = (index)=>{
    let conv = conversations[index];
    setConversation(conv);
  }

  useEffect(() => {
    
    if(!messenger.current){
      let m = new Messenger(user, receiveChat);
      messenger.current = m;
    }

    if (conversation) {  
      const { user1Id, user2Id } = conversation;
      getFriend(user1Id === user.id ? user2Id : user1Id);
      (conversation.chatIds && getChats(conversation.chatIds));
    }

    if(user!=null && conversation==null){
      getConversations();
    }
    
  },[user, conversation])

  useEffect(()=>{
    
  },[friend]);

  return <>
    <ConversationSection 
      conversations={conversations} 
      selected={conversation?conversation.id:-1}
      setSelected={selectConversationId} />

      {conversation && (
        <>
          <MessageSection 
          conversation={conversation}
          chats={chats}
          friend={friend}
          messenger={messenger.current} />
          
          <ProfileSection 
          friend={friend} />
        </>
      )}

      {!conversation && <>
        <div className="w-3/4 h-full text-center flex justify-center items-center p-3">
            <div className="bg-white text-6xl w-2/3 h-2/3 
            block flex justify-center items-center">
            <span className="inline">Start connecting with people
            <i class="fa-brands fa-connectdevelop"></i>
            </span>
            </div>
        </div>
      </>
      }
  </>
}

export default ConversationsTab;
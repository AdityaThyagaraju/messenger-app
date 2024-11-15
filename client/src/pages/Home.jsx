import React, { useEffect, useState } from "react";
import { useContext } from "react";
import MessageSection from "../components/MessageSection";
import ProfileSection from "../components/ProfileSection";
import ConversationSection from "../components/ConversationSection";
import UserContext from "../context/UserContext";

function Home(){

  let {user, setUser}  = useContext(UserContext);
  let [conversations, setConversations] = useState([]);
  let [selectedConversationId, setSelectedConversationId] = useState(-1);
  let [chats, setChats] = useState([]);
  let [friend, setFriend] = useState(null);
  let url = process.env.REACT_APP_SERVER_URL;

  const receiveChat = (chat)=>{
    if(chat.senderId == friend.id){
      chats.push(chat);
    }
  }

  const getChats = (chatIds)=>{
    let chatList = [];
    chatIds.map(async (chatId, index) => {
      let data = await fetch(`http://localhost:8082/chats/${chatId}`, {
        method:"GET",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${user.token}`
        }
      })
      
      if (data.ok) {
        let rawData = await data.text();
        
        if (rawData === "") {
          console.log(`Response for chat ID ${chatId} is null.`);
        } else {
          try {
            let chat = JSON.parse(rawData);
            console.log("Fetched data:", chat);
            chatList.push(chat)
          } catch (error) {
            console.error(`Failed to parse JSON for chat ID ${chatId}:`, error);
          }
        }
      } else {
        console.error(`Failed to fetch chat with ID: ${chatId}, Status: ${data.status}`);
      }
    })

    setChats(chatList);
  }

  const getFriend = async (userId)=>{
    let data = await fetch(
      `http://localhost:8080/user/friend/${userId}`,
      {
        method:"GET",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${user.token}`
        }
      }
    );
    let friendJson = await data.json();
    setFriend(friendJson);
  }

  useEffect(() => {

      let getConversations = async () => {
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
        console.log(conversationsNew);
      }
      
      if(user!=null){
        getConversations();
      }

      if(selectedConversationId>=0 && friend==null){
        getChats(conversations[selectedConversationId].chatIds);
  
        if(conversations[selectedConversationId].user1Id == user.id)
          getFriend(conversations[selectedConversationId].user2Id);
        else
          getFriend(conversations[selectedConversationId].user1Id);
      }

    },[user, selectedConversationId])

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
      selected={selectedConversationId}
      setSelected={setSelectedConversationId} />

      <MessageSection 
      chats={chats}
      friend={friend}
       />

      <ProfileSection 
      Id={user.id} />
      
    </div>
  );
}

export default Home;



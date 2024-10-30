import React, { useEffect, useState } from "react";
import { useContext } from "react";
import MessageSection from "../components/MessageSection";
import ProfileSection from "../components/ProfileSection";
import ConversationSection from "../components/ConversationSection";
import UserContext from "../context/UserContext";

function Home(){

  let {user, setUser}  = useContext(UserContext);
  let [conversations, setConversations] = useState([]);
  let [selectedUserId, setSelectedUserId] = useState(-1);
  let url = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
      let getConversations = async () => {
        await fetch(url+'/conversations/'+user.id,
          {
            headers:{
              Authorization : user.token
            },
            method:"GET"
          }
        ).then((data) => setConversations(data));
      }

      if(user!=null){
        getConversations();
      }
    })

  return (
    <div className="flex h-screen bg-gray-200 gap-1">
      <div className="h-full bg-blue-800 w-1/24 flex flex-col justify-between">
        <button className="w-full py-2 text-white text-3xl focus:bg-white focus:text-black">
          <i class="fa-solid fa-inbox"></i>
        </button>
        <div className="text-center p-3">
          <i class="fa-regular fa-user bg-gray-200 p-2 rounded-full"></i>
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
      selectConversation={setSelectedUserId} />

      <MessageSection 
      conversationId={selectedUserId} />

      <ProfileSection 
      userId={selectedUserId} />
      
    </div>
  );
}

export default Home;



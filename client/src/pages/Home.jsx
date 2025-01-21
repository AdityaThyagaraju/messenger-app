import React, { useContext, useState } from "react";
import ConversationsTab from "../tabs/ConversationsTab";
import FriendRequest from "../components/FriendRequest";
import FriendSearch from "../components/FriendSearch";
import UserContext from "../context/UserContext";
import FriendTab from "../tabs/FriendsTab";


function Home(){

  let [tab, setTab] = useState("ConversationsTab");
  let [startConversation, setStartConversation] = useState("");

  const startNewConversation = (id)=>{
    setStartConversation(id);
    setTab("ConversationsTab");
  }
  
  const changeTab = (t)=>{
    setTab(t);
  }
  
  return (
    <div className="flex h-screen bg-gray-200 gap-1">
      <div className="h-full bg-blue-800 w-1/24 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
        <button className=
        {"w-full py-2 text-3xl h-14" + (tab=="ConversationsTab"?" bg-white text-black":" text-white ")}
        onClick={()=>changeTab("ConversationsTab")}
        >
          <i className="fa-solid fa-inbox"></i>
        </button>
        <button className=
        {"w-full py-2 text-3xl h-14" + (tab=="FriendsTab"?" bg-white text-black ":" text-white ")}
        onClick={()=>changeTab("FriendsTab")}
        >
          <i class="fa-solid fa-user-group"></i>
        </button>
        </div>
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

      {tab == "ConversationsTab" && 
      <ConversationsTab 
      startConversation={startConversation}
      setStartConversation={setStartConversation}
      />}

      {tab == "FriendsTab" && 
      <FriendTab
      startConversation={startConversation}
      setStartConversation={startNewConversation}
      />}

    </div>
  );
}

export default Home;



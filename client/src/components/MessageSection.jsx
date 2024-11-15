import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import UserContext from "../context/UserContext";

function MessageSection({chats, friend}){

  let {user, setUser} = useContext(UserContext);
  
  useEffect(()=>{

  },[chats, friend])

  return (
      <div className="w-3/5 h-full flex flex-col gap-1 relative ">
      <div className="w-full h-14 bg-white p-3 font-semibold">Amit RG</div>
      <div className="h-full">
        {chats.map((chat, index) => (
            <Chat
              align={chat.senderId==user.id?"start":"end"}
              message={chat.message}
              timestamp={chat.timestamp}
              image={
                <i class="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-white"></i>
              }
            />
          ))
        }
      </div>
      <div className="flex items-center justify-center w-full absolute bottom-10">
        {friend==null?null:
          <input
          placeholder={`Message ${friend==null?"":friend.name}`}
          className="p-1 ps-5 pb-1 w-11/12 bg-white rounded border-2 border-gray-700 h-10 block"
        ></input>
        }
      </div>
    </div>
  )
}

export default MessageSection;
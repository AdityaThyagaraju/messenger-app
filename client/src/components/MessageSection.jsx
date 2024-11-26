import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import UserContext from "../context/UserContext";
import Messenger from "./Messenger";

function MessageSection({ chats, friend, messenger }) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (messenger) {
      messenger.sendMessage(friend.id, message);
      setMessage("");
    }
  };
  
  useEffect(() => {
    
  }, [chats, friend, messenger]);

  return (
    <div className="w-3/5 h-full flex flex-col gap-1 relative">
      {friend && <div className="w-full h-14 bg-white p-3 font-semibold">{friend.name}</div>}
      <div className="h-full overflow-y-scroll mb-20">
        {chats.map((chat, index) => (
          <Chat
            key={index}
            align={chat.senderId == user.id ? "end" : "start"}
            message={chat.message}
            timestamp={chat.timestamp}
            image={<i className="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-white"></i>}
          />
        ))}
      </div>
      <div className="flex items-center justify-center w-full absolute bottom-8">
        {friend && (
          <>
            <input
              placeholder={`Message ${friend.name}`}
              className="p-1 ps-5 pb-1 w-11/12 bg-white rounded border-2 border-gray-700 h-10 block"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            ></input>
            <button onClick={sendMessage}>Send</button>
          </>
        )}
      </div>
    </div>
  );
}

export default MessageSection;

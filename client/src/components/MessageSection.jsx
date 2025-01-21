import React, { useContext, useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import UserContext from "../context/UserContext";

function MessageSection({ chats, friend, messenger }) {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);

  const sendMessage = () => {
    if (messenger) {
      messenger.sendMessage(friend.id, message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="w-3/5 h-full flex flex-col gap-1 relative pb-20">
      {friend && <div className="w-full h-14 bg-white p-3 font-semibold text-lg">{friend.name}</div>}
      <div
        ref={messageContainerRef}
        className="h-full overflow-y-auto styled-scrollbar"
      >
        {chats.map((chat, index) => (
          <Chat
            key={index}
            align={chat.senderId === user.id ? "end" : "start"}
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
            <button
              onClick={sendMessage}
              className="m-1 py-1 px-3 h-10 rounded-full border-2 border-gray-700 bg-green-500 text-white"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MessageSection;

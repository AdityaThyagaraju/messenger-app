import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { useState } from "react";

function ConversationSection({ conversations, selected, setSelected }) {
  
  useEffect(() => {
  }, [conversations, selected]);

  return (
    <div className="flex flex-col w-full md:w-1/5 gap-1">
      {/* Header Section */}
      <div className="p-3 bg-white h-14 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fa-solid fa-bars-staggered"></i>
          <span className="ps-2 font-semibold text-lg">Conversations</span>
        </div>
        <button>
          <i className="fa-solid fa-rotate-right inline-block"></i>
        </button>
      </div>

      {/* Conversations List */}
      <div className="h-full flex flex-col gap-0.5 overflow-auto bg-white">
        {conversations.map((conversation, key) => (
          <Conversation
            key={key}
            index={key}
            conversation={conversation}
            backGround={conversation.id === selected ? "bg-slate-200" : ""}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
}

export default ConversationSection;

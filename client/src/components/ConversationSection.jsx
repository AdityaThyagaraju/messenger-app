import React, { useEffect } from "react";
import Conversation from "./Conversation";
import { useState } from "react";

function ConversationSection({conversations, selected, setSelected}){

  useEffect(()=>{
    
  },[selected])
    
    return (
        <div className="flex flex-col w-1/5 gap-1">
        <div className="p-3 bg-white h-14">
          <i className="fa-solid fa-bars-staggered"></i>
          <span className="p-2 font-semibold text-lg">Conversations</span>
          <button>
            <i className="fa-solid fa-rotate-right inline-block ms-20"></i>
          </button>
        </div>
        <div className="h-full flex flex-col gap-0.5 overflow-auto bg-white">
          {conversations.map((conversation, key) => 
          <Conversation
            key={key}
            index={key}
            conversation={conversation}
            backGround={conversation.id == selected ? "bg-slate-200" : ""}
            setSelected={setSelected}
            />
          )}
        </div>
      </div>
    )
}

export default ConversationSection;
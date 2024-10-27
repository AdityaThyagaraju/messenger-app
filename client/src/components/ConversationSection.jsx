import React from "react";
import Conversation from "./Conversation";
import { useState } from "react";

function ConversationSection(){
    
  const [selected, setSelected] = useState(null);

    return (
        <div className="flex flex-col w-1/6 gap-1">
        <div className="p-3 bg-white h-14">
          <i class="fa-solid fa-bars-staggered"></i>
          <span className="p-2 font-semibold text-lg">Conversations</span>
          <button>
            <i class="fa-solid fa-rotate-right inline-block ms-10"></i>
          </button>
        </div>
        <div className="h-full flex flex-col gap-0.5 overflow-auto bg-white">
          <Conversation
            index="1"
            backGround={selected == "1" ? "bg-slate-200" : ""}
            setSelected={setSelected}
          />
          <Conversation
            index="2"
            backGround={selected == "2" ? "bg-slate-200" : ""}
            setSelected={setSelected}
          />
        </div>
      </div>
    )
}

export default ConversationSection;
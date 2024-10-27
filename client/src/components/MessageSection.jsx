import React from "react";
import Chat from "./Chat";

function MessageSection(){
    return (
        <div className="w-3/5 h-full flex flex-col gap-1 relative ">
        <div className="w-full h-14 bg-white p-3 font-semibold">Amit RG</div>
        <div className="h-full">
          <Chat
            align="end"
            message="Hello, how are you"
            timestamp="Amit - Mar 05, 2:22 AM"
            image={
              <i class="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-white"></i>
            }
          />
          <Chat
            align="start"
            message="I am good"
            timestamp="Henit - Mar 05, 2:22 AM"
            image={
              <i class="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-white"></i>
            }
          />
        </div>
        <div className="flex items-center justify-center w-full absolute bottom-10">
          <input
            placeholder="Message Amit"
            className="p-1 ps-5 pb-1 w-11/12 bg-white rounded border-2 border-gray-700 h-10 block"
          ></input>
        </div>
      </div>
    )
}

export default MessageSection;
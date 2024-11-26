import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

function Conversation({ index, conversation, setSelected, backGround }){
  const classname = "border-b-2 border-slate-100 " + backGround;
  const {user, setUser} = useContext(UserContext);
  let [friend, setFriend] = useState(null);

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
    if(conversation.user1Id == user.id)
      getFriend(conversation.user2Id);
    else
      getFriend(conversation.user1Id);
    
  }, [])

  function handleSelect() {
    setSelected(index);
  }

  return (
    <div className={classname} onClick={handleSelect}>
      <div className="flex flex-row">
        <div className="px-2 py-1 flex flex-col justify-center w-2/3">
          <div className="font-semibold">{friend?friend.name:null}</div>
        </div>
        <div className="w-1/6 text-sm">{conversation.lastMessageTime}</div>
      </div>
      <div>
        <div className="px-2 py-1 truncate text-sm">
            <strong>
            {
              friend&&conversation.lastMessageSenderId==friend.id
            ?"" : 'You . '
            }
            </strong>
            {conversation.lastMessage}
        </div>
      </div>
    </div>
  );
}

export default Conversation;

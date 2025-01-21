import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

const FriendRequest = ({friendId})=>{

    let {user, setUser} = useContext(UserContext);
    let [friend, setFriend] = useState(null);

  const getUser = async ()=>{
    let userRaw = await fetch(
      `http://localhost:8080/user/extract-user`,
      {
        method:"GET",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${user.token}`
        }
      }
    );

    let newUser = await userRaw.json();
    setUser(newUser);
  }
  
  const acceptFriendRequest = async()=>{
    let data = await fetch(
      `http://localhost:8080/user/accept-friend-request?friendId=${friendId}`,
      {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${user.token}`
        }
      }
    );

    let response = await data.text();
    console.log(response);
    getUser();
    
  }

  const rejectFriendRequest = async()=>{
    let data = await fetch(
      `http://localhost:8080/user/reject-friend-request?friendId=${friendId}`,
      {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${user.token}`
        }
      }
    );

    let response = await data.text();
    console.log(response);
    getUser();

  }

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

  useEffect(()=>{
    if(!friend)
      getFriend(friendId);
  },[friend, user]);

    return <>
        <div className="p-2 bg-white h-20 w-full rounded border-2 border-gray-700 flex justify-between items-center">
              <div className="flex gap-5 justify-center items-center text-3xl">
                <i className="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-black text-white"></i>
                <span>{friend==null?"":friend.name}</span>
              </div>
              <div className="flex gap-5 justify-center items-center text-3xl">
              {friend==null?"":friend.username}
              </div>
              <div className="p-3 flex gap-2 text-lg">
                <button onClick={()=>acceptFriendRequest()}><i class="fa-solid fa-check"></i></button>
                <span>|</span>
                <button onClick={()=>rejectFriendRequest()}><i class="fa-solid fa-xmark"></i></button>
              </div>
              </div>
    </>
}

export default FriendRequest;
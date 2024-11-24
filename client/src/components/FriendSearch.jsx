import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

const FriendSearch = ({friend, setStartConversation})=>{

    let {user, setUser} = useContext(UserContext);

    const addFriend = async ()=>{
        let data = await fetch(
            `http://localhost:8080/user/send-friend-request?friendId=${friend.id}`,
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

    useEffect(()=>{

    },[user, friend]);
    
    return <>
    <div className="p-2 bg-white h-20 w-full rounded border-2 border-gray-700 flex justify-between items-center">
        <div className="flex gap-5 justify-center items-center text-3xl">
            <i className="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-black text-white"></i>
            <span>{friend.name}</span>
        </div>
        <div className="flex gap-5 justify-center items-center text-3xl">
            {friend.username}
        </div>
        <div className="p-3 flex gap-2 text-lg">
        {   (
            (user.pendingRequests && user.pendingRequests?.includes(friend.id)) &&
            <button disabled>
                {/* <i className="fa-solid fa-plus text-gray-200"></i> */}
            </button>
            )
            ||(!user.friendIds?.includes(friend.id) && 
            <button onClick={(e)=>addFriend()}>
                <i className="fa-solid fa-plus"></i>
            </button>
            ) || (
                <button onClick={(e)=>setStartConversation(friend.id)}>
                <i className="fa-solid fa-message"></i>
                </button>
            )
        }
        </div>
        </div>
    </>
}

export default FriendSearch;
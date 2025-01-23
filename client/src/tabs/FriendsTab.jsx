import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import FriendRequest from "../components/FriendRequest";
import FriendSearch from "../components/FriendSearch";

const FriendTab = ({ startConversation, setStartConversation }) => {
  let { user, setUser } = useContext(UserContext);
  let [searchVal, setSearchVal] = useState("");
  let [searchResponse, setSearchResponse] = useState([]);

  const searchUsers = async (query) => {
    setSearchVal(query);

    if (query === "") {
      setSearchResponse([]);
      return;
    }

    let data = await fetch(`http://localhost:8080/user/search?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    let users = await data.json();
    users = users.filter((us) => user.id !== us.id);
    setSearchResponse(users);
  };

  useEffect(() => {}, [searchResponse]);

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center gap-5">
        {/* Friend Requests Section */}
        <div className="bg-white h-2/5 w-5/6 p-5 flex flex-col justify-center ring ring-gray-300">
          <h1 className="text-2xl font-semibold">Friend Requests</h1>
          <hr />
          <div className="bg-gray-200 p-2 mt-5 h-2/3 w-full overflow-auto">
            {user.friendRequests && user.friendRequests.length > 0 ? (
              user.friendRequests.map((id, key) => (
                <FriendRequest key={key} friendId={id} />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-5">
                No friend requests available.
              </div>
            )}
          </div>
        </div>

        {/* Friend Search Section */}
        <div className="bg-white h-1/3 w-5/6 p-5 ring ring-gray-300">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold mt-3">Search Friends</h1>
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder={"Search..."}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-700"
                value={searchVal}
                onChange={(e) => searchUsers(e.target.value)}
              />
              <i className="fa-solid fa-magnifying-glass absolute top-3 right-3 text-gray-500"></i>
            </div>
          </div>
          <hr />
          <div className="bg-gray-200 p-2 mt-5 h-2/3 w-full overflow-auto">
            {searchResponse.length > 0 ? (
              searchResponse.map((friend, key) => (
                <FriendSearch
                  friend={friend}
                  setStartConversation={setStartConversation}
                  key={key}
                />
              ))
            ) : (
              <div className="text-center text-gray-500 mt-5">
                No friends found.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendTab;

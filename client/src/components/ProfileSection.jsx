import React, { useEffect } from "react";

function ProfileSection({friend}){

  useEffect(() => {

  }, [friend])

    return (
        friend?<div className="w-1/5 bg-slate-200">
        <div className="h-2/5 bg-white flex flex-col items-center justify-center p-3">
          <div className="h-24 w-24 rounded-full bg-green-400"></div>
          <div className="text-semibold mt-2">{friend.name}</div>
          <div className="text-sm mt-1 text-grey-600">
            <span className="w-2 h-2 mx-1 rounded-full bg-green-400 inline-block"></span>
            online
          </div>
          <div className="flex justify-between gap-5 p-5">
            <button className="p-2 w-24 border-2 border-gray-300">
              <i className="fa-solid fa-phone"></i> Call
            </button>
            <button className="p-2 w-24 border-2 border-gray-300">
              <i className="fa-regular fa-user bg-gray-200 p-2 rounded-full bg-white"></i>
              Profile
            </button>
          </div>
        </div>

        <div className="flex justify-center h-1/3 mt-5">
          <div className="bg-white w-11/12 rounded-lg">
            <div className="p-3 font-semibold">Customer details</div>
            <div className="flex justify-between p-3">
              <div>Email</div>
              <div className="font-semibold">{friend.email}</div>
            </div>
            <div className="flex justify-between p-3">
              <div>Date of Birth</div>
              <div className="font-semibold">{friend.dob}</div>
            </div>
            <div className="flex justify-between p-3">
              <div>About</div>
              <div className="font-semibold">{friend.about}</div>
            </div>
            <div className="text-purple-900 text-center">View more details</div>
          </div>
        </div>
      </div>:<></>
    )
}

export default ProfileSection;
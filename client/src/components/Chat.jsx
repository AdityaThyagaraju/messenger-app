import React from "react";

function Chat({ align, message, image, timestamp }){
  return (
    <div className={`flex`} style={{justifyContent:align}}>
      <div className="max-w-64 mt-3">
        <div className="flex">
          {align == "start" ? (
            <div className="w-10 h-10 flex justify-center mx-2 p-1">
              {image}
            </div>
          ) : null}
          <div>
            <div className="bg-white p-2 px-5 rounded">{message}</div>
            <div
              className={`mt-1 text-xs ms-1 text-${
                align == "start" ? "left" : "right"
              }`}
            >
              {timestamp}
            </div>
          </div>
          {align == "end" ? (
            <div className="w-10 h-10 flex justify-center mx-2 p-1">
              {image}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Chat;

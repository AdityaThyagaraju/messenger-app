import React, { useState } from "react";

function Conversation({ user, index, username, setSelected, backGround }){
  const classname = "border-b-2 border-slate-100 " + backGround;

  function handleSelect() {
    setSelected(index);
  }

  return (
    <div className={classname} onClick={handleSelect}>
      <div className="flex flex-row">
        <div className="px-2 py-1 flex flex-col justify-center w-2/3">
          <div className="font-semibold">Amit RG</div>
        </div>
        <div className="w-1/6 text-sm">10m</div>
      </div>
      <div>
        <div className="px-2 py-1 truncate text-sm">
          This is the best product I have ever used, Thank you for this
        </div>
      </div>
    </div>
  );
}

export default Conversation;

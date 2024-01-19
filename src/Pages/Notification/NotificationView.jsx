import React, { useState } from "react";
import AutoExpandableForm from "../../Components/AutoExpandableInput";

const NotificationView = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {

  }

  return (
    <>
      <center>
        <div className="max-w-[50rem] text-left">
          <p className="mt-16 text-3xl font-bold">Send Notification</p>
        </div>
      </center>
      <center>
        <div className="max-w-[50rem] mt-10 border-[1px] border-black">
          <AutoExpandableForm inputValue={inputValue} setInputValue={setInputValue} />
        </div>
      </center>
      <center>
        <div className="text-right w-[50rem]">
          <button onClick={handleSend} className="mt-8 w-32 py-3 border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Send
          </button>
        </div>
      </center>
    </>
  );
};

export default NotificationView;

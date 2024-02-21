import React, { useState } from "react";
import AutoExpandableForm from "../../Components/AutoExpandableInput";
import { sendNotification } from "../../Api/notificationApi";

const NotificationView = () => {
  const [notificationHeading, setNotificationHeading] = useState("");
  const [notificationBody, setNotificationBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleSend = async () => {
    if (window.confirm("Are you sure you want to send this notification?")) {
      setIsLoading((prev) => true);

      const notification = {
        title: notificationHeading,
        body: notificationBody,
      };

      await sendNotification(notification);
      document.getElementById("text-area-1").value = "";
      document.getElementById("text-area-2").value = "";
      setIsLoading((perv) => false);
    }
  };

  return (
    <>
      <center>
        <div className="max-w-[50rem] text-left">
          <p className="mt-16 text-3xl font-bold">Send Notification</p>
        </div>
      </center>
      <center>
        <div className="max-w-[50rem] mt-10 border-[1px] border-black relative">
          {isLoading && (
            <div className="bg-white absolute top-0 bottom-0 left-0 right-0 border-white opacity-75" />
          )}
          <AutoExpandableForm
            id={"text-area-1"}
            text={"write notification heading..."}
            inputValue={notificationHeading}
            setInputValue={setNotificationHeading}
          />
        </div>
      </center>
      <center>
        <div className="max-w-[50rem] h-60 mt-10 border-[1px] border-black relative">
          {isLoading && (
            <div className="bg-white absolute top-0 bottom-0 left-0 right-0 border-white opacity-75" />
          )}
          <AutoExpandableForm
            id={"text-area-2"}
            text={"Write notification content..."}
            inputValue={notificationBody}
            setInputValue={setNotificationBody}
          />
        </div>
      </center>
      <center>
        <div className="text-right w-[50rem]">
          <button
            onClick={isLoading ? () => {} : handleSend}
            className={`mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
              isLoading ? loadingButton : normalButton
            }`}
          >
            {!isLoading ? "Send" : <div id="lds-dual-ring" />}
          </button>
        </div>
      </center>
    </>
  );
};

export default NotificationView;

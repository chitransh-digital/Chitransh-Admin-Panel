import React, { useState } from "react";
import { removeJob } from "../../Api/jobsApi";
import { Link } from "react-router-dom";
import {
  buildNotificationPayload,
  convertHoursToFormat,
} from "../../Utils/notificationUtils";
import { sendNotification } from "../../Api/notificationApi";

const JobsListContent = ({ item, reload, setReload }) => {
  const {
    businessName,
    contact,
    jobDescription,
    jobTitle,
    location,
    salary,
    requirements,
    id,
    externalLink,
  } = item;

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const notifyHandler = async () => {
    if (
      window.confirm("Are you sure you want to send notification for this job?")
    ) {
      setIsLoading((prev) => true);
      const notification = buildNotificationPayload("JOB", item);
      try {
        const notificationResponse = await sendNotification(notification);
        // check if notification already sent within last 24 hours.
        if (notificationResponse.cooldown) {
          alert(
            `Notification already sent!\nPlease wait for ${convertHoursToFormat(
              notificationResponse.cooldown
            )} to resend.`
          );
        }
      } catch (error) {
        console.error("Error sending notification:", error);
      }

      setIsLoading((prev) => false);
    }
  };

  const rejectHandler = async () => {
    if (window.confirm("Are you sure you want to remove this job?")) {
      await removeJob(id);
      setReload(reload ? false : true);
    }
  };

  return (
    <div className="w-full cursor-pointer border-black border-[0.5px] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2">
      <div className="flex justify-between">
        <div>
          <a href={externalLink} target="blank">
            <p className="text-3xl font-bold underline hover:text-blue-500">
              {jobTitle}
            </p>
          </a>
          <p className="max-w-[60rem] my-3">{jobDescription}</p>
        </div>
        <div>
          <p>{businessName}</p>
          <p>{location}</p>
          <p className="text-md font-light">{contact}</p>
        </div>
      </div>

      <p className="flex flex-wrap w-[40rem]">
        Requirements:
        {requirements.map((item, idx) => (
          <span className="ml-3 text-md font-bold mx-1">{item}</span>
        ))}
      </p>
      <div className="flex justify-between">
        <p className="mt-6">
          <span className="mr-3">Salary:</span>
          <span className="text-2xl font-bold">Rs. {salary}</span>
        </p>
        <div className="text-right flex">
          <button
            onClick={isLoading ? () => {} : notifyHandler}
            className={`mx-1 mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
              isLoading ? loadingButton : normalButton
            }`}
          >
            {!isLoading ? "Notify" : <div id="lds-dual-ring" />}
          </button>
          <Link
            to="/updateJob"
            state={{
              businessName,
              contact,
              jobDescription,
              jobTitle,
              location,
              salary,
              requirements,
              id,
              externalLink,
            }}
          >
            <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
              Edit
            </button>
          </Link>
          <button
            onClick={rejectHandler}
            className="mx-1 mt-8 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsListContent;

import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { removeFeed } from "../../Api/feedsApi";
import { Link, useNavigate } from "react-router-dom";
import { sendImageNotification } from "../../Api/notificationApi";

const FeedView = ({ setFeedVariant, displayFeed }) => {
  const navigate = useNavigate();
  const { title, author, timestamp, location, images, body, id } = displayFeed;
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const clickHandler = () => {
    setFeedVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this feed?")) {
      await removeFeed(id);
      setFeedVariant((prev) => !prev);
      window.location.reload();
      navigate("/feeds");
    }
  };

  const notifyHandler = async () => {
    if (window.confirm("Are you sure you want to send notification for this feed?")) {
      setIsLoading((prev) => true);
      await sendImageNotification({ title, images });
      setIsLoading((prev) => false);
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{title}</p>
      <p className="pl-5">by {author}</p>
      <div className="m-5 flex flex-wrap">
        {images.map((image) => {
          return (
            <div className="w-64 h-64 overflow-hidden rounded-xl mr-6">
              <img src={image} alt="" className="object-contain w-full h-full" />
            </div>
          );
        })}
      </div>
      <p className="pr-20 pl-5 my-5">{body}</p>
      <p className="pl-5">{location}</p>
      <p className="pl-5">{dateString}</p>
      <p className="pl-5">{timeString}</p>
      <div className="flex">
        <button
          onClick={isLoading ? () => {} : notifyHandler}
          className={`mx-1 mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Notify" : <div id="lds-dual-ring" />}
        </button>
        <Link
          to="/updateFeed"
          state={{
            id,
            title,
            author,
            location,
            body,
          }}
        >
          <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Edit
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className="mx-1 mt-8 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FeedView;

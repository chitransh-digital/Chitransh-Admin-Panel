import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { removeFeed, setFeedVisible } from "../../utils/feedsApi";

const FeedView = ({ setFeedVariant, displayFeed }) => {
  const { title, author, timestamp, location, images, body, id } = displayFeed;

  const clickHandler = () => {
    setFeedVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this feed?")) {
      await removeFeed(id);
      setFeedVariant((prev) => !prev);
      window.location.reload();
    }
  };

  const approveHandler = async () => {
    if (window.confirm("Are you sure you want to approve this feed?")) {
      await setFeedVisible(id);
      setFeedVariant((prev) => !prev);
      window.location.reload();
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
            <div class="w-64 h-64 overflow-hidden rounded-xl mr-6">
              <img
                src={image}
                alt=""
                class="object-cover w-full h-full"
              />
            </div>
          );
        })}
      </div>
      <p className="pr-20 pl-5 my-5">{body}</p>
      <p className="pl-5">{location}</p>
      <p className="pl-5">{JSON.stringify(timestamp)}</p>
      <button
        onClick={approveHandler}
        className="mt-8 ml-5 w-32 py-4 border-green-600 border-2 hover:bg-green-600 rounded-md text-green-600 hover:text-white font-bold transition-all ease-in-out"
      >
        Approve
      </button>
      <button
        onClick={deleteHandler}
        className="mt-8 ml-5 w-32 py-4 border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
      >
        Reject
      </button>
    </div>
  );
};

export default FeedView;

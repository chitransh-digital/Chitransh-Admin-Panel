import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImage, updateFeed } from "../../Api/feedsApi";

const FeedUpdateForm = () => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const { id, title, author, location, body } = reactLocation.state;

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [feed, setFeed] = useState({
    title,
    author,
    location,
    body,
  });

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setFeed((prev) => ({ ...prev, [input]: e.target.value }));
  };
  
  const validateFeedFields = (feed) => {
    const missingFields = [];
    if (feed.title === "") missingFields.push("Title");
    if (feed.author === "") missingFields.push("Author");
    if (feed.body === "") missingFields.push("Body");

    return missingFields;
  }

  const createClickHandler = async () => {
    const missingFields = validateFeedFields(feed);
    if (missingFields && missingFields.length > 0) {
      alert(`You must enter all the required fields : ${missingFields.join(", ")}`);
    }
    else if (window.confirm("Are you sure you want to edit this feed?")) {
      setIsLoading((prev) => true);
      if (image !== null) {
        const imageUrl = await uploadImage(image);
        const feedWithImage = { ...feed, images: [imageUrl] };
        await updateFeed(id, feedWithImage);
      } else {
        await updateFeed(id, feed);
      }
      navigate("/feeds");
    }
  };

  const handleImageUpload = (e) => {
    setImage((prev) => e.target.files[0]);
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Feed
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Title</p>
        <input
          value={feed.title}
          onChange={handleChange("title")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Author</p>
        <input
          value={feed.author}
          onChange={handleChange("author")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Location</p>
        <input
          value={feed.location}
          onChange={handleChange("location")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Body</p>
        <textarea
          value={feed.body}
          onChange={handleChange("body")}
          className=" border-black border-[1px] p-5 w-[70rem] h-[30rem]"
        ></textarea>

        <p className="text-xl mb-2 mt-5">Select Image</p>
        <input onChange={handleImageUpload} type="file"></input>

        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Update" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default FeedUpdateForm;

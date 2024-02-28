import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFeed, uploadImage } from "../../Api/feedsApi";

const FeedCreateForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [feed, setFeed] = useState({
    title: "",
    author: "",
    location: "",
    body: "",
    images: [],
  });
  const [image, setImage] = useState(null);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setFeed((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to create this feed?")) {
      setIsLoading((prev) => true);
      if (image !== null) {
        const imageUrl = await uploadImage(image);
        const feedWithImage = { ...feed, images: [imageUrl] };
        await createFeed(feedWithImage);
      } else {
        await createFeed(feed);
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
          Create Feed
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Title</p>
        <input
          onChange={handleChange("title")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Author</p>
        <input
          onChange={handleChange("author")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Location</p>
        <input
          onChange={handleChange("location")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Body</p>
        <textarea
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
          {!isLoading ? "Create" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default FeedCreateForm;

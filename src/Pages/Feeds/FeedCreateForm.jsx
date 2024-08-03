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
  const [image, setImage] = useState([]);

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
    else if (window.confirm("Are you sure you want to create this feed?")) {
      setIsLoading((prev) => true);
      if (image.length) {
        const imageUrls = [];
        for (let i = 0; i < image.length; i++) {
          const imageUrl = await uploadImage(image[i]);
          imageUrls.push(imageUrl);
        }
        const feedWithImage = { ...feed, images: [...imageUrls] };
        await createFeed(feedWithImage);
      } else {
        await createFeed(feed);
      }
      navigate("/feeds");
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files);
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
        <input onChange={handleImageUpload} type="file" multiple></input>

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

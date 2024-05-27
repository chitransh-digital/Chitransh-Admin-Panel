import React, { useEffect, useState } from "react";
import FeedItemContent from "./FeedItemContent";
import { getFeeds } from "../../Api/feedsApi";
import FeedView from "./FeedView";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Appointments = () => {
  const [feed, setFeed] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);
  const [feedVariant, setFeedVariant] = useState(true);
  const [displayFeed, setDisplayFeed] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFeeds = async () => {
    const feeds = await getFeeds();
    setFeed(feeds.Feeds);
    setFilteredFeed(feeds.Feeds); // Initialize filteredFeed with the original feed data
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const searchByAuthor = () => {
    if (searchTerm.trim() === "") {
      setFilteredFeed(feed); // If search term is empty, reset to original feed data
    } else {
      const filteredFeeds = feed.filter((feed) =>
        feed.author && feed.author.includes(searchTerm)
      );
      setFilteredFeed(filteredFeeds);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredFeed(feed);
  };

  const clickHandler = (item) => {
    setFeedVariant((prev) => !prev);
    setDisplayFeed(item);
  };

  if (!feed || feed.length === 0) {
    return <div>Loading...</div>;
  }

  if (!feedVariant) {
    return <FeedView setFeedVariant={setFeedVariant} displayFeed={displayFeed} />;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-24">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
            Feeds
          </p>
          <Link to="/createFeed">
            <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
              Create Feed
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-48 mr-5"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded-md w-32 hover:bg-blue-700 transition"
              onClick={searchByAuthor}
            >
              Search
            </button>
          </div>
          {(searchTerm.trim() !== "" || !feedVariant) && (
            <p onClick={resetSearch} className="my-10 ml-5 flex cursor-pointer">
            <IoArrowBackCircleOutline className="text-2xl" />
            <span className="ml-2">Back</span>
            </p>
          )}
        </div>
        <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
          <li>Title</li>
          <li>Time</li>
          <li>Author</li>
        </ul>
        {filteredFeed.map((item, idx) => (
          <div
            key={idx}
            onClick={() => clickHandler(item)}
            className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
          >
            <FeedItemContent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;

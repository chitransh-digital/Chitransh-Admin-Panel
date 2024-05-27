import React, { useEffect, useState } from "react";
import FeedItemContent from "./FeedItemContent";
import { getFeeds } from "../../Api/feedsApi";
import FeedView from "./FeedView";
import { Link } from "react-router-dom";

const Appointments = () => {
  const [feed, setFeed] = useState([]);
  const [feedVariant, setFeedVariant] = useState(true);
  const [displayFeed, setDisplayFeed] = useState({});

  const fetchFeeds = async () => {
    const feeds = await getFeeds();
    setFeed(feeds.Feeds); 
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const searchByAuthor = () => {
    const filteredFeeds = feed.filter((feed) =>
      feed.author && feed.author.includes(searchTerm)
    );
    setFeed(filteredFeeds);
  };

  if (!feed || feed.length === 0) {
    return <div>Loading...</div>;
  }

  const clickHandler = (item) => {
    setFeedVariant((prev) => !prev);
    setDisplayFeed(item);
  };

  
    

  if (feedVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
            <input
              type="text"
              placeholder="Search by author"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block"
              onClick={searchByAuthor}
            >
              Search
            </button>
          <div className=" flex justify-between">
            <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
              Feeds
            </p>
            <Link to="/createFeed">
              <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                Create Feed
              </button>
            </Link>
          </div>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>Title</li>
            <li>Time</li>
            <li>Author</li>
          </ul>
          {feed.map((item, idx) => (
            <div
            key={idx}
              onClick={() => clickHandler(item)}
              className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
            >
              <FeedItemContent key={idx} item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <FeedView setFeedVariant={setFeedVariant} displayFeed={displayFeed} />;
};

export default Appointments;

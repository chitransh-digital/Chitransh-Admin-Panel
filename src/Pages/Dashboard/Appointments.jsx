import ListItem from "../../Components/ListItem";
import React, { useEffect, useState } from "react";
import AppointmentContent from "../../Components/AppointmentContent";
import { getFeeds } from "../../utils/api";
import FeedView from "../Feeds/FeedView";

const Appointments = () => {
  const color = ["#00FF29", "#FFA800", "#FF008A"];
  const [feed, setFeed] = useState([]);
  const [feedVariant, setFeedVariant] = useState(true);
  const [displayFeed, setDisplayFeed] = useState({});

  const fetchFeeds = async () => {
    const feeds = await getFeeds();
    setFeed(feeds);
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  if (feed.length === 0) {
    return <div>Loading...</div>;
  }

  if (feedVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
          <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
            Feeds
          </p>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>Title</li>
            <li>Time</li>
            <li>Author</li>
          </ul>
          {feed.map((item, idx) => (
            <ListItem
              color={color}
              idx={idx}
              setFeedVariant={setFeedVariant}
              setDisplayFeed={setDisplayFeed}
              item={item}
            >
              <AppointmentContent item={item} />
            </ListItem>
          ))}
        </div>
      </div>
    );
  }

  return <FeedView setFeedVariant={setFeedVariant} displayFeed={displayFeed} />;
};

export default Appointments;

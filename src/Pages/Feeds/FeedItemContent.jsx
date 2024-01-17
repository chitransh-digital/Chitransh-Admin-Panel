import React from "react";

const FeedItemContent = ({ item }) => {
  const { author, timestamp, title } = item;
  return (
    <>
      <ul className="h-[70%] sm:h-full flex flex-row justify-between visby text-[1rem] lg:text-[1.15rem] pr-[10px] transition-all ease-in-out">
        <li className="sm:w-[35%]">
          <div className="flex align-top">
            <div className="inline-block">
              <div>{title}</div>
            </div>
          </div>
        </li>

        <li className="sm:w-[20%] w-full hidden sm:block">
          <div>
            <center className="flex sm:block">
              <p>{JSON.stringify(timestamp)}</p>
              <p className="text-[0.9rem] text-[#949393]">4 : 30 pm</p>
            </center>
          </div>
        </li>

        <li className="sm:w-[35%] flex sm:block">
          <div>
            <center>
              <p>{author}</p>
            </center>
          </div>
        </li>
      </ul>

      <div className="visby text-[#949393] sm:hidden block text-[0.9rem]">
        <center className="flex justify-between mx-5">
          <p>{JSON.stringify(timestamp)}</p>
          <p className="text-[0.9rem]">4 : 30 pm</p>
        </center>
      </div>
    </>
  );
};

export default FeedItemContent;

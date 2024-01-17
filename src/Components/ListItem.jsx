import React from "react";

const ListItem = (props) => {
  const clickHandler = () => {
    props.setFeedVariant((prev) => !prev);
    props.setDisplayFeed(props.item);
  };

  return (
    <div
      onClick={clickHandler}
      className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[8rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
    >
      {props.children}
    </div>
  );
};

export default ListItem;

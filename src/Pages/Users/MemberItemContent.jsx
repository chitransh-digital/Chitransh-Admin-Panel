import React from "react";

const MemberItemContent = ({ item }) => {

  return (
    <>
      <ul className="h-[70%] sm:h-full flex flex-row justify-between visby text-[1rem] lg:text-[1.15rem] pr-[10px] transition-all ease-in-out">
        <li className="sm:w-[35%]">
          <div className="flex align-top justify-center pr-[15%]">
            <div className="inline-block">
              <div>{item.name}</div>
            </div>
          </div>
        </li>

        <li className="sm:w-[20%] w-full hidden sm:block">
          <div>
            <center>
                <p>{item.relation}</p>
            </center>
          </div>
        </li>

        <li className="sm:w-[35%] flex sm:block">
          <div>
            <center>
              {item.contact && item.contactVisibility ? <p>{item.contact}</p> : item.contact && !item.contactVisibility ? <p>Not Visible</p> : <p>Not Available</p>}
            </center>
          </div>
        </li>
      </ul>
    </>
  );
};

export default MemberItemContent;

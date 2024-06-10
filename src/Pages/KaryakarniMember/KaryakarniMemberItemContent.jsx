import React from "react";

const KaryakarniMemberItemContent = ({ item }) => {

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
                <p>{(item.designations && item.designations.length>0) ? item.designations.join(", ") : "None"}</p>
            </center>
          </div>
        </li>
      </ul>
    </>
  );
};

export default KaryakarniMemberItemContent;

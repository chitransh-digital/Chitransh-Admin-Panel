import React from "react";

const KaryakarniItemContent = ({ item }) => {
  const { name, state, city, landmark } = item;
  return (
    <>
      <ul className="h-[70%] sm:h-full flex flex-row justify-around visby text-[1rem] lg:text-[1.15rem] pr-[10px] transition-all ease-in-out">
        <li className="sm:w-[35%]">
          <div className="flex align-top justify-center">
            <div className="inline-block">
              <div>{name}</div>
            </div>
          </div>
        </li>

        <li className="sm:w-[35%] flex sm:block">
            <div>
                <center>
                    <p>{landmark +" "+ city +" "+ state}</p>
                </center>
            </div>
        </li>
      </ul>
    </>
  );
};

export default KaryakarniItemContent;

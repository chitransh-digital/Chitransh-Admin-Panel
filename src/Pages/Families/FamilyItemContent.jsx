import React, { useEffect } from "react";

const FamilyItemContent = ({ item }) => {
  const { familyID, members } = item;

  useEffect(()=>{
    console.log(familyID)
    console.log(members)
  },[])

  return (
    <>
      <ul className="h-[70%] sm:h-full flex flex-row justify-between visby text-[1rem] lg:text-[1.15rem] pr-[10px] transition-all ease-in-out">
        <li className="sm:w-[35%]">
          <div className="flex align-top justify-center pr-[15%]">
            <div className="inline-block">
              <div>{familyID}</div>
            </div>
          </div>
        </li>

        <li className="sm:w-[20%] w-full hidden sm:block">
          <div>
            <center>
                <p>{members[0].name}</p>
            </center>
          </div>
        </li>

        <li className="sm:w-[35%] flex sm:block">
          <div>
            <center>
              <p>{members[0].contact}</p>
            </center>
          </div>
        </li>
      </ul>
    </>
  );
};

export default FamilyItemContent;

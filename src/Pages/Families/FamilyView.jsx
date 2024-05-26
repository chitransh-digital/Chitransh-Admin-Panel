import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { removeFeed } from "../../Api/feedsApi";
import { Link, useNavigate } from "react-router-dom";
import { sendImageNotification } from "../../Api/notificationApi";

const FamilyView = ({ setFamilyVariant, displayFamily }) => {
  const navigate = useNavigate();
  const { familyID , members } = displayFamily;

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const clickHandler = () => {
    setFamilyVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this family?")) {
      await removeFeed(familyID);
      setFamilyVariant((prev) => !prev);
      navigate("/family");
    }
  };

  const notifyHandler = async () => {
    if (window.confirm("Are you sure you want to send notification for this family?")) {
      setIsLoading((prev) => true);
      await sendImageNotification({ familyID });
      setIsLoading((prev) => false);
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{familyID}</p>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Head of the Family:</p>
            <p className="ml-2">{members[0].name}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Conatct of the Head:</p>
            <p className="ml-2">{members[0].contact}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Members:</p>
        <p className="ml-2">{members.length}</p>
      </div>

      <div className="flex">
        <button
          onClick={isLoading ? () => {} : notifyHandler}
          className={`mx-1 mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Notify" : <div id="lds-dual-ring" />}
        </button>
        <Link
          to="/members"
          state={{
            familyID,
            members,
          }}
        >
          <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Members
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className="mx-1 mt-8 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FamilyView;

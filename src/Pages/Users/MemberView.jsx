import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { deleteMember } from "../../Api/memberApi";
import { Link, useNavigate } from "react-router-dom";

const MemberView = ({ setMemberVariant, displayMember, familyID }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const clickHandler = () => {
    setMemberVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      const name = displayMember.name;
      await deleteMember(familyID, name);
      setMemberVariant((prev) => !prev);
      navigate("/family");
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{displayMember.name}</p>
      <p className="pl-5">{displayMember.gender + " "+ displayMember.age}</p>

      <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Family ID:</p>
            <p className="ml-2">{familyID}</p>
        </div>
        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Location:</p>
            <p className="ml-2">{displayMember.landmark+", "+displayMember.city+", "+displayMember.state}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Contact:</p>
            <p className="ml-2">{displayMember.contact}</p>
        </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Blood Group:</p>
        <p className="ml-2">{displayMember.bloodGroup}</p>
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Education:</p>
        <p className="ml-2">{displayMember.education}</p>
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Occupation:</p>
        <p className="ml-2">{displayMember.occupation}</p>
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Karyakarni:</p>
        <p className="ml-2">{displayMember.karyakarni}</p>
      </div>

      <div className="flex">
        <Link
          to="/updateMember"
          state={{
            familyID,
            memberData:displayMember,
          }}
        >
          <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Update
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

export default MemberView;

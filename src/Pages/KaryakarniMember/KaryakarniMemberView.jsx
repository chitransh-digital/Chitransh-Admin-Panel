import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {removeKaryakarni} from "../../Api/karyakarniApi";
import { Link, useNavigate } from "react-router-dom";

const KaryakarniMemberView = ({ setMemberVariant, displayMember,designations, karyakarni, id }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    setMemberVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      const memberId = displayMember._id;
      await removeKaryakarni(id, memberId);
      setMemberVariant((prev) => !prev);
      navigate("/karyakarni");
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{displayMember.name}</p>

      <div className="w-64 h-64 overflow-hidden rounded-xl mr-6 ml-5">
        <img src={displayMember.profilePic} alt="" className="object-contain w-full h-full" />
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Family ID:</p>
            <p className="ml-2">{displayMember.familyID ? displayMember.familyID : "N/A"}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Contact:</p>
            <p className="ml-2">{displayMember.contact ? displayMember.contact : "N/A"}</p>
        </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Designations:</p>
        <p className="ml-2">{(displayMember.designations && displayMember.designations.length>0) ? displayMember.designations.join(", ") : "None"}</p>
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Karyakarni:</p>
        <p className="ml-2">{karyakarni}</p>
      </div>

      <div className="flex">
        <Link
          to="/updateKaryakarniMember"
          state={{
            id,
            designations,
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

export default KaryakarniMemberView;

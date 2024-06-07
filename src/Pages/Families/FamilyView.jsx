import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { deleteMember } from "../../Api/memberApi";
import { Link, useNavigate } from "react-router-dom";

const FamilyView = ({ setFamilyVariant, displayFamily }) => {
  const navigate = useNavigate();
  const { id , familyID , members } = displayFamily;

  const clickHandler = () => {
    setFamilyVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this family?")) {
      await deleteMember(id, "");
      setFamilyVariant((prev) => !prev);
      window.location.reload();
      navigate("/family");
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
            <p className="ml-2">{(members.length>0 && members[0].name && members[0].relation === "Head") ? members[0].name : "Not Available"}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Conatct of the Head:</p>
            <p className="ml-2">{(members.length>0 && members[0].contact && members[0].contactVisibility && members[0].relation === "Head") ? <p>{members[0].contact}</p> : (members.length>0 && members[0].contact && !members[0].contactVisibility) ? <p>Not Visible</p> : <p>Not Available</p>}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Members:</p>
        <p className="ml-2">{members.length}</p>
      </div>

      <div className="flex">
        <Link
          to="/members"
          state={{
            id,
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

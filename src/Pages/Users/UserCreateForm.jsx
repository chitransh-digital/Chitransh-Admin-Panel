import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createFamily, createMember } from "../../Api/userApi";

const UserCreateForm = () => {
  // const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [isLoading] = useState(false);
  const [variant, setVariant] = useState(true);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to create this job?")) {
      const newMember = {
        address: user.address,
        age: user.age,
        bloodGroup: user.bloodGroup,
        contact: user.contact,
        dob: user.dob,
        familyId: user.familyId,
        name: user.name,
        occupation: user.occupation,
        gender: user.gender,
        profilePic: user.profilePic,
        karyakarni: user.karyakarni,
        relation: 'HEAD',
      }
      
      await createFamily(newMember);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Create User
        </p>
      </div>
      <ul className="flex mb-4 items-start justify justify-center gap-12 text-xl">
        <li
          onClick={() => {setVariant((prev) => false)}}
          className={`cursor-pointer ${!variant ? "text-blue-500" : ""}`}
        >
          New family
        </li>
        <li
          onClick={() => setVariant((prev) => true)}
          className={`cursor-pointer ${variant ? "text-blue-500" : ""}`}
        >
          Existing family
        </li>
      </ul>
      <hr className=" border-black" />
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
          onChange={handleChange("name")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Contact</p>
            <input
              onChange={handleChange("contact")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Date of Birth</p>
            <input
              onChange={handleChange("dob")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Occupation</p>
            <input
              onChange={handleChange("occupation")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Blood group</p>
            <input
              onChange={handleChange("bloodGroup")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Gender</p>
            <input
              onChange={handleChange("gender")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Age</p>
            <input
              onChange={handleChange("age")}
              type="number"
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>
        <p className="text-xl mb-2 mt-5">Profile Pic</p>
        <input
          onChange={handleChange("profilePic")}
          className=" border-black border-[1px] p-2 w-[19rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Karyakarni</p>
        <input
          onChange={handleChange("karyakarni")}
          className=" border-black border-[1px] p-2 w-[19rem]"
        ></input>
        {variant ? (
          <>
            <p className="text-xl mb-2 mt-5">Relation</p>
            <input
              onChange={handleChange("relation")}
              className="border-black border-[1px] p-2 w-[19rem]"
            />
            <p className="text-xl mb-2 mt-5">Contact of Head</p>
            <input
              onChange={handleChange("contactOfHead")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </>
        ) : (
          <>
            <p className="text-xl mb-2 mt-5">Family ID</p>
            <input
              onChange={handleChange("familyId")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </>
        )}
        <p className="text-xl mb-2 mt-5">Address</p>
        <textarea
          onChange={handleChange("address")}
          className=" border-black border-[1px] p-2 h-[8rem] w-[40rem]"
        ></textarea>
        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Create" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default UserCreateForm;

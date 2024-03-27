import React, { useState } from "react";
import { createUser } from "../../Api/userApi";

const UserCreateForm = () => {
  const [user, setUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to create this user?")) {
      setIsLoading(prev => true);
      const newMember = {
        name: user.name,
        age: parseInt(user.age),
        address: user.address,
        gender: user.gender,
        karyakarni: user.karyakarni,
        familyID: user.familyID,
        contact: user.contact,
        DOB: user.dob,
        profilePic: user.profilePic,
        relation: user.relation,
        bloodGroup: user.bloodGroup,
        occupation: user.occupation,
        education: user.education,
      };
      const response = await createUser(newMember);
      if (response.message === "Member added successfully") {
        alert("User created successfully");
        window.location.reload();
      } else {
        alert("Couldn't create user. Please try again.");
      }
      setIsLoading(prev => false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Create User
        </p>
      </div>
      <div className="mt-10 ml-5">

        <p className="text-xl mb-2">Name</p>
        <input
          onChange={handleChange("name")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Age</p>
            <input
              type="number"
              onChange={handleChange("age")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Gender</p>
            <input
              onChange={handleChange("gender")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Karyakarni</p>
            <input
              onChange={handleChange("karyakarni")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Family ID</p>
            <input
              onChange={handleChange("familyID")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

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
            <p className="text-xl mb-2 mt-5">Relation</p>
            <input
              onChange={handleChange("relation")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Blood Group</p>
            <input
              onChange={handleChange("bloodGroup")}
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
            <p className="text-xl mb-2 mt-5">Education</p>
            <input
              onChange={handleChange("education")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <p className="text-xl my-2">Profile Pic</p>
        <input
          onChange={handleChange("profilePic")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

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

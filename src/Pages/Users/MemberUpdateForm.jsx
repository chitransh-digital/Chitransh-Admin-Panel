import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImage, updateFeed } from "../../Api/feedsApi";
import { updateMember } from "../../Api/memberApi";

const MemberUpdateForm = () => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const { familyID, memberData } = reactLocation.state;

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [member, setMember] = useState({
    name: memberData.name,
    age: memberData.age,
    gender: memberData.gender,
    contact: memberData.contact,
    landmark: memberData.landmark,
    city: memberData.city,
    state: memberData.state,
    familyID: familyID,
    DOB: memberData.DOB,
    occupation: memberData.occupation,
    relation: memberData.relation,
    karyakarni: memberData.karyakarni,
    bloodGroup: memberData.bloodGroup,
    education: memberData.education,
    profilePic: memberData.profilePic,
  });

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setMember((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to edit this member?")) {
      setIsLoading((prev) => true);
      if (image !== null) {
        const imageUrl = await uploadImage(image);
        const memberWithImage = { ...member, images: [imageUrl] };
        await updateMember(familyID, memberWithImage);
      } else {
        await updateMember(familyID, member);
      }
      navigate("/family",);
    }
  };

  const handleImageUpload = (e) => {
    setImage((prev) => e.target.files[0]);
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Member
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
        value={member.name}
          onChange={handleChange("name")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Age</p>
            <input
              type="number"
              value={member.age}
              onChange={handleChange("age")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Gender</p>
            <select
              value={member.gender}
              onChange={handleChange("gender")}
              className="border-black border-[1px] p-2 w-[19rem]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Contact</p>
            <input
              type="text"
                value={member.contact}
              onChange={handleChange("contact")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Date of Birth</p>
            <input
              type="date"
                value={member.DOB}
              onChange={handleChange("DOB")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">FamilyID</p>
            <input
              value={familyID}
              contentEditable="false"
              onChange={handleChange("familID")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Relation</p>
            <input
            value={member.relation}
            contentEditable={member.relation === "head" ? false : true}
              onChange={handleChange("relation")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Blood Group</p>
            <input
            value={member.bloodGroup}
              onChange={handleChange("bloodGroup")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Occupation</p>
            <input
            value={member.occupation}
              onChange={handleChange("occupation")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Education</p>
            <input
            value={member.education}
              onChange={handleChange("education")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Landmark</p>
            <input
            value={member.landmark}
              onChange={handleChange("landmark")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">City</p>
            <input
            value={member.city}
              onChange={handleChange("city")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">State</p>
            <input
            value={member.state}
              onChange={handleChange("state")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Karyakarni</p>
            <input
            value={member.karyakarni}
              onChange={handleChange("karyakarni")}
              className="border-black border-[1px] p-2 w-[40rem]"
            ></input>
          </div>
        </div>

        <p className="text-xl my-2">Profile Pic</p>
        <input
        value={member.profilePic}
          onChange={handleChange("profilePic")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>


        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Update" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default MemberUpdateForm;

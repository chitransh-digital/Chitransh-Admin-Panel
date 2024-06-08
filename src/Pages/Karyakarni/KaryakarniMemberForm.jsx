import React, { useState } from "react";
import { uploadImage } from "../../Api/karyakarniApi";

const KaryakarniMemberForm = ({ karyakarniId, designations, members, setKaryakarni }) => {

  const [member, setMember] = useState({
    name: "",
    familyID: "",
    profilePic: "",
    designations: [],
    karyakarni: karyakarniId,
  });

  const handleMemberChange = (input) => (e) => {
    e.preventDefault();
    setMember((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const handleDesignationsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setMember((prev) => ({ ...prev, designations: selectedOptions }));
  };

  const validateMemberFields = (member) => {
    const missingFields = [];
    if (!member.name.trim()) missingFields.push("Name");
    if (member.designations.length === 0) missingFields.push("Designations");

    return missingFields;
  }

  const handleAddMember = async () => {
    const missingFields = validateMemberFields(member);
    if (missingFields && missingFields.length > 0) {
      alert(`You must enter all the required fields: ${missingFields.join(", ")}`);
    }
    else if (member.name.trim() && member.designations.length > 0) {
      let profilePicUrl = "";
      if (member.profilePic) {
        profilePicUrl = await uploadImage(member.profilePic);
      }
      const newMember = {
        ...member,
        profilePic: profilePicUrl,
        karyakarni: karyakarniId,
      };
      setKaryakarni((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
      }));
      setMember({
        name: "",
        familyID: "",
        profilePic: "",
        designations: [],
        karyakarni: karyakarniId,
      });
    }
  };

  const handleMemberImageUpload = (e) => {
    setMember((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-2">Add Member</h2>
      <br />
      <p className="text-xl mb-2">Member Name</p>
      <input
        value={member.name}
        onChange={handleMemberChange("name")}
        className="border-black border-[1px] p-2 w-[40rem]"
      ></input>

      <p className="text-xl mb-2 mt-5">Family ID</p>
      <input
        value={member.familyID}
        onChange={handleMemberChange("familyID")}
        className="border-black border-[1px] p-2 w-[40rem]"
      ></input>

      <p className="text-xl mb-2 mt-5">Profile Picture</p>
      <input onChange={handleMemberImageUpload} type="file"></input>

      <p className="text-xl mb-2 mt-5">Designations</p>
      <select
        multiple={true}
        value={member.designations}
        onChange={handleDesignationsChange}
        className="border-black border-[1px] p-2 w-[40rem]"
      >
        {designations && designations.map((designation, index) => (
          <option key={index} value={designation}>
            {designation}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddMember}
        className="mt-5 p-2 bg-blue-600 text-white rounded-md"
      >
        Add Member
      </button>

      <ul className="mt-5">
        {members && members.map((member, index) => (
          <li key={index} className="mb-2">
            <p>Name: {member.name}</p>
            <p>Family ID: {member.familyID || "N/A"}</p>
            <p>Designations: {member.designations.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KaryakarniMemberForm;